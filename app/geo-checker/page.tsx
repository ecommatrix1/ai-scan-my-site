import type { Metadata } from 'next';
import GEOCheckerClient from './GEOCheckerClient';

export const metadata: Metadata = {
  title: 'Free GEO Checker & Generative Search Audit | AI Scan',
  description: 'Run a free GEO audit to test your website for Generative Engine Optimization. Check how Google AI Overviews, ChatGPT, Gemini & Perplexity cite your content.',
  keywords: [
    'GEO checker',
    'generative engine optimization',
    'GEO audit',
    'GEO SEO',
    'generative search optimization',
    'GEO score',
    'AI SEO checker',
    'AI website audit',
    'Google AI Overviews optimization'
  ].join(', '),
  openGraph: {
    title: 'Free GEO Checker & Generative Engine Optimization Audit',
    description: 'Optimize your website for Generative Search. Audit your site for Google AI Overviews, ChatGPT, and Perplexity citations.',
    url: 'https://aiscanmysite.com/geo-checker',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/geo-checker',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free GEO Checker & Generative Engine Optimization Audit Tool',
  url: 'https://aiscanmysite.com/geo-checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Audit your website for Generative Engine Optimization (GEO). Check citation readiness, entity graph schema, and generative search visibility.',
};

export default function GEOCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GEOCheckerClient />
    </>
  );
}
