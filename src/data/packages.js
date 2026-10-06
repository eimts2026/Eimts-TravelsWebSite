import records from './packages.json' with { type: 'json' };

// Booking choices remain distinct; identical itinerary content is stored once.
const packages = records.map(record => {
  if (!record.itinerarySource) return record;
  const source = records.find(item => item.url === record.itinerarySource);
  if (!source?.itinerary) throw new Error(`Missing itinerary source: ${record.itinerarySource}`);
  return { ...record, itinerary: source.itinerary };
});
export default packages;

export function groupPackageVariants(items) {
  const groups = new Map();
  for (const trip of items) {
    const key = trip.itinerarySource || trip.url;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(trip);
  }
  return [...groups.values()].map(variants => ({
    ...(variants.find(trip => !trip.itinerarySource) || variants[0]),
    variants: variants.length > 1 ? variants : [],
  }));
}
