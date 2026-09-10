"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, XCircle, Sun, Moon, Shield, Activity, FileText } from "lucide-react";
import { GooglePreferredTrustBlock } from "@/components/GooglePreferredTrustBlock";

export default function ScreamingFrogVsClient() {
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">SCREAMING FROG COMPARISON</span>
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
          <span className="text-accent">Screaming Frog SEO Spider</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Screaming Frog requires desktop software downloads and complex technical setups. <strong>AI Scan My Site</strong> is 100% cloud-based, zero-install, and specifically tests AI readiness for ChatGPT, Gemini &amp; Perplexity.
        </p>

        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-accent/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-accent ml-4" />
              <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 bg-transparent border-none text-lg py-3 px-4 font-mono" />
              <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2">
                <span>Run Instant Cloud Audit</span>
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
            Feature Comparison Matrix
          </h2>
          <p className="text-sm sm:text-base text-ink-2 max-w-2xl mx-auto">
            Cloud-based AI readiness scanning vs. desktop spider crawling.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-subtle/80">
                <th className="p-4 font-mono text-xs text-ink-3 uppercase">Feature</th>
                <th className="p-4 font-heading font-bold text-accent text-base">AI Scan My Site</th>
                <th className="p-4 font-heading font-bold text-ink-2 text-base">Screaming Frog</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-4 font-medium text-ink">Installation Required</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 0% Install (100% Web Cloud)</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Desktop App Download Required</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">AI Crawler Access Checks (GPTBot, ClaudeBot)</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Automated User-Agent Diagnostic</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Manual Custom User-Agent Setup</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">llms.txt Context File Builder</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 1-Click Manifest Generator</td>
                <td className="p-4 text-ink-3 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-danger" /> Not Supported</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">Google PageSpeed API Integration</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Native PSI API Vitals</td>
                <td className="p-4 text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-warning" /> API Key Config Needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8K COMPARISON MOCKUP SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-hidden rounded-3xl border-2 border-accent/40 shadow-2xl bg-surface p-2">
          <img
            src="/screenshots/vs-screaming-frog-comparison.jpg"
            alt="AI Scan My Site vs Screaming Frog SEO Spider 8K feature comparison card"
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
            Clean cloud interface vs. complex desktop spreadsheet grids.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-4 border-accent/30 bg-surface shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-mono font-bold text-ink">llms.txt Generator &amp; Manifest Builder</span>
              <span className="text-xs font-mono font-bold text-accent">AI Context Feed</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src="/screenshots/llmstxt-generator-manifest.png"
                alt="Free llms.txt and agents.json generator interface creating machine-readable AI context manifests"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="card p-4 border-accent/30 bg-surface shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-mono font-bold text-ink">Full System Overview Dashboard</span>
              <span className="text-xs font-mono font-bold text-success">Verified Audit Proof</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src="/screenshots/full-system-overview.png"
                alt="AI Scan My Site full system overview dashboard displaying technical discovery and core vitals"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* OFFICIAL GOOGLE PREFERRED SOURCE TRUST BLOCK */}
        <div className="pt-8 max-w-4xl mx-auto">
          <GooglePreferredTrustBlock />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Cloud Screaming Frog Alternative.</p>
      </footer>
    </div>
  );
}
