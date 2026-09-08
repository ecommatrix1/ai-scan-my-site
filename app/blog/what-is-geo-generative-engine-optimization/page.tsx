import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'What Is GEO? Generative Engine Optimization Guide for Website Owners',
  description: 'Understand Generative Engine Optimization (GEO). Learn how Google AI Overviews, ChatGPT Search, and Perplexity synthesize website sources.',
  keywords: [
    'what is GEO',
    'generative engine optimization',
    'GEO SEO',
    'GEO audit',
    'GEO checker',
    'generative search optimization',
    'AI website audit'
  ].join(', '),
  openGraph: {
    title: 'What Is GEO? Generative Engine Optimization Guide for Website Owners',
    description: 'Learn how to optimize your content so generative AI models synthesize and cite your brand.',
    url: 'https://aiscanmysite.com/blog/what-is-geo-generative-engine-optimization',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/what-is-geo-generative-engine-optimization',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'What Is GEO? Generative Engine Optimization Guide for Website Owners',
  description: 'Comprehensive guide to Generative Engine Optimization (GEO) for AI search engines.',
  url: 'https://aiscanmysite.com/blog/what-is-geo-generative-engine-optimization',
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
