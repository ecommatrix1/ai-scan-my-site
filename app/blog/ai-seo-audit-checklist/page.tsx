import type { Metadata } from 'next';
import Link from 'next/link';
import { GooglePreferredTrustBlock } from '@/components/GooglePreferredTrustBlock';

export const metadata: Metadata = {
  title: 'AI SEO Audit Checklist: 50+ Things to Check for Google, ChatGPT & AI Search (2026)',
  description: 'Complete 50-point AI SEO audit checklist for 2026. Audit technical SEO, AI crawler accessibility, AEO, GEO, structured data, llms.txt, and agents.json.',
  keywords: [
    'AI SEO audit checklist',
    'AI website audit checklist',
    'AEO checklist',
    'GEO checklist',
    'technical SEO checklist for AI',
    'ChatGPT website audit',
    'Perplexity SEO checklist',
    'llms.txt audit',
    'schema audit for AI',
    'AI search visibility checklist'
  ].join(', '),
  alternates: {
    canonical: 'https://aiscanmysite.com/blog/ai-seo-audit-checklist',
  },
  openGraph: {
    title: 'AI SEO Audit Checklist: 50+ Things to Check for Google, ChatGPT & AI Search',
    description: 'Master technical SEO, AI crawler access, AEO, GEO, schema markup, and llms.txt context specifications with our comprehensive 50-point checklist.',
    url: 'https://aiscanmysite.com/blog/ai-seo-audit-checklist',
    siteName: 'AI Scan My Site',
    type: 'article',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://aiscanmysite.com/blog/ai-seo-audit-checklist#article',
      headline: 'AI SEO Audit Checklist: 50+ Things to Check for Google, ChatGPT, Perplexity & AI Search',
      description: 'A comprehensive technical and content checklist for auditing website readiness across search engines and AI answer platforms.',
      url: 'https://aiscanmysite.com/blog/ai-seo-audit-checklist',
      datePublished: '2026-09-10',
      dateModified: '2026-09-10',
      author: {
        '@type': 'Organization',
        name: 'AI Scan My Site Technical Editorial Team',
        url: 'https://aiscanmysite.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Scan My Site',
        url: 'https://aiscanmysite.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aiscanmysite.com/favicon.svg',
        },
      },
      mainEntityOfPage: 'https://aiscanmysite.com/blog/ai-seo-audit-checklist',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://aiscanmysite.com/blog/ai-seo-audit-checklist#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an AI SEO audit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AI SEO audit checks whether a website can be effectively crawled, understood, evaluated, and potentially surfaced by both traditional search engines and AI-powered search experiences. It combines technical SEO, content quality, structured data, AI crawler accessibility, AEO, GEO, and search visibility signals.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is an AI SEO audit different from a traditional SEO audit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional SEO audits focus on keyword density, backlink counts, and Googlebot indexing. An AI SEO audit checks AI crawler permissions in robots.txt (GPTBot, PerplexityBot, ClaudeBot), llms.txt context manifests, JSON-LD schema entity graphs, and direct answer extractability for generative engines.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does schema markup guarantee ChatGPT rankings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Schema markup (JSON-LD) provides machine readability so search models can correctly resolve entities (products, prices, organizations, authors). It eliminates ambiguity but does not guarantee automated ranking or citations.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between llms.txt and agents.json?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'llms.txt provides clean markdown context summaries of website content for Large Language Model indexing, whereas agents.json specifies action manifests and API capabilities for autonomous AI agents to perform tasks.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://aiscanmysite.com/blog/ai-seo-audit-checklist#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aiscanmysite.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://aiscanmysite.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AI SEO Audit Checklist',
          item: 'https://aiscanmysite.com/blog/ai-seo-audit-checklist',
        },
      ],
    },
  ],
};

