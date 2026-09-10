"use client";

import React from "react";
import { Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";

export function GooglePreferredTrustBlock({
  className = "",
  title = "Keep AIScanMySite in your Google Search",
  subtitle = "Add AIScanMySite as a Preferred Source to make it easier to find our latest SEO, AI-search and website optimization insights.",
  onNewAudit,
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  onNewAudit?: () => void;
}) {
  return (
    <aside
      className={`my-8 p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-surface to-slate-900/80 backdrop-blur-md shadow-2xl relative overflow-hidden text-ink ${className}`}
      aria-label="Add AIScanMySite as a Preferred Source on Google"
    >
      <div className="absolute -top-12 -right-12 p-4 opacity-10 pointer-events-none">
        <svg className="w-48 h-48" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>⭐ PREFERRED GOOGLE SOURCE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
              {title}
            </h3>
            <p className="text-sm font-medium text-ink-2 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0 w-full lg:w-auto">
            {/* Google's Official Interactive Button Component */}
            <div google-add-preferred-source-btn="" className="min-h-[44px] flex items-center justify-center">
              {/* Fallback button if JS library is blocked or loading */}
              <a
                href="https://google.com/preferences/source?q=https://aiscanmysite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-[#dadce0] bg-white text-slate-900 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
                title="Add AIScanMySite as a preferred source on Google"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <div className="flex flex-col text-left leading-snug">
                  <span className="text-[10px] font-sans font-medium text-[#5f6368] tracking-tight">Add as a preferred</span>
                  <span className="text-[12px] font-sans font-bold text-[#202124] group-hover:text-[#1a73e8] transition-colors">source on Google</span>
                </div>
              </a>
            </div>

            {/* Direct Link Secondary Fallback */}
            <a
              href="https://google.com/preferences/source?q=https://aiscanmysite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-ink-3 hover:text-accent font-mono transition-colors inline-flex items-center gap-1"
            >
              <span>Can't see the interactive button? Open Google Source Preferences manually</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3-STEP EXPLANATION */}
        <div className="pt-4 border-t border-border/60">
          <div className="text-xs font-mono font-bold text-ink-2 mb-3 uppercase tracking-wider">
            How it works:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-xs font-bold text-ink block">Click the Button</strong>
                <span className="text-[11px] text-ink-3">Google opens your Source Preferences page.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-xs font-bold text-ink block">Select AIScanMySite</strong>
                <span className="text-[11px] text-ink-3">Confirm AIScanMySite as a preferred source.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface/80 border border-border flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-xs font-bold text-ink block">Preference Saved</strong>
                <span className="text-[11px] text-ink-3">Google prioritizes AIScanMySite for your search.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 text-[11px] text-ink-3 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Note: Preferred Sources are personalized to your personal Google Search experience.</span>
          </span>

          {onNewAudit && (
            <button
              onClick={onNewAudit}
              className="px-4 py-2 rounded-xl bg-accent/15 border border-accent/40 hover:bg-accent/25 text-accent text-xs font-bold font-sans transition-all shrink-0 self-end sm:self-auto"
            >
              🔄 Run Another Audit
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
