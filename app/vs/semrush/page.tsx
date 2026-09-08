import type { Metadata } from 'next';
import SemrushVsClient from './SemrushVsClient';

export const metadata: Metadata = {
  title: 'AI Scan My Site vs. Semrush Free SEO Checker (2026 Comparison)',
  description: 'Compare AI Scan My Site with Semrush. Learn why AI Scan My Site combines traditional SEO audits with ChatGPT, Gemini & Perplexity visibility checks.',
  keywords: [
    'semrush free seo checker',
    'semrush alternative',
    'AI SEO vs Semrush',
    'free website audit tool',
    'Semrush site audit alternative'
  ].join(', '),
  openGraph: {
    title: 'AI Scan My Site vs. Semrush Free SEO Checker',
    description: 'Honest feature comparison: Semrush traditional site audit vs. AI Search & AEO readiness checks.',
    url: 'https://aiscanmysite.com/vs/semrush',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/vs/semrush',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Scan My Site vs. Semrush Free SEO Checker Comparison',
  url: 'https://aiscanmysite.com/vs/semrush',
  description: 'Side-by-side feature and capabilities comparison between AI Scan My Site and Semrush.',
};

export default function SemrushVsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SemrushVsClient />
    </>
  );
}
