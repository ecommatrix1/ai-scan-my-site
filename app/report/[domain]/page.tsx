import type { Metadata } from 'next';
import ReportClient from './ReportClient';

interface ReportPageProps {
  params: { domain: string };
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const cleanDomain = decodeURIComponent(params.domain)
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  return {
    title: `${cleanDomain} AI SEO Audit & ChatGPT Readiness Report | AI Scan`,
    description: `Real-time AI SEO audit results for ${cleanDomain}. Inspect ChatGPT crawl permissions, robots.txt AI bots, llms.txt validation, Schema.org entities, and Core Web Vitals.`,
    keywords: [
      `${cleanDomain} AI SEO audit`,
      `${cleanDomain} ChatGPT visibility`,
      `${cleanDomain} AEO score`,
      `is ${cleanDomain} indexed by ChatGPT`,
      `${cleanDomain} website audit`,
      'AI search readiness checker',
    ].join(', '),
    openGraph: {
      title: `${cleanDomain} AI SEO Audit Report | AI Scan My Site`,
      description: `View the AI Search Readiness and Answer Engine Optimization score for ${cleanDomain}.`,
      url: `https://aiscanmysite.com/report/${encodeURIComponent(cleanDomain)}`,
      siteName: 'AI Scan My Site',
      images: [
        {
          url: `/api/badge?domain=${encodeURIComponent(cleanDomain)}&score=85`,
          width: 180,
          height: 28,
          alt: `${cleanDomain} AI Readiness Badge`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanDomain} AI SEO Audit & Readiness Score`,
      description: `Check how ChatGPT, Claude, and Perplexity see ${cleanDomain}.`,
    },
    alternates: {
      canonical: `https://aiscanmysite.com/report/${encodeURIComponent(cleanDomain)}`,
    },
  };
}

export default function ReportPage({ params }: ReportPageProps) {
  const cleanDomain = decodeURIComponent(params.domain)
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: `${cleanDomain} AI SEO & Search Readiness Report`,
    description: `Technical AI Search engine audit and AEO diagnostics for ${cleanDomain}.`,
    url: `https://aiscanmysite.com/report/${encodeURIComponent(cleanDomain)}`,
    about: {
      '@type': 'WebSite',
      name: cleanDomain,
      url: `https://${cleanDomain}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Scan My Site',
      url: 'https://aiscanmysite.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReportClient domain={cleanDomain} />
    </>
  );
}
