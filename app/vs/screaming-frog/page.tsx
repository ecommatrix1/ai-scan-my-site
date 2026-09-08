import type { Metadata } from 'next';
import ScreamingFrogVsClient from './ScreamingFrogVsClient';

export const metadata: Metadata = {
  title: 'AI Scan My Site vs. Screaming Frog SEO Spider (2026 Comparison)',
  description: 'Compare AI Scan My Site with Screaming Frog. Learn why AI Scan My Site offers a zero-install, cloud-based AI website audit engine.',
  keywords: [
    'screaming frog seo spider',
    'screaming frog alternative',
    'cloud screaming frog',
    'screaming frog download alternative',
    'AI website audit'
  ].join(', '),
  openGraph: {
    title: 'AI Scan My Site vs. Screaming Frog SEO Spider',
    description: 'Cloud AI Audit Engine vs Desktop Screaming Frog Crawler.',
    url: 'https://aiscanmysite.com/vs/screaming-frog',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/vs/screaming-frog',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Scan My Site vs. Screaming Frog Comparison',
  url: 'https://aiscanmysite.com/vs/screaming-frog',
  description: 'Feature comparison between AI Scan My Site and Screaming Frog SEO Spider.',
};

export default function ScreamingFrogVsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScreamingFrogVsClient />
    </>
  );
}
