export const tourCategories = [
  { id: "beach", title: "Beach tours", copy: "Ocean days, palm-lined shores and time to slow down.", alt: "A palm-lined Sri Lankan beach beside turquoise water" },
  { id: "honeymoon", title: "Honeymoon Tours", copy: "Quiet escapes and unforgettable moments, just for two.", alt: "A couple walking together on a Sri Lankan beach at sunset" },
  { id: "pilgrimage", title: "Pilgrimage Tours", copy: "Sacred places, living traditions and journeys with meaning.", alt: "Pilgrims approaching a white Buddhist stupa in Sri Lanka" },
  { id: "safari", title: "Safari tours", copy: "Wide-open savannahs and wildlife in its own world.", alt: "Elephants on the Kenyan savannah with acacia trees" },
  { id: "adventure", title: "Adventure tours", copy: "Mountain trails, fresh perspectives and a little further from ordinary.", alt: "Hikers on a ridge above Sri Lanka’s misty highlands" },
].map(item => ({ ...item, image: `/images/tour-categories/${item.id}.webp`, href: `/packages/?category=${item.id}` }));

export function matchesTourCategory(trip, category) {
  if (!category) return true;
  const label = `${trip.title} ${trip.category}`.toLowerCase();
  if (category === "adventure") return /adventure|off.the.beaten|tea trail|surf|island loop/.test(label);
  return label.includes(category);
}
