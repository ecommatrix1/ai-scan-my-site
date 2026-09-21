import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
  title: 'Free AI SEO Checker & Website Grader | Rate My Website',
  description: 'Free AI readiness audit, website grader & SEO score checker. Rate my website for free—check ChatGPT visibility, PageSpeed, schema & AEO instantly.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'rate my website',
    'website grader',
    'website score checker',
    'seo checker',
    'rate my site',
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
  verification: {
    google: 'googlea29659356c9d6994',
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
      name: 'What is an AI SEO audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI SEO audit evaluates how effectively search engines and artificial intelligence platforms (such as ChatGPT Search, Perplexity, Google Gemini, and Claude) can crawl, render, interpret, and cite your website alongside traditional Google search crawlers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AI Scan My Site free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, AI Scan My Site offers 5 free website audits every day with zero credit card required. You can also claim free unlimited scans using promo code FREEPRO.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does an AI SEO audit check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It inspects AI bot permissions in robots.txt (GPTBot, PerplexityBot, ClaudeBot), checks for llms.txt context manifests, verifies JSON-LD schema entity graphs, audits vision AI alt text, and evaluates PageSpeed Core Web Vitals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is AI Scan My Site different from PageSpeed Insights?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Google PageSpeed Insights focuses on frontend performance metrics (LCP, CLS, INP). AI Scan My Site integrates official PageSpeed performance data with dedicated AI bot crawlability, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Answer Engine Optimization (AEO) is the practice of optimizing content, direct answers, and FAQ schemas for conversational voice assistants and AI answer engines like ChatGPT and Perplexity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is GEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generative Engine Optimization (GEO) ensures your brand entities, structured schemas, vector context, and authoritative citations are recognized across LLM search indexes and AI overviews.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI Scan My Site check AI crawler accessibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our scanner checks whether AI user-agents (including GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, and Google-Extended) are allowed or blocked in your robots.txt configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is llms.txt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'llms.txt is an emerging web standard that provides clean markdown context summaries of your website\'s key pages, purpose, and APIs specifically formatted for Large Language Model indexing.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="AI Scan My Site RSS Feed" href="https://aiscanmysite.com/feed.xml" />
        <script async src="https://news.google.com/swg/js/v1/publisher.js" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9283169427062874"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G60XQGT29T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G60XQGT29T');
              gtag('config', 'G-5BLCDSQT31');
            `,
          }}
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
