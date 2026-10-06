import SiteLink from './SiteLink';
import SiteImage from './SiteImage';
import AboutMotion from './AboutMotion';
import packages, { groupPackageVariants } from '../data/packages';

const values = [
  ['Integrity', 'We believe in honesty, transparency, and building long-term relationships with our travelers and partners.'],
  ['Quality Service', 'We are committed to delivering reliable and professional travel services that exceed expectations.'],
  ['Passion for Travel', 'Our love for exploration drives us to create journeys that inspire and excite travelers.'],
  ['Customer Satisfaction', 'Every traveler matters to us, and we work hard to ensure each experience is enjoyable and stress-free.'],
];
export default function About() {
  const journeys = groupPackageVariants(packages);
  return <AboutMotion>
    <section className="about-opening" aria-labelledby="about-title" data-parallax-layers>
      <div className="about-opening-landscape" data-parallax-layer="1"><img src="/videos/packages/poster.webp" alt="Misty tea country in Sri Lanka" width="1280" height="720" fetchPriority="high" /></div>
      <div className="about-opening-wash" data-parallax-layer="2" aria-hidden="true" />
      <div className="about-opening-title" data-parallax-layer="3"><span className="eyebrow">THE PEOPLE BEHIND YOUR JOURNEY</span><h1 id="about-title">A world to explore.<br /><em>A story to share.</em></h1><p>We’re Emerald Isle Travels.<br />Our story begins with the places that move you.</p></div>
      <figure className="about-opening-window" data-parallax-layer="4"><SiteImage src="/images/navigation/kenya.webp" alt="Elephants beneath Kilimanjaro in Amboseli, Kenya" sizes="(max-width: 700px) 42vw, 28vw" /><figcaption>From island paths to open plains.</figcaption></figure>
      <a className="about-scroll-cue" href="#our-story">SCROLL INTO OUR STORY <span aria-hidden="true">↓</span></a>
    </section>
    <section className="about-story-chapter" id="our-story" aria-labelledby="our-story-title">
      <figure className="about-story-photo about-image-card"><SiteImage src="/images/navigation/sri-lanka.webp" alt="The ancient rock fortress of Sigiriya, Sri Lanka" sizes="(max-width: 700px) 100vw, 45vw" /><figcaption>Sigiriya, Sri Lanka · A place worth slowing down for.</figcaption></figure>
      <div className="about-story-copy"><span className="eyebrow">WHO WE ARE</span><h2 id="our-story-title" data-about-reveal>Travel begins<br />with <em>curiosity.</em></h2><p data-about-reveal>Emerald Isle Travels (Pvt) Ltd creates thoughtfully planned tours, safari adventures and personal travel experiences in Sri Lanka and Kenya.</p><p data-about-reveal>We bring together nature, culture and comfort, working closely with trusted travel partners, local guides and hospitality providers. From your first enquiry to your return home, the details matter to us.</p><p className="about-story-note" data-about-reveal>Incredible places. Considered planning. A journey that feels like yours.</p></div>
    </section>
    <section className="about-purpose" aria-labelledby="mission-title">
      <div className="about-purpose-intro"><span className="eyebrow">THE PURPOSE BEHIND EVERY PLAN</span><p data-about-reveal>Not just where you go.<br /><em>How you experience it.</em></p></div>
      <div className="about-purpose-grid"><article><span className="eyebrow">OUR MISSION</span><h2 id="mission-title" data-about-reveal>Care in every<br /><em>detail.</em></h2><p data-about-reveal>Our mission is to provide safe, well-organized, and memorable travel experiences by combining expert planning, quality service, and carefully crafted travel packages tailored to our clients’ interests.</p></article><article><span className="eyebrow">OUR VISION</span><h2 data-about-reveal>Inspire the<br /><em>next journey.</em></h2><p data-about-reveal>To become a trusted travel brand that inspires people to explore the world through exceptional <strong>tours, safaris, and travel experiences</strong>.</p></article></div>
    </section>
    <section className="about-horizons" aria-labelledby="about-horizons-title"><figure className="about-image-card"><SiteImage src="/images/navigation/kenya.webp" alt="A herd of elephants in Amboseli National Park, Kenya" sizes="100vw" /></figure><div><span className="eyebrow">TWO PLACES. SO MANY POSSIBILITIES.</span><h2 id="about-horizons-title" data-about-reveal>Different horizons.<br /><em>The same thoughtful care.</em></h2></div></section>
    <section className="about-values" aria-labelledby="values-title"><div className="about-values-heading"><span className="eyebrow">WHAT GUIDES US</span><h2 id="values-title" data-about-reveal>Our values.<br /><em>Your peace of mind.</em></h2><p data-about-reveal>The principles we bring to every conversation, every plan and every journey.</p></div><div className="about-values-list">{values.map(([title, description]) => <article key={title}><h3 data-about-reveal>{title}</h3><p data-about-reveal>{description}</p></article>)}</div></section>
    <section className="about-facts" aria-label="Our travel collection"><span className="eyebrow">OUR WORLD, AT A GLANCE</span><div className="about-facts-grid"><div><strong>02</strong><h3 data-about-reveal>Destinations</h3><p data-about-reveal>Sri Lanka &amp; Kenya</p></div><div><strong>{journeys.length}</strong><h3 data-about-reveal>Distinct journeys</h3><p data-about-reveal>In our current travel collection</p></div><div><strong>{journeys.filter(p=>p.country === 'Sri Lanka').length}</strong><h3 data-about-reveal>Island discoveries</h3><p data-about-reveal>Journeys through Sri Lanka</p></div><div><strong>{journeys.filter(p=>p.country === 'Kenya').length}</strong><h3 data-about-reveal>Kenyan adventures</h3><p data-about-reveal>Journeys through Kenya</p></div></div></section>
    <section className="about-invitation"><span className="eyebrow">THE NEXT STORY COULD BE YOURS</span><h2 data-about-reveal>Where do you<br /><em>want to begin?</em></h2><SiteLink className="button" href="/contact/">Tell us your travel ideas</SiteLink><SiteLink className="text-link" href="/packages/">Explore our journeys</SiteLink></section>
  </AboutMotion>;
}
