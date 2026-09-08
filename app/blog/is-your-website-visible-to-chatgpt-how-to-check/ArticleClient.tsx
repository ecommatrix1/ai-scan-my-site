"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Clock, Sun, Moon } from "lucide-react";

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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">AI VISIBILITY CHECK</span>
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">AI Search Diagnostic</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 4 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          Is Your Website Visible to ChatGPT? Here's How to Check
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          Over 200 million users ask ChatGPT for recommendations, software tools, and answers every week. If your site isn't visible to AI crawlers, you are missing out on thousands of potential leads. Here is how to test your AI search visibility.
        </p>

        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /><span>QUICK DIAGNOSTIC SUMMARY</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            To test if ChatGPT can see your website: <strong>1) Test GPTBot crawler status</strong> in robots.txt, <strong>2) Check for /llms.txt manifest</strong>, <strong>3) Validate JSON-LD Schema</strong>, and <strong>4) Run an automated AI URL audit</strong> to verify real-time citation readiness.
          </p>
        </div>

        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-accent" /><span>Run Instant AI Visibility Audit</span></h3>
          <p className="text-sm text-ink-2 mb-4">Enter your website URL below to get a complete score on ChatGPT, Gemini, and Perplexity readiness.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl" />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0"><span>Check ChatGPT Visibility</span><ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">3 Simple Steps to Verify Your ChatGPT Visibility</h2>
          <h3 className="text-xl font-heading font-bold text-ink mt-6 mb-2">Step 1: Check Your <code className="text-accent font-mono">robots.txt</code> Rules</h3>
          <p>Navigate to <code className="text-accent font-mono">https://yourwebsite.com/robots.txt</code>. Look for <code className="text-accent font-mono">User-agent: GPTBot</code> or <code className="text-accent font-mono">User-agent: ChatGPT-User</code>. Ensure they are not set to <code className="text-danger font-mono">Disallow: /</code>.</p>
          
          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Step 2: Verify Your Machine-Readable Manifests</h3>
          <p>Check if your site serves an <code className="text-accent font-mono">/llms.txt</code> file. This file provides AI search engines with clean Markdown text, eliminating HTML layout bloat.</p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Step 3: Test Real-Time Prompt Retrieval</h3>
          <p>Open ChatGPT and enter a query like: <em>"What are the top features of [Your Product Name]?"</em> If ChatGPT responds with hallucinations or fails to link your domain, your site requires AEO optimization.</p>
        </div>
      </article>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — AI Search Visibility Guides.</p>
      </footer>
    </div>
  );
}
