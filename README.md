# Emerald Isle Travels

Next.js App Router website using JavaScript, React and plain CSS. The existing travel content, package URLs and visual design are retained.

## Development

Requires Node.js 22.12+.

```powershell
npm.cmd install --cache .npm-cache
npm.cmd run dev
```

Open http://127.0.0.1:5175/.

## Production preview

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run start
```

Open http://127.0.0.1:4173/. Deploy using a Next.js-compatible host or a Node.js server; the old Vite SPA rewrite to index.html is no longer applicable.

## Routes and SEO

- `src/app/`: home, catalogue, destination, about, gallery and contact routes.
- `src/app/packages/[slug]/page.jsx`: builds all 34 package pages from local JSON, with unique metadata and breadcrumbs. Unknown packages return 404.
- `src/app/sitemap.js` and `robots.js`: generated crawl discovery files.
- `src/lib/seo.jsx`: canonical URLs, sharing metadata and structured data.
- `src/components/`: preserved editorial layouts and focused interactive components.
- `src/data/packages.json`: package content and itineraries.
- `src/data/image-sizes.json`: intrinsic image sizes for Next.js image optimisation; update when replacing images.
- `src/styles.css`: plain CSS, responsive layouts and viewport-height homepage hero.

Set `SITE_URL` to the public production origin before building. It defaults to `https://emeraldisletravels.com`, the source domain recorded in this project. Rebuild when changing it. See `.env.example`.

All public page content is pre-rendered. Catalogue filtering, mobile navigation and the hero destination selector hydrate in the browser. Canonical contact URLs exclude enquiry parameters. Submit `/sitemap.xml` in Google Search Console after production deployment; pre-rendering improves crawlability but does not guarantee indexing.

## Content and enquiries

The contact form prepares an email draft; it has no email delivery backend, payment processing, booking system or database. Package links still prefill the destination and journey. Two inconsistent package durations remain flagged for confirmation.

Package content came from https://emeraldisletravels.com/. Editorial HTML is trusted local content: sanitise future third-party imports. The Sri Lanka hero is an AI-generated marketing illustration. Existing font families and images are retained; Google Fonts are loaded through one stylesheet import, and the existing local font stylesheet remains available.
