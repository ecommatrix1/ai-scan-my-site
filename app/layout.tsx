import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI SEO Checker & Free Website Audit Tool | AI Scan My Site',
  description: 'Run a free AI SEO audit to check website SEO, page speed, technical health, and AI search visibility for ChatGPT, Gemini & Google. Get instant fix guides.',
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO Checker & Free Website Audit Tool',
    description: 'Run a free AI SEO audit to check website SEO, performance, and AI search readiness.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://aiscanmysite.com',
  },
};

const jsonLd = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={inter.variable}>
      <body className="bg-background text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
