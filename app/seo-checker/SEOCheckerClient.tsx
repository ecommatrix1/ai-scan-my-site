"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  Zap,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Brain,
  FileText,
  ChevronDown,
  Sun,
  Moon,
  BarChart3,
  Bot
} from "lucide-react";

export default function SEOCheckerClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightTheme, setLightTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "light" : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", lightTheme ? "light" : "dark");
      if (lightTheme) document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
      localStorage.setItem("theme", lightTheme ? "light" : "dark");
    }
  }, [lightTheme]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) {
      setInputError("Please enter a valid website URL to run your free AI SEO audit.");
      return;
    }
    const themeStr = lightTheme ? "light" : "dark";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeStr);
    }
    router.push(`/?url=${encodeURIComponent(rawUrl)}&theme=${themeStr}&tool=seo-checker&autostart=true`);
  };

  const faqs = [
    {
      q: "What is an AI SEO Checker?",
      a: "An AI SEO Checker evaluates your website against both traditional Google search ranking factors and modern artificial intelligence engines (like ChatGPT, Gemini, Claude, and Perplexity). It inspects technical SEO, robots.txt bot rules, schema entity graphs, page speed, and llms.txt context manifests."
    },
    {
      q: "Is this AI SEO audit tool completely free?",
      a: "Yes! AI Scan My Site allows you to run 5 free comprehensive audits every day with zero credit card required. You can also unlock unlimited scans with promo code FREEPRO."
    },
    {
      q: "How does AI SEO differ from traditional SEO?",
      a: "Traditional SEO focuses primarily on keyword density, backlinks, and Google search crawler indexing. AI SEO (and Answer Engine Optimization / AEO) optimizes your site so Large Language Models can crawl, extract, and cite your content directly in AI Overviews and chat answers."
    },
    {
      q: "What technical checks are included in the audit?",
      a: "Our audit covers 12 core technical checks: AI crawler permissions (GPTBot, PerplexityBot, ClaudeBot), llms.txt availability, JSON-LD Schema graphs, Google PageSpeed Core Web Vitals, OpenGraph tags, Image ALT coverage, robots.txt validity, XML sitemaps, and SSL security."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-ink selection:bg-accent selection:text-white font-sans transition-colors duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-emerald-400 p-0.5 shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent" />
              </div>
            </div>
            <span className="font-heading font-extrabold text-lg text-ink tracking-tight">
              AI Scan <span className="text-accent">My Site</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/blog" 
              className="text-xs font-mono text-ink-2 hover:text-ink transition-colors hidden sm:block"
            >
              Blog & Guides
            </Link>
            <button
              onClick={() => setLightTheme(!lightTheme)}
              className="p-2 rounded-xl bg-surface border border-border text-ink-2 hover:text-ink transition-colors"
              aria-label="Toggle theme"
            >
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <Link
              href="/"
              className="btn-primary text-xs px-4 py-2"
            >
              Run Scan Now
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-weak border border-accent/30 text-accent text-xs font-mono font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FREE INSTANT AI SEO &amp; TECHNICAL WEBSITE AUDIT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-ink tracking-tight leading-[1.15] mb-6">
          Free <span className="gradient-text">AI SEO Checker</span> &amp; Technical Website Grader
        </h1>

        <p className="text-base sm:text-lg text-ink-2 max-w-2xl mx-auto leading-relaxed mb-10">
          Check if your website is optimized for both Google Search and AI engines (ChatGPT, Gemini, Perplexity). Inspect robots.txt, schema entity graphs, llms.txt manifests, and PageSpeed in 10 seconds.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-surface border-2 border-accent/40 shadow-xl shadow-accent/10 focus-within:border-accent transition-all">
            <div className="relative flex-1 flex items-center pl-3">
              <Globe className="w-5 h-5 text-ink-3 shrink-0 mr-2" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (inputError) setInputError("");
                }}
                placeholder="Enter website URL (e.g. mysite.com)..."
                className="w-full py-3 bg-transparent text-ink placeholder:text-ink-3 focus:outline-none text-sm font-mono"
              />
            </div>
            <button
              type="submit"
              className="btn-primary py-3 px-8 text-sm font-bold shrink-0 flex items-center justify-center gap-2"
            >
              <span>Scan Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {inputError && (
            <p className="text-xs font-mono text-rose-400 mt-2 text-left pl-2">{inputError}</p>
          )}
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Free Audit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Results</span>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-16 px-4 sm:px-6 bg-surface-2 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight mb-3">
              What Does the Free AI SEO Audit Inspect?
            </h2>
            <p className="text-sm text-ink-2 max-w-xl mx-auto">
              Our 12-point scanner verifies every technical layer necessary for maximum search visibility and AI citation readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 border-border hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent-weak flex items-center justify-center mb-4">
                <Bot className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink mb-2">AI Bot Accessibility</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Verifies whether GPTBot, PerplexityBot, ClaudeBot, and Google-Extended are allowed or blocked in your robots.txt.
              </p>
            </div>

            <div className="card p-6 border-border hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink mb-2">llms.txt Context Validation</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Checks for the presence and structural syntax of your <code className="text-accent">llms.txt</code> file to help LLMs digest your brand context.
              </p>
            </div>

            <div className="card p-6 border-border hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-ink mb-2">Google PageSpeed &amp; Vitals</h3>
              <p className="text-xs text-ink-2 leading-relaxed">
                Evaluates Core Web Vitals (LCP, CLS, INP) and frontend loading speed required for top Google search rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-ink-2">
            Everything you need to know about AI SEO audits and website grading.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card border-border overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-heading font-bold text-sm text-ink"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-ink-3 transition-transform ${openFaq === idx ? "rotate-180 text-accent" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-ink-2 leading-relaxed border-t border-border/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-border text-center text-xs font-mono text-ink-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} AI Scan My Site. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-ink underline">Scanner</Link>
            <Link href="/privacy" className="hover:text-ink underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
