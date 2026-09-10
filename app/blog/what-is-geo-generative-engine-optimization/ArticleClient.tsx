"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Clock, Sun, Moon, Cpu } from "lucide-react";

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
              <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-400">GEO GUIDE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/geo-checker" className="text-sm font-bold text-cyan-400 hover:underline">Free GEO Checker</Link>
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-cyan-400">
          <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full font-bold uppercase">GEO Pillar Guide</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          What Is GEO? Generative Engine Optimization Guide for Website Owners
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          Why are website owners suddenly talking about <strong>GEO (Generative Engine Optimization)</strong>? Because Google AI Overviews and ChatGPT Search now generate synthetic answers by pulling data from multiple websites simultaneously.
        </p>

        <div className="card p-6 border-l-4 border-l-cyan-400 border-border bg-cyan-500/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-cyan-400 font-bold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /><span>DEFINITION / QUICK SUMMARY</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            <strong>GEO (Generative Engine Optimization)</strong> is the strategy of structuring content, statistics, entity schema, and technical access so generative AI models choose your website as a primary cited source when generating multi-source answers.
          </p>
        </div>

        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" /><span>Audit Your Website's GEO Score</span></h3>
          <p className="text-sm text-ink-2 mb-4">Run your domain through our Free GEO Checker to evaluate citation readiness and generative search signals.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl" />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0"><span>Run Free GEO Audit</span><ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">How Generative AI Chooses Its Sources</h2>
          <p>Generative AI engines don't just pick page 1 links. They analyze web content for <strong>citation signals</strong>: extractable facts, structured JSON-LD entity graphs, clear statistical assertions, and clean Markdown text.</p>
          
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">Key Strategies to Increase Your GEO Score</h2>
          <p>1. <strong>Include Quotable Data:</strong> Add specific percentages, study results, and factual data points.</p>
          <p>2. <strong>Serve Machine-Readable Manifests:</strong> Add an <code className="text-accent font-mono">/llms.txt</code> file in your site root.</p>
          <p>3. <strong>Clear Entity Relationships:</strong> Use Schema.org JSON-LD tags to declare your Organization, Product, and Author details.</p>
        </div>
      </article>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Generative Engine Optimization Guides.</p>
      </footer>
    </div>
  );
}
