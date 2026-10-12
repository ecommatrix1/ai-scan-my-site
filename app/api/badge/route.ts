import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'Website';
  const scoreParam = searchParams.get('score');
  
  let score = 85;
  if (scoreParam) {
    const parsed = parseInt(scoreParam, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      score = parsed;
    }
  }

  // Color logic based on score
  let scoreColor = '#10B981'; // Green
  let gradeText = 'A';
  if (score < 50) {
    scoreColor = '#EF4444'; // Red
    gradeText = 'F';
  } else if (score < 70) {
    scoreColor = '#F59E0B'; // Amber
    gradeText = 'C';
  } else if (score < 85) {
    scoreColor = '#06B6D4'; // Cyan
    gradeText = 'B';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="28" viewBox="0 0 180 28" fill="none" role="img" aria-label="AI Search Readiness: ${score}/100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${scoreColor}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${scoreColor}" stop-opacity="1" />
    </linearGradient>
  </defs>
  <rect width="180" height="28" rx="6" fill="url(#grad)" stroke="#334155" stroke-width="1"/>
  <rect x="110" y="2" width="68" height="24" rx="4" fill="url(#glow)"/>
  
  <!-- Left text: AI Search Ready -->
  <g fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.4">
    <text x="12" y="18" fill="#f8fafc">AI READY</text>
  </g>

  <!-- Right text: Score -->
  <g fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="800">
    <text x="122" y="18" fill="#ffffff" text-anchor="start">${score}/100</text>
  </g>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
