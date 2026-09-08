import type { Metadata } from 'next';
import HubspotVsClient from './HubspotVsClient';

export const metadata: Metadata = {
  title: 'AI Scan My Site vs. HubSpot AEO Grader (2026 Comparison)',
  description: 'Compare AI Scan My Site with HubSpot AEO Grader and Framer AEO Scanner. Learn why AI Scan My Site offers full llms.txt and JSON-LD fix code generation.',
  keywords: [
    'HubSpot AEO Grader',
    'Framer AEO Scanner',
    'HubSpot AEO alternative',
    'free AEO checker',
    'AEO report'
  ].join(', '),
  openGraph: {
    title: 'AI Scan My Site vs. HubSpot AEO Grader',
    description: 'Detailed comparison of AEO grading tools and AI readiness checkers.',
    url: 'https://aiscanmysite.com/vs/hubspot-aeo',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/vs/hubspot-aeo',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Scan My Site vs. HubSpot AEO Grader Comparison',
  url: 'https://aiscanmysite.com/vs/hubspot-aeo',
  description: 'Side-by-side feature comparison between AI Scan My Site and HubSpot AEO Grader.',
};

export default function HubspotVsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HubspotVsClient />
    </>
  );
}
