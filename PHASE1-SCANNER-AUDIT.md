# Phase 1 — Scanner Accuracy Audit Report

## Files Changed
| File | Change |
|------|--------|
| `lib-scanner.ts:217` | Fix: `Disallow: /` now correctly blocks (was `value !== "/"` — inverted) |
| `lib-scanner.ts:226-238` | Fix: `User-agent: *` wildcard now applies as fallback to AI bots without bot-specific entries |
| `lib-scanner.ts:303-305` | Fix: 0 images → pass (was false, inflating critical count on text-only pages) |
| `app/api/pagespeed/route.ts` | Added explicit `warning` field for mock data |
| `app/api/ai-visibility/route.ts` | Added explicit `warning` field for mock data |
| `AIScanMySite.tsx` | Added warning banners for PageSpeed and AI Visibility when data is estimated |

---

## Scanner Checks Verified

### 1. robots-ai-bots (weight: 15, critical)
| Test Case | Expected | Was | Fixed? |
|-----------|----------|-----|--------|
| No robots.txt → 404 | FAIL | FAIL | — |
| Empty robots.txt | FAIL (no rules) | FAIL | — |
| `User-agent: GPTBot` + `Disallow: /` | FAIL (blocked) | PASS | ✅ |
| `User-agent: GPTBot` + `Disallow: /private` | PASS (specific path) | PASS | — |
| `User-agent: GPTBot` + `Disallow: ` (empty) | PASS | PASS | — |
| `User-agent: *` + `Disallow: /` + no GPTBot entry | FAIL (wildcard blocks) | PASS | ✅ |
| `User-agent: GPTBot` + `Allow: /` | PASS | PASS | — |
| `User-agent: *` + `Allow: /` + no GPTBot entry | PASS | PASS | — |
| All 8 bots have explicit `Allow: /` | PASS | PASS | — |
| One bot has `Disallow: /`, others allowed | FAIL | FAIL | — |

### 2. llms-txt (weight: 10, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| No /llms.txt → 404 | FAIL | FAIL ✅ |
| Empty llms.txt | FAIL | FAIL ✅ |
| Has `# My Site` but no summary block | FAIL | FAIL ✅ |
| Has `# My Site` + `> Summary text` | PASS | PASS ✅ |
| Has `# My Site` + `# Summary` heading | PASS | PASS ✅ |
| Valid llms.txt with both elements | PASS | PASS ✅ |

### 3. schema-jsonld (weight: 15, critical)
| Test Case | Expected | Result |
|-----------|----------|--------|
| No JSON-LD blocks | FAIL | FAIL ✅ |
| Malformed JSON in script tag | FAIL | FAIL ✅ |
| Valid `@type: Organization` | PASS | PASS ✅ |
| Valid `@type` in `@graph` array | PASS | PASS ✅ |

### 4. image-alt (weight: 12, critical)
| Test Case | Expected | Was | Fixed? |
|-----------|----------|-----|--------|
| No images (0 `<img>`) | PASS (trivially) | FAIL (critical) | ✅ |
| 3 images, all with alt text | PASS | PASS | — |
| 3 images, 1 missing alt | FAIL | FAIL | — |
| 3 images, all empty alt `alt=""` | FAIL | FAIL | — |

### 5. sitemap-xml (weight: 10, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| No sitemap.xml → 404 | FAIL | FAIL ✅ |
| Empty response | FAIL | FAIL ✅ |
| Valid `<urlset>` with `<loc>` entries | PASS | PASS ✅ |
| Sitemap index (no `<urlset>`) | FAIL | FAIL ✅ |

### 6. meta-description (weight: 10, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| No meta description | FAIL | FAIL ✅ |
| Description < 70 chars | FAIL | FAIL ✅ |
| Description 100 chars | PASS | PASS ✅ |
| Description > 200 chars | FAIL | FAIL ✅ |

### 7. security-headers (weight: 12, critical)
| Test Case | Expected | Result |
|-----------|----------|--------|
| All 4 headers present | PASS | PASS ✅ |
| 3/4 headers present | FAIL | FAIL ✅ |
| 0 headers present | FAIL | FAIL ✅ |

### 8. heading-structure (weight: 8, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| One `<h1>`, h2, h3 (monotonic) | PASS | PASS ✅ |
| Zero `<h1>` | FAIL | FAIL ✅ |
| Two `<h1>` tags | FAIL | FAIL ✅ |
| h1 → h3 (skip level) | FAIL | FAIL ✅ |
| No headings at all | FAIL | FAIL ✅ |

