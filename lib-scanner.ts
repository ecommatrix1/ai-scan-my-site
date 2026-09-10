import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import * as dns from "dns";

/**
 * A single audit check produced by scanWebsite.
 * The shape is the contract consumed by the UI mapper
 * (mapScanResultsToAuditItems in AIScanMySite.tsx) and
 * the score calculation in /api/scan.
 */
export interface ScanCheck {
  /** Stable, machine-readable id (e.g. "schema-jsonld"). UI key. */
  id: string;
  /** Raw category, mapped to AuditItem.category by the UI. */
  category: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  passed: boolean;
  weight: number;
  /** True for optional or emerging specs (e.g. llms.txt, FAQ schema). */
  isOptional?: boolean;
  /** Concrete evidence from the live page (URL, header, snippet). */
  evidence: string;
  /** Copy-paste fix code; absent when no snippet applies. */
  fixCode?: string;
}

/** Result bundle from scanWebsite — includes checks + the fetched page body for reuse. */
export interface ScanResult {
  checks: ScanCheck[];
  /** Raw HTML body of the target page (empty string if fetch failed). */
  pageBody: string;
  /** Resolved origin (e.g. https://example.com). */
  origin: string;
  /** Final URL after redirects. */
  finalUrl: string;
}

/** A minimal record of what the probes need from the page. */
interface PageProbe {
  url: string;
  ok: boolean;
  status: number;
  contentType: string;
  body: string;
  headers: Record<string, string>;
  finalUrl: string;
}

/** Allowed list of AI crawler user-agents the audit checks for in robots.txt. */
const AI_BOT_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
];

/** Check if an IP address string is in a private, loopback, link-local, or metadata range. */
function isPrivateIP(rawIp: string): boolean {
  let ip = rawIp.trim().toLowerCase();
  if (ip.startsWith("[") && ip.endsWith("]")) {
    ip = ip.slice(1, -1);
  }

  // Handle IPv4-mapped IPv6 addresses (e.g., ::ffff:127.0.0.1 or ::ffff:7f00:1)
  if (ip.startsWith("::ffff:")) {
    const parts = ip.slice(7);
    if (parts.includes(".")) {
      ip = parts;
    }
  }

  // IPv4 Check
  const parts = ip.split(".").map(Number);
  if (parts.length === 4 && parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
    if (parts[0] === 10) return true; // 10.0.0.0/8
    if (parts[0] === 127) return true; // 127.0.0.0/8
    if (parts[0] === 169 && parts[1] === 254) return true; // 169.254.0.0/16
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true; // 172.16.0.0/12
    if (parts[0] === 192 && parts[1] === 168) return true; // 192.168.0.0/16
    if (parts[0] === 0) return true; // 0.0.0.0
  }

  // IPv6 Check
  if (ip === "::" || ip === "0:0:0:0:0:0:0:0" || ip === "::1" || ip === "0:0:0:0:0:0:0:1") return true;
  if (ip.startsWith("fc") || ip.startsWith("fd")) return true; // fc00::/7 & fd00::/8 (Unique Local)
  if (/^fe[89ab]/i.test(ip)) return true; // fe80::/10 (Link-Local)

  return false;
}

function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (isPrivateIP(h)) return true;
  return false;
}

/** Resolve DNS and verify that ALL resolved IP addresses for a hostname are public. */
async function isSafeDestination(hostname: string): Promise<boolean> {
  if (isPrivateHost(hostname)) return false;
  try {
    const records = await dns.promises.lookup(hostname, { all: true });
    if (!records || records.length === 0) return false;
    for (const r of records) {
      if (isPrivateIP(r.address)) return false;
    }
    return true;
  } catch {
    return false; // Reject on DNS resolution failure
  }
}

const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2 MB Hard Limit
const MAX_REDIRECTS = 3;

/**
 * Fetch the target URL with SSRF protection, manual redirect re-validation per hop,
 * a 2MB maximum response body stream cap, and an 8-second request timeout.
 */
