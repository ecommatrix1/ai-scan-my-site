"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Clock, Sun, Moon, ShieldCheck, FileText, Code2, Gauge, Search, Sparkles } from "lucide-react";

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
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-surface/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-accent p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-lg bg-surface flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-tight">AI Scan <span className="text-accent font-black">My Site</span></span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">TECHNICAL GUIDE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">5-Step Technical Checklist</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 7 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          How to Run a Complete Website Audit in 5 Steps (2026 Guide)
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          Traditional SEO audits only measure desktop performance and legacy backlinks. In 2026, a comprehensive <strong>website audit</strong> must inspect AI crawler permissions, <code className="text-accent font-mono">llms.txt</code> manifests, JSON-LD Schema graphs, and Core Web Vitals.
        </p>

        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /><span>QUICK AUDIT TOOL</span>
          </div>
          <p className="text-sm text-ink-2 mb-4">Want to run an automated 43-point audit right now without manual code checks?</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl" />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2">
              <span>Audit Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="space-y-10 text-ink-2 leading-relaxed">
          {/* Step 1 */}
          <section className="card p-6 sm:p-8 border border-border bg-surface rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-extrabold text-lg flex items-center justify-center">1</div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink">Check AI Crawler Permissibility in <code className="text-accent font-mono">robots.txt</code></h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              The first step of any modern audit is ensuring search engines and AI answer engines can access your pages. Check your <code className="text-accent font-mono">/robots.txt</code> file for explicit block rules affecting major AI agents:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li><strong>GPTBot</strong> (OpenAI Web Crawler)</li>
              <li><strong>ChatGPT-User</strong> (Real-time user browsing)</li>
              <li><strong>PerplexityBot</strong> (Perplexity AI Search)</li>
              <li><strong>ClaudeBot</strong> (Anthropic Claude AI)</li>
              <li><strong>Google-Extended</strong> (Google Gemini AI overviews)</li>
            </ul>
          </section>

          {/* Step 2 */}
          <section className="card p-6 sm:p-8 border border-border bg-surface rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-extrabold text-lg flex items-center justify-center">2</div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink">Validate Machine Context Manifest (<code className="text-accent font-mono">llms.txt</code>)</h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              <code className="text-accent font-mono">/llms.txt</code> is the web standard for Large Language Model indexing. It provides direct markdown summaries of your core services, APIs, and key pages so LLMs cite your brand accurately.
            </p>
            <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs text-ink-2">
              <p className="text-accent font-bold"># Example llms.txt entry</p>
              <p># Domain: yourwebsite.com</p>
              <p>&gt; Free AI SEO audit tool and website grader.</p>
            </div>
          </section>

          {/* Step 3 */}
          <section className="card p-6 sm:p-8 border border-border bg-surface rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-extrabold text-lg flex items-center justify-center">3</div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink">Audit JSON-LD Schema Entity Graphs</h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              Verify that your homepage and key landing pages contain validated <code className="text-accent font-mono">application/ld+json</code> blocks for Organization, WebSite, and WebApplication entities.
            </p>
          </section>

          {/* Step 4 */}
          <section className="card p-6 sm:p-8 border border-border bg-surface rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-extrabold text-lg flex items-center justify-center">4</div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink">Measure Core Web Vitals & PageSpeed</h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              Performance directly impacts rankings. Test Largest Contentful Paint (LCP &lt; 2.5s), Interaction to Next Paint (INP &lt; 200ms), and Cumulative Layout Shift (CLS &lt; 0.1).
            </p>
          </section>

          {/* Step 5 */}
          <section className="card p-6 sm:p-8 border border-border bg-surface rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-extrabold text-lg flex items-center justify-center">5</div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-ink">Fix Technical On-Page & Vision AI Gaps</h2>
            </div>
            <p className="text-sm sm:text-base mb-4">
              Ensure every image has descriptive alt text for Vision AI models, canonical tags match, open graph social tags are set, and meta titles/descriptions target target commercial terms.
            </p>
          </section>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-accent/20 via-surface-2 to-surface border border-accent/40 text-center">
          <h3 className="text-2xl font-heading font-extrabold text-ink mb-2">Run Your 5-Step Audit Automatically</h3>
          <p className="text-sm text-ink-2 mb-6 max-w-xl mx-auto">Get an instant 43-point audit report with copy-paste code fixes for robots.txt, llms.txt, and Schema markup.</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold shadow-xl shadow-accent/25 hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5" />
            <span>Launch Free Website Audit</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