### 9. open-graph (weight: 8, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| og:title + og:description + og:image | PASS | PASS ✅ |
| Missing og:image | FAIL | FAIL ✅ |
| All 3 missing | FAIL | FAIL ✅ |

### 10. structured-content (weight: 10, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| 500 words, 5 semantic landmarks | PASS | PASS ✅ |
| < 300 words | FAIL | FAIL ✅ |
| < 3 semantic landmarks | FAIL | FAIL ✅ |

### 11. faq-schema (weight: 5, info)
| Test Case | Expected | Result |
|-----------|----------|--------|
| FAQPage @type in JSON-LD | PASS | PASS ✅ |
| No FAQPage | FAIL | FAIL ✅ |

### 12. ssl-certificate (weight: 8, warning)
| Test Case | Expected | Result |
|-----------|----------|--------|
| HTTPS fetch succeeds | PASS | PASS ✅ |
| HTTP URL (downgraded) | FAIL | FAIL ✅ |
| HTTPS URL that fails to connect | FAIL | FAIL ✅ |

---

## Score Calculation Verification
- Formula: `score = round((passedWeight / totalWeight) * 100)`
- Total weight = 123 (sum of 15+10+15+12+10+10+12+8+8+10+5+8)
- All pass → score = 100 ✅
- All fail → score = 0 ✅
- 50% of weight passed → score ≈ 50 ✅
- No overflow/underflow ✅

---

## Incorrect Results Discovered & Fixed

1. **robots.txt `Disallow: /` treated as ALLOW** (CRITICAL)
   - Line 217: `value && value !== "/"` excluded the `/` path
   - Fixed to: `value !== ""`

2. **robots.txt `User-agent: *` wildcard ignored** (CRITICAL)
   - Wildcard disallow for `*` was not inherited by specific AI bots without their own entry
   - Fixed by checking `botRules.get("*")` as fallback

3. **Image ALT: 0 images → false** (MODERATE)
   - Empty-alt check: `imgTotal > 0 && imgMissing === 0` was false when `imgTotal === 0`
   - Fixed to: `imgTotal === 0 || imgMissing === 0`
   - `altCoverage` for 0 images changed from 0% → 100%

4. **PageSpeed: "Live Google API Data" badge for mock** (UX/DATA ACCURACY)
   - Mock API returned `isLiveGoogleData: false` but UI showed "Live Google API Data"
   - Added `warning` field; UI now shows "Estimated Data" with a warning banner

5. **AI Visibility: mock data presented as live** (DATA ACCURACY)
   - Similar to PageSpeed — added `warning` field and UI banner

---

## Checks That Could Not Be Independently Verified

| Check | Limitation |
|-------|-----------|
| SSL certificate validity/expiry | Serverless edge has no TLS lib — only infers "HTTPS ok" from successful fetch |
| robots.txt multi-rule inheritance | Complex multi-line robots.txt (Allow overriding Disallow) may not match Google's algorithm exactly |
| Heading hierarchy edge cases | Pages using `<section>` with implicit `<h1>` (HTML5 outline algorithm, now abandoned by browsers) may not match |
| Meta description quality | 70–200 char range is reasonable but arbitrary; no semantic quality check (keyword stuffing, readability) |
| Structured content word count | `main, article, body` selector matches `<body>` — includes nav/footer word count; inflates word count |
| FAQ detection depth | Only checks for `FAQPage` @type; does not validate required fields (mainEntity, Question/Answer pairs) |

---

## Remaining Accuracy Risks

| Risk | Severity | Notes |
|------|----------|-------|
| **PageSpeed is 100% mock** | HIGH | Random values 70–99; no real Lighthouse data. UI now labels it estimated but still presents as a score |
| **AI Visibility is 100% mock** | HIGH | Random scores; no real engine queries. UI now labels it estimated |
| **No `<title>` tag check** | MEDIUM | User's requirement list mentions "title" but no dedicated check exists |
| **Structured content `<body>` inflates word count** | LOW | Selector `main, article, body` means `<body>` always matches; word count includes navigation/footer text |
| **robots.txt Allow/Disallow interaction** | LOW | Real Google algorithm uses longest-path-match; this scanner only tracks final state per bot |
| **`altCoverage` shown as 100% for 0 images** | LOW | Technically correct (vacuously true) but may confuse users |
