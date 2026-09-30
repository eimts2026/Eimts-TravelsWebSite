import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { filterPackages } from "../src/data/filter.js";
const packages = JSON.parse(
  await fs.readFile("src/data/packages.json", "utf8"),
);
const fontCss = await fs.readFile('public/fonts/fonts.css', 'utf8');
for (const match of fontCss.matchAll(/url\(['"]?(\/fonts\/[^)'"\s]+)/g)) {
  await fs.access('public' + match[1]);
}
assert.equal(packages.length, 34);
assert.equal(new Set(packages.map((p) => p.url)).size, 34);
for (const p of packages) {
  assert.ok(["Sri Lanka", "Kenya"].includes(p.country));
  assert.ok(p.itinerary.length > 0, p.title);
  assert.ok(!/tanzania/i.test(p.title));
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
  "34 package records, images, destinations, editorial safety and filter checks passed.",
);
