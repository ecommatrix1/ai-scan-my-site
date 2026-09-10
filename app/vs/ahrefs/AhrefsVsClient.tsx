"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, XCircle, Sun, Moon, Shield, Activity, FileText, RefreshCw } from "lucide-react";
import { GooglePreferredTrustBlock } from "@/components/GooglePreferredTrustBlock";

export default function AhrefsVsClient() {
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
              <span className="font-heading font-extrabold text-lg tracking-tight">AI Scan <span className="text-accent font-black">My Site</span></span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">AHREFS ALTERNATIVE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link href="/" className="btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /><span>Run Free Scan</span></Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-accent/10 border border-accent/30 text-accent">
          <span>COMPETITOR COMPARISON • 2026 EDITION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          AI Scan My Site vs. <br />
          <span className="text-accent">Ahrefs Webmaster Tools</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Ahrefs is built for domain rating and backlink graphs. But AI Search engines (like ChatGPT, Perplexity, and Claude) don't care about backlink volume alone — they require <strong>machine-readable structured data and llms.txt manifests</strong>.
        </p>

        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-accent/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-accent ml-4" />
              <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 bg-transparent border-none text-lg py-3 px-4 font-mono" />
              <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2">
                <span>Run Free AI Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* DETAILED FEATURE COMPARISON TABLE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ink mb-3">
            Side-by-Side Feature Comparison
          </h2>
          <p className="text-sm sm:text-base text-ink-2 max-w-2xl mx-auto">
            Compare AI readiness auditing against traditional desktop backlink checking.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-subtle/80">
                <th className="p-4 font-mono text-xs text-ink-3 uppercase">Feature</th>
                <th className="p-4 font-heading font-bold text-accent text-base">AI Scan My Site</th>
                <th className="p-4 font-heading font-bold text-ink-2 text-base">Ahrefs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-4 font-medium text-ink">AI Crawler Access Inspection (GPTBot, ClaudeBot)</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Dedicated 100% Free</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">llms.txt &amp; agents.json Manifest Builder</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Built-in 1-Click Generator</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">AEO &amp; GEO Generative Search Readiness</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 3-Pillar Readiness Score</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Not Available</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">Google PageSpeed API Core Web Vitals</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Real-time Official PSI</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-warning" /> Basic Custom Crawler</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">JSON-LD Schema Auto-Fix Builder</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Instant Copy-Paste Code</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Manual Fix Needed</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">Free Daily Scan Access</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 100% Free (No Credit Card)</td>
                <td className="p-4 text-ink-3">Requires Paid Plan ($99+/mo)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8K COMPARISON MOCKUP SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-hidden rounded-3xl border-2 border-accent/40 shadow-2xl bg-surface p-2">
          <img
            src="/screenshots/vs-ahrefs-comparison.jpg"
            alt="AI Scan My Site vs Ahrefs Webmaster Tools 8K feature comparison card"
            className="w-full h-auto object-cover rounded-2xl hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      </section>

      {/* PRODUCT SCREENSHOT SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ink mb-3">
            Real Product UI Showcase
          </h2>
          <p className="text-sm sm:text-base text-ink-2 max-w-2xl mx-auto">
            See how AI Scan My Site inspects AI readiness vs. legacy backlink crawlers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4 border-accent/30 bg-surface shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-mono font-bold text-ink">AI Vulnerability Dashboard</span>
              <span className="text-xs font-mono font-bold text-success">Live Score</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src="/screenshots/ai-vulnerability-dashboard.png"
                alt="AI Scan My Site dashboard displaying 100/100 readiness score and 3-pillar breakdown"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="card p-4 border-accent/30 bg-surface shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-mono font-bold text-ink">Google PageSpeed Insights Diagnostic</span>
              <span className="text-xs font-mono font-bold text-accent">Real-Time Vitals</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src="/screenshots/pagespeed-core-vitals.png"
                alt="Google PageSpeed Insights Core Web Vitals diagnostic displaying LCP, CLS, and PSI scores"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink">
            Why Modern Website Owners Choose AI Scan My Site Over Ahrefs
          </h2>
          <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
            While Ahrefs excels at tracking domain authority and backlink graphs for traditional Google SERPs, it provides zero visibility into conversational AI search engines. When prospective buyers ask ChatGPT, Perplexity, or Claude for vendor recommendations, domain ratings do not guarantee inclusion.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
              <Shield className="w-6 h-6 text-accent mb-2" />
              <h3 className="font-heading font-bold text-ink text-base">AI Crawler Permissions</h3>
              <p className="text-xs text-ink-3 leading-relaxed">Instantly verify if GPTBot, ClaudeBot, and PerplexityBot are permitted in your robots.txt file.</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
              <FileText className="w-6 h-6 text-success mb-2" />
              <h3 className="font-heading font-bold text-ink text-base">Machine-Readable Context</h3>
              <p className="text-xs text-ink-3 leading-relaxed">Generate lightweight /llms.txt markdown context manifests tailored for LLM indexing.</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
              <Activity className="w-6 h-6 text-warning mb-2" />
              <h3 className="font-heading font-bold text-ink text-base">Instant Fix Reports</h3>
              <p className="text-xs text-ink-3 leading-relaxed">Download 1-click text fix guides with copy-paste code snippets for your developers.</p>
            </div>
          </div>
        </div>

        {/* OFFICIAL GOOGLE PREFERRED SOURCE TRUST BLOCK */}
        <div className="pt-8">
          <GooglePreferredTrustBlock />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Ahrefs Alternative &amp; Comparison.</p>
      </footer>
    </div>
  );
}
