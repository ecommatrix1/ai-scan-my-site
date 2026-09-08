import type { Metadata } from 'next';
import AhrefsVsClient from './AhrefsVsClient';

export const metadata: Metadata = {
  title: 'AI Scan My Site vs. Ahrefs Traffic & SEO Checker (2026 Comparison)',
  description: 'Compare AI Scan My Site with Ahrefs. Learn why AI Scan My Site combines backlink and performance checks with AI search engine citation readiness.',
  keywords: [
    'ahrefs traffic checker',
    'ahrefs alternative',
    'AI website audit vs Ahrefs',
    'free Ahrefs alternative',
    'backlink traffic checker'
  ].join(', '),
  openGraph: {
    title: 'AI Scan My Site vs. Ahrefs Traffic & SEO Checker',
    description: 'Feature comparison: Ahrefs traditional backlink analysis vs. AI Search & LLM citation audits.',
    url: 'https://aiscanmysite.com/vs/ahrefs',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/vs/ahrefs',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Scan My Site vs. Ahrefs Comparison',
  url: 'https://aiscanmysite.com/vs/ahrefs',
  description: 'Side-by-side feature comparison between AI Scan My Site and Ahrefs.',
};

export default function AhrefsVsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AhrefsVsClient />
    </>
  );
}
