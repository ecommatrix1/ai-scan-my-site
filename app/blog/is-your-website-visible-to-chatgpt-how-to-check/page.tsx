import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: "Is Your Website Visible to ChatGPT? Here's How to Check",
  description: "Learn how to test if ChatGPT, Perplexity, and Gemini can read and cite your website. Step-by-step diagnostic checklist and free AI visibility audit.",
  keywords: [
    'is website visible to ChatGPT',
    'website visible to ChatGPT',
    'AI website checker',
    'check ChatGPT visibility',
    'can ChatGPT read website',
    'AI search visibility'
  ].join(', '),
  openGraph: {
    title: "Is Your Website Visible to ChatGPT? Here's How to Check",
    description: "Check if AI engines can find, crawl, and quote your website content.",
    url: 'https://aiscanmysite.com/blog/is-your-website-visible-to-chatgpt-how-to-check',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/is-your-website-visible-to-chatgpt-how-to-check',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: "Is Your Website Visible to ChatGPT? Here's How to Check",
  description: "Step-by-step diagnostic checklist to verify if ChatGPT and AI search engines can index your website.",
  url: 'https://aiscanmysite.com/blog/is-your-website-visible-to-chatgpt-how-to-check',
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
