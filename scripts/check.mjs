import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { filterPackages } from "../src/data/filter.js";
import { journeyRoutes, getJourneyRoute } from "../src/data/journey-routes.js";
import packages, { groupPackageVariants } from '../src/data/packages.js';
assert.equal(groupPackageVariants(packages).length, 33);
assert.equal(new Set(packages.map(p => p.image)).size, 34);
const variant = packages.find(p => p.itinerarySource);
assert.equal(variant.itinerary, packages.find(p => p.url === variant.itinerarySource).itinerary);
const fontCss = await fs.readFile('public/fonts/fonts.css', 'utf8');
for (const match of fontCss.matchAll(/url\(['"]?(\/fonts\/[^)'"\s]+)/g)) {
  await fs.access('public' + match[1]);
}
assert.equal(packages.length, 34);
assert.equal(new Set(packages.map((p) => p.url)).size, 34);
assert.equal(Object.keys(journeyRoutes).length, packages.length);
for (const p of packages) {
  assert.ok(["Sri Lanka", "Kenya"].includes(p.country));
  assert.ok(p.itinerary.length > 0, p.title);
  assert.ok(!/tanzania/i.test(p.title));
  const route = getJourneyRoute(p);
  assert.ok(route.stops.length > 0, p.title);
  const bounds = p.country === "Sri Lanka" ? [5.8, 9.9, 79.5, 82] : [-4.8, 5.1, 33.8, 42];
  for (const stop of [...route.stops, ...route.optionalStops]) {
    assert.equal(stop.country, p.country, p.title);
    assert.ok(Number.isFinite(stop.lat) && Number.isFinite(stop.lng), stop.name);
    assert.ok(stop.lat >= bounds[0] && stop.lat <= bounds[1] && stop.lng >= bounds[2] && stop.lng <= bounds[3], stop.name);
    assert.ok(stop.entries.length > 0 && stop.entries.every(entry => Number.isInteger(entry) && entry >= 1 && entry <= p.itinerary.length), p.title);
    assert.ok(stop.days && stop.source.startsWith("https://"), stop.name);
  }
  assert.deepEqual(route.stops.map(stop => stop.number), route.stops.map((_, index) => index + 1));
  const geometry = JSON.parse(await fs.readFile("public" + route.pathUrl, "utf8"));
  assert.equal(geometry.version, 1);
  assert.equal(geometry.legs.length, route.stops.length - 1, p.title);
  for (const [index, leg] of geometry.legs.entries()) {
    assert.equal(leg.from, route.stops[index].id);
    assert.equal(leg.to, route.stops[index + 1].id);
    assert.equal(leg.mode, route.stops[index + 1].mode);
    assert.ok(leg.paths.some(path => path.mode === leg.mode), p.title);
    for (const path of leg.paths) {
      assert.ok(path.coordinates.length > 2, "Path must contain actual bends: " + leg.from + " -> " + leg.to);
      assert.ok(path.source.includes(["route", "train"].includes(path.mode) ? "OpenStreetMap" : "Illustrative"));
      for (const point of path.coordinates) {
        assert.equal(point.length, 2);
        assert.ok(point.every(Number.isFinite));
        assert.ok(point[0] >= bounds[0] && point[0] <= bounds[1] && point[1] >= bounds[2] && point[1] <= bounds[3], p.title);
      }
      // A broken network export must never silently draw a long straight chord.
      if (["route", "train"].includes(path.mode)) {
        for (let i = 1; i < path.coordinates.length; i++) {
          const a = path.coordinates[i - 1], b = path.coordinates[i];
          assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.08, "Network gap: " + leg.from + " -> " + leg.to);
        }
      }
    }
  }
  await fs.access("public" + p.image);
  assert.ok(
    !/<script|\bon\w+\s*=|javascript:/i.test(JSON.stringify(p)),
    p.title,
  );
}
assert.equal(
  filterPackages(packages, { country: "Kenya", duration: "short" }).length,
  9,
);
const routeFor = slug => getJourneyRoute(packages.find(p => p.url === "/packages/" + slug + "/"));
assert.deepEqual(routeFor("6-day-amboseli-and-masai-mara-luxury-safari").stops.map(s => s.id), ["nairobi", "amboseli", "nairobi", "masai-mara", "nairobi"]);
assert.equal(routeFor("4-day-luxury-masai-mara-lake-naivasha-safari").stops.some(s => s.id === "naivasha"), false);
assert.equal(routeFor("sri-lanka-surf-and-wellness-tour").stops.some(s => s.id === "udawalawe"), false);
assert.equal(routeFor("sri-lanka-surf-and-wellness-tour").optionalStops[0].id, "udawalawe");
assert.equal(routeFor("sri-lanka-honeymoon-escape").optionalStops[0].id, "tangalle");
assert.equal(routeFor("peaks-and-tea-trails").stops.find(s => s.id === "ella").days, "Days 7–8");
assert.equal(routeFor("1-day-best-of-nairobi-city-excursion").stops.length, 4);
assert.equal(routeFor("9-day-wildlife-diani-beach-safari").stops.find(s => s.id === "mombasa").mode, "train");
assert.equal(filterPackages(packages, { search: "no-such-journey" }).length, 0);
assert.ok(
  filterPackages(packages, { duration: "medium" }).every(
    (p) => !p.durationUnconfirmed && p.days >= 6 && p.days <= 9,
  ),
);
assert.ok(
  filterPackages(packages, { search: "HONEYMOON" }).every((p) =>
    p.title.toLowerCase().includes("honeymoon"),
  ),
);
console.log(
  "34 package records, images, destinations, road/rail path coverage, editorial exceptions and filter checks passed.",
);
