import { matchesTourCategory } from "./tour-categories.js";
export function filterPackages(
  packages,
  { country = "", duration = "", search = "", category = "" } = {},
) {
  const term = search.trim().toLowerCase();
  return packages.filter(
    (p) =>
      matchesTourCategory(p, category) &&
      (!country || p.country === country) &&
      (!term || (p.title + " " + p.country).toLowerCase().includes(term)) &&
      (!duration ||
        (!p.durationUnconfirmed &&
          ((duration === "short" && p.days <= 5) ||
            (duration === "medium" && p.days >= 6 && p.days <= 9) ||
            (duration === "long" && p.days >= 10)))),
  );
}
