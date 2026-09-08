import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'Does robots.txt Block ChatGPT from Your Website? (How to Check)',
  description: 'Find out if your robots.txt file is blocking GPTBot, PerplexityBot, or ClaudeBot. Learn how to configure AI crawler rules to get indexed.',
  keywords: [
    'does robots.txt block ChatGPT',
    'GPTBot robots.txt',
    'can robots.txt block AI crawlers',
    'AI crawler accessibility',
    'robots.txt AI SEO'
  ].join(', '),
  openGraph: {
    title: 'Does robots.txt Block ChatGPT from Your Website? (How to Check)',
    description: 'Check if your web host or security firewall is blocking OpenAI GPTBot.',
    url: 'https://aiscanmysite.com/blog/does-robotstxt-block-chatgpt',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/does-robotstxt-block-chatgpt',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Does robots.txt Block ChatGPT from Your Website? (How to Check)',
  description: 'Technical guide on AI crawler rules in robots.txt.',
  url: 'https://aiscanmysite.com/blog/does-robotstxt-block-chatgpt',
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
