import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: "AI SEO vs Traditional SEO: What's Actually Different in 2026?",
  description: "Compare AI Search Engine Optimization with traditional Google SEO. Learn how token budgets, llms.txt, Schema graphs, and AI crawlers change how websites rank.",
  keywords: [
    'AI SEO',
    'AI SEO vs traditional SEO',
    'SEO for ChatGPT',
    'AI search optimization',
    'AEO vs SEO',
    'AI website audit'
  ].join(', '),
  openGraph: {
    title: "AI SEO vs Traditional SEO: What's Actually Different in 2026?",
    description: "Understand the fundamental shifts between traditional keyword optimization and AI entity indexing.",
    url: 'https://aiscanmysite.com/blog/ai-seo-vs-traditional-seo',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/ai-seo-vs-traditional-seo',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: "AI SEO vs Traditional SEO: What's Actually Different in 2026?",
  description: "Detailed comparison guide between AI SEO and legacy search engine optimization.",
  url: 'https://aiscanmysite.com/blog/ai-seo-vs-traditional-seo',
  datePublished: '2026-09-08',
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
