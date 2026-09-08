import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'What Is AEO? SEO vs AEO Explained Without the Jargon',
  description: 'Learn what Answer Engine Optimization (AEO) is, how it differs from traditional SEO, and how to optimize your website to get cited by AI search engines.',
  keywords: [
    'what is AEO',
    'answer engine optimization',
    'AEO SEO',
    'AEO vs SEO',
    'AEO score',
    'AEO checker',
    'AI SEO'
  ].join(', '),
  openGraph: {
    title: 'What Is AEO? SEO vs AEO Explained Without the Jargon',
    description: 'Understand Answer Engine Optimization (AEO) and how to prepare your website for conversational AI search.',
    url: 'https://aiscanmysite.com/blog/what-is-aeo-answer-engine-optimization',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/what-is-aeo-answer-engine-optimization',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'What Is AEO? SEO vs AEO Explained Without the Jargon',
  description: 'Complete guide explaining Answer Engine Optimization (AEO) for modern website owners.',
  url: 'https://aiscanmysite.com/blog/what-is-aeo-answer-engine-optimization',
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