export default function AISEOAuditChecklistArticle() {
  return (
    <div className="min-h-screen bg-[#04100D] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Navigation Bar */}
      <header className="border-b border-emerald-900/40 bg-[#04100D]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              AI Scan My Site
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/blog" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              Run Free AI Audit
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Article Breadcrumbs */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-400">Blog</Link>
          <span>/</span>
          <span className="text-emerald-400 font-medium truncate">AI SEO Audit Checklist</span>
        </nav>

        {/* Hero Article Header */}
        <header className="mb-10 border-b border-emerald-900/30 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Pillar Checklist • Updated 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            AI SEO Audit Checklist: 50+ Things to Check for Google, ChatGPT, Perplexity & AI Search
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            A comprehensive technical and content checklist for auditing website readiness across traditional search engines and conversational AI platforms.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>By <strong className="text-slate-200">AI Scan My Site Technical Team</strong></span>
            <span>•</span>
            <span>15 min read</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Free Technical Audit</span>
          </div>
        </header>

        {/* Direct Answer Box (For Snippets & AI Extraction) */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900/80 border border-emerald-500/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-sm uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-2">
            <span>💡</span> Direct Answer: What Is an AI SEO Audit?
          </h2>
          <p className="text-slate-200 leading-relaxed font-normal">
            An <strong>AI SEO audit</strong> checks whether a website can be effectively crawled, understood, evaluated, and potentially surfaced by both traditional search engines and AI-powered search experiences. It combines technical SEO, content quality, structured data, AI crawler accessibility, AEO, GEO, and search visibility signals.
          </p>
        </div>

        {/* Core Article Body */}
        <article className="prose prose-invert max-w-none space-y-12 text-slate-300 leading-relaxed">
          
          {/* SECTION 1: TECHNICAL SEO */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              1. Technical SEO Foundation (11 Points)
            </h2>
            <p>
              Traditional technical SEO forms the prerequisite layer for any website. If search engines or LLM crawlers encounter server timeouts, broken canonicals, or invalid HTTP responses, downstream AI search optimization cannot function.
            </p>
            <ul className="space-y-3 font-normal text-slate-200 pl-2">
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.1 HTTPS Encryption:</strong> Enforce valid SSL/TLS encryption across all routes with 301 redirects from HTTP to HTTPS.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.2 Indexability & Meta Robots:</strong> Verify that public pages do not contain accidental <code>noindex</code> or <code>nofollow</code> directives.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.3 Valid robots.txt:</strong> Maintain a syntactically correct <code>robots.txt</code> file at your domain root with a clear <code>Sitemap:</code> reference.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.4 XML Sitemap Health:</strong> Ensure <code>/sitemap.xml</code> contains canonical 200 HTTP status URLs and is submitted to search consoles.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.5 Canonical URL Consistency:</strong> Ensure every page specifies an absolute <code>rel="canonical"</code> URL matching the preferred domain version.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.6 Clean HTTP Status Codes:</strong> Eliminate 404 Not Found errors and 5xx server exceptions on core content pages.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.7 Minimal Redirect Chains:</strong> Avoid multi-hop 301/302 redirect chains that waste crawler budget.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.8 JavaScript SSR Rendering:</strong> Ensure critical text content and metadata are rendered server-side so bots without heavy JS execution can extract content.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.9 Mobile Usability:</strong> Ensure viewport tags are configured correctly (<code>width=device-width</code>) with responsive CSS layout touch targets.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.10 Core Web Vitals (LCP, CLS, INP):</strong> Optimize Largest Contentful Paint (&lt; 2.5s), Cumulative Layout Shift (&lt; 0.1), and Interaction to Next Paint (&lt; 200ms).
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">1.11 Server Speed & TTFB:</strong> Maintain Time to First Byte under 800ms via CDN caching and optimized database queries.
              </li>
            </ul>
          </section>

          {/* OFFICIAL GOOGLE PREFERRED SOURCE TRUST BLOCK */}
          <GooglePreferredTrustBlock />

          {/* SECTION 2: AI CRAWLER ACCESSIBILITY */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              2. AI Crawler Accessibility (8 Points)
            </h2>
            <p>
              Many site owners unknowingly block AI search crawlers in their <code>robots.txt</code> file while attempting to block training data scrapers. An AI SEO audit explicitly verifies crawler permissions for conversational agents.
            </p>
            <ul className="space-y-3 font-normal text-slate-200 pl-2">
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.1 AI User-Agent Permissions:</strong> Verify rules for <code>GPTBot</code>, <code>ChatGPT-User</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code>, and <code>Google-Extended</code> in <code>robots.txt</code>.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.2 High-Value Content Access:</strong> Ensure documentation, pricing pages, and product guides are accessible to AI user-agents.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.3 Consistent Server Responses:</strong> Confirm that requests with AI user-agent headers receive standard 200 OK responses without firewall CAPTCHA blocks.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.4 Unblocked Asset Dependencies:</strong> Ensure CSS stylesheets and static JSON API endpoints are not blocked by crawler disallow rules.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.5 Client-Only Hydration Safety:</strong> Verify that content is not hidden behind user click actions or unrendered client-side React state wrappers.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.6 Clean HTML Text Extraction:</strong> Ensure primary article text is contained inside standard semantic HTML elements (<code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>-<code>&lt;h3&gt;</code>, <code>&lt;article&gt;</code>).
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.7 Sitemap Discovery for AI Indexers:</strong> Provide a direct link to XML sitemaps inside <code>robots.txt</code> for fast AI crawler discovery.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">2.8 AI Crawler Rate Limits:</strong> Ensure web hosting server firewalls do not rate-limit legitimate search agent user-agents.
              </li>
            </ul>
          </section>

          {/* SECTION 3: CONTENT & ENTITY CLARITY */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              3. Content & Entity Clarity (9 Points)
            </h2>
            <p>
              AI search engines use vector embeddings to match user queries with web content. Ambiguous, unfocused, or fluff-filled articles fail semantic vector reranking.
            </p>
            <ul className="space-y-3 font-normal text-slate-200 pl-2">
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.1 Single Core Topic Focus:</strong> Each page should address one primary subject with clear thematic boundaries.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.2 Search Intent Alignment:</strong> Match informational vs. transactional search intent without forced keyword padding.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.3 Factual & Verifiable Claims:</strong> Ensure technical statements and statistics are accurate and cross-verifiable.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.4 E-E-A-T Author Credentials:</strong> Display clear author names, publisher credentials, and publication dates.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.5 Entity Relationship Clarity:</strong> Connect brand names, key concepts, and product names with clear semantic syntax.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.6 Topical Depth:</strong> Provide comprehensive coverage of core sub-topics rather than shallow repetitive paragraphs.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.7 Original Insights & Data:</strong> Include first-party data, original charts, or unique analysis that cannot be duplicated by simple LLM training data.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.8 Real Product/Service Examples:</strong> Illustrate concepts with verified, concrete real-world use cases.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">3.9 Unambiguous Answers:</strong> State direct answers immediately following question subheadings.
              </li>
            </ul>
          </section>

          {/* SECTION 4: AEO */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              4. Answer Engine Optimization / AEO (6 Points)
            </h2>
            <p>
              Answer Engine Optimization (AEO) prepares content for direct snippet extraction in voice search and conversational AI answers.
            </p>
            <ul className="space-y-3 font-normal text-slate-200 pl-2">
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.1 Direct Answer Summary Boxes:</strong> Place concise 2-sentence summary boxes at the top of key article sections.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.2 Question-Based Headings:</strong> Format H2/H3 subheadings as natural language questions (e.g., <code>What is AEO?</code>).
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.3 Concise Definition Snippets:</strong> Start answer paragraphs with a clear, standalone subject definition.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.4 Visible FAQ Sections:</strong> Include visible FAQ sections matching schema markup.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.5 Structured Tables & Lists:</strong> Present technical comparisons using clean HTML <code>&lt;table&gt;</code> and <code>&lt;ul&gt;</code> tags.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">4.6 Conversational Search Intent:</strong> Target natural voice-search phrasing alongside technical keyword terms.
              </li>
            </ul>
          </section>

          {/* SECTION 5: GEO */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              5. Generative Engine Optimization / GEO (6 Points)
            </h2>
            <p>
              Generative Engine Optimization (GEO) focuses on building entity authority so generative AI search overviews cite your brand as an authoritative source.
            </p>
            <ul className="space-y-3 font-normal text-slate-200 pl-2">
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.1 Factual Content Density:</strong> Maintain high factual density with concrete measurements and zero generic fluff.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.2 Authoritative Source References:</strong> Cite official documentation, W3C standards, and technical specifications.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.3 Brand Entity Disambiguation:</strong> Use consistent brand name syntax across all digital footprints.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.4 Original Research Citations:</strong> Publish transparent methodology studies that invite third-party citations.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.5 Verifiable Statistics:</strong> Include cited numbers and date timestamps.
              </li>
              <li className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <strong className="text-emerald-400">5.6 Summarizable Passage Architecture:</strong> Structure long paragraphs into self-contained 3-sentence passages.
              </li>
            </ul>
          </section>

          {/* SECTION 6: STRUCTURED DATA */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              6. Structured Data & Schema.org Realities
            </h2>
            <p>
              Structured data (JSON-LD) builds entity clarity for machine indexers. However, it is essential to understand that schema markup provides machine readability, <strong>not guaranteed search rankings or automated AI citations</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-bold text-emerald-400 mb-1 text-base">Organization Schema</h3>
                <p className="text-xs text-slate-300">
                  Defines brand name, logo URL, official website, and official social media profiles (<code>sameAs</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-bold text-emerald-400 mb-1 text-base">WebSite Schema</h3>
                <p className="text-xs text-slate-300">
                  Establishes domain identity and search query action templates (<code>SearchAction</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-bold text-emerald-400 mb-1 text-base">WebApplication / SoftwareApplication</h3>
                <p className="text-xs text-slate-300">
                  Describes software tool features, operating systems, and price offers (e.g., <code>price: "0"</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-bold text-emerald-400 mb-1 text-base">Article & BreadcrumbList Schema</h3>
                <p className="text-xs text-slate-300">
                  Identifies editorial content, publication dates, author credentials, and navigational hierarchy.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-slate-300">
              <strong className="text-emerald-400 font-bold block mb-1">⚠️ Important Rule for FAQPage Schema:</strong>
              Only implement <code>FAQPage</code> schema when the questions and answers are genuinely visible in the page's HTML body. Do not embed hidden FAQ schema scripts.
            </div>
          </section>

          {/* SECTION 7: LLMS.TXT STANDARD */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              7. The llms.txt Context Standard
            </h2>
            <p>
              <code>llms.txt</code> is an emerging web standard designed to serve lightweight markdown summaries of website documentation and key pages directly to LLM crawlers.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li><strong className="text-white">Purpose:</strong> Provides a clean, unstyled markdown index of a website's core pages, APIs, and product offerings so LLM context windows do not waste token capacity parsing heavy HTML/JS templates.</li>
              <li><strong className="text-white">Implementation:</strong> Placed at your domain root (e.g., <code>https://aiscanmysite.com/llms.txt</code>) following standardized markdown H1/H2 syntax.</li>
              <li><strong className="text-white">Limitations:</strong> <code>llms.txt</code> is an informational context feed—it does <strong>not</strong> override <code>robots.txt</code> block rules or guarantee indexing.</li>
              <li><strong className="text-white">Validation:</strong> Test markdown formatting to ensure links are absolute and syntactically clean. Generate your manifest using our free <Link href="/llms-txt-generator" className="text-emerald-400 underline">llms.txt Generator</Link>.</li>
            </ul>
          </section>

          {/* SECTION 8: AGENTS.JSON PROTOCOL */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-4">
              8. The agents.json Protocol
            </h2>
            <p>
              While <code>llms.txt</code> provides readable text context, <code>agents.json</code> serves a distinct role: it defines operational action manifests for autonomous AI agents.
            </p>
            
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-sm">
              <h3 className="font-bold text-emerald-400 text-base">Key Differences Between llms.txt & agents.json</h3>
              <p>
                - <strong>llms.txt (Markdown Context Feed):</strong> Formatted for LLM text understanding, summarizing page titles, documentation links, and brand descriptions.<br />
                - <strong>agents.json (Machine Action Manifest):</strong> Formatted in structured JSON to define API endpoints, authentication mechanisms, and functional capabilities for autonomous AI agents performing transactions.
              </p>
            </div>
          </section>

          {/* SECTION 9: SUMMARY & TOOL CTA */}
          <section className="space-y-6 pt-6 border-t border-emerald-900/40">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Audit Your Website Now for Free
            </h2>
            <p>
              Don't guess whether your site is accessible to AI search engines. Run a free real-time audit using <strong>AI Scan My Site</strong> to inspect robots.txt rules, llms.txt manifests, JSON-LD schemas, and PageSpeed Core Web Vitals in 10 seconds.
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900/60 border border-emerald-500/50 text-center space-y-4 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Run Your Free AI SEO Audit</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Instant diagnostic report for ChatGPT, Perplexity, Gemini, and Google search readiness.
              </p>
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
                >
                  <span>⚡ Run Free AI Scan on AIScanMySite.com</span>
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Supporting Cluster Internal Navigation */}
        <div className="mt-16 pt-8 border-t border-emerald-900/40 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">Complete AI SEO Cluster Articles &amp; Guides:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <Link href="/blog/ai-search-optimization-beginners" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              AI Search Optimization for Beginners
            </Link>
            <Link href="/blog/ai-seo-vs-traditional-seo" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              AI SEO vs. Traditional SEO
            </Link>
            <Link href="/blog/can-ai-crawlers-read-javascript-websites" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Can AI Crawlers Read JavaScript Websites?
            </Link>
            <Link href="/blog/what-is-aeo-answer-engine-optimization" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              What is Answer Engine Optimization (AEO)?
            </Link>
            <Link href="/blog/what-is-geo-generative-engine-optimization" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              What is Generative Engine Optimization (GEO)?
            </Link>
            <Link href="/blog/does-robotstxt-block-chatgpt" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Does robots.txt Block ChatGPT?
            </Link>
            <Link href="/blog/does-llmstxt-actually-help-with-ai-search" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Does llms.txt Help AI Search?
            </Link>
            <Link href="/blog/does-schema-help-ai-search" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Does Schema Markup Help AI Search?
            </Link>
            <Link href="/blog/how-to-check-if-website-visible-to-chatgpt" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              How to Check ChatGPT Website Visibility
            </Link>
            <Link href="/blog/is-your-website-visible-to-chatgpt-how-to-check" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Is Your Site Visible to ChatGPT?
            </Link>
            <Link href="/blog/why-isnt-my-website-showing-up-in-chatgpt" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-all">
              Why Isn't My Website Showing Up in ChatGPT?
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-emerald-900/30 mt-20 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Scan My Site. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <Link href="/aeo-checker" className="hover:text-emerald-400">AEO Checker</Link>
            <Link href="/geo-checker" className="hover:text-emerald-400">GEO Checker</Link>
            <Link href="/llms-txt-generator" className="hover:text-emerald-400">llms.txt Generator</Link>
            <Link href="/speed-test" className="hover:text-emerald-400">Speed Test</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
