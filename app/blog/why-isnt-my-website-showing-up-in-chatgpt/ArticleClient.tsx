"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Globe,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Terminal,
  ShieldAlert,
  Clock,
  Share2,
  Sun,
  Moon
} from "lucide-react";

export default function ArticleClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [lightTheme, setLightTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "light" : false;
    }
    return false;
  });

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) return;
    const themeStr = lightTheme ? "light" : "dark";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeStr);
    }
    router.push(`/?url=${encodeURIComponent(rawUrl)}&theme=${themeStr}&autostart=true`);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 antialiased ${!lightTheme ? "bg-cosmic-space bg-cosmic-grid text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-surface/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-accent p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-lg bg-surface flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-tight">
                AI Scan <span className="text-accent font-black">My Site</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">
                AI SEO & AEO BLOG
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/aeo-checker" className="text-sm font-bold text-ink-2 hover:text-ink transition-colors">
              AEO Checker
            </Link>
            <button
              onClick={() => setLightTheme(!lightTheme)}
              className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors"
            >
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link
              href="/"
              className="btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Run Free Scan</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN ARTICLE BODY */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* CATEGORY & METADATA */}
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">AI Search Troubleshooting</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 Min Read</span>
          <span className="text-ink-3">Published Sept 8, 2026</span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          Why Isn't My Website Showing Up in ChatGPT? (And How to Fix It)
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          You search your business on Google. You're right there on Page 1. Then you ask ChatGPT a question a customer would ask... and your competitor appears while your website is nowhere to be found. What happened?
        </p>

        {/* FEATURED SNIPPET / QUICK ANSWER BOX */}
        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span>QUICK ANSWER / DIAGNOSTIC SUMMARY</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            If your website isn't showing up in ChatGPT or Perplexity, check four things first: <strong>1) AI Crawler Access</strong> (ensure <code className="text-accent bg-surface-2 px-1 rounded font-mono">GPTBot</code> isn't blocked in your <code className="text-accent bg-surface-2 px-1 rounded font-mono">robots.txt</code>), <strong>2) Machine-Readable Manifests</strong> (add a root <code className="text-accent bg-surface-2 px-1 rounded font-mono">/llms.txt</code> file), <strong>3) Structured Entity Data</strong> (add JSON-LD Schema.org markup), and <strong>4) Concise Direct-Answer Paragraphs</strong>.
          </p>
        </div>

        {/* EMBEDDED AUDIT INPUT WIDGET */}
        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            <span>Test Your Website in 10 Seconds</span>
          </h3>
          <p className="text-sm text-ink-2 mb-4">Run your domain through our free AI SEO Checker to identify why AI crawlers might be skipping your website.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter domain (e.g. yourwebsite.com)"
              className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl"
            />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0">
              <span>Scan Now Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* ARTICLE SECTION 1 */}
        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">
            Why Traditional Google SEO Doesn't Guarantee ChatGPT Visibility
          </h2>
          <p>
            Traditional Google SEO focuses on keywords, backlink counts, and metadata tags designed to render a list of ten blue links. But AI models like <strong>ChatGPT, Gemini, and Perplexity</strong> don't return ten links — they synthesize a single, direct answer.
          </p>
          <p>
            When an AI search engine answers a user's question, its web crawler (<code className="text-accent font-mono">GPTBot</code> or <code className="text-accent font-mono">PerplexityBot</code>) visits the web to find <em>trustworthy, machine-readable, factual assertions</em>. If your site blocks these bots or hides content behind complex client-side JavaScript, the AI simply skips your domain and cites your competitor.
          </p>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">
            4 Reasons ChatGPT Isn't Citing Your Website (And How to Fix Them)
          </h2>

          <h3 className="text-xl font-heading font-bold text-ink mt-6 mb-2">
            1. Your <code className="text-accent font-mono">robots.txt</code> File Is Blocking GPTBot
          </h3>
          <p>
            Many web hosts and Cloudflare security rules automatically block AI crawlers by default to prevent web scraping. If your <code className="text-accent font-mono">robots.txt</code> contains the following lines, ChatGPT is strictly forbidden from visiting your website:
          </p>

          <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs text-danger leading-relaxed">
            User-agent: GPTBot<br />
            Disallow: /
          </div>

          <p className="text-sm">
            <strong>The Fix:</strong> Open your <code className="text-accent font-mono">robots.txt</code> file and ensure <code className="text-accent font-mono">GPTBot</code> and <code className="text-accent font-mono">PerplexityBot</code> are allowed to crawl your public pages:
          </p>

          <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs text-success leading-relaxed">
            User-agent: GPTBot<br />
            Allow: /<br /><br />
            User-agent: PerplexityBot<br />
            Allow: /
          </div>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">
            2. Missing <code className="text-accent font-mono">/llms.txt</code> Manifest File
          </h3>
          <p>
            AI search engines are constrained by token limits and crawler speed. Hifting through 100kb of HTML, navigation menus, CSS stylesheets, and scripts wastes AI crawler budget.
          </p>
          <p>
            By adding a plain-text <code className="text-accent font-mono">/llms.txt</code> file to your root domain (e.g. <code className="text-accent font-mono">https://yourwebsite.com/llms.txt</code>), you provide AI agents with a clean Markdown map of your essential documentation and product pages.
          </p>
          <p className="text-sm font-semibold text-accent">
            👉 You can generate a free <code className="text-accent font-mono">llms.txt</code> file using our <Link href="/llms-txt-generator" className="underline font-bold">Free llms.txt Generator Tool</Link>.
          </p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">
            3. Lack of Structured Schema.org (JSON-LD) Entity Markup
          </h3>
          <p>
            Large Language Models use Knowledge Graphs to connect real-world entities (companies, products, prices, authors). Plain HTML text can be ambiguous. JSON-LD structured data provides explicit, machine-readable facts.
          </p>
          <p>
            If your site lacks <code className="text-accent font-mono">Organization</code>, <code className="text-accent font-mono">Product</code>, or <code className="text-accent font-mono">SoftwareApplication</code> Schema.org tags, ChatGPT cannot confidently verify your business details.
          </p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">
            4. Content Isn't Formatted for Direct Extraction
          </h3>
          <p>
            AI engines look for direct, concise answers under headings. If your core articles start with 500 words of background fluff before answering the title question, AI summarizers skip over it.
          </p>
          <p>
            <strong>The Fix:</strong> Always place a 40-50 word direct answer summary immediately after an <code className="text-accent font-mono">&lt;h2&gt;</code> heading. This makes it effortless for ChatGPT and Google AI Overviews to extract your words as a direct quote.
          </p>
        </div>

        {/* BOTTOM CTA CARD */}
        <div className="mt-16 card p-8 border border-accent/40 bg-gradient-to-b from-surface to-background text-center rounded-3xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3">Check Your Website's AI Visibility Free</h2>
          <p className="text-sm sm:text-base text-ink-2 max-w-xl mx-auto mb-6">
            Run an instant audit to test your robots.txt, Schema.org tags, llms.txt, and live ChatGPT/Perplexity citation status.
          </p>
          <Link href="/" className="btn-primary px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            <span>Run Free AI SEO Scan Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — AI SEO & Answer Engine Optimization Guides.</p>
      </footer>
    </div>
  );
}
