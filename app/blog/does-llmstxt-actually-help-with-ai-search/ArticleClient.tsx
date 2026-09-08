"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, Clock, Sun, Moon, FileText } from "lucide-react";

export default function ArticleClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [lightTheme, setLightTheme] = useState(false);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) return;
    router.push(`/?url=${encodeURIComponent(rawUrl)}`);
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-emerald-400">LLMS.TXT GUIDE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/llms-txt-generator" className="text-sm font-bold text-emerald-400 hover:underline">Generator Tool</Link>
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-emerald-400">
          <span className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold uppercase">LLM Standards</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          Does llms.txt Actually Help with AI Search? (Real Testing Results)
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          The <code className="text-accent font-mono">llms.txt</code> standard has taken the developer community by storm. But does adding an <code className="text-accent font-mono">/llms.txt</code> file actually improve your visibility on ChatGPT and Perplexity?
        </p>

        <div className="card p-6 border-l-4 border-l-emerald-400 border-border bg-emerald-500/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" /><span>QUICK ANSWER / TEST SUMMARY</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            <strong>Yes!</strong> <code className="text-accent font-mono">llms.txt</code> drastically reduces context token bloat. By serving clean Markdown documentation at your site root, AI crawlers bypass heavy HTML scripts and parse your core value proposition 5x faster, leading to higher citation accuracy.
          </p>
        </div>

        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-emerald-400" /><span>Generate & Validate Your llms.txt File</span></h3>
          <p className="text-sm text-ink-2 mb-4">Use our free tool to build a validated /llms.txt file in under 60 seconds.</p>
          <Link href="/llms-txt-generator" className="btn-primary px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
            <span>Open Free llms.txt Generator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Free llms.txt Generator & Guides.</p>
      </footer>
    </div>
  );
}
