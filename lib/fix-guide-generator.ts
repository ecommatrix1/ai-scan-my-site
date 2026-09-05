import type { ScanCheck } from '../lib-scanner';

const PLATFORM_GUIDES: Record<string, Record<string, string>> = {
  robots: {
    wordpress: 'Go to Settings > Reading, or use the Yoast SEO plugin > Tools > File Editor.',
    shopify: 'In your Shopify Admin, go to Online Store > Themes > Actions > Edit Code. Find robots.txt.liquid.',
    nextjs: 'Create or edit public/robots.txt in your project root.',
    generic: 'Upload a robots.txt file to the root directory of your web server (same level as index.html).',
  },
  llms: {
    wordpress: 'Upload llms.txt to your WordPress root directory via FTP or the File Manager in your hosting cPanel.',
    shopify: 'In Shopify Admin > Settings > Files, upload the llms.txt file. Then redirect /llms.txt to it.',
    nextjs: 'Place llms.txt in the /public folder. It will be served at /llms.txt automatically.',
    generic: 'Upload llms.txt to the root directory of your web server.',
  },
};

export function generateFixGuide(check: ScanCheck, domain: string): string {
  return `AI SCAN MY SITE — Personalized Fix Guide\nIssue: ${check.title}\nSeverity: ${check.severity}\nDomain: ${domain}\n\nDescription:\n${check.description}\n\nFix Code:\n${check.fixCode || ''}`;
}

export function downloadFixGuide(check: ScanCheck, domain: string): void {
  const content = generateFixGuide(check, domain);
  const filename = `fix-guide-${check.category}-${domain.replace(/[^a-z0-9]/gi, '-')}.txt`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
