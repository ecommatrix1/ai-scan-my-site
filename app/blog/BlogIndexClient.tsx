"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bot, Zap, ArrowRight, Clock, BookOpen, Sun, Moon } from "lucide-react";

export default function BlogIndexClient() {
  const [lightTheme, setLightTheme] = useState(false);

  const articles = [
    {
      slug: "how-to-check-if-website-visible-to-chatgpt",
      title: "How to Check If Your Website Is Visible to ChatGPT (5-Minute Guide)",
      desc: "Step-by-step 5-minute diagnostic guide for beginners to test if ChatGPT and AI search crawlers can read and cite your website.",
      category: "Beginner Diagnostic",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "why-isnt-my-website-showing-up-in-chatgpt",
      title: "Why Isn't My Website Showing Up in ChatGPT? (And How to Fix It)",
      desc: "Search your business on Google and you appear, but ask ChatGPT and your competitor shows up? Learn why ChatGPT isn't citing your website.",
      category: "Troubleshooting",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "is-your-website-visible-to-chatgpt-how-to-check",
      title: "Is Your Website Visible to ChatGPT? Here's How to Check",
      desc: "Step-by-step diagnostic checklist to test if your domain can be read and cited by ChatGPT, Perplexity, and Gemini.",
      category: "Diagnostic",
      readTime: "4 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "what-is-aeo-answer-engine-optimization",
      title: "What Is AEO? SEO vs AEO Explained Without the Jargon",
      desc: "Learn what Answer Engine Optimization (AEO) is, how it differs from traditional SEO, and how to get cited in conversational search.",
      category: "AEO Pillar",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "what-is-geo-generative-engine-optimization",
      title: "What Is GEO? Generative Engine Optimization Guide for Website Owners",
      desc: "Understand Generative Engine Optimization (GEO). Learn how Google AI Overviews and ChatGPT Search synthesize web sources.",
      category: "GEO Pillar",
      readTime: "6 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "ai-seo-vs-traditional-seo",
      title: "AI SEO vs Traditional SEO: What's Actually Different in 2026?",
      desc: "Detailed comparison between keyword density and AI entity indexing, token budgets, llms.txt, and Schema knowledge graphs.",
      category: "AI SEO Pillar",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "does-robotstxt-block-chatgpt",
      title: "Does robots.txt Block ChatGPT from Your Website? (Here's What's Actually Happening)",
      desc: "Find out if Cloudflare or your WordPress web host automatically injected rules blocking OpenAI GPTBot.",
      category: "Technical",
      readTime: "4 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "does-llmstxt-actually-help-with-ai-search",
      title: "Does llms.txt Actually Help with AI Search? (Real Testing Results)",
      desc: "Discover how llms.txt works, whether ChatGPT and Perplexity use it, and why adding a root manifest file boosts AI indexing.",
      category: "LLM Standards",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "can-ai-crawlers-read-javascript-websites",
      title: "Can AI Crawlers Read JavaScript Websites? (React, Next.js, Vue)",
      desc: "Learn why heavy Client-Side Rendering (CSR) can make your web application invisible to AI search engines.",
      category: "JS SEO",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    },
    {
      slug: "does-schema-help-ai-search",
      title: "Does Schema.org Help AI Search Engines Understand Your Website?",
      desc: "Learn why JSON-LD Schema.org structured data is the single most important factor for AI Knowledge Graphs.",
      category: "Schema & Entity Graph",
      readTime: "5 min read",
      date: "Sept 8, 2026"
    }
  ];

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
              <span className="font-heading font-extrabold text-lg tracking-tight">
                AI Scan <span className="text-accent font-black">My Site</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">
                BLOG & KNOWLEDGE HUB
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
              <span>Run Free Scan</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-accent/10 border border-accent/30 text-accent">
          <BookOpen className="w-4 h-4" />
          <span>AI SEARCH, AEO & GEO ARTICLES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-4">
          The AI SEO & AEO <br />
          <span className="text-accent">Knowledge Hub</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-8">
          Guides, tutorials, and technical insights on optimizing your website for ChatGPT, Gemini, Perplexity, and Google AI Overviews.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="card p-6 border border-border bg-surface hover:border-accent/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="bg-accent/10 border border-accent/30 text-accent px-2.5 py-0.5 rounded-full font-bold uppercase">
                    {item.category}
                  </span>
                  <span className="text-ink-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-heading font-bold mb-2 group-hover:text-accent transition-colors text-ink leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-ink-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent pt-4 border-t border-border/50">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Blog & Knowledge Hub.</p>
      </footer>
    </div>
  );
}
