"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Bot,
  Globe,
  ArrowRight,
  Zap,
  CheckCircle2,
  Cpu,
  Brain,
  ShieldCheck,
  Search,
  ChevronDown,
  Sun,
  Moon,
  TrendingUp,
  FileCode,
  Layers,
  Activity
} from "lucide-react";

export default function GEOCheckerClient() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightTheme, setLightTheme] = useState(false);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) {
      setInputError("Please enter a website URL to run your free GEO audit.");
      return;
    }
    router.push(`/?url=${encodeURIComponent(rawUrl)}`);
  };

  const geoFactors = [
    {
      title: "1. Quotable Statistics & Extractable Facts",
      desc: "Generative AI engines prioritize content with clear data points, specific percentages, and citeable factual assertions."
    },
    {
      title: "2. Technical AI Bot Permissions",
      desc: "Verifying that GPTBot, PerplexityBot, ClaudeBot, and Google-Extended aren't blocked by aggressive firewalls or robots.txt."
    },
    {
      title: "3. Entity-Rich Schema.org JSON-LD",
      desc: "Generative models look for unambiguous Organization, Product, and HowTo schema to map your site into their knowledge graph."
    },
    {
      title: "4. Machine-Readable Manifests (/llms.txt)",
      desc: "Providing a clean Markdown map of your primary documentation and pricing pages built specifically for Large Language Models."
    },
    {
      title: "5. Direct-Answer Paragraph Structure",
      desc: "Structuring H2/H3 sections with immediate 40-word summaries that generative models can extract for instant search answers."
    },
    {
      title: "6. Multimodal Image & Document Semantics",
      desc: "Ensuring Vision AI models can read your diagrams, infographics, and product photos via high-signal ALT text."
    }
  ];

  const faqs = [
    {
      q: "What is GEO (Generative Engine Optimization)?",
      a: "GEO is the process of optimizing your website to be cited as an authoritative source in AI-generated answers produced by Google AI Overviews, ChatGPT Search, Perplexity, and Claude."
    },
    {
      q: "How is GEO different from AEO and SEO?",
      a: "SEO optimizes for search engine blue-link rankings. AEO optimizes for voice & direct QA tools. GEO optimizes specifically for generative AI systems that synthesize multiple sources into one cohesive answer."
    },
    {
      q: "What does this Free GEO Checker test?",
      a: "Our GEO Checker evaluates your website's citation readiness, LLM crawler permissions, structured JSON-LD entity graph completeness, machine-readable manifests (/llms.txt), and performance metrics."
    },
    {
      q: "How can I improve my GEO score?",
      a: "Add clear /llms.txt files, validate your Schema.org JSON-LD data, remove AI bot blocks from robots.txt, write concise direct-answer summaries under your headings, and run regular GEO audits."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 antialiased ${!lightTheme ? "bg-cosmic-space bg-cosmic-grid text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* TOP BANNER */}
      <div className="text-center py-3 px-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white border-b border-indigo-700/50">
        <p className="text-sm font-bold tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-bounce" />
          <span>NEW: Generative Engine Optimization (GEO) Audit Engine is live! 100% Free Scan</span>
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-400">
                FREE GEO CHECKER & AUDIT
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/aeo-checker" className="text-sm font-bold text-ink-2 hover:text-ink transition-colors">
              AEO Checker
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
              <span>Run Free Audit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span>GENERATIVE ENGINE OPTIMIZATION (GEO) TOOL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.15] mb-6">
          Free GEO Checker & <br />
          <span className="text-accent">Generative Search Audit</span>
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-3xl mx-auto leading-relaxed mb-10">
          Test if Google AI Overviews, ChatGPT Search, Gemini, and Perplexity can synthesize and cite your content. Get an instant <strong className="text-ink font-semibold">GEO Score</strong> and actionable fix guides.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleStartScan} className="max-w-2xl mx-auto mb-12">
          <div className="card p-2 rounded-2xl border border-cyan-500/40 shadow-2xl bg-surface">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Globe className="hidden sm:block w-6 h-6 text-cyan-400 ml-4" />
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
                <span>Audit GEO Score</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {inputError && <p className="mt-2 text-sm text-danger font-mono text-left pl-4">{inputError}</p>}
        </form>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {[
            { label: "AI Overview Status", sub: "Google SGE / Overviews", score: "Optimized", color: "text-cyan-400" },
            { label: "Citation Readiness", sub: "LLM Reference Index", score: "Checked", color: "text-indigo-400" },
            { label: "Entity Resolution", sub: "Schema.org Knowledge", score: "100%", color: "text-emerald-400" },
            { label: "Synthesized QA", sub: "Perplexity & ChatGPT", score: "Verified", color: "text-purple-400" },
          ].map((item, idx) => (
            <div key={idx} className="card p-4 border border-border bg-surface">
              <div className="text-xs font-mono text-ink-3 uppercase mb-1">{item.label}</div>
              <div className={`text-xl font-bold font-mono ${item.color}`}>{item.score}</div>
              <div className="text-[11px] text-ink-3 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE-WAY TRIAD: SEO vs AEO vs GEO */}
      <section className="py-16 border-t border-border bg-surface/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">Understanding SEO vs. AEO vs. GEO</h2>
            <p className="text-ink-2 max-w-2xl mx-auto">Modern search requires optimization for three distinct discovery layers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 border border-border bg-surface">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-bold">SEO</div>
              <h3 className="text-xl font-heading font-bold mb-2">Search Engine Optimization</h3>
              <p className="text-sm text-ink-2 mb-4 leading-relaxed">Focuses on keywords, backlinks, and page authority to rank blue links on Google & Bing.</p>
              <div className="text-xs font-mono text-ink-3 bg-surface-2 p-2 rounded border border-border">Target: Blue Links Page 1</div>
            </div>

            <div className="card p-6 border border-border bg-surface">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 font-bold">AEO</div>
              <h3 className="text-xl font-heading font-bold mb-2">Answer Engine Optimization</h3>
              <p className="text-sm text-ink-2 mb-4 leading-relaxed">Focuses on direct Q&A, voice search, and clear factual answers for assistants like Siri and Alexa.</p>
              <div className="text-xs font-mono text-ink-3 bg-surface-2 p-2 rounded border border-border">Target: Single Direct Answers</div>
            </div>

            <div className="card p-6 border border-accent/40 bg-surface shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-mono font-bold px-3 py-1 rounded-bl-lg">2026 FOCUS</div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-bold">GEO</div>
              <h3 className="text-xl font-heading font-bold mb-2">Generative Engine Optimization</h3>
              <p className="text-sm text-ink-2 mb-4 leading-relaxed">Focuses on becoming a cited source when AI models synthesize answers from across the web.</p>
              <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 p-2 rounded border border-cyan-500/30 font-bold">Target: AI Citation & Source Synthesis</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 GEO FACTORS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">6 Critical Generative Ranking Signals</h2>
            <p className="text-ink-2 max-w-2xl mx-auto">What generative models (GPT-4o, Gemini 1.5, Claude 3.5) evaluate before citing your platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geoFactors.map((factor, idx) => (
              <div key={idx} className="card p-6 border border-border bg-surface hover:border-cyan-500/50 transition-colors">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-2">FACTOR 0{idx + 1}</div>
                <h3 className="text-lg font-heading font-bold mb-2">{factor.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 border-t border-border bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-extrabold mb-3">GEO Audit FAQs</h2>
            <p className="text-ink-2">Common questions about Generative Engine Optimization.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card border border-border overflow-hidden bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-lg text-ink"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180 text-cyan-400" : "text-ink-3"}`} />
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
            Check Your Website's GEO Score Today
          </h2>
          <p className="text-ink-2 mb-8 text-lg">
            Ensure your brand isn't left out of Google AI Overviews and ChatGPT recommendations.
          </p>
          <Link href="/" className="btn-primary px-8 py-4 text-lg font-bold inline-flex items-center gap-2">
            <span>Run Free GEO Audit Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — Free GEO Checker & Generative Engine Optimization Audit.</p>
      </footer>
    </div>
  );
}
