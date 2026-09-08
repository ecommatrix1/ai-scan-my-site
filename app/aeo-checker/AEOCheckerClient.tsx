"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Bot,
  Search,
  Zap,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Brain,
  Terminal,
  Cpu,
  Star,
  FileText,
  Lock,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";

export default function AEOCheckerClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightTheme, setLightTheme] = useState(false);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) {
      setInputError("Please enter a website URL to run your free AEO check.");
      return;
    }
    router.push(`/?url=${encodeURIComponent(rawUrl)}`);
  };

  const faqs = [
    {
      q: "What is AEO (Answer Engine Optimization)?",
      a: "AEO is the practice of optimizing your website content and technical structure so AI search engines (like ChatGPT, Gemini, Perplexity, and Claude) can crawl, understand, and cite your brand as the definitive answer to user queries."
    },
    {
      q: "How does this Free AEO Checker grade my website?",
      a: "Our AEO Grader inspects your site's robots.txt for AI crawler permissions, verifies your llms.txt manifest, evaluates Schema.org JSON-LD structured data, checks image ALT semantics for Vision AI, and tests real-time visibility across major LLMs."
    },
    {
      q: "Why do I need an AEO Report in addition to traditional SEO?",
      a: "Traditional SEO focuses on Google keyword ranking links. AEO focuses on getting your brand directly cited in synthesized AI answers. Over 40% of search queries are shifting to conversational AI assistants, making an AEO report vital."
    },
    {
      q: "What is llms.txt and why is it essential for AEO?",
      a: "llms.txt is a standard plain-text file placed in your website root (like /llms.txt). It acts as a curated sitemap specifically designed for Large Language Models, telling AI agents how to summarize and navigate your platform."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 antialiased ${!lightTheme ? "bg-cosmic-space bg-cosmic-grid text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* TOP BANNER */}
      <div className="text-center py-3 px-6 bg-gradient-to-r from-violet-900 via-indigo-800 to-violet-900 text-white border-b border-indigo-700/50">
        <p className="text-sm font-bold tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>INSTANT AEO GRADER: Check your website's visibility on ChatGPT, Gemini & Perplexity 100% Free!</span>
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">
                FREE AEO CHECKER & GRADER
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-ink-2 hover:text-ink transition-colors">
              Full SEO Audit
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
              <span>Run Free AEO Check</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-accent/10 border border-accent/30 text-accent">
          <Brain className="w-4 h-4" />
          <span>ANSWER ENGINE OPTIMIZATION (AEO) TOOL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          Free AEO Checker & <br />
          <span className="text-accent">AI Search Readiness Grader</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Discover how ChatGPT, Gemini, Perplexity, and Claude index and cite your platform. Generate instant <strong className="text-ink font-semibold">AEO Reports</strong>, grade your <strong className="text-ink font-semibold">llms.txt</strong>, and fix structured data gaps in minutes.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-accent/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-accent ml-4" />
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
                <span>Grade My AEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {inputError && <p className="mt-2 text-sm text-danger font-mono text-left pl-4">{inputError}</p>}
        </form>

        {/* METRIC PILLS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {[
            { label: "LLM Crawlability", sub: "robots.txt & llms.txt", score: "100%", color: "text-emerald-400" },
            { label: "Schema.org AEO", sub: "JSON-LD Entity Graphs", score: "Passed", color: "text-indigo-400" },
            { label: "Vision AI Semantics", sub: "ALT Tags & OCR", score: "Audited", color: "text-cyan-400" },
            { label: "LLM Citations", sub: "Perplexity & ChatGPT", score: "Live Check", color: "text-purple-400" },
          ].map((item, idx) => (
            <div key={idx} className="card p-4 border border-border bg-surface">
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">{item.label}</div>
              <div className={`text-xl font-bold font-mono ${item.color}`}>{item.score}</div>
              <div className="text-[11px] text-ink-3 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE: SEO vs AEO */}
      <section className="py-16 border-t border-border bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">Traditional SEO vs. Answer Engine Optimization (AEO)</h2>
            <p className="text-ink-2 max-w-2xl mx-auto text-sm sm:text-base">
              Search is shifting from blue links to direct AI answers. Here is how AEO differs from legacy SEO.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/60">
                  <th className="p-4 font-mono uppercase text-ink-3 text-xs">Feature Dimension</th>
                  <th className="p-4 font-mono uppercase text-ink-3 text-xs">Traditional SEO</th>
                  <th className="p-4 font-mono uppercase text-accent text-xs font-bold">Answer Engine Optimization (AEO)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-bold text-ink">Primary Target</td>
                  <td className="p-4 text-ink-2">Google & Bing Web Crawlers</td>
                  <td className="p-4 text-accent font-semibold">ChatGPT, Gemini, Perplexity & Claude</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">Key Files</td>
                  <td className="p-4 text-ink-2">sitemap.xml & robots.txt</td>
                  <td className="p-4 text-accent font-semibold">llms.txt & agents.json Manifests</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">Data Format</td>
                  <td className="p-4 text-ink-2">HTML Content & Meta Tags</td>
                  <td className="p-4 text-accent font-semibold">Structured JSON-LD & Semantic Knowledge Graphs</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">User Output Goal</td>
                  <td className="p-4 text-ink-2">Get blue link clicks on SERP</td>
                  <td className="p-4 text-accent font-semibold">Be cited as the primary answer source in AI chats</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-ink">Audit Method</td>
                  <td className="p-4 text-ink-2">Keyword Density & Backlink Counts</td>
                  <td className="p-4 text-accent font-semibold">Automated AEO Grader & LLM Citation Analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 PILLARS OF AEO */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">What Our Free AEO Report Audits</h2>
            <p className="text-ink-2 max-w-2xl mx-auto">Every scan evaluates 4 core technical pillars needed for maximum AI engine visibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Terminal,
                title: "1. LLM Crawlability & llms.txt",
                desc: "We verify if GPTBot, PerplexityBot, ClaudeBot, and Google-Extended are permitted in your robots.txt and validate your /llms.txt manifest."
              },
              {
                icon: Cpu,
                title: "2. Schema.org & JSON-LD Entity Graph",
                desc: "Structured data feeds AI models verified facts about your products, pricing, organization, and documentation to prevent hallucinations."
              },
              {
                icon: Eye,
                title: "3. Vision AI & Image Semantics",
                desc: "Multimodal AI engines like GPT-4o and Gemini inspect website images. We check ALT text, caption hierarchy, and OCR readability."
              },
              {
                icon: ShieldCheck,
                title: "4. Live Citation & Brand Mentions",
                desc: "We query live LLMs to check if your domain appears in response snippets when potential customers ask for recommendations in your industry."
              }
            ].map((pillar, idx) => (
              <div key={idx} className="card p-6 border border-border bg-surface hover:border-accent/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">{pillar.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 border-t border-border bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">Frequently Asked Questions</h2>
            <p className="text-ink-2">Everything you need to know about AEO Reports and AI Search Readiness.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card border border-border overflow-hidden bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-lg text-ink"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180 text-accent" : "text-ink-3"}`} />
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

      {/* BOTTOM CTA */}
      <section className="py-16 text-center border-t border-border bg-gradient-to-b from-surface to-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4">
            Ready to Grade Your Website with Our Free AEO Checker?
          </h2>
          <p className="text-ink-2 mb-8 text-lg">
            Get an instant AEO report, downloadable fix guides, and live AI engine citation scores in under 10 seconds.
          </p>
          <Link href="/" className="btn-primary px-8 py-4 text-lg font-bold inline-flex items-center gap-2">
            <span>Run Free AEO Audit Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Free AEO Checker & AI Search Readiness Grader.</p>
      </footer>
    </div>
  );
}

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
