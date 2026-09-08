import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'Can AI Crawlers Read JavaScript Websites? (React, Next.js, Vue)',
  description: 'Find out if ChatGPT (GPTBot) and Perplexity can execute JavaScript on Single Page Applications (SPA). Learn how SSR and static generation impact AI SEO.',
  keywords: [
    'can AI crawlers read JavaScript',
    'can ChatGPT read React website',
    'client side rendering AI SEO',
    'SSR for AI search',
    'Next.js AI SEO'
  ].join(', '),
  openGraph: {
    title: 'Can AI Crawlers Read JavaScript Websites? (React, Next.js, Vue)',
    description: 'Learn why heavy Client-Side Rendering (CSR) can make your website invisible to AI search bots.',
    url: 'https://aiscanmysite.com/blog/can-ai-crawlers-read-javascript-websites',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/can-ai-crawlers-read-javascript-websites',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Can AI Crawlers Read JavaScript Websites? (React, Next.js, Vue)',
  description: 'Evaluation of JavaScript execution capabilities in AI web crawlers.',
  url: 'https://aiscanmysite.com/blog/can-ai-crawlers-read-javascript-websites',
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
