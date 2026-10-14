# Theme and image delivery review

## Measured mobile performance

Local Next.js production build, Lighthouse 13.5.0 default mobile emulation and simulated throttling. These are lab measurements, not deployed PageSpeed Insights or real-user results.

| Metric | Before | Final repeat |
| --- | ---: | ---: |
| Performance score | 49 | 77 |
| First contentful paint | 2.4 s | 1.1 s |
| Largest contentful paint | 13.4 s | 6.6 s |
| Total blocking time | 900 ms | 40 ms |
| Main-thread work | 4.5 s | 0.9 s |
| Total transferred | 7,210 KiB | 1,676 KiB |
| JavaScript transferred | 227,314 bytes | 170,619 bytes |
| Cumulative layout shift | 0.002 | 0.002 |

The first optimized audit also scored 77 (1,530 KiB transferred). Reports: `mobile-before.json`, `mobile-after.json`, `mobile-final.json`. The remaining unused-JavaScript estimate is approximately 52 KiB, largely shared framework code. LCP still needs improvement; a score of 77 is not a guarantee of fast loading on every device or deployed network.

## Changes

- Added an accessible sun/moon control beside the menu icon. Light preserves the original homepage appearance. Dark uses an emerald background and light text. Preferences persist locally and are applied before hydration.
- Optimized 123 images, reducing stored assets by 18,794,678 bytes. Preserved filenames and updated intrinsic dimensions. Per-file byte accounting is in `image-optimization.json`.
- Used responsive Next.js images for About photos, category cards, map destination photos and hero thumbnails.
- Deferred map and gallery JavaScript until the visitor approaches those sections. Preserved the WebGL gallery transitions.
- Gallery rendering stops when idle, offscreen or in a hidden tab. Canvas pixel density is capped, with a lower limit on mobile.
- Disabled continuous mobile hero drift and parallax; coarse-pointer devices use native scrolling.
- Narrowed the Anime.js import to its animation module and batched header scroll measurements through requestAnimationFrame.
- Hosted compressed WOFF2 fonts locally, preserving Raleway and Caveat. Removed the external font CSS import.
- Added one-day image/font caching and stale revalidation; configured responsive image widths and the image optimization cache.

## Checks

- Production build: all 48 pages generated.
- `npm run check`: all 34 package records and associated image/route checks passed.
- Browser: desktop and 390px mobile, theme toggling, persisted theme after reload, menu open/close, deferred maps and gallery rendering. No JavaScript errors observed during those interactions.
- Mobile document width matches viewport width, with no horizontal page overflow in the inspected homepage states.

No production deployment was performed. Repeat the Lighthouse/PageSpeed audit against the deployed URL after release.
