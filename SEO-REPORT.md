# Local SEO verification — 9 October 2026

Scope: local production build, served at http://127.0.0.1:4174. DNS, hosting and Google Search Console were not changed. Public canonical URLs remain https://emeraldisletravels.com.

## Measured results

Lighthouse SEO (default mobile configuration, SEO category only):

| Page | Score |
| --- | --- |
| Home | 100/100 |
| Packages | 100/100 |
| About | 100/100 |
| Contact | 100/100 |
| Gallery | 100/100 |
| Sri Lanka Beach & Wildlife package | 100/100 |
| 7-Day Kenya Safari Adventure package | 100/100 |

Reports are saved in `output/seo/*.report.html` and `*.report.json`. These are technical SEO scores, not performance scores, ranking predictions or evidence of Google indexing. The remaining package pages share the audited detail template but were not individually Lighthouse-scored.

All 43 sitemap URLs passed `scripts/check-seo.mjs`: HTTP 200, unique titles, descriptions, canonical matching the sitemap, one H1, no noindex directive and parseable JSON-LD. Robots advertises the sitemap and permits page crawling. A nonexistent URL returns HTTP 404. Results: `output/seo/routes.json`.

## Changes

- Isolated catalogue query handling inside a small Suspense boundary so the heading and package links are present in initial server HTML. Previously the full catalogue waited for client rendering.
- Normalized the production origin and absolute canonical URLs; cleaned and limited metadata descriptions.
- Added descriptive About/Gallery titles and social-image alt metadata.
- Expanded TravelAgency structured data using existing visible business details.
- Added optional Search Console HTML-tag verification through `GOOGLE_SITE_VERIFICATION`.
- Excluded API routes from robots crawling.

Production build passed. Browser verified `?country=Kenya` still displays 20 journeys after hydration.

## When DNS is ready

1. Deploy this build on a Next.js host and set `SITE_URL=https://emeraldisletravels.com` (or the confirmed final origin). Restart/rebuild after changing it.
2. Confirm HTTPS works, production pages return 200, and `/robots.txt` and `/sitemap.xml` are public. Redirect alternative domain versions to the chosen canonical host.
3. In Google Search Console, verify the Domain property with the DNS TXT record Google provides. Alternatively, verify a URL-prefix property by setting `GOOGLE_SITE_VERIFICATION` to the content value from Google's HTML meta tag and redeploying.
4. Submit `https://emeraldisletravels.com/sitemap.xml` under Sitemaps. Inspect key URLs and request indexing; monitor the Page indexing report.
5. Rerun Lighthouse against the public deployment. Local scores do not measure production hosting, redirects or access restrictions.

Localhost cannot be indexed by Google. Submission does not guarantee indexing or immediate inclusion.

References:
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Repeat the route checks against a running production preview with `node scripts/check-seo.mjs` (default port 4173), or set `SEO_AUDIT_URL` to its origin.
