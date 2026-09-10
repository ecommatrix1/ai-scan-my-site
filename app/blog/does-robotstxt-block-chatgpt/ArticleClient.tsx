"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bot, Globe, ArrowRight, Zap, Clock, Sun, Moon, Terminal } from "lucide-react";

export default function ArticleClient() {
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
              <span className="text-[10px] font-mono tracking-wider font-bold text-accent">TECHNICAL CRAWLER GUIDE</span>
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 text-xs font-mono mb-4 text-accent">
          <span className="bg-accent/10 border border-accent/30 px-3 py-1 rounded-full font-bold uppercase">Technical AI Crawlers</span>
          <span className="text-ink-3 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 4 Min Read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-[1.2] mb-6 text-ink">
          Does robots.txt Block ChatGPT from Your Website? (Here's What's Actually Happening)
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 leading-relaxed mb-8">
          You set up your website, published great content, and waited for AI visitors to arrive. But when you search for your business on ChatGPT, it acts like your site doesn't exist. Before you rewrite your entire homepage, check one simple file: your <code className="text-accent font-mono">robots.txt</code>.
        </p>

        <div className="card p-6 border-l-4 border-l-accent border-border bg-accent/5 rounded-2xl mb-10">
          <div className="text-xs font-mono uppercase text-accent font-bold mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <span>THE SHORT ANSWER (WITHOUT THE JARGON)</span>
          </div>
          <p className="text-base text-ink leading-relaxed">
            Yes, a single line in your <code className="text-accent font-mono">robots.txt</code> file can quietly shut out ChatGPT. OpenAI's web crawler identifies itself as <code className="text-accent font-mono">GPTBot</code>. If your site or web host automatically added <code className="text-danger font-mono">Disallow: /</code> for GPTBot, ChatGPT is strictly forbidden from visiting or quoting your pages.
          </p>
        </div>

        <div className="card p-6 border border-border bg-surface rounded-2xl mb-12 shadow-xl">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            <span>Check Your Bot Access Rules in 5 Seconds</span>
          </h3>
          <p className="text-sm text-ink-2 mb-4">Unsure if Cloudflare or your WordPress host is blocking AI bots? Type your domain below to test your rules live.</p>
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter domain (e.g. yourwebsite.com)"
              className="input flex-1 w-full bg-surface-2 border border-border py-3 px-4 text-sm font-mono rounded-xl"
            />
            <button type="submit" className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 shrink-0">
              <span>Test My Robots.txt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-ink-2 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">
            Why Web Hosts Block AI Crawlers Without Telling You
          </h2>
          <p>
            Here is the frustrating part: you might not have blocked ChatGPT yourself. Over the past two years, several popular web hosts and security plugins (like Cloudflare, WP Engine, and SiteGround) started enabling default "Block AI Crawlers" toggles to save server bandwidth.
          </p>
          <p>
            While that protects your server from aggressive web scrapers, it also hides your site from modern AI search engines like ChatGPT Search and Perplexity.
          </p>

          <h2 className="text-2xl font-heading font-bold text-ink mt-10 mb-4">
            How to Fix Your robots.txt Rules
          </h2>
          <p>
            Open your browser and visit <code className="text-accent font-mono">https://yourwebsite.com/robots.txt</code>. Look for any section containing <code className="text-accent font-mono">User-agent: GPTBot</code> or <code className="text-accent font-mono">User-agent: PerplexityBot</code>.
          </p>
          <p>
            If you see <code className="text-danger font-mono">Disallow: /</code> under those bots, replace it with this clean, friendly configuration:
          </p>

          <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs text-success leading-relaxed">
            # Allow AI search engines to index public pages<br />
            User-agent: GPTBot<br />
            Allow: /<br />
            Disallow: /admin/<br /><br />
            User-agent: PerplexityBot<br />
            Allow: /<br />
            Disallow: /admin/
          </div>

          <p className="text-sm font-semibold text-accent mt-4">
            Pro Tip: Give ChatGPT 24-48 hours after updating your file to re-crawl your domain and index your latest changes.
          </p>
        </div>
      </article>

      <footer className="py-8 border-t border-border text-center text-xs text-ink-3 font-mono">
        <p>© {new Date().getFullYear()} AI Scan My Site — AI Crawler Technical Guides.</p>
      </footer>
    </div>
  );
}
