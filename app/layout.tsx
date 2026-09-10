import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#04100D' },
  ],
};

export const metadata: Metadata = {
  title: 'AI SEO Audit Tool: AEO, GEO & AI Crawlability Checker | AI Scan My Site',
  description: 'Free AI readiness audit for ChatGPT, Gemini & Perplexity. Check AI bot crawlability, generate llms.txt, audit schema & boost AEO instantly.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'AI SEO Checker',
    'free seo audit',
    'seo audit tool',
    'check website seo',
    'ai seo checker free',
    'website audit',
    'ai website audit',
    'AEO checker',
    'page speed test',
    'website analyzer',
    'seo checker free',
    'llms.txt validator'
  ].join(', '),
  metadataBase: new URL('https://aiscanmysite.com'),
  openGraph: {
    title: 'AI SEO Checker & Free Website Audit Tool | AI Scan My Site',
    description: 'Instant AI SEO Audit & Technical Analysis. Check website SEO, speed, security, and AI search readiness for free.',
    url: 'https://aiscanmysite.com',
    siteName: 'AI Scan My Site',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Scan My Site — Free Website Audit Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO Checker & Free Website Audit Tool',
    description: 'Run a free AI SEO audit to check website SEO, performance, and AI search readiness.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://aiscanmysite.com',
    types: {
      'application/rss+xml': [{ url: 'https://aiscanmysite.com/feed.xml', title: 'AI Scan My Site RSS Feed' }],
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Scan My Site',
  alternateName: ['AIScanMySite', 'AIScanMySite.com'],
  url: 'https://aiscanmysite.com',
  logo: 'https://aiscanmysite.com/og-image.png',
  description: 'Official AI SEO Checker & Technical Website Audit Platform.',
  sameAs: [
    'https://twitter.com/aiscanmysite',
    'https://github.com/aiscanmysite'
  ],
  publishingPrinciples: 'https://aiscanmysite.com/blog',
  knowsAbout: ['AI SEO', 'Answer Engine Optimization', 'Generative Engine Optimization', 'Page Speed Optimization', 'Schema Validation']
};

const websiteSchemaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Scan My Site',
  url: 'https://aiscanmysite.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://aiscanmysite.com/?url={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Scan My Site — AI SEO Checker & Audit Tool',
  url: 'https://aiscanmysite.com',
  applicationCategory: 'SEO & Business Tools',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free AI SEO Checker & Technical Website Audit Tool. Scan websites for SEO, performance, accessibility, and AI search engine visibility.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI website readiness audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI website readiness audit checks if your website is optimized for AI search agents and answer engines like ChatGPT Search, Perplexity, Gemini, and ClaudeBot. We scan your website robots.txt rules, check for the emerging standard llms.txt context specifications, validate JSON-LD structured schema schemas, and audit image vision ALT tags.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do I need schema.org validation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structured data (JSON-LD) enables search models to correctly interpret details about your application, pricing structures, products, and services. Without complete structured data schemas, AI search bots might make wrong assumptions or omit your platform entirely when presenting query answers to prospective customers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the purpose of the llms.txt standard?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The llms.txt standard provides clean markdown context pages specifically optimized for LLM crawlers. By serving structured information in a lightweight format, you make it significantly easier for AI indexing engines to understand the exact scope and functionality of your site.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="AI Scan My Site RSS Feed" href="https://aiscanmysite.com/feed.xml" />
        <script async src="https://news.google.com/swg/js/v1/publisher.js" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9283169427062874"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchemaJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
