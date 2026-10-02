import places from "./journey-places.json" with { type: "json" };

// Entries refer to the published itinerary sections (one-based), not inferred
// duration fields. Points represent towns or park areas, not accommodation.
const s = (place, entries, options = {}) => ({ place, entries, ...options });
const safariCircuit = () => [s("nairobi",[1]),s("amboseli",[1]),s("naivasha",[2]),s("nakuru",[3]),s("masai-mara",[4]),s("nairobi",[5])];
const bestOfKenya = () => [s("nairobi",[1]),s("amboseli",[1,2]),s("ol-pejeta",[3]),s("samburu",[4,5]),s("naivasha",[6]),s("masai-mara",[7,8]),s("nairobi",[9])];
const lakeSafari = () => [s("nairobi",[1]),s("naivasha",[1]),s("nakuru",[2]),s("masai-mara",[3,4]),s("nairobi",[5])];

export const journeyRoutes = {
  "sri-lanka-beach-wildlife-tour": { stops: [s("colombo-airport",[1]),s("colombo",[1]),s("bentota",[2]),s("hikkaduwa",[3]),s("galle",[4]),s("mirissa",[4,5]),s("yala",[5,6]),s("ella",[6]),s("nanu-oya",[7],{mode:"train"}),s("nuwara-eliya",[7]),s("kitulgala",[8]),s("colombo",[9]),s("colombo-airport",[9])] },
  "7-day-kenya-safari-adventure-2": { stops: [s("nairobi",[1]),s("amboseli",[1,2]),s("ol-pejeta",[3,4]),s("masai-mara",[5,6]),s("nairobi",[7])] },
  "7-day-sopa-lodges-circuit-safari": { stops: safariCircuit() },
  "7-day-magical-kenya-budget-safari-amboseli-naivasha-nakuru-masai-mara-2": { stops: safariCircuit() },
  "6-day-amboseli-and-masai-mara-luxury-safari": { stops: [s("nairobi",[1]),s("amboseli",[1,2],{mode:"flight"}),s("nairobi",[3],{mode:"flight",note:"Connecting flight through Nairobi."}),s("masai-mara",[3,4,5],{mode:"flight"}),s("nairobi",[6],{mode:"flight"})] },
  "4-day-luxury-masai-mara-lake-naivasha-safari": { stops: [s("nairobi",[1]),s("masai-mara",[1,2,3]),s("nairobi",[4])], note:"Lake Naivasha appears in the package title but is absent from the published daily itinerary. This map follows the daily itinerary; confirm the final route with our team." },
  "10-day-off-the-beaten-path-kenya-safari-meru-samburu-ol-pejeta-masai-mara": { stops: [s("nairobi",[1]),s("meru",[1,2]),s("samburu",[3,4]),s("ol-pejeta",[5,6]),s("masai-mara",[7,8]),s("nairobi",[9])] },
  "9-day-wildlife-diani-beach-safari": { stops: [s("nairobi",[1]),s("masai-mara",[1,2]),s("naivasha",[3]),s("amboseli",[4,5]),s("emali",[6],{note:"Transfer to the railway station."}),s("mombasa",[6],{mode:"train",note:"SGR train arrival, followed by a transfer to Diani."}),s("diani",[6,7,8,9]),s("nairobi",[9],{mode:"flight",note:"Flight via Ukunda Airstrip; airstrip transfer not drawn."})] },
  "6-day-sopa-all-inclusive-safari-in-kenya": { stops: [s("nairobi",[1]),s("amboseli",[1,2]),s("nakuru",[3]),s("masai-mara",[4,5]),s("nairobi",[6])] },
  "6-day-amboseli-lake-nakuru-masai-mara-adventure": { stops: [s("nairobi",[1]),s("amboseli",[1,2]),s("naivasha",[3]),s("nakuru",[3]),s("masai-mara",[4,5]),s("nairobi",[6])] },
  "3-day-mid-range-masai-mara-lake-naivasha-safari": { stops: [s("nairobi",[1]),s("masai-mara",[1,2]),s("naivasha",[3]),s("nairobi",[3])] },
  "10-day-best-of-kenya-safari-mara-amboseli-samburu-ol-pejeta-naivasha": { stops: bestOfKenya() },
  "5-day-kenya-safari-amboseli-lake-naivasha-masai-mara": { stops: [s("nairobi",[1]),s("amboseli",[1]),s("naivasha",[2]),s("masai-mara",[3,4]),s("nairobi",[5])] },
  "5-day-lake-naivasha-lake-nakuru-masai-mara-safari": { stops: lakeSafari() },
  "5-days-lake-naivasha-lake-nakuru-masai-mara-kenyan-safari": { stops: lakeSafari() },
  "4-days-lake-naivasha-lake-nakuru-masai-mara-4x4-safari": { stops: [s("nairobi",[1]),s("naivasha",[1]),s("nakuru",[1]),s("masai-mara",[2,3]),s("nairobi",[4])] },
  "4-days-maasai-mara-lake-naivasha-lake-nakuru-budget-safari": { stops: [s("naivasha",[1]),s("nakuru",[2]),s("masai-mara",[2,3]),s("nairobi",[4])], note:"The starting pick-up location is not named in the daily itinerary. The mapped journey begins at Lake Naivasha." },
  "3-day-masai-mara-lake-naivasha-budget-safari": { stops: [s("nairobi",[1]),s("masai-mara",[1,2]),s("naivasha",[3]),s("nairobi",[3])] },
  "1-day-best-of-nairobi-city-excursion": { stops: [s("nairobi-park",[1]),s("sheldrick",[1]),s("carnivore",[1]),s("giraffe-centre",[1])], note:"Key city attractions are shown in itinerary order. Hotel pick-up, drop-off and the choice of shopping venue are arranged individually." },
  "off-the-beaten-path-north-east-12-days": { stops: [s("colombo-airport",[1]),s("negombo",[1]),s("wilpattu",[2,3]),s("jaffna",[3,4]),s("kanniya",[5]),s("trincomalee",[5,6]),s("nilaveli",[7]),s("pigeon-island",[7],{mode:"boat"}),s("nilaveli",[7,8],{mode:"boat"}),s("gal-oya",[9,10]),s("colombo",[10,11]),s("colombo-airport",[12])] },
  "sri-lanka-lsland-loop-our": { stops: [s("colombo-airport",[1]),s("negombo",[1]),s("anuradhapura",[2]),s("dambulla",[3]),s("sigiriya",[3,4]),s("polonnaruwa",[5]),s("sigiriya",[6],{note:"The published departure area is Polonnaruwa / Sigiriya."}),s("kandy",[6,7]),s("nuwara-eliya",[8,9]),s("nanu-oya",[10]),s("ella",[10,11],{mode:"train"}),s("udawalawe",[12]),s("galle",[13]),s("colombo-airport",[14])], note:"The day 6 departure area is described as Polonnaruwa / Sigiriya. Nearby sightseeing and beach-stay choices are summarized by the main destinations." },
  "sri-lanka-wildlife-safari-experience": { stops: [s("colombo-airport",[1]),s("sinharaja",[1,2]),s("udawalawe",[3]),s("yala",[4]),s("bundala",[5]),s("galle",[5,6]),s("colombo",[6]),s("colombo-airport",[6])] },
  "the-classic-highlights": { stops: [s("colombo-airport",[1]),s("negombo",[1]),s("sigiriya",[2,3]),s("dambulla",[3]),s("kandy",[3]),s("ella",[4,5],{mode:"train"}),s("mirissa",[6]),s("galle",[7]),s("bentota",[7]),s("colombo",[8]),s("colombo-airport",[8])], note:"Day 2 names the Pinnawala area in its heading, but the daily description specifies Sigiriya. The main route follows the description." },
  "8-day-masai-mara-amboseli-all-inclusive-kenya-safari": { stops: [s("nairobi",[1]),s("amboseli",[1,2]),s("naivasha",[3]),s("hells-gate",[4]),s("nakuru",[4]),s("masai-mara",[5,6]),s("nairobi",[7])] },
  "10-day-best-of-kenya-safari": { stops: bestOfKenya() },
  "7-day-masai-mara-amboseli-naivasha-hells-gate-nakuru": { stops: [s("nairobi",[1]),s("amboseli",[1,2]),s("naivasha",[3]),s("hells-gate",[4]),s("nakuru",[4]),s("masai-mara",[5,6]),s("nairobi",[7])] },
  "best-of-both-sri-lanka-tour": { stops: [s("colombo-airport",[1]),s("kandy",[1,2]),s("nuwara-eliya",[3,4]),s("nanu-oya",[5]),s("ella",[5],{mode:"train"}),s("yala",[6]),s("mirissa",[7]),s("galle",[8]),s("colombo",[9,10]),s("colombo-airport",[10])] },
  "sri-lanka-surf-and-wellness-tour": { stops: [s("colombo-airport",[1]),s("ahangama",[1,2,3],{note:"Ahangama / Kabalana surf area."}),s("weligama",[4]),s("mirissa",[5,6]),s("talalla",[7,8]),s("hiriketiya",[9]),s("colombo-airport",[10])], optionalStops:[s("udawalawe",[8],{note:"Optional nature detour from Talalla; the beach retreat is the alternative."})] },
  "peaks-and-tea-trails": { stops: [s("kandy",[1]),s("hatton",[2]),s("nuwara-eliya",[3]),s("ella",[4]),s("haputale",[5]),s("colombo",[6]),s("colombo-airport",[6])], note:"This overview begins in Kandy, the first named destination in the published daily itinerary." },
  "sri-lanka-pilgrimage-tour": { stops: [s("colombo-airport",[1]),s("negombo",[1]),s("mihintale",[2]),s("anuradhapura",[2]),s("jaffna",[3]),s("dambulla",[4]),s("sigiriya",[5]),s("polonnaruwa",[5]),s("kandy",[6]),s("colombo",[7]),s("colombo-airport",[7])] },
  "sri-lanka-honeymoon-escape": { stops: [s("colombo-airport",[1]),s("kandy",[1]),s("nuwara-eliya",[2]),s("nanu-oya",[3]),s("ella",[3],{mode:"train"}),s("mirissa",[4],{note:"Illustrated beach stay. Tangalle is the published alternative."}),s("galle",[5]),s("colombo",[6]),s("colombo-airport",[6])], optionalStops:[s("tangalle",[4],{note:"Alternative to Mirissa, rather than an additional required stay."})], note:"The coast can be Mirissa or Tangalle. Mirissa is shown on the main line; Tangalle is marked as an alternative." },
  "sri-lanka-surf-explorer": { stops: [s("colombo-airport",[1]),s("galle",[1,2]),s("weligama",[3,4]),s("ahangama",[3,4]),s("mirissa",[5,6]),s("hiriketiya",[5,6]),s("udawalawe",[7,8]),s("tangalle",[8,9]),s("colombo",[9],{note:"Return towards Colombo; final departure or overnight arrangements are flexible."})], note:"Overnight areas on the surf coast are flexible. The map shows the named coastal areas, not a fixed order of individual beach visits." },
  "6-nights-7-days-sri-lanka-tour": { stops: [s("colombo-airport",[1]),s("pinnawala",[1]),s("dambulla",[1]),s("sigiriya",[2]),s("kandy",[2]),s("nuwara-eliya",[3]),s("nanu-oya",[4]),s("ella",[4],{mode:"train"}),s("yala",[5]),s("bentota",[6]),s("colombo",[7]),s("colombo-airport",[7])] },
  "3-nights-4-days-sri-lanka-tour": { stops: [s("colombo-airport",[1]),s("pinnawala",[1]),s("kandy",[1]),s("nuwara-eliya",[2]),s("bentota",[3]),s("colombo",[4]),s("colombo-airport",[4])] },
};

