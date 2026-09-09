import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://aiscanmysite.com';
  const buildDate = new Date().toUTCString();

  const articles = [
    {
      title: 'AI SEO vs Traditional SEO: What Is Changing in 2026',
      slug: 'ai-seo-vs-traditional-seo',
      description: 'Discover how AI search engines like ChatGPT, Perplexity, and Gemini are transforming traditional SEO into AEO & GEO.',
      date: 'Wed, 01 Sep 2026 00:00:00 GMT'
    },
    {
      title: 'How to Check if Your Website Is Visible to ChatGPT & AI Search',
      slug: 'how-to-check-if-website-visible-to-chatgpt',
      description: 'A step-by-step guide to testing your domain for AI bot access, robots.txt blocks, and structured schema data.',
      date: 'Mon, 24 Aug 2026 00:00:00 GMT'
    },
    {
      title: 'What Is AEO? Answer Engine Optimization Explained',
      slug: 'what-is-aeo-answer-engine-optimization',
      description: 'Learn how to optimize your content for AI answer engines so AI models directly quote your domain as a primary source.',
      date: 'Fri, 15 Aug 2026 00:00:00 GMT'
    },
    {
      title: 'Does llms.txt Actually Help with AI Search Indexing?',
      slug: 'does-llmstxt-actually-help-with-ai-search',
      description: 'An empirical look at the llms.txt standard and how AI crawlers utilize clean markdown context files.',
      date: 'Tue, 10 Aug 2026 00:00:00 GMT'
    }
  ];

  const itemsXml = articles
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${baseUrl}/blog/${item.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${item.slug}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.date}</pubDate>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Scan My Site — Preferred AI &amp; SEO Insights</title>
    <link>${baseUrl}</link>
    <description>Official RSS publication feed for AI Scan My Site. Free AI SEO, AEO, and technical audit benchmarks.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
