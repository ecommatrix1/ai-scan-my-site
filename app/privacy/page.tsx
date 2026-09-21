import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Scan My Site',
  description: 'Learn how AI Scan My Site collects, uses, and protects your data during website SEO and AI readiness scans.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | AI Scan My Site',
    description: 'Privacy policy and data protection guidelines for AI Scan My Site.',
    url: 'https://aiscanmysite.com/privacy',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-ink-3 mt-2">
            Effective Date: September 21, 2026 | Last Updated: September 21, 2026
          </p>
        </div>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">1. Information We Collect</h2>
          <p>
            AI Scan My Site (&quot;aiscanmysite.com&quot;) collects minimal data necessary to provide automated website audits, AI search engine readiness checks, and PageSpeed evaluations.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Submitted URLs:</strong> Web addresses entered into our scanner to perform real-time SEO, schema, and robots.txt analysis.</li>
            <li><strong>Technical Usage Data:</strong> Anonymized IP addresses, browser user-agents, and scan timestamps used for server rate-limiting and security enforcement.</li>
            <li><strong>Essential Local Storage:</strong> Browser local storage keys (such as daily scan counters and theme preferences) required to maintain application functionality.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">2. How We Use Collected Information</h2>
          <p>
            Data collected is strictly utilized to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Generate real-time audit reports, llms.txt files, and schema validation results.</li>
            <li>Enforce daily free scan quotas per IP address.</li>
            <li>Protect our service against automated abuse, denial of service attacks, and rate limit evasion.</li>
          </ul>
          <p>
            We do <strong>NOT</strong> sell, rent, or trade submitted domain URLs or user data to third parties.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">3. Data Security & Retention</h2>
          <p>
            All data transmissions between your client browser and our servers are encrypted using TLS 1.3 / HTTPS protocols. Scanned domain results are cached ephemerally for performance optimization and are automatically invalidated.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">4. Third-Party Services</h2>
          <p>
            Our service integrates standard performance and analytics tools including Google Analytics (gtag.js) and Google PageSpeed Insights API. These third-party services process anonymized data in accordance with their respective privacy policies.
          </p>
        </section>

        <section className="space-y-4 text-sm text-ink-2 leading-relaxed">
          <h2 className="text-xl font-heading font-bold text-ink">5. Your Privacy Rights & Contact</h2>
          <p>
            You may request deletion of any stored scan history or cached metadata associated with your domain by contacting our privacy team at <a href="mailto:privacy@aiscanmysite.com" className="text-accent hover:underline font-mono">privacy@aiscanmysite.com</a>.
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
