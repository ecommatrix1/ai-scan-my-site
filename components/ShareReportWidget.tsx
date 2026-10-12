"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Sparkles, Code2, Globe, ExternalLink } from "lucide-react";

interface ShareReportWidgetProps {
  domain: string;
  score?: number | null;
}

export function ShareReportWidget({ domain, score = 85 }: ShareReportWidgetProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [activeEmbedTab, setActiveEmbedTab] = useState<"markdown" | "html">("markdown");

  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "yourwebsite.com";
  const displayScore = score ?? 85;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://aiscanmysite.com";
  
  const reportUrl = `${baseUrl}/report/${encodeURIComponent(cleanDomain)}`;
  const badgeUrl = `${baseUrl}/api/badge?domain=${encodeURIComponent(cleanDomain)}&score=${displayScore}`;

  const markdownSnippet = `[![AI Search Readiness](${badgeUrl})](${reportUrl})`;
  const htmlSnippet = `<a href="${reportUrl}" target="_blank" rel="noopener noreferrer"><img src="${badgeUrl}" alt="AI Search Readiness Badge" /></a>`;

  const safeCopy = async (text: string, setter: (val: boolean) => void) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const tweetText = `Just audited ${cleanDomain} on @aiscanmysite! AI Search Readiness Score: ${displayScore}/100 🚀 Check how ChatGPT & Perplexity see your site:`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(reportUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`;

  return (
    <div className="card p-5 sm:p-7 border border-accent/30 bg-surface/90 backdrop-blur-md shadow-xl rounded-2xl sm:rounded-3xl space-y-6 my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30 mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>SHARE AUDIT &amp; EMBED BADGE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-ink tracking-tight">
            Share Report for <span className="text-accent">{cleanDomain}</span>
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-1">
            Share your live audit report with your team, or embed a real-time AI Readiness badge on your website or README.
          </p>
        </div>

        {/* 1-Click Social Share Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl border border-border bg-surface-2 hover:bg-surface text-ink text-xs font-bold font-mono inline-flex items-center gap-1.5 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Share on X</span>
          </a>

          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl border border-border bg-surface-2 hover:bg-surface text-ink text-xs font-bold font-mono inline-flex items-center gap-1.5 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-current text-blue-500" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Direct Report Link */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-ink uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>Permanent Report Permalink</span>
          </span>
          <span className="text-[11px] text-ink-3">Anyone with this link can view this audit</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={reportUrl}
            className="input text-xs font-mono bg-surface-2 text-ink select-all flex-1"
          />
          <button
            onClick={() => safeCopy(reportUrl, setCopiedLink)}
            className="btn-primary py-2.5 px-4 text-xs shrink-0 flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Embed Badge */}
      <div className="p-4 rounded-2xl bg-surface-2/60 border border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-ink flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Embed Live AI Readiness Badge</span>
            </span>
            <p className="text-[11px] text-ink-2 mt-0.5">
              Add this badge to your website footer or README to showcase your site's AI compliance.
            </p>
          </div>

          {/* Live Preview */}
          <div className="shrink-0 p-1.5 rounded-lg bg-surface border border-border inline-flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badgeUrl} alt="AI Readiness Badge Preview" className="h-7 w-auto" />
          </div>
        </div>

        {/* Code tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <button
            onClick={() => setActiveEmbedTab("markdown")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeEmbedTab === "markdown"
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            Markdown (README)
          </button>
          <button
            onClick={() => setActiveEmbedTab("html")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeEmbedTab === "html"
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            HTML (Website)
          </button>
        </div>

        {/* Snippet box */}
        <div className="relative">
          <pre className="p-3 rounded-xl bg-surface border border-border text-[11px] font-mono text-ink-2 overflow-x-auto whitespace-pre-wrap select-all">
            {activeEmbedTab === "markdown" ? markdownSnippet : htmlSnippet}
          </pre>
          <button
            onClick={() => {
              if (activeEmbedTab === "markdown") {
                safeCopy(markdownSnippet, setCopiedMd);
              } else {
                safeCopy(htmlSnippet, setCopiedHtml);
              }
            }}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface border border-border text-[11px] font-mono font-bold text-ink flex items-center gap-1.5 shadow-sm"
          >
            {(activeEmbedTab === "markdown" ? copiedMd : copiedHtml) ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>
              {(activeEmbedTab === "markdown" ? copiedMd : copiedHtml) ? "Copied!" : "Copy Code"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