function dayLabel(title) {
  const match = title.match(/^Day\s*(\d+)(?:\s*(?:[:]?\s*&|[–-])\s*(\d+))?/i);
  return match ? (match[2] ? "Days " + match[1] + "–" + match[2] : "Day " + match[1]) : title;
}
export function getJourneyRoute(trip) {
  const slug = trip.url.split("/").filter(Boolean).at(-1);
  const route = journeyRoutes[slug];
  if (!route) throw new Error("Missing journey route: " + slug);
  const resolve = (stop, index, optional = false) => {
    const place = places[stop.place];
    if (!place || place.country !== trip.country) throw new Error("Invalid route place: " + stop.place);
    return { ...place, id:stop.place, number:optional ? null : index + 1, days:[...new Set(stop.entries.map(entry => dayLabel(trip.itinerary[entry - 1].title)))].join(" · "), entries:stop.entries, mode:stop.mode || "route", note:[stop.note, stop.mode === "flight" ? "" : place.accessNote].filter(Boolean).join(" "), optional };
  };
  return { stops:route.stops.map((stop,index) => resolve(stop,index)), optionalStops:(route.optionalStops || []).map((stop,index) => resolve(stop,index,true)), note:route.note || "", pathUrl:"/maps/routes/" + slug + ".json" };
}
