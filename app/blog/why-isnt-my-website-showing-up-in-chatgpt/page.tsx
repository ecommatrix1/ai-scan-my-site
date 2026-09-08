import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: "Why Isn't My Website Showing Up in ChatGPT? (4 Easy Fixes)",
  description: "Search your business on Google and you appear, but ask ChatGPT and your competitor shows up? Learn why ChatGPT isn't citing your website and how to fix it.",
  keywords: [
    'website not showing in ChatGPT',
    "why isn't my website showing in ChatGPT",
    'can ChatGPT read website',
    'how to get website cited by ChatGPT',
    'ChatGPT SEO',
    'GPTBot access',
    'AI SEO checker'
  ].join(', '),
  openGraph: {
    title: "Why Isn't My Website Showing Up in ChatGPT? (4 Easy Fixes)",
    description: "Discover why ChatGPT recommends your competitors instead of you and how to make your website AI-ready in 5 minutes.",
    url: 'https://aiscanmysite.com/blog/why-isnt-my-website-showing-up-in-chatgpt',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/why-isnt-my-website-showing-up-in-chatgpt',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: "Why Isn't My Website Showing Up in ChatGPT? (4 Easy Fixes)",
    description: "Learn why ChatGPT isn't citing your website and how to fix technical, content, and crawler accessibility issues.",
    url: 'https://aiscanmysite.com/blog/why-isnt-my-website-showing-up-in-chatgpt',
    author: {
      '@type': 'Organization',
      name: 'AI Scan My Site Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Scan My Site',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aiscanmysite.com/logo.png',
      },
    },
    datePublished: '2026-09-08',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Why isn't my website showing up in ChatGPT Search?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "ChatGPT may not show your website if GPTBot is blocked in your robots.txt, if your site lacks machine-readable JSON-LD schema, or if your content is hidden behind client-side JavaScript rendering that AI crawlers fail to execute.",
        },
      },
      {
        '@type': 'Question',
        name: "How do I check if ChatGPT can read my website?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "You can run your URL through a free AI SEO Checker like AI Scan My Site. It tests your robots.txt rules for GPTBot, validates your llms.txt manifest, and checks Schema.org JSON-LD tags.",
        },
      },
    ],
  },
];

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
