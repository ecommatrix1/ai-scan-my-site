"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, CheckCircle2, Clock, Sun, Moon, AlertTriangle, FileText, Gauge, ShieldCheck, HelpCircle } from "lucide-react";

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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">AI VISIBILITY GUIDE</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLightTheme(!lightTheme)} className="p-2 rounded-lg border border-border bg-surface-2 text-ink-2 hover:text-ink transition-colors">
              {lightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link href="/aeo-checker" className="btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /><span>Free AEO Checker</span></Link>
          </div>
        </div>
      </header>

      {/* ARTICLE CONTAINER */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Category & Metadata */}
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">Beginner Guide</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 Min Read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          How to Check If Your Website Is Visible to ChatGPT: A 5-Minute Guide for Beginners
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          If your website isn't visible to ChatGPT, Perplexity, and AI search bots, your content will never be cited in answer engine responses. Here is how to test and fix your visibility in 5 minutes.
        </p>

        {/* QUICK ANSWER / FEATURED SNIPPET BOX */}
        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-8">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /><span>QUICK ANSWER</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            You can check if ChatGPT sees your website using our free <Link href="/aeo-checker" className="text-accent underline font-bold">AEO Checker tool</Link>, testing your <code className="font-mono text-accent">robots.txt</code> settings, and verifying your page loads properly. Most visibility issues stem from robots.txt blocks, JavaScript rendering problems, or slow page speeds.
          </p>
        </div>

        {/* KEY TAKEAWAYS SUMMARY BOX */}
        <div className="card p-6 border border-border bg-surface-2/60 rounded-2xl mb-10 space-y-3">
          <div className="text-xs font-mono uppercase text-ink font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /><span>KEY TAKEAWAYS FOR QUICK READERS</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-2">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>robots.txt is #1 blocker:</strong> Check if <code className="text-accent">GPTBot</code> is disallowed.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>JS Rendering Issues:</strong> AI bots can fail to execute client-side JS.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>10s Timeout Limit:</strong> Slow loading pages get dropped by AI crawlers.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong>llms.txt Fix:</strong> Serving markdown manifests boosts AI bot comprehension.</span></li>
          </ul>
        </div>

        {/* INSTANT SCANNER EMBED */}
        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-accent" /><span>Run Instant ChatGPT Visibility Scan</span></h3>
          <p className="text-sm text-ink-2 mb-4">Enter your website URL to test crawlability, robots.txt permissions, and PageSpeed metrics.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Enter domain (e.g. yourwebsite.com)" className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl" />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0"><span>Check ChatGPT Visibility</span><ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>

        {/* MAIN BODY CONTENT */}
        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">Why You Should Care If ChatGPT Can See Your Website</h2>
          <p>
            If you run a website—whether it's a blog, small business site, or online store—you've probably heard people talking about ChatGPT. But here's something that might surprise you: <strong>ChatGPT might not be able to see your website at all.</strong>
          </p>
          <p>
            When ChatGPT, Perplexity, Gemini, and other AI search engines can't access your site, they can't recommend it. That means when someone asks an AI chatbot a question your content actually answers, your site won't show up in the response.
          </p>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">Why ChatGPT Might Not Be Able to See Your Website</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-surface-2/40">
              <h3 className="font-heading font-bold text-ink text-base mb-1">1. Your robots.txt File Is Blocking AI Bots</h3>
              <p className="text-sm text-ink-3">Every website has a <code className="text-accent font-mono">robots.txt</code> file in its root directory. Think of it like a bouncer at a club—it decides who gets in. If your rules block <code className="text-accent font-mono">GPTBot</code>, ChatGPT stays out.</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-2/40">
              <h3 className="font-heading font-bold text-ink text-base mb-1">2. Your Website Uses Client-Side JavaScript</h3>
              <p className="text-sm text-ink-3">Modern React, Vue, or Next.js single-page apps build HTML dynamically. If an AI crawler doesn't render JS, it sees a blank page instead of your actual content.</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-2/40">
              <h3 className="font-heading font-bold text-ink text-base mb-1">3. Your Website Is Too Slow</h3>
              <p className="text-sm text-ink-3">If your pages take more than 10–15 seconds to load, AI crawlers time out. Check your performance using our <Link href="/speed-test" className="text-accent hover:underline font-semibold">Free Speed Test Tool</Link>.</p>
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">3 Simple Steps to Check Your Website Visibility</h2>

          <h3 className="text-xl font-heading font-bold text-ink mt-6 mb-2">Step 1: Use Our Free AEO Checker Tool</h3>
          <p>
            The fastest way to test your domain is using our free <Link href="/aeo-checker" className="text-accent underline font-bold">AEO Checker Tool</Link>. It scans your robots.txt, schema markup, and bot rendering rules in under 30 seconds.
          </p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Step 2: Check Your robots.txt File</h3>
          <p>Visit <code className="text-accent font-mono">https://yourwebsite.com/robots.txt</code> in your browser. Look out for disallow rules like:</p>
          <pre className="bg-surface-2 border border-border p-4 rounded-xl font-mono text-xs text-ink overflow-x-auto">
{`User-agent: GPTBot
Disallow: /`}
          </pre>
          <p>If this rule exists, ChatGPT's crawler is completely blocked from accessing your content.</p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Step 3: Test Your Page Speed</h3>
          <p>
            Use our <Link href="/speed-test" className="text-accent underline font-bold">Free Site Speed Test</Link> to ensure your TTFB and Largest Contentful Paint (LCP) are under 3 seconds.
          </p>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">What If ChatGPT Can't See Your Site? Here is How to Fix It</h2>

          <h3 className="text-xl font-heading font-bold text-ink mt-6 mb-2">Fix #1: Update Your robots.txt File</h3>
          <p>Replace blocking rules with an explicit allow rule for AI agents:</p>
          <pre className="bg-surface-2 border border-border p-4 rounded-xl font-mono text-xs text-ink overflow-x-auto">
{`User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /`}
          </pre>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Fix #2: Enable Server-Side Rendering (SSR)</h3>
          <p>Ensure your server delivers plain pre-rendered HTML so bots don't rely on complex client-side JS execution.</p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Fix #3: Speed Up Your Website</h3>
          <p>Compress images, enable caching via a CDN like Cloudflare, and remove unused scripts.</p>

          <h3 className="text-xl font-heading font-bold text-ink mt-8 mb-2">Fix #4: Generate a Clean llms.txt Manifest</h3>
          <p>
            If your site uses an <code className="text-accent font-mono">llms.txt</code> file that blocks AI crawlers, update it. You can generate a clean, validated manifest in seconds using our <Link href="/llms-txt-generator" className="text-accent underline font-bold">Free llms.txt Generator Tool</Link>.
          </p>

          {/* CTA CALLOUT BOX */}
          <div className="card p-6 border border-accent/40 bg-accent/5 rounded-2xl my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-bold text-ink text-base">Generate Your Free llms.txt File</h4>
              <p className="text-xs text-ink-3 mt-1">Guide ChatGPT and AI bots with a clean, machine-readable Markdown file.</p>
            </div>
            <Link href="/llms-txt-generator" className="btn-primary text-xs px-5 py-3 font-bold shrink-0 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Create llms.txt Now</span>
            </Link>
          </div>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-surface">
              <h4 className="font-bold text-ink text-sm">Q: Will fixing this guarantee ChatGPT ranks my site?</h4>
              <p className="text-xs text-ink-3 mt-1">A: No. Visibility is necessary but not sufficient. ChatGPT also considers content quality, relevance, and authority. But if ChatGPT can't see your site, it definitely won't cite you.</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface">
              <h4 className="font-bold text-ink text-sm">Q: How often does ChatGPT crawl my site?</h4>
              <p className="text-xs text-ink-3 mt-1">A: GPTBot typically crawls major sites daily or weekly. Once unblocked, expect 1–7 days for ChatGPT to refresh data.</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface">
              <h4 className="font-bold text-ink text-sm">Q: Does an llms.txt file replace robots.txt?</h4>
              <p className="text-xs text-ink-3 mt-1">A: No. robots.txt controls access permissions, while llms.txt provides clean content context.</p>
            </div>
          </div>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — AI Search Visibility Guides.</p>
      </footer>
    </div>
  );
}
