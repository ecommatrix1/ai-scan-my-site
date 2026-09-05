import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Scan My Site — Free AI Website Audit Tool',
  description: 'Scan any website for SEO, AI visibility, performance, security, and accessibility issues. Get downloadable step-by-step fix guides. Free 3 scans/day.',
  keywords: 'AI website audit, SEO audit tool, website scanner, AI visibility, ChatGPT indexing, llms.txt, schema.org validator',
  metadataBase: new URL('https://aiscanmysite.com'),
  openGraph: {
    title: 'AI Scan My Site — Free AI Website Audit Tool',
    description: 'Scan any website for AI readiness, SEO, performance and security. Download step-by-step fix guides.',
    url: 'https://aiscanmysite.com',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Scan My Site — Free AI Website Audit Tool',
    description: 'Scan any website for AI readiness, SEO, performance and security.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={inter.variable}>
      <body className="bg-background text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
