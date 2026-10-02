# Journey maps

Every package has an explicit route in journey-routes.js. Entry numbers reference its published itinerary sections (one-based). getJourneyRoute resolves numbered visits and day labels; no live geocoding runs in a visitor's browser.

Coordinates in journey-places.json are representative town, destination or park-area points, not hotel addresses. Road approaches for Yala (Palatupana), Masai Mara (Sekenani Gate) and Gal Oya (Inginiyagala) were verified in OpenStreetMap on 2026-10-01 and have visible access notes. Sources are stored on each place. GeoNames Sri Lanka and Kenya gazetteer extracts were checked on 2026-10-01 and used under CC BY 4.0:
- https://download.geonames.org/export/dump/LK.zip
- https://download.geonames.org/export/dump/KE.zip
- https://download.geonames.org/export/dump/readme.txt
- https://creativecommons.org/licenses/by/4.0/

The Nairobi Giraffe Centre and Sheldrick Nursery coordinates were checked against OpenStreetMap via Nominatim. Sheldrick location also checked against https://www.sheldrickwildlifetrust.org/nursery-visit.
Data attribution is visible below each map.

Blue road paths follow OpenStreetMap roads calculated with OSRM, rather than connecting destination markers with straight chords. Rail paths use the connected OpenStreetMap railway network (1435 mm SGR tracks only in Kenya); road transfers between representative destination areas and railway stations are included where needed. Flight and boat connections remain explicitly illustrative curves with separate patterns. These are suggested destination-to-destination paths, not confirmed driver routes, game drives, live directions or journey durations. Road endpoints snap to mapped access roads; accommodation and park-entry choices can change the final path. Repeated visits share a marker listing all stop numbers and visit details. Optional/alternative points remain separate from the main route.

Static path assets are in public/maps/routes, one small JSON file per package, fetched only when its map approaches the viewport. Road/rail markers are placed at the path's access endpoints rather than a lake centre or an inaccessible gazetteer point. The browser never calls a routing/geocoding demo server. If a path asset fails, the component shows retry and keeps the stop list; it does not fall back to fabricated straight road lines. Bounds include the complete path geometry.

Regenerate with `python scripts/build-journey-paths.py` from the project root (Python 3 and Node required). Raw API responses are cached in the system temporary directory under journey-path-cache; remove only the relevant cache entries when deliberately refreshing data. Road calls are serial and rate limited to less than one request per second. Path geometry is simplified to approximately 5 m and rounded to five decimal places, retaining source vertices along long straight stretches. The generated assets retain source names and date, and can be reused without network access at build time.

Sources / attribution:
- https://project-osrm.org/docs/v5.24.0/api/
- https://routing.openstreetmap.de/about.html (FOSSGIS OSRM car profile; attribution, fix-the-map link and rate limit respected)
- https://overpass-api.de/api/interpreter (OSM railway ways, fetched once and cached)
- https://www.openstreetmap.org/copyright (OpenStreetMap data under ODbL; generated geometry is available in the public JSON assets)
- Railway station anchors: Kandy https://www.openstreetmap.org/way/258496237, Nanu Oya https://www.openstreetmap.org/way/278430920, Ella https://www.openstreetmap.org/node/9552182535, Mombasa SGR Terminus https://www.openstreetmap.org/node/9815479964.

Editorial decisions:
- 4-day luxury Masai Mara / Naivasha: Naivasha is absent from the daily itinerary, so it is omitted with a visible explanation.
- Classic Highlights: day 2 heading names Pinnawala, but its body describes Sigiriya. The body is used with a visible explanation.
- 4-day budget lakes safari: no named initial pick-up, so main route starts at Naivasha.
- Fly-in Amboseli / Mara: Nairobi connection on day 3 is retained.
- Diani: Emali to Mombasa train and Diani to Nairobi flight are retained. Town-area points summarize rail-station/airstrip transfers.
- Honeymoon: Mirissa is illustrated; Tangalle appears separately as an alternative.
- Surf and wellness: optional Udawalawe detour is separate from the main coastal route.
- Surf Explorer: named coastal areas are shown with a note that overnight areas and individual beach order are flexible.
- Main destinations summarize nearby sightseeing; not every temple, viewpoint, lodge or game drive is a marker.

Map tiles:
Default is https://tile.openstreetmap.org/{z}/{x}/{y}.png, with visible OpenStreetMap attribution and normal browser caching. No tile prefetching, offline tile download, or service-worker caching is introduced.
https://operations.osmfoundation.org/policies/tiles/

To change providers, set these before building:
NEXT_PUBLIC_MAP_TILE_URL=https://your-provider.example/{z}/{x}/{y}.png
NEXT_PUBLIC_MAP_TILE_ATTRIBUTION=Provider-required attribution HTML

Use only trusted attribution HTML. If a provider needs a browser token, use a token restricted by domain and provider permissions. The map stays deferred until near the viewport; the itinerary stop list renders independently of Leaflet and tile availability.
