import { NextRequest, NextResponse } from 'next/server';
import { scanWebsite } from '@/lib/scanner';
import { classifyWebsite, SiteSignals } from '@/lib/classifier';
import * as cheerio from 'cheerio';

// Simple in-memory rate limiter: max 3 scans per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function extractSiteSignals(url: string, body: string, origin: string, finalUrl: string): SiteSignals {
  const $ = cheerio.load(body);
  
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content')?.trim() || '';
  const ogType = $('meta[property="og:type"]').attr('content')?.trim() || '';
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
  const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || '';
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || '';

  const jsonLdTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).text());
      const visit = (node: any) => {
        if (!node || typeof node !== 'object') return;
        if (node['@type']) {
          if (Array.isArray(node['@type'])) node['@type'].forEach((t: string) => jsonLdTypes.push(t));
          else jsonLdTypes.push(node['@type']);
        }
        if (Array.isArray(node['@graph'])) node['@graph'].forEach(visit);
      };
      visit(parsed);
    } catch {}
  });

  const links: { href: string; text: string }[] = [];
  $('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    const text = $(el).text().trim();
    if (href && text) links.push({ href, text });
  });

  const routeSignals = {
    pricing: [] as string[], docs: [] as string[], login: [] as string[], dashboard: [] as string[], cart: [] as string[], checkout: [] as string[],
    products: [] as string[], collections: [] as string[], blog: [] as string[], articles: [] as string[], news: [] as string[],
    services: [] as string[], contact: [] as string[], caseStudies: [] as string[], about: [] as string[], quote: [] as string[]
  };

  const routeMap: Record<string, keyof typeof routeSignals> = {
    'pricing': 'pricing', 'price': 'pricing',
    'docs': 'docs', 'documentation': 'docs',
    'login': 'login', 'sign-in': 'login',
    'dashboard': 'dashboard', 'app': 'dashboard',
    'cart': 'cart', 'basket': 'cart',
    'checkout': 'checkout',
    'products': 'products', 'shop': 'products',
    'collections': 'collections', 'category': 'collections',
    'blog': 'blog', 'articles': 'articles', 'news': 'news',
    'services': 'services',
    'contact': 'contact',
    'casestudies': 'caseStudies', 'case-studies': 'caseStudies',
    'about': 'about',
    'quote': 'quote', 'estimate': 'quote'
  };

  links.forEach(link => {
    const path = link.href.toLowerCase();
    Object.entries(routeMap).forEach(([keyword, key]) => {
      if (path.includes(keyword)) routeSignals[key].push(link.href);
    });
  });

  const ctaTexts = $('button, a.button, .cta').map((_, el) => $(el).text().trim()).get().filter(Boolean);

  const keywordScores = { saas: 0, ecommerce: 0, publisher: 0, agency: 0 };
  const bodyText = $('body').text();
  const keywords = {
    saas: ['platform', 'subscription', 'software', 'automation', 'workflow', 'enterprise', 'api'],
    ecommerce: ['shop', 'buy', 'cart', 'checkout', 'shipping', 'payment', 'order'],
    publisher: ['article', 'read more', 'blog', 'newsletter', 'editorial', 'author'],
    agency: ['services', 'portfolio', 'case study', 'consulting', 'expert', 'client']
  };

  Object.entries(keywords).forEach(([cat, words]) => {
    words.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = bodyText.match(regex);
      if (matches) keywordScores[cat as keyof typeof keywordScores] += matches.length;
    });
  });

  return {
    url, origin, finalUrl, title, description, ogType, ogTitle, ogDescription, ogImage,
    jsonLdTypes, links, routeSignals, ctaTexts, keywordScores, bodyText
  };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Maximum 3 scans per minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Single fetch: scanWebsite returns checks + pageBody (no double-fetch)
    const scanResult = await scanWebsite(url);
    const { checks: results, pageBody, origin, finalUrl } = scanResult;
    
    // Classify using the already-fetched page body (zero additional network calls)
    let detectedType = 'GENERIC_COMPANY';
    if (pageBody) {
      try {
        const signals = extractSiteSignals(url, pageBody, origin, finalUrl);
        detectedType = classifyWebsite(signals);
      } catch (err) {
        console.warn('Signal extraction error (using default classification):', err);
      }
    }

    // Option A Balanced Score Breakdown: 40% AI Readiness, 40% SEO & Search Metadata, 20% Technical Security
    const aiCheckIds = new Set(['robots-ai-bots', 'llms-txt', 'schema-jsonld', 'structured-content', 'faq-schema', 'schema-org-general', 'schema-org-faq']);
    const secCheckIds = new Set(['security-headers', 'ssl-certificate', 'security-headers-hsts', 'https-enforcement']);

    const aiChecks = results.filter(r => aiCheckIds.has(r.id));
    const secChecks = results.filter(r => secCheckIds.has(r.id));
    const seoChecks = results.filter(r => !aiCheckIds.has(r.id) && !secCheckIds.has(r.id));

    const calcCategoryScore = (checks: typeof results): number => {
      const totalWeight = checks.reduce((sum, r) => sum + r.weight, 0);
      if (totalWeight === 0) return 0;
      const passedWeight = checks.filter(r => r.passed).reduce((sum, r) => sum + r.weight, 0);
      return passedWeight / totalWeight;
    };

    const aiScore = calcCategoryScore(aiChecks);
    const seoScore = calcCategoryScore(seoChecks);
    const secScore = calcCategoryScore(secChecks);

    const score = Math.round(aiScore * 40 + seoScore * 40 + secScore * 20);

    return NextResponse.json({
      success: true,
      data: {
        results,
        score,
        detectedType,
      },
    });
  } catch (error) {
    console.error('Scan API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to scan website' },
      { status: 500 }
    );
  }
}
