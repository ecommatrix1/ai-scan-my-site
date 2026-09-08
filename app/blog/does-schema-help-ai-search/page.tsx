import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'Does Schema.org Help AI Search Engines Understand Your Website?',
  description: 'Learn why JSON-LD Schema.org structured data is the single most important factor for AI Search Knowledge Graphs and AEO indexing.',
  keywords: [
    'does schema help ChatGPT',
    'does structured data help AI search',
    'Schema.org JSON-LD AI SEO',
    'JSON-LD AI knowledge graph',
    'AEO schema'
  ].join(', '),
  openGraph: {
    title: 'Does Schema.org Help AI Search Engines Understand Your Website?',
    description: 'Understand how Schema.org JSON-LD feeds verified entity facts directly into AI search models.',
    url: 'https://aiscanmysite.com/blog/does-schema-help-ai-search',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/does-schema-help-ai-search',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Does Schema.org Help AI Search Engines Understand Your Website?',
  description: 'Guide to Schema.org JSON-LD structured data for AI Knowledge Graphs.',
  url: 'https://aiscanmysite.com/blog/does-schema-help-ai-search',
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
