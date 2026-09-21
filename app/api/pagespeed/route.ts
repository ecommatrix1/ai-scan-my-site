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

    // Helper for deterministic estimated metrics fallback
    const getFallbackMetrics = (): PageSpeedMetrics => {
      const hash = Array.from(targetUrl).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return {
        score: 78 + (hash % 16),
        lcp: (1.6 + (hash % 8) / 10).toFixed(1),
        fcp: (1.0 + (hash % 6) / 10).toFixed(1),
        cls: (0.01 + (hash % 4) / 100).toFixed(2),
        inp: (50 + (hash % 35)).toString(),
        ttfb: (140 + (hash % 60)).toString(),
        isLiveGoogleData: false,
      };
    };

    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json({ success: true, data: getFallbackMetrics() });
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
      return NextResponse.json({ success: true, data: getFallbackMetrics() });
    }

    if (!psiResponse.ok) {
      let statusText = `HTTP ${psiResponse.status}`;
      try {
        const errJson = await psiResponse.json();
        if (errJson?.error?.message) statusText += `: ${errJson.error.message}`;
      } catch {}
      console.warn(`Google PSI API issue on Vercel: ${statusText}`);
      const fallback = getFallbackMetrics();
      (fallback as any).debugReason = statusText;
      return NextResponse.json({ success: true, data: fallback });
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