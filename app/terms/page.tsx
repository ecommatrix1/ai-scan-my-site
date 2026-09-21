import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | AI Scan My Site',
  description: 'Terms of Service and acceptable usage guidelines for AI Scan My Site website audits and AEO tools.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | AI Scan My Site',
    description: 'Terms of Service and usage guidelines for AI Scan My Site.',
    url: 'https://aiscanmysite.com/terms',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-ink py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-border pb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-mono text-accent hover:underline mb-4"
          >
            ← Back to AI Scan My Site
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-ink-3 mt-2">
            Effective Date: September 21, 2026 | Last Updated: September 21, 2026
          </p>
        </div>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or utilizing AI Scan My Site (&quot;aiscanmysite.com&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">2. Permitted Use & Automated Scanning</h2>
          <p>
            AI Scan My Site performs automated analysis of publicly accessible web resources to evaluate search engine optimization, AI crawler readiness (GPTBot, ClaudeBot, PerplexityBot), JSON-LD schemas, and performance indicators.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You agree to submit only publicly accessible domains for scanning.</li>
            <li>You agree not to bypass, disable, or circumvent daily scan quota limits or security controls.</li>
            <li>Automated scraping or bulk submission via external scripts is strictly prohibited without prior written consent.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">3. Disclaimer of Warranties & Limitations</h2>
          <p>
            Audit scores, AI accessibility metrics, and PageSpeed evaluations are generated for diagnostic and educational purposes. Reports are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without guarantees of specific search engine rankings or indexation outcomes.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">4. Intellectual Property</h2>
          <p>
            All content, scanner algorithms, visual interfaces, branding, and generated diagnostic recommendations are the property of AI Scan My Site. Generated llms.txt files and schema markups created for your domain belong to you.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">5. Governing Law & Contact</h2>
          <p>
            For questions regarding these Terms of Service, please contact <a href="mailto:legal@aiscanmysite.com" className="text-accent hover:underline font-mono">legal@aiscanmysite.com</a>.
          </p>
        </section>

        <div className="pt-8 border-t border-border flex justify-between items-center text-xs font-mono text-ink-3">
          <span>&copy; {new Date().getFullYear()} AI Scan My Site</span>
          <Link href="/" className="hover:text-ink underline">Return to Scanner</Link>
        </div>
      </div>
    </main>
  );
}
