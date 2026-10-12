import type { Metadata } from 'next';
import LlmsTxtGeneratorClient from './LlmsTxtGeneratorClient';

export const metadata: Metadata = {
  title: 'Free llms.txt Generator & Validator | AI Context Manifest Builder',
  description: 'Generate, validate, and inspect your website llms.txt and agents.json files. Help ChatGPT, Perplexity, Gemini, and Claude ingest your documentation and pages accurately.',
  keywords: [
    'llms.txt generator',
    'llms.txt validator',
    'agents.json generator',
    'create llms.txt file',
    'llms.txt specification',
    'AI context manifest',
    'AI crawler file generator',
    'ChatGPT indexing file',
    'AI SEO tool'
  ].join(', '),
  openGraph: {
    title: 'Free llms.txt Generator & Validator | AI Context Manifest Tool',
    description: 'Build a standard-compliant llms.txt and agents.json file in seconds. Guide AI crawlers across your core documentation and products.',
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
