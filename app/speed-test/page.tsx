import type { Metadata } from 'next';
import SpeedTestClient from './SpeedTestClient';

export const metadata: Metadata = {
  title: 'Free Website Speed Test & PageSpeed Insights Analyzer | AI Scan My Site',
  description: 'Test your website speed and Core Web Vitals (LCP, INP, CLS, TTFB) with live Google PageSpeed Insights data. Get instant speed scores and performance optimization guides.',
  keywords: [
    'page speed test',
    'website speed test',
    'pagespeed insights',
    'google page speed',
    'core web vitals test',
    'LCP test',
    'INP test',
    'website speed analyzer',
    'free speed test'
  ].join(', '),
  openGraph: {
    title: 'Free Website Speed Test & PageSpeed Insights Analyzer',
    description: 'Analyze Core Web Vitals and website speed using official Google Lighthouse metrics. Free instant performance audit.',
    url: 'https://aiscanmysite.com/speed-test',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/speed-test',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Website Speed Test & PageSpeed Insights Analyzer Tool',
  url: 'https://aiscanmysite.com/speed-test',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Evaluate Core Web Vitals (LCP, INP, CLS, TTFB) and mobile/desktop performance metrics with live Google PageSpeed API data.',
};

export default function SpeedTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpeedTestClient />
    </>
  );
}
