"use client";

import { useState } from "react";

interface ScanResult {
  url: string;
  timestamp: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    security: number;
  };
  summary: string;
  recommendations: Array<{
    category: string;
    issue: string;
    impact: "High" | "Medium" | "Low";
    fixCode?: string;
  }>;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to analyze site");
      }
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400";
    return "text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              AI Scan My Site
            </span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#demo" className="hover:text-white transition">Live Scanner</a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 flex flex-col items-center">
        {/* Hero Section */}
        <div id="demo" className="text-center max-w-3xl mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            <span>✨ Powered by Next-Gen AI Audits</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Instant AI Audits & <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">One-Click Code Fixes</span>
          </h1>
          <p className="text-lg text-slate-400">
            Analyze SEO, performance, accessibility, and security in seconds. Receive AI-generated code snippets to fix issues automatically.
          </p>
        </div>

        {/* URL Scanner Form */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl mb-12">
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter your website URL (e.g. example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition text-sm flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Scanning Site...</span>
                </>
              ) : (
                <>
                  <span>Run AI Scan</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Scan Results Dashboard */}
        {result && (
          <div className="w-full space-y-8 animate-fade-in">
            {/* Score Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.scores).map(([metric, score]) => (
                <div key={metric} className={`p-5 rounded-2xl border flex flex-col items-center justify-center ${getScoreColor(score)}`}>
                  <span className="text-3xl font-black">{score}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-80">{metric}</span>
                </div>
              ))}
            </div>

            {/* AI Executive Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
                <span>🤖</span>
                <span>AI Audit Summary</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* Recommendations & Fixes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>🛠️</span>
                <span>Recommended Fixes & AI Code Solutions</span>
              </h2>

              <div className="space-y-4">
                {result.recommendations.map((item, index) => (
                  <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        item.impact === "High" ? "bg-rose-500/20 text-rose-400" :
                        item.impact === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-400"
                      }`}>
                        {item.impact} Impact
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 font-medium">{item.issue}</p>

                    {item.fixCode && (
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">AI Generated Code Fix</div>
                        <pre><code>{item.fixCode}</code></pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        {!result && (
          <div id="features" className="w-full grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center space-y-2">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-white">Instant SEO Audit</h3>
              <p className="text-xs text-slate-400">Discover performance bottlenecks and ranking factors in seconds.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center space-y-2">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold text-white">Auto Code Snippets</h3>
              <p className="text-xs text-slate-400">Get copy-pasteable React, HTML, and Next.js fixes generated automatically.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center space-y-2">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-white">Revenue Lead Magnet</h3>
              <p className="text-xs text-slate-400">Generate viral growth and turn site visitors into paying subscribers.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AI Scan My Site. All rights reserved.
      </footer>
    </div>
  );
}
