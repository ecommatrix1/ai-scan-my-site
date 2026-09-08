"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Bot,
  Zap,
  Globe,
  ArrowRight,
  Gauge,
  Clock,
  Activity,
  CheckCircle2,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";

export default function SpeedTestClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightTheme, setLightTheme] = useState(false);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) {
      setInputError("Please enter a website URL to run your free speed test.");
      return;
    }
    router.push(`/?url=${encodeURIComponent(rawUrl)}`);
  };

  const vitals = [
    {
      metric: "LCP",
      full: "Largest Contentful Paint",
      target: "< 2.5s",
      desc: "Measures loading performance. Marks when the main content block has loaded."
    },
    {
      metric: "INP",
      full: "Interaction to Next Paint",
      target: "< 200ms",
      desc: "Measures overall page responsiveness to user clicks, taps, and keyboard inputs."
    },
    {
      metric: "CLS",
      full: "Cumulative Layout Shift",
      target: "< 0.1",
      desc: "Measures visual stability. Prevents annoying content jumps during page render."
    },
    {
      metric: "FCP",
      full: "First Contentful Paint",
      target: "< 1.8s",
      desc: "Marks the time at which the first text, image, or non-white element renders."
    },
    {
      metric: "TTFB",
      full: "Time to First Byte",
      target: "< 800ms",
      desc: "Measures web server responsiveness and initial HTTP network latency."
    },
    {
      metric: "PSI Score",
      full: "Google Lighthouse Metric",
      target: "90 - 100",
      desc: "Aggregated performance score calculated by official Google Lighthouse rules."
    }
  ];

  const faqs = [
    {
      q: "What is a Website Speed Test?",
      a: "A Website Speed Test measures how quickly your web pages load, render text and images, respond to user inputs, and process HTTP network requests."
    },
    {
      q: "Why do Core Web Vitals matter for SEO and AI Search?",
      a: "Google uses Core Web Vitals as an official ranking factor. Furthermore, fast-loading sites allow AI web crawlers (like GPTBot and Perplexity) to fetch and index your content before timing out."
    },
    {
      q: "How does AI Scan My Site test page speed?",
      a: "We connect to the official Google PageSpeed Insights Lighthouse API v11 to measure live mobile and desktop viewport performance metrics."
    },
    {
      q: "What is a good PageSpeed score?",
      a: "A score of 90 to 100 is considered Good. 50 to 89 Needs Improvement, and 0 to 49 is Poor. Aiming for LCP under 2.5s and INP under 200ms ensures peak performance."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 antialiased ${!lightTheme ? "bg-cosmic-space bg-cosmic-grid text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* TOP BANNER */}
      <div className="text-center py-3 px-6 bg-gradient-to-r from-amber-900 via-indigo-900 to-amber-900 text-white border-b border-amber-700/50">
        <p className="text-sm font-bold tracking-wide flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>REAL-TIME SPEED TEST: Powered by official Google Lighthouse v11 PageSpeed API!</span>
        </p>
      </div>

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
              <span className="font-heading font-extrabold text-lg tracking-tight">
                AI Scan <span className="text-accent font-black">My Site</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-amber-400">
                PAGESPEED & VITALS TEST
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/aeo-checker" className="text-sm font-bold text-ink-2 hover:text-ink transition-colors">
              AEO Checker
            </Link>
            <Link href="/geo-checker" className="text-sm font-bold text-ink-2 hover:text-ink transition-colors">
              GEO Checker
            </Link>
            <button
              onClick={() => setLightTheme(!lightTheme)}
              className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors"
            >
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link
              href="/"
              className="btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Full AI Audit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Gauge className="w-4 h-4" />
          <span>GOOGLE PAGESPEED INSIGHTS ANALYZER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          Free Website Speed Test & <br />
          <span className="text-accent">PageSpeed Insights Analyzer</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Analyze Core Web Vitals (<strong className="text-ink font-semibold">LCP, INP, CLS, FCP, TTFB</strong>) in real time. Get instant speed scores and performance optimization guides.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-amber-500/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-amber-400 ml-4" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (inputError) setInputError("");
                }}
                placeholder="Enter domain (e.g. yourwebsite.com)"
                className="input flex-1 bg-transparent border-none focus:outline-none text-lg py-3 px-4 font-mono"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2">
                <span>Run Speed Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {inputError && <p className="mt-2 text-sm text-danger font-mono text-left pl-4">{inputError}</p>}
        </form>

        {/* VITALS MATRIX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {vitals.map((v, idx) => (
            <div key={idx} className="card p-6 border border-border bg-surface hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-heading font-extrabold text-amber-400">{v.metric}</span>
                <span className="text-xs font-mono bg-surface-2 px-2 py-0.5 rounded border border-border text-emerald-400 font-bold">Goal: {v.target}</span>
              </div>
              <div className="text-sm font-bold text-ink mb-2">{v.full}</div>
              <p className="text-xs text-ink-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 border-t border-border bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">Page Speed & Vitals FAQs</h2>
            <p className="text-ink-2">Common questions about Google Lighthouse and performance audits.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card border border-border overflow-hidden bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-lg text-ink"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180 text-amber-400" : "text-ink-3"}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-ink-2 border-t border-border/50 bg-surface-2/30 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Free Website Speed Test & PageSpeed Insights Analyzer.</p>
      </footer>
    </div>
  );
}
