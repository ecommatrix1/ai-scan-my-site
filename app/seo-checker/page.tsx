import type { Metadata } from 'next';
import SEOCheckerClient from './SEOCheckerClient';

export const metadata: Metadata = {
  title: 'Free AI SEO Checker & Website Grader | Rate My Website',
  description: 'Run a free AI SEO audit to rate your website for ChatGPT, Gemini, Perplexity, and Google. Test robots.txt, PageSpeed, schema, and llms.txt instantly.',
  keywords: [
    'AI SEO Checker',
    'Free AI SEO Checker',
    'website grader',
    'rate my website',
    'seo audit tool free',
    'check website seo',
    'AI website audit',
    'AEO checker',
    'llms.txt validator'
  ].join(', '),
  openGraph: {
    title: 'Free AI SEO Checker & Technical Website Audit Tool',
    description: 'Instant AI SEO Audit & Technical Analysis. Check website SEO, speed, security, and AI search readiness for free.',
    url: 'https://aiscanmysite.com/seo-checker',
    siteName: 'AI Scan My Site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aiscanmysite.com/seo-checker',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free AI SEO Checker & Technical Website Audit Tool',
  url: 'https://aiscanmysite.com/seo-checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free AI SEO Audit & Website Grader. Inspect websites for search engine optimization, AI crawler readiness, schema graphs, and performance.',
};

export default function SEOCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Interactive Tool Component */}
      <SEOCheckerClient />

      {/* SSR Static Educational Section for Googlebot Indexing & SXO */}
      <section className="bg-surface border-t border-border py-16 px-4 sm:px-6">
        <article className="max-w-4xl mx-auto space-y-10 text-ink">
          
          <header className="border-b border-border pb-8">
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-ink tracking-tight mb-4">
              Comprehensive Guide: How Free AI SEO Audits Elevate Search &amp; LLM Visibility
            </h2>
            <p className="text-base text-ink-2 leading-relaxed">
              In the modern search landscape, web optimization is no longer restricted to traditional Google desktop and mobile crawlers. Next-generation artificial intelligence platforms—including OpenAI&apos;s ChatGPT, Anthropic&apos;s Claude, Perplexity AI, and Google Gemini—actively crawl, summarize, and cite web pages in conversational answer engines. An <strong>AI SEO Audit</strong> evaluates your domain across both traditional technical search requirements and emerging Answer Engine Optimization (AEO) protocols.
            </p>
          </header>

          {/* Section 1 */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
              1. What Is an AI SEO Audit &amp; How Does It Differ From Traditional SEO?
            </h3>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              Traditional Search Engine Optimization (SEO) primarily focuses on optimizing HTML elements for Googlebot, accumulating external backlinks, and targeting specific search queries to earn blue-link rankings on Search Engine Result Pages (SERPs). While these factors remain essential, AI-driven search engines process information differently:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-ink-2">
              <li><strong>Direct Entity Extraction:</strong> Large Language Models (LLMs) parse structured semantic entity graphs (such as JSON-LD Schema) to understand brand offerings directly without guessing.</li>
              <li><strong>RAG (Retrieval-Augmented Generation):</strong> When a user asks ChatGPT or Perplexity a question, the AI performs a real-time web fetch, extracts precise text passages, and cites authoritative sources.</li>
              <li><strong>Protocol Accessibility:</strong> AI crawlers look for explicit directives in <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">robots.txt</code> and context manifests like <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">llms.txt</code> to ingest site structure cleanly.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
              2. Understanding AI Crawler Permissions in <code className="text-accent">robots.txt</code>
            </h3>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              One of the most frequent reasons websites are missing from ChatGPT or Perplexity search results is accidental blocking of dedicated AI user-agents in <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">robots.txt</code>. Our free AI SEO checker inspects your server directives for the following major user-agents:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="card p-4 border border-border bg-surface-2">
                <h4 className="font-heading font-bold text-sm text-accent mb-1">GPTBot &amp; ChatGPT-User</h4>
                <p className="text-xs text-ink-2">Operated by OpenAI. <code className="text-accent">GPTBot</code> handles offline model training, while <code className="text-accent">ChatGPT-User</code> performs real-time live browsing fetches during user chats.</p>
              </div>
              <div className="card p-4 border border-border bg-surface-2">
                <h4 className="font-heading font-bold text-sm text-emerald-400 mb-1">PerplexityBot</h4>
                <p className="text-xs text-ink-2">Used by Perplexity AI to index web pages, extract factual citations, and answer real-time conversational search queries.</p>
              </div>
              <div className="card p-4 border border-border bg-surface-2">
                <h4 className="font-heading font-bold text-sm text-purple-400 mb-1">ClaudeBot</h4>
                <p className="text-xs text-ink-2">Anthropic&apos;s web crawler that reads online context for Claude 3.5 Sonnet and future model iterations.</p>
              </div>
              <div className="card p-4 border border-border bg-surface-2">
                <h4 className="font-heading font-bold text-sm text-blue-400 mb-1">Google-Extended</h4>
                <p className="text-xs text-ink-2">Google&apos;s specific token for Gemini model training. Note: Blocking Google-Extended does not block standard Googlebot search indexing.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
              3. The Power of <code className="text-accent">llms.txt</code> Context Manifests
            </h3>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              Proposed as an open standard for AI readability, an <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">llms.txt</code> file is a lightweight Markdown document placed at the root of your domain (e.g., <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">https://yourdomain.com/llms.txt</code>). It provides LLMs with a clean, unbloated summary of your website&apos;s key pages, documentation, pricing model, and brand identity.
            </p>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              By serving a valid <code className="bg-surface-2 px-1.5 py-0.5 rounded text-accent">llms.txt</code> file, you reduce token consumption for AI agents while ensuring they extract accurate, uncorrupted facts about your business.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
              4. Technical Performance &amp; Core Web Vitals (LCP, CLS, INP)
            </h3>
            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              Search engine crawlers and real human users demand lightning-fast page loading speeds. Our AI website grader tests your domain against official Google PageSpeed Core Web Vitals:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-ink-2">
              <li><strong>Largest Contentful Paint (LCP):</strong> Measures main content loading speed. Target: under 2.5 seconds.</li>
              <li><strong>Interaction to Next Paint (INP):</strong> Replaced FID as a key responsiveness benchmark. Target: under 200 milliseconds.</li>
              <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual layout stability during page load. Target: under 0.1.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
              5. Step-by-Step Checklist to Improve Your Website AI SEO Rating
            </h3>
            <ol className="list-decimal pl-6 space-y-3 text-sm text-ink-2">
              <li><strong>Run a Free Audit:</strong> Enter your domain into the <a href="#top" className="text-accent underline font-semibold">AI Scan My Site tool</a> above to get an instant breakdown of your technical health score.</li>
              <li><strong>Update robots.txt:</strong> Verify that AI crawlers like <code className="bg-surface-2 px-1 rounded text-accent">GPTBot</code> are set to <code className="text-emerald-400">Allow: /</code>.</li>
              <li><strong>Implement Structured Data:</strong> Add <code className="bg-surface-2 px-1 rounded text-accent">Organization</code>, <code className="bg-surface-2 px-1 rounded text-accent">WebSite</code>, and <code className="bg-surface-2 px-1 rounded text-accent">WebApplication</code> JSON-LD schemas to your HTML <code className="bg-surface-2 px-1 rounded text-accent">&lt;head&gt;</code>.</li>
              <li><strong>Deploy llms.txt:</strong> Create a concise Markdown overview at your domain root detailing your core products and contact channels.</li>
              <li><strong>Optimize Page Speed:</strong> Compress images to WebP/AVIF formats and eliminate render-blocking scripts to pass Core Web Vitals.</li>
            </ol>
          </section>

          {/* Footer Note */}
          <footer className="pt-6 border-t border-border text-center text-xs text-ink-3">
            <p>Ready to audit your site? Scroll up to run a free, instant 12-point AI SEO check in under 10 seconds.</p>
          </footer>

        </article>
      </section>
    </>
  );
}
