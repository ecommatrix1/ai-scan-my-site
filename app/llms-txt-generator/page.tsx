import type { Metadata } from 'next';
import LlmsTxtGeneratorClient from './LlmsTxtGeneratorClient';

export const metadata: Metadata = {
  title: 'Free llms.txt & agents.json Generator | AI Scan My Site',
  description: 'Generate and validate a free llms.txt manifest and agents.json file for your website. Optimize your site for ChatGPT, Perplexity, Gemini & Claude crawlers.',
  keywords: [
    'llms.txt generator',
    'llms.txt validator',
    'agents.json generator',
    'website AI readiness checker',
    'AI crawler file',
    'ChatGPT indexing file',
    'llms.txt specification',
    'AI SEO tool'
  ].join(', '),
  openGraph: {
    title: 'Free llms.txt & agents.json Generator Tool',
    description: 'Create a machine-readable llms.txt file in seconds to guide AI search engine crawlers across your site.',
    url: 'https://aiscanmysite.com/llms-txt-generator',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/llms-txt-generator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free llms.txt Manifest & agents.json Generator Tool',
  url: 'https://aiscanmysite.com/llms-txt-generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Generate machine-readable llms.txt and agents.json files for Large Language Models (LLMs) and AI web crawlers.',
};

export default function LlmsTxtGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LlmsTxtGeneratorClient />
    </>
  );
}
