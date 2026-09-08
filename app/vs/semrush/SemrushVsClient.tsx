"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, XCircle, Sun, Moon, ShieldCheck } from "lucide-react";

export default function SemrushVsClient() {
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">TOOL COMPARISON</span>
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

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-accent/10 border border-accent/30 text-accent">
          <span>COMPETITOR COMPARISON</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          AI Scan My Site vs. <br />
          <span className="text-accent">Semrush Free SEO Checker</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Semrush is legendary for keyword databases. But when it comes to checking whether <strong>ChatGPT, Gemini, and Perplexity</strong> can read and cite your platform, legacy SEO tools leave you in the dark.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-accent/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-accent ml-4" />
              <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 bg-transparent border-none text-lg py-3 px-4 font-mono" />
              <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2">
                <span>Run Instant Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-12 border-t border-border bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/60">
                  <th className="p-4 font-mono uppercase text-ink-3 text-xs">Feature Capability</th>
                  <th className="p-4 font-mono uppercase text-ink-3 text-xs">Semrush Site Audit</th>
                  <th className="p-4 font-mono uppercase text-accent text-xs font-bold">AI Scan My Site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-bold text-ink">Instant Access (No Credit Card / Signup Required)</td>
                  <td className="p-4 text-danger flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Requires account creation</td>
                  <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 100% Free Instant Audit</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">AI Search Visibility (ChatGPT, Gemini, Perplexity)</td>
                  <td className="p-4 text-ink-3">Not Evaluated</td>
                  <td className="p-4 text-accent font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Comprehensive AEO / GEO Test</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">llms.txt & agents.json Validation</td>
                  <td className="p-4 text-ink-3">No Manifest Checks</td>
                  <td className="p-4 text-accent font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Native Validation & Generator</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">Traditional Technical SEO & PageSpeed</td>
                  <td className="p-4 text-success flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Deep Technical Crawler</td>
                  <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Google Lighthouse Vitals Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Tool Comparisons.</p>
      </footer>
    </div>
  );
}
