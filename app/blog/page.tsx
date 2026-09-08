import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'AI SEO, AEO & GEO Guides | AI Scan My Site Blog',
  description: 'Learn how to optimize your website for ChatGPT, Gemini, Perplexity, and AI search engines. Tutorials on AEO, GEO, llms.txt, and technical AI SEO.',
  keywords: [
    'AI SEO blog',
    'AEO guide',
    'GEO guide',
    'ChatGPT SEO',
    'website AI readiness',
    'llms.txt guide'
  ].join(', '),
  openGraph: {
    title: 'AI SEO, AEO & GEO Guides | AI Scan My Site Blog',
    description: 'Practical guides on getting your website cited by AI search engines.',
    url: 'https://aiscanmysite.com/blog',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/blog',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'AI Scan My Site Blog',
  url: 'https://aiscanmysite.com/blog',
  description: 'Educational resources and guides on AI Search Engine Optimization, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogIndexClient />
    </>
  );
}
