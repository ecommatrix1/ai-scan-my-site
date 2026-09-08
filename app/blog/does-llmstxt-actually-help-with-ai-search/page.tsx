import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'Does llms.txt Actually Help with AI Search? (Real Testing Results)',
  description: 'Discover how llms.txt works, whether ChatGPT and Perplexity use it, and why adding a machine-readable manifest file boosts AI search indexing.',
  keywords: [
    'does llms.txt help SEO',
    'does llms.txt help ChatGPT',
    'llms.txt specification',
    'llms.txt benefits',
    'llms.txt generator'
  ].join(', '),
  openGraph: {
    title: 'Does llms.txt Actually Help with AI Search? (Real Testing Results)',
    description: 'Learn why top SaaS and documentation sites are implementing root /llms.txt files.',
    url: 'https://aiscanmysite.com/blog/does-llmstxt-actually-help-with-ai-search',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/does-llmstxt-actually-help-with-ai-search',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Does llms.txt Actually Help with AI Search? (Real Testing Results)',
  description: 'Technical evaluation of llms.txt manifests for AI search engines.',
  url: 'https://aiscanmysite.com/blog/does-llmstxt-actually-help-with-ai-search',
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
