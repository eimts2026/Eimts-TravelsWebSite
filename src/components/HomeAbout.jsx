import SiteLink from "./SiteLink";
const reasons = [
  ["01", "Journeys made around you", "Adventure, culture or relaxation — thoughtfully planned packages that bring together the experiences you enjoy."],
  ["02", "Trusted people along the way", "We work closely with travel partners, local guides and hospitality providers to bring your journey together."],
  ["03", "Comfort and care", "Careful planning and attention to detail help make your trip smooth, comfortable and truly special."],
  ["04", "Experiences that stay with you", "Discover Kenya’s wildlife and Sri Lanka’s nature and heritage through authentic local experiences."],
];
export default function HomeAbout() {
  return <>
    <section className="home-about" id="about-emerald" aria-labelledby="home-about-heading">
      <div className="home-about-heading"><span className="eyebrow">ABOUT EMERALD ISLE TRAVELS</span><h2 id="home-about-heading">Unforgettable journeys.<br /><em>Thoughtfully brought together.</em></h2></div>
      <div className="home-about-layout">
        <figure className="home-about-image"><img src="/images/tour-categories/adventure.webp" alt="Hikers exploring Sri Lanka’s lush mountain landscapes" width="800" height="1000" loading="lazy" /></figure>
        <div className="home-about-copy">
          <p className="home-about-lead"><strong>Emerald Isle Travels (Pvt) Ltd</strong> is a travel company committed to creating unforgettable journeys through expertly designed tours, safari adventures, and unique travel experiences. Our goal is to help travelers explore incredible destinations while enjoying comfort, safety, and authentic local experiences.</p>
          <p>We specialize in organizing well-planned travel packages that combine adventure, nature, culture, and relaxation. From witnessing the breathtaking wildlife of Kenya to exploring the diverse beauty and heritage of Sri Lanka, every journey we design is created with care and attention to detail.</p>
          <p>Our team works closely with trusted travel partners, guides, and hospitality providers to ensure every trip runs smoothly from start to finish. Whether you are planning a relaxing getaway, an exciting safari adventure, or a memorable cultural tour, Emerald Isle Travels is dedicated to making your travel experience seamless and truly special.</p>
          <p>At Emerald Isle Travels, we believe that travel should inspire, connect people with nature and culture, and create memories that last a lifetime.</p>
          <div className="home-about-action"><SiteLink className="text-link" href="/about/">About Us</SiteLink></div>
        </div>
        <figure className="home-about-image home-about-image-right"><img src="/images/tour-categories/safari.webp" alt="Elephants beneath acacia trees on Kenya’s savannah" width="800" height="1000" loading="lazy" /></figure>
      </div>
    </section>
    <section className="home-why" aria-labelledby="home-why-heading">
      <div className="home-why-heading"><div><span className="eyebrow">THE CARE BEHIND YOUR JOURNEY</span><h2 id="home-why-heading">Why Book with<br /><em>Emerald Isle Travels?</em></h2></div><p>Incredible places are just the beginning. We bring together the planning, people and personal touches that make a journey feel effortless.</p></div>
      <div className="home-why-grid">{reasons.map(([number, title, copy]) => <article key={number}><span className="home-why-number" aria-hidden="true">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
  </>;
}
