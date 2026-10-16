# Homepage maps and scroll report

Date: 2026-10-16

## Changes

- Order: hero, Sri Lanka/Kenya maps, About Us (including Why Book), tour categories, selected journeys, gallery, bespoke tours.
- The hero down arrow now targets the maps.
- Enlarged the desktop map column and maximum map height from 700px to 760px.
- Phones and tablets use stacked vertical chapters. Pinned horizontal chapters remain available on large screens with a fine pointer and without reduced-motion preference.
- Added mobile/touch place selectors for destinations whose pins are close together.
- Rendered the destination layout immediately; Leaflet still loads near the viewport.

## Scroll reset cause and fix

The deferred components used next/dynamic without a loading component or local Suspense boundary. In the installed Next.js implementation, this configuration does not create its own Suspense boundary. Revealing an unloaded component while scrolling could suspend the route, temporarily hide its content, and collapse document height. The browser then clamped its scroll position to zero. Restoring content appeared like images loading again.

The gallery now supplies a local loading component. Its existing 100svh wrapper reserves space while the chunk loads. The maps no longer use the deferred component wrapper. Existing smooth scrolling was retained after isolating the actual cause.

## Verification

- Reproduced the failure before the final fix: document height dropped from 11,297px to 844px and scroll position reset to zero.
- After the fix, the mobile gallery loaded with document height remaining 11,269px; scroll remained at 10,425px on the subsequent check.
- Repeated desktop scrolling reached the footer without a reset; document height remained 9,236px.
- 1440x900 desktop: maps measured 524x760px; no horizontal page overflow. Visually inspected Sri Lanka's map and card.
- 390x844 mobile: maps measured 330x527px; no horizontal overflow. Visually inspected both countries. Selected Ella and Maasai Mara using the respective selectors and verified the detail headings.
- 320x740 narrow phone: maps measured 268x432px, pinning disabled, no horizontal overflow.
- npm.cmd run check: passed all 34 package/data/image checks.
- npm.cmd run build: passed, 49 pages generated. Initial sandbox build hit Windows EPERM; the permitted retry completed successfully.
- git diff --check: passed.

Browser checks used the local development server. The production build passed, but the browser connection to the separate production preview port timed out. No deployment was performed.
