import type { Metadata } from 'next';
import SEOCheckerClient from './SEOCheckerClient';

export const metadata: Metadata = {
  title: 'Free AI SEO Checker & Website Grader | Rate My Website',
  description: 'Run a free AI SEO audit to rate your website for ChatGPT, Gemini, Perplexity, and Google. Test robots.txt, PageSpeed, schema, and llms.txt instantly.',
  keywords: [
    'AI SEO Checker',
    'Free AI SEO Checker',
    'website grader',
    'rate my website',
    'seo audit tool free',
    'check website seo',
    'AI website audit',
    'AEO checker',
    'llms.txt validator'
  ].join(', '),
  openGraph: {
    title: 'Free AI SEO Checker & Technical Website Audit Tool',
    description: 'Instant AI SEO Audit & Technical Analysis. Check website SEO, speed, security, and AI search readiness for free.',
    url: 'https://aiscanmysite.com/seo-checker',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/seo-checker',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free AI SEO Checker & Technical Website Audit Tool',
  url: 'https://aiscanmysite.com/seo-checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free AI SEO Audit & Website Grader. Inspect websites for search engine optimization, AI crawler readiness, schema graphs, and performance.',
};

export default function SEOCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SEOCheckerClient />
    </>
  );
}
