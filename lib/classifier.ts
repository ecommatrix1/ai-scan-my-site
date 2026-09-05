export type WebsiteCategory =
  | 'SAAS_TOOL'
  | 'ECOMMERCE'
  | 'PUBLISHER_BLOG'
  | 'AGENCY_SERVICES'
  | 'GENERIC_COMPANY';

export interface SiteSignals {
  url: string;
  origin: string;
  finalUrl: string;

  title: string;
  description: string;

  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  jsonLdTypes: string[];

  links: Array<{
    href: string;
    text: string;
  }>;

  routeSignals: {
    pricing: string[];
    docs: string[];
    login: string[];
    dashboard: string[];
    cart: string[];
    checkout: string[];
    products: string[];
    collections: string[];
    blog: string[];
    articles: string[];
    news: string[];
    services: string[];
    contact: string[];
    caseStudies: string[];
    about: string[];
    quote: string[];
  };

  ctaTexts: string[];

  keywordScores: {
    saas: number;
    ecommerce: number;
    publisher: number;
    agency: number;
  };

  bodyText: string;
}

export function classifyWebsite(signals: SiteSignals): WebsiteCategory {
  const { jsonLdTypes, ogType, routeSignals, keywordScores } = signals;

  // 1. JSON-LD @type - HIGH WEIGHT
  const highWeightTypes: Record<string, WebsiteCategory> = {
    'WebApplication': 'SAAS_TOOL',
    'SoftwareApplication': 'SAAS_TOOL',
    'Product': 'ECOMMERCE',
    'Offer': 'ECOMMERCE',
    'Article': 'PUBLISHER_BLOG',
    'NewsArticle': 'PUBLISHER_BLOG',
    'BlogPosting': 'PUBLISHER_BLOG',
    'ReportageNewsArticle': 'PUBLISHER_BLOG',
    'LiveBlogPosting': 'PUBLISHER_BLOG',
    'NewsMediaOrganization': 'PUBLISHER_BLOG',
    'LocalBusiness': 'AGENCY_SERVICES',
  };

  for (const type of jsonLdTypes) {
    if (highWeightTypes[type]) return highWeightTypes[type];
  }

  // 2. og:type - HIGH WEIGHT
  if (ogType === 'article' || ogType === 'blog') return 'PUBLISHER_BLOG';
  if (ogType === 'product') return 'ECOMMERCE';

  // 3. Route/Navigation Signals - MEDIUM/HIGH WEIGHT
  const hasStrongEcommerceRoutes = (routeSignals.cart.length + routeSignals.checkout.length + routeSignals.products.length) > 0;
  const routeWeight = {
    ECOMMERCE: (routeSignals.cart.length + routeSignals.checkout.length + routeSignals.products.length) * 3 + (hasStrongEcommerceRoutes ? routeSignals.collections.length : 0),
    SAAS_TOOL: (routeSignals.pricing.length + routeSignals.docs.length + routeSignals.login.length + routeSignals.dashboard.length) * 3,
    PUBLISHER_BLOG: (routeSignals.blog.length + routeSignals.articles.length + routeSignals.news.length) * 3,
    AGENCY_SERVICES: (routeSignals.services.length + routeSignals.caseStudies.length + routeSignals.quote.length) * 3,
  };

  const bestRoute = Object.entries(routeWeight).sort((a, b) => b[1] - a[1])[0];
  if (bestRoute[1] >= 6) return bestRoute[0] as WebsiteCategory;

  // 4. Keyword Scores - FALLBACK WEIGHT
  const scores = keywordScores;
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topCat, topScore] = sortedScores[0];

  if (topScore >= 5) {
    const mapping: Record<string, WebsiteCategory> = {
      saas: 'SAAS_TOOL',
      ecommerce: 'ECOMMERCE',
      publisher: 'PUBLISHER_BLOG',
      agency: 'AGENCY_SERVICES',
    };
    return mapping[topCat] || 'GENERIC_COMPANY';
  }

  return 'GENERIC_COMPANY';
}
