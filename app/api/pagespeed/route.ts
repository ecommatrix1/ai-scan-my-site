import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Shape contract consumed by AIScanMySite.tsx (pageSpeedMetrics state).
export interface PageSpeedMetrics {
  score: number;             // PSI overall performance score 0-100
  lcp: string;               // Largest Contentful Paint, seconds
  fcp: string;               // First Contentful Paint, seconds
  cls: string;               // Cumulative Layout Shift
  inp: string;               // Interaction to Next Paint, ms
  ttfb: string;              // Time to First Byte, ms
  isLiveGoogleData: boolean; // true when served from the real Google PSI API
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    let targetUrl: string;
    try {
      targetUrl = url.includes('://') ? url : `https://${url}`;
      new URL(targetUrl);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid URL format' }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.GOOGLE_PSI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json({
        success: false,
        error: 'Google PageSpeed Insights API key not configured.',
        code: 'NOT_CONFIGURED',
        message: 'Set GOOGLE_PSI_API_KEY in your environment variables to enable real PageSpeed data.',
      }, { status: 503 });
    }

    // Call Google PageSpeed Insights API
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${apiKey}&strategy=mobile&category=performance`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let psiResponse: Response;
    try {
      psiResponse = await fetch(psiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        return NextResponse.json({ success: false, error: 'Google PSI API request timed out.', code: 'TIMEOUT' }, { status: 504 });
      }
      return NextResponse.json({ success: false, error: 'Failed to reach Google PSI API.', code: 'NETWORK_ERROR' }, { status: 502 });
    }

    if (!psiResponse.ok) {
      const status = psiResponse.status;
      let code = 'API_ERROR';
      let message = `Google PSI API error: ${status}`;

      if (status === 400) { code = 'INVALID_URL'; message = 'Invalid URL for PageSpeed analysis.'; }
      else if (status === 403 || status === 429) { code = 'RATE_LIMITED'; message = 'Google PSI API quota exceeded or rate limited.'; }
      else if (status >= 500) { code = 'API_UNAVAILABLE'; message = 'Google PSI API temporarily unavailable.'; }

      return NextResponse.json({ success: false, error: message, code }, { status: status >= 500 ? 502 : 400 });
    }

    let psiData: any;
    try {
      psiData = await psiResponse.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid response from Google PSI API.', code: 'MALFORMED_RESPONSE' }, { status: 502 });
    }

    // Extract Lighthouse metrics from PSI response
    const lhr = psiData?.lighthouseResult;
    if (!lhr) {
      return NextResponse.json({ success: false, error: 'No Lighthouse data in PSI response.', code: 'NO_LIGHTHOUSE_DATA' }, { status: 502 });
    }

    const categories = lhr.categories;
    const audits = lhr.audits;

    const score = Math.round((categories?.performance?.score ?? 0) * 100);

    const getNumeric = (audit: any): number | null =>
      audit && typeof audit.numericValue === 'number' ? audit.numericValue : null;

    const lcpVal = getNumeric(audits['largest-contentful-paint']);
    const fcpVal = getNumeric(audits['first-contentful-paint']);
    const clsVal = getNumeric(audits['cumulative-layout-shift']);
    const inpVal = getNumeric(audits['interaction-to-next-paint']);
    const ttfbVal = getNumeric(audits['server-response-time'] || audits['time-to-first-byte']);

    const data: PageSpeedMetrics = {
      score,
      lcp: lcpVal !== null ? (lcpVal / 1000).toFixed(1) : '—',
      fcp: fcpVal !== null ? (fcpVal / 1000).toFixed(1) : '—',
      cls: clsVal !== null ? clsVal.toFixed(2) : '—',
      inp: inpVal !== null ? Math.round(inpVal).toString() : '—',
      ttfb: ttfbVal !== null ? Math.round(ttfbVal).toString() : '—',
      isLiveGoogleData: true,
    };

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('PageSpeed API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch PageSpeed data', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}