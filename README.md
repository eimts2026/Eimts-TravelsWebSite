# Emerald Isle Travels

React + Vite frontend for Emerald Isle Travels, preserving the approved visual design. Plain CSS; no Tailwind, WordPress mirror, legacy HTML pages or cloning scripts.

## Run locally

Requires Node.js 22.12+ and npm. Open PowerShell:

```powershell
cd "C:\Users\Gaveen\Desktop\emerald travels"
npm.cmd install
npm.cmd run dev
```

Open http://127.0.0.1:5175/ and keep the terminal running. Press Ctrl+C to stop. Use this port instead of the old HTML preview ports 5173/5174. The native config loader avoids an esbuild configuration-bundling restriction in the development environment.

## Build and verify

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

Production output is `dist/`. Production preview is http://127.0.0.1:4173/. A static hosting service must rewrite non-asset routes to `/index.html` so package URLs and direct page refreshes work. This is a client-rendered application; navigation uses ordinary links with React rendering the requested route.

## Codebase

- `src/App.jsx`: page selection and page titles.
- `src/components/`: JSX pages, shared header/footer, interactive hero, catalogue, itinerary and enquiry components.
- `src/styles.css`: existing responsive design, local typography and reduced-motion support.
- `src/data/packages.json`: 34 Sri Lanka and Kenya journeys, with itinerary and detail content.
- `src/data/filter.js`: package search and duration filtering.
- `public/`: only the images, fonts and favicon used by the React app.
- `scripts/check.mjs`: catalogue integrity, assets and filtering checks.

Edit JSX and CSS directly; Vite updates the preview. Edit package records to update the catalogue and details. Featured homepage and gallery selections are currently authored in their JSX components.

## Content and enquiries

Package content was imported from https://emeraldisletravels.com/. Tanzania itineraries and a repeated package were excluded. Two inconsistent source durations remain marked for confirmation and are omitted from duration-specific filter results. No prices or availability were invented.

The Sri Lanka hero is an AI-generated marketing illustration, not a documentary photograph. Other images are retained from the Emerald Isle source content. Contact details: travels@emeraldisle.lk, +94 11 462 7909.

The enquiry form prepares an email draft for the visitor to send in their email application. There is no backend, payment processing, booking system or database. Editorial HTML fragments inside package data are trusted local content; sanitize any future third-party imports before adding them.
