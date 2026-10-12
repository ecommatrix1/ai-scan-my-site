import type { Metadata } from 'next';
import AIScanMySite from '@/AIScanMySite';

export const metadata: Metadata = {
  title: 'AI SEO Checker & llms.txt Generator | Free AI Search Readiness Audit',
  description:
    'Instant AI SEO audit tool. Test if ChatGPT, Perplexity, and Claude can find and cite your website. Check AI bot robots.txt directives, llms.txt, schema, and performance.',
  alternates: {
    canonical: 'https://aiscanmysite.com',
  },
};

export default function Home() {
  return <AIScanMySite />;
}
