import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
import JourneyCard from "./JourneyCard";
import packages from "../data/packages.js";
import MorphGallery from "./MorphGallery";
import TourCategories from "./TourCategories";
import HomeAbout from "./HomeAbout";
import HomePlaces from "./HomePlaces";
const galleryPhotos = [
  ["coastal-bay", "A palm-lined bay with turquoise water in Sri Lanka"],
  ["red-mosque", "The red and white domes of Colombo’s Red Mosque"],
  ["city-heritage", "A white heritage building beside buses and tuk-tuks in Sri Lanka"],
  ["sigiriya-summit", "The ancient ruins on Sigiriya’s summit above the forest"],
  ["cave-temple", "Buddha statues beneath a painted cave temple ceiling"],
  ["fishermen-sunset", "Stilt fishermen silhouetted over the ocean at sunset"],
  ["coconut-coast", "A traveller walking among coconut palms overlooking the ocean"],
  ["stilt-fishermen", "Stilt fishermen standing over the ocean"],
].map(([name, alt]) => ({ src: `/images/home-gallery/${name}.webp`, thumb: `/images/home-gallery/${name}-thumb.webp`, alt }));
export default function HomeContent() {
  return <>
    <HomeAbout />
    <TourCategories />
    <HomePlaces />
    <section className="section selected-journeys">
      <div className="section-heading"><div><span className="eyebrow">NOW, IMAGINE YOUR DAYS</span><h2>Journeys worth<br /><em>making time for.</em></h2></div><SiteLink className="text-link" href="/packages/">Explore all packages ↗</SiteLink></div>
      <div className="journey-grid">{["sri-lanka-beach-wildlife-tour", "6-day-amboseli-and-masai-mara-luxury-safari", "sri-lanka-honeymoon-escape"].map(slug => <JourneyCard key={slug} trip={packages.find(p => p.url === "/packages/" + slug + "/")} />)}</div>
    </section>
    <section className="section home-travel-gallery"><div className="section-heading"><div><span className="eyebrow">POSTCARDS FROM THE JOURNEY</span><h2>Travel <em>Gallery.</em></h2></div></div>
      <MorphGallery items={galleryPhotos} height="100svh" duration={1000} drift={0.12} autoplay={2000} playbackControls={false} thumbnails={false} showCaption={false} />
    </section>
    <section className="philosophy" aria-labelledby="tailor-made-heading">
      <div className="philosophy-photo"><SiteImage src="/images/travel/7-day-sopa-lodges-circuit-safari.webp" alt="A quiet moment overlooking the African wilderness" /><span>LESS ORDINARY. MORE EXTRAORDINARY.</span></div>
      <div className="philosophy-copy"><span className="eyebrow">THEN, MAKE IT YOUR OWN</span><h2 id="tailor-made-heading">Tailor-made<br /><em>Bespoke Tours</em></h2><p>Create your perfect Sri Lankan adventure or Kenyan safari with us.</p>
        <p>Every journey starts with you. Tell us your interests, your travel dates and your preferred pace, and our team will bring together carefully chosen stays and meaningful experiences in a personalised itinerary made around you.</p>
        <SiteLink className="button light" href="/contact/">Contact Us <span aria-hidden="true">↗</span></SiteLink>
      </div>
    </section>
  </>;
}
