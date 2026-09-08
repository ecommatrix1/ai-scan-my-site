"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Sun, Moon } from "lucide-react";

export default function HubspotVsClient() {
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">AEO GRADER VS</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          AI Scan My Site vs. <br />
          <span className="text-accent">HubSpot AEO Grader</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Comparing AEO grading tools? <strong>AI Scan My Site</strong> not only evaluates your website for ChatGPT, Gemini & Perplexity citation readiness — it generates copy-paste <code className="text-accent font-mono">llms.txt</code> manifests and JSON-LD schema fix code on the spot.
        </p>

        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-accent/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-accent ml-4" />
              <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 bg-transparent border-none text-lg py-3 px-4 font-mono" />
              <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2">
                <span>Run Free AEO Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </section>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — HubSpot AEO Grader Alternative.</p>
      </footer>
    </div>
  );
}
