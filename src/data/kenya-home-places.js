import locations from './journey-places.json';

// Reuse the coordinates and source references already used by our itinerary maps.
const places = [
  ['amboseli', 'Amboseli', 'Beneath a bigger sky', '/images/gallery/amboseli-kilimanjaro.webp', 'Amboseli landscape with Mount Kilimanjaro beyond', 'Wide plains, elephant encounters and the distant outline of Kilimanjaro. Take your time on a safari through one of Kenya’s most memorable landscapes.'],
  ['masai-mara', 'Maasai Mara', 'The wild, wide open', '/images/gallery/wildebeest-migration.webp', 'Wildebeest on the open plains of the Maasai Mara', 'Follow the rhythm of the savannah across open grasslands. Every game drive brings a different view of the wildlife and landscapes that make the Mara special.'],
  ['nakuru', 'Lake Nakuru', 'Life around the lake', '/images/travel/6-day-amboseli-lake-nakuru-masai-mara-adventure.webp', 'Wildlife scenery from the Kenya lakes safari collection', 'Explore a landscape of lake shores, woodland and open grassland. Lake Nakuru adds a different chapter to a Kenyan wildlife journey.'],
  ['naivasha', 'Lake Naivasha', 'A slower safari moment', '/images/travel/3-day-masai-mara-lake-naivasha-budget-safari.webp', 'Kenyan safari scenery from the Mara and Naivasha journey', 'Pause in the Great Rift Valley around Lake Naivasha. Make room for lakeside scenery and a gentler pace between your safari adventures.'],
  ['samburu', 'Samburu', 'Another side of the wild', '/images/travel/10-day-off-the-beaten-path-kenya-safari-meru-samburu-ol-pejeta-masai-mara.webp', 'Northern Kenya safari scenery', 'Head north for open landscapes and a different safari setting. Samburu brings another perspective to a journey through Kenya.'],
  ['diani', 'Diani Beach', 'Let the coast take over', '/images/gallery/diani-beach.webp', 'The Indian Ocean coast at Diani Beach', 'End your adventure beside the Indian Ocean. Diani’s coastal scenery makes a relaxed contrast to days spent exploring Kenya’s national parks.'],
];
export default places.map(([id, name, label, image, alt, description]) => ({ ...locations[id], id, name, label, image, alt, description }));
