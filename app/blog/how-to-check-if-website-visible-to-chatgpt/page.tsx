import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

export const metadata: Metadata = {
  title: 'How to Check If Your Website Is Visible to ChatGPT — 5-Minute Guide',
  description: 'Learn 3 simple steps to check if ChatGPT can see your website. Free diagnostic tool + common reasons your site might be hidden from AI search engines.',
  keywords: [
    'how to check if website visible to chatgpt',
    'can chatgpt see my website',
    'is my website visible to chatgpt',
    'how to check chatgpt website visibility',
    'check if ai can read your website',
    'website visible to chatgpt checker',
    'does chatgpt crawl my website',
    'how do i know if chatgpt can see my site',
    'chatgpt search visibility test',
    'is my website indexed by chatgpt',
    'free tool check chatgpt visibility',
    'why isnt my website showing in chatgpt',
    'does robotstxt affect chatgpt',
    'llms.txt vs no llms.txt chatgpt'
  ].join(', '),
  openGraph: {
    title: 'How to Check If Your Website Is Visible to ChatGPT — 5-Minute Guide',
    description: 'Learn 3 simple steps to check if ChatGPT can see your website. Free diagnostic tool + common reasons your site might be hidden.',
    url: 'https://aiscanmysite.com/blog/how-to-check-if-website-visible-to-chatgpt',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/how-to-check-if-website-visible-to-chatgpt',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Check If Your Website Is Visible to ChatGPT — 5-Minute Guide',
  description: 'Learn 3 simple steps to check if ChatGPT can see your website. Free diagnostic tool + common reasons your site might be hidden from AI search engines.',
  author: {
    '@type': 'Organization',
    name: 'AI Scan My Site',
    url: 'https://aiscanmysite.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'AI Scan My Site',
    url: 'https://aiscanmysite.com',
  },
  datePublished: '2026-09-08',
  mainEntity: {
    '@type': 'HowTo',
    name: 'How to Check If Your Website Is Visible to ChatGPT',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Use Our Free AEO Checker',
        text: 'Paste your website URL into the free AEO Checker tool to get a full ChatGPT readiness report.',
      },
      {
        '@type': 'HowToStep',
        name: 'Review Your robots.txt File',
        text: 'Verify whether GPTBot or ChatGPT-User are disallowed in your root robots.txt file.',
      },
      {
        '@type': 'HowToStep',
        name: 'Test Your Website Page Speed',
        text: 'Audit Largest Contentful Paint (LCP) and TTFB to ensure AI bots do not time out.',
      },
    ],
  },
};

export default function Page() {
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
