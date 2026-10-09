# Emerald Isle Travels

Next.js App Router website for Emerald Isle Travels using JavaScript, React 19, and vanilla CSS. Retains editorial travel content, package itineraries, dynamic media, and visual aesthetics.

---

## Getting Started

### Prerequisites
- **Node.js**: `22.12.0` or higher
- **npm**: v10+

### Installation & Local Development

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://127.0.0.1:5175/](http://127.0.0.1:5175/) in your browser.

---

## Production Build & Preview

```powershell
# Run validation checks
npm run check

# Build Next.js production bundle
npm run build

# Start production server
npm run start
```

The preview will run at [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

> Deploy using any Next.js-compatible platform (Vercel, Node.js server, Docker).

---

## Environment Variables

Create a `.env.local` file in the project root based on the following configurations:

```ini
# Production domain / canonical URL base (defaults to https://emeraldisletravels.com)
SITE_URL=https://emeraldisletravels.com

# SMTP settings for Contact & Enquiry form email dispatch via Nodemailer
GMAIL_SMTP_USER=your-email@example.com
GMAIL_APP_PASSWORD=your-google-app-password
```

| Variable | Description | Required |
| :--- | :--- | :--- |
| `SITE_URL` | Canonical URL prefix for SEO, metadata, and sitemaps. | Optional (defaults to production URL) |
| `GMAIL_SMTP_USER` | Gmail / Google Workspace account used for SMTP sending. | Required for `/api/enquiry` submissions |
| `GMAIL_APP_PASSWORD` | App-specific password generated from Google Security settings. | Required for `/api/enquiry` submissions |

---

## Architecture & Project Structure

- **`src/app/`**: Next.js App Router pages and API routes:
  - `src/app/page.jsx`: Homepage with destination highlights, hero selector, and editorial sections.
  - `src/app/about/page.jsx`: About Us page with motion/video hero and company history.
  - `src/app/packages/page.jsx`: Packages catalogue with destination filtering and category views.
  - `src/app/packages/[slug]/page.jsx`: Dynamic package detail pages pre-rendered from local data with custom schema & itineraries.
  - `src/app/gallery/page.jsx`: Interactive visual gallery with categorization and scroll features.
  - `src/app/contact/page.jsx`: Contact and enquiry booking form.
  - `src/app/api/enquiry/route.js`: Server-side API handling enquiry validation and Nodemailer SMTP dispatch.
  - `src/app/sitemap.js` & `src/app/robots.js`: Dynamic SEO crawl discovery endpoints.
- **`src/components/`**: Modular UI components (`TripDetail`, `About`, `AboutMotion`, `Gallery`, `PackageHero`, `ScrollToTop`, `Contact`, `Footer`, etc.).
- **`src/data/`**:
  - `packages.json`: Content, day-by-day itineraries, and details for all 34 travel packages.
  - `image-sizes.json`: Intrinsic dimensions for optimized Next.js image rendering.
- **`src/lib/seo.jsx`**: Metadata generator, canonical URL formatting, OpenGraph configuration, and JSON-LD structured schema.
- **`src/styles.css` & component CSS**: Handcrafted responsive CSS modules and utilities.

---

## Features & Functionality

- **Enquiry & Contact API**: Secure form submissions via `/api/enquiry` featuring CSRF/origin checks, payload size limits, field validations, honeypot spam protection, and Nodemailer SMTP transport.
- **Dynamic Pre-rendered Packages**: All 34 journey packages are statically pre-rendered at build time with tailored metadata and breadcrumb schemas.
- **SEO & Performance Optimization**: Pre-rendered semantic HTML, optimized OpenGraph/Twitter cards, automated `sitemap.xml`, and structured data (JSON-LD).
- **Smooth Animations & Scroll Control**: Native Lenis smooth scrolling integration and custom `ScrollToTop` floating controllers.