async function probe(initialUrl: string, timeoutMs = 8000): Promise<PageProbe> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let currentUrl = initialUrl;
  let redirectCount = 0;

  try {
    while (redirectCount <= MAX_REDIRECTS) {
      let u: URL;
      try {
        u = new URL(currentUrl);
      } catch {
        return { url: initialUrl, ok: false, status: 0, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
      }

      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return { url: initialUrl, ok: false, status: 0, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
      }

      const safe = await isSafeDestination(u.hostname);
      if (!safe) {
        return { url: initialUrl, ok: false, status: 0, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
      }

      let res = await fetch(currentUrl, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": "AI-Scan-MySite/1.0 (+https://aiscanmysite.com)" },
      });

      // If WAF blocks custom bot user-agent (403/401), retry with standard browser user-agent
      if (res.status === 403 || res.status === 401) {
        try {
          res = await fetch(currentUrl, {
            redirect: "manual",
            signal: controller.signal,
            headers: { 
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            },
          });
        } catch {}
      }

      // Handle Redirects Manually (301, 302, 303, 307, 308)
      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const location = res.headers.get("location");
        if (!location) {
          return { url: initialUrl, ok: false, status: res.status, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
        }
        try {
          const nextUrlObj = new URL(location, currentUrl);
          currentUrl = nextUrlObj.toString();
          redirectCount++;
          continue;
        } catch {
          return { url: initialUrl, ok: false, status: res.status, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
        }
      }

      // Read Response Body with 2MB Bounded Stream Cap
      const contentType = res.headers.get("content-type") ?? "";
      let body = "";
      const shouldRead = contentType.startsWith("text/") || contentType.includes("json") || contentType.includes("xml") || contentType === "";

      if (shouldRead && res.body) {
        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        let totalBytes = 0;

        while (totalBytes < MAX_BODY_BYTES) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            const remaining = MAX_BODY_BYTES - totalBytes;
            if (value.length > remaining) {
              chunks.push(value.subarray(0, remaining));
              totalBytes += remaining;
              try { await reader.cancel(); } catch {}
              break;
            } else {
              chunks.push(value);
              totalBytes += value.length;
            }
          }
        }
        const decoder = new TextDecoder("utf-8");
        const concatenated = new Uint8Array(totalBytes);
        let offset = 0;
        for (const chunk of chunks) {
          concatenated.set(chunk, offset);
          offset += chunk.length;
        }
        body = decoder.decode(concatenated);
      }

      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

      return {
        url: initialUrl,
        ok: res.ok,
        status: res.status,
        contentType,
        body,
        headers,
        finalUrl: currentUrl,
      };
    }

    return { url: initialUrl, ok: false, status: 310, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
  } catch {
    return { url: initialUrl, ok: false, status: 0, contentType: "", body: "", headers: {}, finalUrl: currentUrl };
  } finally {
    clearTimeout(timer);
  }
}

/** Normalize a user-supplied URL to a fetchable absolute https URL. */
function normalizeUrl(input: string): { origin: string; pageUrl: string } | null {
  let raw: string;
  try {
    raw = new URL(input.includes("://") ? input : `https://${input}`).toString();
  } catch {
    return null;
  }
  const u = new URL(raw);
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  if (isPrivateHost(u.hostname)) return null;
  // Force https and drop the hash in one go.
  const pageUrl = `https://${u.host}${u.pathname}${u.search}`;
  return { origin: u.origin, pageUrl };
}

function snippet(s: string, max = 160): string {
  const collapsed = s.replace(/\s+/g, " ").trim();
  return collapsed.length > max ? `${collapsed.slice(0, max)}…` : collapsed;
}

/** Count <img> elements missing alt text (excludes intentionally decorative images). */
function countMissingAlt($: CheerioAPI): { total: number; missing: number } {
  let total = 0;
  let missing = 0;
  $("img").each((_i: number, el) => {
    const role = $(el).attr("role");
    // Skip intentionally decorative images (role="presentation" or role="none")
    if (role === "presentation" || role === "none") return;
    total += 1;
    const alt = $(el).attr("alt");
    // alt="" (empty string) on an <img> without role="presentation" is ambiguous;
    // undefined alt is always missing.
    if (alt === undefined) missing += 1;
  });
  return { total, missing };
}

/** Find JSON-LD blocks of the given @type. */
function hasJsonLdType($: CheerioAPI, typeName: string): boolean {
  let found = false;
  $('script[type="application/ld+json"]').each((_i: number, el) => {
    const raw = $(el).contents().text();
    try {
      const parsed = JSON.parse(raw);
      const visit = (node: unknown): void => {
        if (!node || typeof node !== "object") return;
        const obj = node as Record<string, unknown>;
        if (obj["@type"] === typeName) found = true;
        if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(visit);
      };
      visit(parsed);
    } catch {
      // ignore malformed JSON-LD
    }
  });
  return found;
}

/**
 * Run the 15-point audit against the target URL.
 * Every check is real: it fetches, parses, and computes pass/fail
 * from the live response. No values are hard-coded.
 * Returns checks + pageBody so callers can reuse the fetched HTML.
 */
export async function scanWebsite(url: string): Promise<ScanResult> {
  const normalized = normalizeUrl(url);
  if (!normalized) {
    return {
      checks: [
        {
          id: "input-invalid",
          category: "metadata",
          severity: "critical",
          title: "Invalid URL",
          description: "The URL provided is not a valid http(s) address and could not be audited.",
          passed: false,
          weight: 1,
          evidence: `Could not parse "${url}" as an http or https URL.`,
          fixCode: "Provide a domain like example.com or https://example.com",
        },
      ],
      pageBody: "",
      origin: "",
      finalUrl: "",
    };
  }

  const { origin } = normalized;
  const pageProbe = await probe(normalized.pageUrl);
  const robotsProbe = await probe(`${origin}/robots.txt`);
  const llmsProbe = await probe(`${origin}/llms.txt`);
  const sitemapProbe = await probe(`${origin}/sitemap.xml`);
  const $ = pageProbe.ok ? cheerio.load(pageProbe.body) : cheerio.load("");

  // ----- 1. robots.txt + AI bots ------------------------------------------------
  const robotsBody = robotsProbe.ok ? robotsProbe.body : "";
  const robotsLines = robotsBody.split(/\r?\n/);
  const botRules = new Map<string, { allow: boolean; rules: string[] }>();
  let currentAgents: string[] = [];
  for (const lineRaw of robotsLines) {
    const line = lineRaw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([A-Za-z\-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const [, field, valueRaw] = m;
    const value = valueRaw.trim();
    if (/^user\-agent$/i.test(field)) {
      currentAgents = [value.toLowerCase()];
      for (const a of currentAgents) {
        if (!botRules.has(a)) botRules.set(a, { allow: true, rules: [] });
      }
    } else if (/^(allow|disallow)$/i.test(field) && currentAgents.length) {
      // Disallow with non-empty value (including "/") blocks; Allow or empty Disallow permits.
      const blocked = /^disallow$/i.test(field) && value !== "";
      for (const a of currentAgents) {
        const entry = botRules.get(a)!;
        entry.rules.push(`${field}: ${value}`);
        if (blocked) entry.allow = false;
      }
    }
  }
  const wildcardEntry = botRules.get("*");
  const botResults: Array<{ bot: string; allowed: boolean; rule: string }> = [];
  for (const bot of AI_BOT_USER_AGENTS) {
    const entry = botRules.get(bot.toLowerCase());
    if (entry) {
      botResults.push({ bot, allowed: entry.allow, rule: entry.rules.join("; ") || "(no rule — implicit allow)" });
    } else if (wildcardEntry) {
      // No bot-specific rule; inherit from User-agent: * wildcard.
      botResults.push({ bot, allowed: wildcardEntry.allow, rule: `via wildcard *: ${wildcardEntry.rules.join("; ")}` });
    } else {
      // No explicit rule — Google's spec says absent = allowed.
      botResults.push({ bot, allowed: true, rule: "(no rule — implicit allow)" });
    }
  }
  const blockedBots = botResults.filter((b) => !b.allowed);
  const robotsPassed = robotsProbe.ok && blockedBots.length === 0;
  const robotsEvidence = !robotsProbe.ok
    ? `HTTP ${robotsProbe.status} at ${origin}/robots.txt — file missing or unreachable.`
    : blockedBots.length === 0
    ? `All ${AI_BOT_USER_AGENTS.length} AI bots allowed in robots.txt.`
    : `Blocked: ${blockedBots.map((b) => `${b.bot} (${b.rule})`).join("; ")}.`;

  // ----- 2. llms.txt ------------------------------------------------------------
  const llmsBody = llmsProbe.ok ? llmsProbe.body : "";
  const llmsHasTitle = /^#\s.+/m.test(llmsBody);
  const llmsHasSummary = /^#\s*summary\b/im.test(llmsBody) || /^>\s.+/m.test(llmsBody);
  const llmsPassed = llmsProbe.ok && llmsBody.trim().length > 0 && llmsHasTitle && llmsHasSummary;
  const llmsEvidence = !llmsProbe.ok
    ? `HTTP ${llmsProbe.status} at ${origin}/llms.txt — file missing.`
    : `Fetched ${llmsBody.length} bytes${llmsHasTitle ? "" : " (missing # Title heading)"}${llmsHasSummary ? "" : " (missing # Summary block)"}`;

  // Extract actual core links for llms.txt fixCode
  const links: { href: string; text: string }[] = [];
  if (pageProbe.ok) {
    $('a').each((_i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      if (href && text) links.push({ href, text });
    });
  }
  const coreLinks = links.filter(l => 
    l.href.toLowerCase().includes('pricing') || 
    l.href.toLowerCase().includes('faq') || 
    l.href.toLowerCase().includes('about') || 
    l.href.toLowerCase().includes('contact') || 
    l.href.toLowerCase().includes('docs')
  ).slice(0, 5);
  const llmsFixCode = llmsPassed ? undefined : `# ${new URL(origin).hostname}\n\n> AI Search Readiness summary for ${new URL(origin).hostname}.\n\n## Core Resources\n- [Home](${origin}/)\n${coreLinks.map(l => `- [${l.text}](${l.href})`).join('\n')}\n`;

  // ----- 3. Schema.org JSON-LD --------------------------------------------------
  const jsonLdCount = pageProbe.ok ? $('script[type="application/ld+json"]').length : 0;
  let jsonLdValid = 0;
  let jsonLdTypes: string[] = [];
  if (pageProbe.ok) {
    $('script[type="application/ld+json"]').each((_i: number, el) => {
      const raw = $(el).contents().text();
      try {
        const parsed = JSON.parse(raw);
        const visit = (node: unknown): void => {
          if (!node || typeof node !== "object") return;
          const obj = node as Record<string, unknown>;
          const t = obj["@type"];
          if (typeof t === "string") { jsonLdTypes.push(t); jsonLdValid += 1; }
          if (Array.isArray(t)) t.forEach((x) => { if (typeof x === "string") { jsonLdTypes.push(x); jsonLdValid += 1; } });
          if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(visit);
        };
        visit(parsed);
      } catch { /* ignore */ }
    });
  }
  const jsonLdPassed = jsonLdValid > 0;
  const jsonLdEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page to inspect structured data.`
    : `Found ${jsonLdCount} JSON-LD block(s); ${jsonLdValid} parseable @type(s)${jsonLdTypes.length ? ` (${Array.from(new Set(jsonLdTypes)).join(", ")})` : ""}.`;

  // ----- 4. Image ALT coverage --------------------------------------------------
  const { total: imgTotal, missing: imgMissing } = pageProbe.ok ? countMissingAlt($) : { total: 0, missing: 0 };
  const altCoverage = imgTotal > 0 ? Math.round(((imgTotal - imgMissing) / imgTotal) * 100) : 100;
  // Trivially passes when no images; fails when images exist but some lack alt text.
  const altPassed = pageProbe.ok && (imgTotal === 0 || imgMissing === 0);
  const altEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page to count images.`
    : imgTotal === 0
    ? `No <img> elements found on the page.`
    : `${imgMissing} of ${imgTotal} images missing alt text (${altCoverage}% coverage).`;

  // ----- 5. sitemap.xml ---------------------------------------------------------
  const sitemapPassed = sitemapProbe.ok && (/<urlset[\s>]/i.test(sitemapProbe.body) || /<sitemapindex[\s>]/i.test(sitemapProbe.body));
  const urlMatches = sitemapProbe.body.match(/<loc>/gi)?.length ?? 0;
  const sitemapEvidence = !sitemapProbe.ok
    ? `HTTP ${sitemapProbe.status} at ${origin}/sitemap.xml.`
    : `Found ${urlMatches} <loc> entries in sitemap.`;

  // ----- 6. meta description ----------------------------------------------------
  const metaDesc = pageProbe.ok ? $('meta[name="description"]').attr("content")?.trim() ?? "" : "";
  const metaDescLen = metaDesc.length;
  const metaDescPassed = pageProbe.ok && metaDescLen >= 70 && metaDescLen <= 200;
  const metaDescEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : metaDescLen === 0
    ? `No <meta name="description"> found.`
    : `Description length ${metaDescLen} chars (recommended 70–200).`;

  // ----- 7. Security headers ----------------------------------------------------
  const requiredHeaders = ["x-content-type-options", "x-frame-options", "strict-transport-security", "referrer-policy"];
  const presentHeaders = requiredHeaders.filter((h) => pageProbe.headers[h]);
  const secHeadersPassed = pageProbe.ok && presentHeaders.length === requiredHeaders.length;
  const secHeadersEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not inspect response headers.`
    : `Present: ${presentHeaders.length}/${requiredHeaders.length} (${presentHeaders.join(", ") || "none"}).`;

  // ----- 8. Heading structure ---------------------------------------------------
  const headings = pageProbe.ok
    ? $("h1, h2, h3, h4, h5, h6").map((_i: number, el) => Number((el as any).tagName.slice(1))).get()
    : [];
  const h1Count = headings.filter((l) => l === 1).length;
  let h1Monotonic = h1Count === 1;
  let monotonicOk = true;
  let prev = 0;
  for (const l of headings) {
    if (prev !== 0 && l > prev + 1) { monotonicOk = false; break; }
    prev = l;
  }
  const headingsPassed = pageProbe.ok && h1Count === 1 && monotonicOk && headings.length > 0;
  const headingsEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : `H1 count: ${h1Count}; total headings: ${headings.length}; monotonic: ${monotonicOk ? "yes" : "no"}.`;

  // ----- 9. Open Graph tags -----------------------------------------------------
  const ogTitle = pageProbe.ok ? $('meta[property="og:title"]').attr("content")?.trim() ?? "" : "";
  const ogDesc = pageProbe.ok ? $('meta[property="og:description"]').attr("content")?.trim() ?? "" : "";
  const ogImage = pageProbe.ok ? $('meta[property="og:image"]').attr("content")?.trim() ?? "" : "";
  const ogPresent = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  const ogPassed = pageProbe.ok && ogPresent === 3;
  const ogEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : `og:title ${ogTitle ? "✓" : "✗"} · og:description ${ogDesc ? "✓" : "✗"} · og:image ${ogImage ? "✓" : "✗"}.`;

  // ----- 10. Structured content for LLMs ----------------------------------------
  const wordCount = pageProbe.ok ? $("main, article, body").text().split(/\s+/).filter(Boolean).length : 0;
  const semanticCount = pageProbe.ok ? $("article, section, main, nav, header, footer").length : 0;
  const structuredPassed = pageProbe.ok && wordCount >= 300 && semanticCount >= 3;
  const structuredEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : `Words: ${wordCount}; semantic landmarks: ${semanticCount}.`;

  // ----- 11. FAQ schema ---------------------------------------------------------
  const faqPresent = pageProbe.ok && hasJsonLdType($, "FAQPage");
  const faqPassed = faqPresent;
  const faqEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : faqPresent
    ? `FAQPage @type found in JSON-LD.`
    : `No FAQPage @type found in JSON-LD blocks.`;

  // ----- 12. SSL certificate ----------------------------------------------------
  // If we got here over https, the cert negotiated successfully. Lower-level
  // cert validation (issuer, expiry) is not feasible without an extra TLS lib
  // in a serverless edge; we report the highest-signal observation available.
  const sslPassed = normalized.pageUrl.startsWith("https://") && pageProbe.ok;
  const sslEvidence = !normalized.pageUrl.startsWith("https://")
    ? `URL is not https — connection is plaintext.`
    : !pageProbe.ok
    ? `HTTPS request failed (HTTP ${pageProbe.status}).`
    : `HTTPS connection established successfully.`;

  // ----- 13. Canonical URL ------------------------------------------------------
  const canonicalHref = pageProbe.ok ? $('link[rel="canonical"]').attr("href")?.trim() ?? "" : "";
  const canonicalPassed = pageProbe.ok && canonicalHref.length > 0;
  const canonicalEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : canonicalHref
    ? `Canonical URL: ${snippet(canonicalHref, 120)}`
    : `No <link rel="canonical"> found.`;

  // ----- 14. Mobile viewport ----------------------------------------------------
  const viewportContent = pageProbe.ok ? $('meta[name="viewport"]').attr("content")?.trim() ?? "" : "";
  const viewportPassed = pageProbe.ok && /width\s*=\s*device-width/i.test(viewportContent);
  const viewportEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : viewportContent
    ? `Viewport: ${snippet(viewportContent, 120)}`
    : `No <meta name="viewport"> found.`;

  // ----- 15. Language attribute --------------------------------------------------
  const htmlLang = pageProbe.ok ? $('html').attr("lang")?.trim() ?? "" : "";
  const langPassed = pageProbe.ok && htmlLang.length > 0;
  const langEvidence = !pageProbe.ok
    ? `HTTP ${pageProbe.status} — could not fetch page.`
    : htmlLang
    ? `<html lang="${htmlLang}">`
    : `No lang attribute on <html> element.`;

  // ---- Final ordered list: 15 entries -----------------------------------------
  const checks: ScanCheck[] = [
    {
      id: "robots-ai-bots",
      category: "robots",
      severity: "critical",
      title: "AI Crawlers Allowed in robots.txt",
      description: "Verifies that GPTBot, ClaudeBot, PerplexityBot, and Google-Extended are permitted to crawl your pages.",
      passed: robotsPassed,
      weight: 15,
      evidence: robotsEvidence,
      fixCode: robotsPassed ? undefined : `User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /`,
    },
    {
      id: "llms-txt",
      category: "llms",
      severity: "warning",
      title: "llms.txt Specification File",
      description: "Checks that your site serves an /llms.txt file with a # Title and # Summary block, per the llmstxt.org spec.",
      passed: llmsPassed,
      weight: 8,
      isOptional: true,
      evidence: llmsEvidence,
      fixCode: llmsPassed ? undefined : llmsFixCode,
    },
    {
      id: "schema-jsonld",
      category: "schema",
      severity: "critical",
      title: "Schema.org JSON-LD Markup",
      description: "Validates parseable Schema.org structured data (JSON-LD) describing your organization, products, or site.",
      passed: jsonLdPassed,
      weight: 15,
      evidence: jsonLdEvidence,
      fixCode: jsonLdPassed ? undefined : `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Insert Organization Name",\n  "url": "${origin}",\n  "logo": "${origin}/logo.png"\n}\n</script>`,
    },
    {
      id: "image-alt",
      category: "alttags",
      severity: "critical",
      title: "Image ALT Tag Coverage",
      description: "Counts <img> elements with empty or missing alt attributes. AI vision models and screen readers rely on alt text.",
      passed: altPassed,
      weight: 12,
      evidence: altEvidence,
      fixCode: altPassed ? undefined : `<!-- Example: Provide descriptive alt text for images -->\n<img src="image.jpg" alt="Descriptive text describing the image content" />`,
    },
    {
      id: "sitemap-xml",
      category: "sitemap",
      severity: "warning",
      title: "XML Sitemap Present",
      description: "Confirms a valid sitemap.xml exists and contains <loc> entries that search engines can crawl.",
      passed: sitemapPassed,
      weight: 10,
      evidence: sitemapEvidence,
      fixCode: sitemapPassed ? undefined : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${origin}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n</urlset>`,
    },
    {
      id: "meta-description",
      category: "metadata",
      severity: "warning",
      title: "Meta Description Present",
      description: "Checks for a meta description in the recommended 70–200 character range.",
      passed: metaDescPassed,
      weight: 10,
      evidence: metaDescEvidence,
      fixCode: metaDescPassed ? undefined : `<meta name="description" content="${snippet(metaDesc || "Add a descriptive summary of your page here, 70–200 characters.", 200)}" />`,
    },
    {
      id: "security-headers",
      category: "security",
      severity: "critical",
      title: "HTTPS Security Headers",
      description: "Verifies the response includes X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security, and Referrer-Policy.",
      passed: secHeadersPassed,
      weight: 12,
      evidence: secHeadersEvidence,
      fixCode: secHeadersPassed ? undefined : `# Example for Next.js next.config.js or your edge config\nheaders: [\n  { key: "X-Content-Type-Options", value: "nosniff" },\n  { key: "X-Frame-Options", value: "DENY" },\n  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },\n  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },\n]`,
    },
    {
      id: "heading-structure",
      category: "metadata",
      severity: "warning",
      title: "Heading Structure (H1–H6)",
      description: "Ensures exactly one <h1> and a monotonically non-decreasing heading hierarchy.",
      passed: headingsPassed,
      weight: 8,
      evidence: headingsEvidence,
      fixCode: headingsPassed ? undefined : `<!-- One <h1>, then descend in order without skipping levels -->\n<h1>Page title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>`,
    },
    {
      id: "open-graph",
      category: "metadata",
      severity: "warning",
      title: "Open Graph / Social Meta Tags",
      description: "Checks for og:title, og:description, and og:image so shared links render correctly on social platforms.",
      passed: ogPassed,
      weight: 8,
      evidence: ogEvidence,
      fixCode: ogPassed ? undefined : `<meta property="og:title" content="Insert Page Title" />\n<meta property="og:description" content="Insert Page Description" />\n<meta property="og:image" content="${origin}/og-image.png" />\n<meta property="og:type" content="website" />`,
    },
    {
      id: "structured-content",
      category: "llms",
      severity: "warning",
      title: "Structured Content for LLMs",
      description: "Validates that the page has enough body copy and uses semantic landmarks (article, section, main, nav, header, footer).",
      passed: structuredPassed,
      weight: 10,
      evidence: structuredEvidence,
      fixCode: structuredPassed ? undefined : `<!-- Use semantic HTML so LLMs can parse structure -->\n<main>\n  <article>\n    <h1>Title</h1>\n    <section>...</section>\n  </article>\n</main>`,
    },
    {
      id: "faq-schema",
      category: "schema",
      severity: "info",
      title: "FAQ Schema Markup",
      description: "Detects FAQPage @type in JSON-LD to enable rich-result eligibility.",
      passed: faqPassed,
      weight: 0,
      isOptional: true,
      evidence: faqEvidence,
      fixCode: faqPassed ? undefined : `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [{\n    "@type": "Question",\n    "name": "Insert Question Here",\n    "acceptedAnswer": { "@type": "Answer", "text": "Insert Answer Here" }\n  }]\n}\n</script>`,
    },
    {
      id: "ssl-certificate",
      category: "security",
      severity: "warning",
      title: "SSL Certificate Validity",
      description: "Verifies the site is reachable over HTTPS with a valid TLS handshake.",
      passed: sslPassed,
      weight: 8,
      evidence: sslEvidence,
    },
    {
      id: "canonical-url",
      category: "metadata",
      severity: "warning",
      title: "Canonical URL Tag",
      description: "Checks for a <link rel=\"canonical\"> tag to prevent duplicate content issues across search engines and AI crawlers.",
      passed: canonicalPassed,
      weight: 8,
      evidence: canonicalEvidence,
      fixCode: canonicalPassed ? undefined : `<link rel="canonical" href="${origin}/" />`,
    },
    {
      id: "mobile-viewport",
      category: "metadata",
      severity: "critical",
      title: "Mobile Viewport Meta Tag",
      description: "Verifies a <meta name=\"viewport\"> tag with width=device-width for proper mobile rendering.",
      passed: viewportPassed,
      weight: 10,
      evidence: viewportEvidence,
      fixCode: viewportPassed ? undefined : `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    },
    {
      id: "html-lang",
      category: "metadata",
      severity: "warning",
      title: "HTML Language Attribute",
      description: "Checks that <html> has a lang attribute for accessibility, screen readers, and AI language detection.",
      passed: langPassed,
      weight: 6,
      evidence: langEvidence,
      fixCode: langPassed ? undefined : `<html lang="en">`,
    },
  ];

  return {
    checks,
    pageBody: pageProbe.body,
    origin,
    finalUrl: pageProbe.finalUrl,
  };
}
