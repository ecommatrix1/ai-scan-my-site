import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: "How to Run a Website Audit in 5 Steps (2026 AI & Technical Guide)",
  description: "Learn how to perform a full technical and AI website audit in 5 steps. Check ChatGPT visibility, PageSpeed Core Web Vitals, Schema graphs, and robots.txt.",
  keywords: [
    'how to run a website audit',
    'website audit steps',
    'how to do a website audit',
    'AI website audit',
    'technical SEO audit guide',
    'website audit checklist'
  ].join(', '),
  openGraph: {
    title: "How to Run a Website Audit in 5 Steps (2026 AI & Technical Guide)",
    description: "Step-by-step guide to auditing website performance, AI search visibility, and technical SEO errors.",
    url: 'https://aiscanmysite.com/blog/how-to-run-a-website-audit-in-5-steps',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/how-to-run-a-website-audit-in-5-steps',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to Run a Website Audit in 5 Steps",
  description: "A complete step-by-step guide to running a modern website audit covering technical SEO, PageSpeed, and AI crawler readiness.",
  step: [
    {
      '@type': 'HowToStep',
      name: 'Check AI Bot Permissibility in robots.txt',
      text: 'Verify that AI crawlers like GPTBot, PerplexityBot, and ClaudeBot are not blocked in your robots.txt file.'
    },
    {
      '@type': 'HowToStep',
      name: 'Validate Machine Context (llms.txt)',
      text: 'Ensure an llms.txt manifest exists to provide structured markdown summaries for LLM search indexing.'
    },
    {
      '@type': 'HowToStep',
      name: 'Audit JSON-LD Structured Data Schema',
      text: 'Verify entity relationships in schema.org graphs for Organization, WebSite, and WebApplication.'
    },
    {
      '@type': 'HowToStep',
      name: 'Measure Core Web Vitals Performance',
      text: 'Analyze LCP, INP, CLS, and TTFB scores via Google PageSpeed Insights API.'
    },
    {
      '@type': 'HowToStep',
      name: 'Fix Technical Crawl & Vision AI Blockers',
      text: 'Identify missing image alt tags, missing meta tags, and indexability errors.'
    }
  ]
};

export default function ArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient />
    </>
  );
}
