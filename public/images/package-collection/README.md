# Package collection imagery

Generated on 2026-10-05 with the OpenAI image-generation tool. These are illustrative travel scenes, not documentary photographs of an included hotel or guaranteed wildlife sighting.

- `hero.webp`: 1440px animated WebP, a repeating 7.54-second sequence with three-second holds and dissolves in both directions between Sri Lankan highlands and Kenyan savannah; no camera pan or zoom.
- `hero-mobile.webp`: 720px version of the same animation.
- `hero-still.webp`: still Sri Lankan scene for reduced-motion preferences.
- `cards/sri-lanka-leopard.webp`: generated wildlife illustration.
- Other card WebPs: optimized from the existing corresponding package photographs, replacing repeatedly reused giraffe/elephant imagery.

Prompt briefs: (1) Photorealistic premium Sri Lankan panorama with emerald tea terraces, a highland reservoir, layered forest ridges, dawn mist, restrained warm light, open left composition, no text or logos. (2) Photorealistic Kenyan savannah at sunrise, an acacia on the far right, three elephants in the middle-right distance, muted gold and green, open left composition, plausible geography, no text or logos. (3) Photorealistic Sri Lankan leopard resting on granite in dry forest in afternoon light, landscape 3:2, subject on the right, no text or logos.

`scripts/build-package-collection.py` builds the WebPs from the generated originals and migrates image references. The two Best of Kenya booking options share one itinerary through `itinerarySource`, while retaining their original booking details and URLs.
