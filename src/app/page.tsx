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

  // Theme state: dark mode default, toggleable to light mode
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Email offer modal / banner states
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Copy code state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return theme === "dark" ? "text-emerald-400 bg-emerald-950/40 border-emerald-800" : "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 60) return theme === "dark" ? "text-amber-400 bg-amber-950/40 border-amber-800" : "text-amber-700 bg-amber-50 border-amber-200";
    return theme === "dark" ? "text-rose-400 bg-rose-950/40 border-rose-800" : "text-rose-700 bg-rose-50 border-rose-200";
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Top Banner - Limited Time Offer */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center space-x-2 shadow-md">
        <span>🔥 LIMITED TIME OFFER:</span>
        <span>Claim Unlimited Daily AI Scans & PDF Audits free for early adopters!</span>
      </div>

      {/* Header */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur ${
        isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white/80"
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              AI Scan My Site
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <nav className={`hidden sm:flex space-x-6 text-sm font-medium ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}>
              <a href="#demo" className="hover:text-blue-500 transition">Live Scanner</a>
              <a href="#offer" className="hover:text-blue-500 transition">Unlimited Access</a>
              <a href="#features" className="hover:text-blue-500 transition">Features</a>
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-xl text-xs font-semibold border transition flex items-center space-x-1.5 ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700"
                  : "bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300"
              }`}
              title="Toggle Light/Dark Theme"
            >
              <span>{isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 flex flex-col items-center">

        {/* Hero Section */}
        <div id="demo" className="text-center max-w-3xl mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            <span>✨ Free Instant Site Audit</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Instant AI Audits & <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">One-Click Code Fixes</span>
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Scan SEO, performance, accessibility, and security in seconds. Get ready-to-use AI code fixes.
          </p>
        </div>

        {/* URL Scanner Input Form */}
        <div className={`w-full max-w-2xl border rounded-2xl p-4 sm:p-6 shadow-xl mb-10 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter your website URL (e.g. example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Analyzing Site...</span>
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
            <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Limited Time Email Offer Banner Card */}
        <div id="offer" className={`w-full max-w-2xl border rounded-2xl p-6 shadow-md mb-10 text-center relative overflow-hidden ${
          isDark ? "bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-500/30" : "bg-gradient-to-b from-indigo-50 to-white border-indigo-200"
        }`}>
          <div className="inline-block bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase px-3 py-1 rounded-full mb-3">
            Limited Time Active Offer
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            Unlock <span className="text-indigo-500">Unlimited Daily Scans</span> & AI Alert Reports
          </h2>
          <p className={`text-xs sm:text-sm mb-4 max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Activate free unlimited website scans and weekly automated AI health reports by entering your email.
          </p>

          {emailSubmitted ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm font-medium">
              🎉 Success! Unlimited scans & weekly reports activated for <span className="font-bold">{email}</span>.
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition"
              >
                Claim Free Unlimited
              </button>
            </form>
          )}
        </div>

        {/* Scan Results Dashboard */}
        {result && (
          <div className="w-full space-y-8">
            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.scores).map(([metric, score]) => (
                <div key={metric} className={`p-5 rounded-2xl border flex flex-col items-center justify-center shadow-sm ${getScoreColor(score)}`}>
                  <span className="text-3xl font-black">{score}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-80">{metric}</span>
                </div>
              ))}
            </div>

            {/* AI Executive Summary */}
            <div className={`border rounded-2xl p-6 ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <h2 className={`text-lg font-bold mb-2 flex items-center space-x-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                <span>🤖</span>
                <span>AI Audit Executive Summary</span>
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {result.summary}
              </p>
            </div>

            {/* Recommendations & Fixes */}
            <div className={`border rounded-2xl p-6 space-y-4 ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <h2 className={`text-lg font-bold flex items-center space-x-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                <span>🛠️</span>
                <span>Recommended Fixes & AI Code Solutions</span>
              </h2>

              <div className="space-y-4">
                {result.recommendations.map((item, index) => (
                  <div key={index} className={`border rounded-xl p-4 space-y-3 ${
                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {item.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        item.impact === "High" ? "bg-rose-500/20 text-rose-500" :
                        item.impact === "Medium" ? "bg-amber-500/20 text-amber-500" : "bg-slate-800 text-slate-400"
                      }`}>
                        {item.impact} Impact
                      </span>
                    </div>

                    <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                      {item.issue}
                    </p>

                    {item.fixCode && (
                      <div className={`border rounded-lg p-3 text-xs font-mono relative overflow-x-auto ${
                        isDark ? "bg-slate-900 border-slate-800 text-emerald-400" : "bg-slate-900 border-slate-800 text-emerald-400"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-500 text-[10px] uppercase tracking-wider">AI Generated Fix</span>
                          {/* 1-Click Copy Button */}
                          <button
                            onClick={() => copyToClipboard(item.fixCode!, index)}
                            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition"
                          >
                            {copiedIndex === index ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre><code>{item.fixCode}</code></pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Highlights */}
        {!result && (
          <div id="features" className="w-full grid md:grid-cols-3 gap-6 my-6">
            <div className={`border rounded-xl p-5 text-center space-y-2 ${
              isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-2xl mb-1">⚡</div>
              <h3 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Instant SEO Audit</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>Find performance bottlenecks and ranking issues in seconds.</p>
            </div>
            <div className={`border rounded-xl p-5 text-center space-y-2 ${
              isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-2xl mb-1">📋</div>
              <h3 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Copy-Paste Code Fixes</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>Get copy-pasteable React, HTML, and Next.js fixes automatically.</p>
            </div>
            <div className={`border rounded-xl p-5 text-center space-y-2 ${
              isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="text-2xl mb-1">✉️</div>
              <h3 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Weekly Email Alerts</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>Get automated site health updates sent straight to your inbox.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs ${
        isDark ? "border-slate-800 text-slate-500 bg-slate-950" : "border-slate-200 text-slate-500 bg-slate-100"
      }`}>
        © {new Date().getFullYear()} AI Scan My Site. Built for viral growth & instant web audits.
      </footer>
    </div>
  );
}
