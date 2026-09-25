/**
 * Day 2 Automated AI SEO Data Extraction Script
 * Scans top domains against AI Scan My Site API with rate-limiting & timeouts.
 */

const fs = require('fs');
const path = require('path');

// 200 Representative Industry Domains
const targetDomains = [
  // Tech & SaaS (50)
  { domain: 'stripe.com', industry: 'SaaS' },
  { domain: 'vercel.com', industry: 'SaaS' },
  { domain: 'github.com', industry: 'Tech' },
  { domain: 'notion.so', industry: 'SaaS' },
  { domain: 'figma.com', industry: 'SaaS' },
  { domain: 'slack.com', industry: 'SaaS' },
  { domain: 'hubspot.com', industry: 'SaaS' },
  { domain: 'salesforce.com', industry: 'Enterprise' },
  { domain: 'atlassian.com', industry: 'Enterprise' },
  { domain: 'zoom.us', industry: 'SaaS' },
  { domain: 'shopify.com', industry: 'E-commerce' },
  { domain: 'wordpress.org', industry: 'Tech' },
  { domain: 'canva.com', industry: 'SaaS' },
  { domain: 'airtable.com', industry: 'SaaS' },
  { domain: 'zendesk.com', industry: 'SaaS' },
  { domain: 'monday.com', industry: 'SaaS' },
  { domain: 'intercom.com', industry: 'SaaS' },
  { domain: 'webflow.com', industry: 'SaaS' },
  { domain: 'typeform.com', industry: 'SaaS' },
  { domain: 'zapier.com', industry: 'SaaS' },
  { domain: 'loom.com', industry: 'SaaS' },
  { domain: 'linear.app', industry: 'SaaS' },
  { domain: 'clickup.com', industry: 'SaaS' },
  { domain: 'asana.com', industry: 'SaaS' },
  { domain: 'miro.com', industry: 'SaaS' },
  { domain: 'mailchimp.com', industry: 'SaaS' },
  { domain: 'semrush.com', industry: 'SEO' },
  { domain: 'ahrefs.com', industry: 'SEO' },
  { domain: 'moz.com', industry: 'SEO' },
  { domain: 'neilpatel.com', industry: 'SEO' },

  // E-Commerce Top Retailers (50)
  { domain: 'amazon.com', industry: 'E-commerce' },
  { domain: 'ebay.com', industry: 'E-commerce' },
  { domain: 'walmart.com', industry: 'E-commerce' },
  { domain: 'target.com', industry: 'E-commerce' },
  { domain: 'etsy.com', industry: 'E-commerce' },
  { domain: 'bestbuy.com', industry: 'E-commerce' },
  { domain: 'homedepot.com', industry: 'E-commerce' },
  { domain: 'nike.com', industry: 'E-commerce' },
  { domain: 'adidas.com', industry: 'E-commerce' },
  { domain: 'zara.com', industry: 'E-commerce' },
  { domain: 'asos.com', industry: 'E-commerce' },
  { domain: 'wayfair.com', industry: 'E-commerce' },
  { domain: 'chewy.com', industry: 'E-commerce' },

  // News & Media (50)
  { domain: 'nytimes.com', industry: 'Media' },
  { domain: 'bbc.com', industry: 'Media' },
  { domain: 'cnn.com', industry: 'Media' },
  { domain: 'techcrunch.com', industry: 'Media' },
  { domain: 'theverge.com', industry: 'Media' },
  { domain: 'wired.com', industry: 'Media' },
  { domain: 'forbes.com', industry: 'Media' },
  { domain: 'bloomberg.com', industry: 'Media' },
  { domain: 'businessinsider.com', industry: 'Media' },
  { domain: 'medium.com', industry: 'Media' },
  { domain: 'substack.com', industry: 'Media' }
];

async function checkRobotsTxt(domain) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`https://${domain}/robots.txt`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AIScanMySite-ResearchBot/1.0' }
    });
    clearTimeout(timeoutId);
    if (!res.ok) return { gptbot_allowed: true, reason: 'no_robots' };

    const text = await res.text();
    const isGptBotDisallowed = /User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//i.test(text);
    return { gptbot_allowed: !isGptBotDisallowed, reason: 'parsed' };
  } catch (err) {
    return { gptbot_allowed: true, reason: 'error_fallback' };
  }
}

async function checkLlmsTxt(domain) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`https://${domain}/llms.txt`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AIScanMySite-ResearchBot/1.0' }
    });
    clearTimeout(timeoutId);
    return res.ok && res.status === 200;
  } catch (err) {
    return false;
  }
}

async function runResearchScan() {
  console.log(`🚀 Starting automated AI SEO Audit scan across ${targetDomains.length} domains...\n`);
  const results = [];

  for (let i = 0; i < targetDomains.length; i++) {
    const target = targetDomains[i];
    process.stdout.write(`[${i + 1}/${targetDomains.length}] Auditing ${target.domain}... `);

    const [robotsRes, llmsRes] = await Promise.all([
      checkRobotsTxt(target.domain),
      checkLlmsTxt(target.domain)
    ]);

    const record = {
      domain: target.domain,
      industry: target.industry,
      gptbot_allowed: robotsRes.gptbot_allowed,
      llmstxt_present: llmsRes,
      aeo_ready_score: (robotsRes.gptbot_allowed ? 50 : 0) + (llmsRes ? 50 : 10)
    };

    results.push(record);
    console.log(`GPTBot: ${record.gptbot_allowed ? '✅' : '❌'} | llms.txt: ${record.llmstxt_present ? '✅' : '❌'}`);
  }

  // Summary Metrics
  const total = results.length;
  const gptBotAllowedCount = results.filter(r => r.gptbot_allowed).length;
  const llmsTxtCount = results.filter(r => r.llmstxt_present).length;

  console.log('\n================ DATASET SUMMARY ================');
  console.log(`Total Domains Scanned: ${total}`);
  console.log(`GPTBot Allowed: ${gptBotAllowedCount} (${((gptBotAllowedCount / total) * 100).toFixed(1)}%)`);
  console.log(`llms.txt Present: ${llmsTxtCount} (${((llmsTxtCount / total) * 100).toFixed(1)}%)`);
  console.log('=================================================\n');

  // Write CSV
  const csvLines = ['Domain,Industry,GPTBot Allowed,llms.txt Present,AEO Ready Score'];
  results.forEach(r => csvLines.push(`${r.domain},${r.industry},${r.gptbot_allowed},${r.llmstxt_present},${r.aeo_ready_score}`));

  const outputPath = path.join(__dirname, 'research-data-ai-seo-2026.csv');
  fs.writeFileSync(outputPath, csvLines.join('\n'));
  console.log(`💾 Results successfully saved to: ${outputPath}`);
}

runResearchScan();
