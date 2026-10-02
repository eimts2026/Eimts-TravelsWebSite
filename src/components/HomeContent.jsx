import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
import JourneyCard from "./JourneyCard";
import packages from "../data/packages.json";
import EnquiryBand from "./EnquiryBand";
export default function HomeContent() {
  return <>
    <section className="intro section" id="introduction">
      <span className="eyebrow">WELCOME TO EMERALD ISLE TRAVELS</span>
      <div className="intro-grid"><h2>Not just a place.<br /><em>A feeling you take home.</em></h2>
        <div><p>That first glimpse of an elephant in the wild. A train winding through the tea hills. A quiet stretch of coastline that feels entirely your own.</p><p>We bring together the places, people and little details that turn a trip into something personal. Explore Sri Lanka and Kenya with thoughtfully planned journeys and a team beside you along the way.</p><SiteLink className="text-link" href="/about/">Meet Emerald Isle Travels ↗</SiteLink></div>
      </div>
    </section>
    <section className="section destinations" id="destinations">
      <div className="section-heading"><div><span className="eyebrow">TWO DESTINATIONS. ENDLESS POSSIBILITIES.</span><h2>Where will your<br /><em>curiosity take you?</em></h2></div><p>From the Indian Ocean to the African savannah.<br />Two extraordinary places, explored your way.</p></div>
      <div className="destination-grid">
        <SiteLink href="/destinations/sri-lanka/" className="destination-card"><SiteImage src="/images/travel/sigiriya.webp" alt="Sigiriya rising above the forests of Sri Lanka" /><div><span className="eyebrow">THE ISLAND OF A THOUSAND STORIES</span><h3>Sri Lanka</h3><p>Ancient wonders. Tea country. Ocean days.</p></div><span className="destination-arrow" aria-hidden="true">↗</span></SiteLink>
        <SiteLink href="/destinations/kenya/" className="destination-card"><SiteImage src="/images/travel/kenya-giraffes.webp" alt="Giraffes in Kenya’s wilderness" /><div><span className="eyebrow">WILD AT HEART</span><h3>Kenya</h3><p>Open horizons. Remarkable wildlife. Pure wonder.</p></div><span className="destination-arrow" aria-hidden="true">↗</span></SiteLink>
      </div>
    </section>
    <section className="section selected-journeys">
      <div className="section-heading"><div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>Journeys worth<br /><em>making time for.</em></h2></div><SiteLink className="text-link" href="/packages/">Explore all packages ↗</SiteLink></div>
      <div className="journey-grid">{["sri-lanka-beach-wildlife-tour", "6-day-amboseli-and-masai-mara-luxury-safari", "sri-lanka-honeymoon-escape"].map(slug => <JourneyCard key={slug} trip={packages.find(p => p.url === "/packages/" + slug + "/")} />)}</div>
    </section>
    <section className="philosophy">
      <div className="philosophy-photo"><SiteImage src="/images/travel/7-day-sopa-lodges-circuit-safari.webp" alt="A quiet moment overlooking the African wilderness" /><span>LESS ORDINARY. MORE EXTRAORDINARY.</span></div>
      <div className="philosophy-copy"><span className="eyebrow">THE EMERALD ISLE WAY</span><h2>Care in the details.<br /><em>Freedom in the journey.</em></h2><p>Adventure should feel effortless. From your first conversation to your journey home, our team brings together thoughtful planning, carefully chosen stays and meaningful experiences.</p>
        {[["✧","Made around you","Your interests, your pace, your kind of escape."],["⌁","Thoughtfully chosen","Memorable places and experiences, brought together with care."],["☼","With you along the way","Personal support before and throughout your travels."]].map(([icon,title,copy]) => <div className="value-row" key={title}><span aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
      </div>
    </section>
    <section className="section moments"><div className="section-heading"><div><span className="eyebrow">POSTCARDS FROM THE JOURNEY</span><h2>A world to <em>feel.</em></h2></div><SiteLink className="text-link" href="/gallery/">The travel gallery ↗</SiteLink></div>
      <div className="moments-grid">
        <SiteLink href="/packages/sri-lanka-beach-wildlife-tour/"><SiteImage src="/images/travel/sri-lanka-beach-wildlife-tour.webp" alt="Sri Lankan beach and wildlife journey" /><span>Into the wild ↗</span></SiteLink>
        <SiteLink href="/packages/7-day-magical-kenya-budget-safari-amboseli-naivasha-nakuru-masai-mara-2/"><SiteImage src="/images/travel/kenya-giraffes.webp" alt="Giraffes in Kenya’s wilderness" /><span>Under African skies ↗</span></SiteLink>
        <SiteLink href="/packages/sri-lanka-honeymoon-escape/"><SiteImage src="/images/travel/sri-lanka-beach.webp" alt="Golden sands on Sri Lanka’s coast" /><span>Slow days, island ways ↗</span></SiteLink>
      </div>
    </section>
    <EnquiryBand />
  </>;
}
