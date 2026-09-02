import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { message: "Please provide a valid website URL." },
        { status: 400 }
      );
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    try {
      new URL(formattedUrl);
    } catch {
      return NextResponse.json(
        { message: "Invalid URL format. Please enter a valid domain or web address." },
        { status: 400 }
      );
    }

    // Hash or deterministic score based on URL length/chars for consistent mock results
    const hash = formattedUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const performance = 70 + (hash % 28);
    const seo = 65 + ((hash * 3) % 32);
    const accessibility = 75 + ((hash * 7) % 23);
    const security = 80 + ((hash * 11) % 19);

    const recommendations = [
      {
        category: "Performance",
        issue: "Unoptimized large image assets found on homepage header.",
        impact: "High" as const,
        fixCode: `<Image src="/hero.png" width={1200} height={600} priority placeholder="blur" />`,
      },
      {
        category: "SEO",
        issue: "Missing OpenGraph meta tags for social media link previews.",
        impact: "High" as const,
        fixCode: `export const metadata = {\n  title: "AI Scan My Site",\n  openGraph: {\n    title: "AI Scan My Site",\n    images: ["/og-image.png"]\n  }\n};`,
      },
      {
        category: "Accessibility",
        issue: "Interactive buttons missing explicit aria-label attributes.",
        impact: "Medium" as const,
        fixCode: `<button aria-label="Submit URL for site scan">Scan Site</button>`,
      },
      {
        category: "Security",
        issue: "Strict-Transport-Security (HSTS) header not configured.",
        impact: "Medium" as const,
        fixCode: `// next.config.js headers\n{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }`,
      },
    ];

    return NextResponse.json({
      url: formattedUrl,
      timestamp: new Date().toISOString(),
      scores: {
        performance,
        seo,
        accessibility,
        security,
      },
      summary: `AI Scan finished for ${formattedUrl}. Overall site health is strong (${seo}/100 SEO score). Critical fixes involve adding OpenGraph metadata for viral reach and optimizing hero images for speed.`,
      recommendations,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error while scanning site." },
      { status: 500 }
    );
  }
}
