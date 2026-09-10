"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Clock, Sun, Moon } from "lucide-react";

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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">AEO EXPLAINED</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/aeo-checker" className="text-sm font-bold text-accent hover:underline">Free AEO Checker</Link>
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">AEO Pillar Guide</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          What Is AEO? SEO vs AEO Explained Without the Jargon
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          Search is changing fast. Millions of searchers no longer type short keywords into Google and browse ten blue links. Instead, they ask conversational questions to ChatGPT, Perplexity, and voice assistants. Welcome to <strong>Answer Engine Optimization (AEO)</strong>.
        </p>

        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /><span>QUICK SUMMARY / DEFINITION</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            <strong>AEO (Answer Engine Optimization)</strong> is the discipline of structuring your website's content and technical data so AI answer engines (ChatGPT, Gemini, Perplexity) can immediately extract your content and present your brand as the single definitive answer.
          </p>
        </div>

        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-accent" /><span>Grade Your Website's AEO Score</span></h3>
          <p className="text-sm text-ink-2 mb-4">Run your domain through our Free AEO Checker to see how answer engines perceive your brand.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl" />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0"><span>Run Free AEO Check</span><ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">SEO vs AEO: What's the Core Difference?</h2>
          <p>Traditional <strong>SEO</strong> asks: <em>"How do I rank #1 for the keyword 'best CRM software'?"</em></p>
          <p><strong>AEO</strong> asks: <em>"When a founder asks ChatGPT 'What CRM should I use for a 5-person agency?', how do I ensure my CRM is recommended with a direct link?"</em></p>
          
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">How to Prepare Your Website for AEO</h2>
          <p>1. <strong>Use Clear Q&A Formats:</strong> Use explicit H2 question headers followed by concise 40-word answers.</p>
          <p>2. <strong>Implement JSON-LD Schema:</strong> Give AI bots machine-readable facts about your organization, author, and products.</p>
          <p>3. <strong>Serve an /llms.txt File:</strong> Help AI crawlers bypass bloated HTML and index clean Markdown summaries.</p>
        </div>
      </article>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Free AEO Checker & Educational Guides.</p>
      </footer>
    </div>
  );
}
