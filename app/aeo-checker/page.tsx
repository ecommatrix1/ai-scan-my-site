import type { Metadata } from 'next';
import AEOCheckerClient from './AEOCheckerClient';

export const metadata: Metadata = {
  title: 'Free AEO Checker & Answer Engine Optimizer | ChatGPT & Perplexity Visibility',
  description: 'Run a free AEO audit to test your website for Answer Engine Optimization. Check how ChatGPT, Gemini, Claude, and Perplexity parse and cite your pages.',
  keywords: [
    'Free AEO checker',
    'Answer Engine Optimization',
    'AEO report',
    'AEO Grader',
    'AEO tracker',
    'AEO SEO',
    'AI SEO Checker',
    'ChatGPT indexing',
    'llms.txt generator'
  ].join(', '),
  openGraph: {
    title: 'Free AEO Checker & Answer Engine Optimizer Tool',
    description: 'Discover how AI engines (ChatGPT, Gemini, Perplexity) see and cite your website. Get an instant, actionable AEO report.',
    url: 'https://aiscanmysite.com/aeo-checker',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/aeo-checker',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free AEO Checker & AI Search Readiness Grader',
  url: 'https://aiscanmysite.com/aeo-checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Analyze your website for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). Get an instant AEO score and report.',
};

export default function AEOCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AEOCheckerClient />
    </>
  );
}
