"use client";
import { useState } from 'react';
import SiteLink from './SiteLink';
import SiteImage from './SiteImage';
import AboutMotion from './AboutMotion';
import AboutCount from './AboutCount';
import packages, { groupPackageVariants } from '../data/packages';

const values = [
  ['Integrity', 'We believe in honesty, transparency, and building long-term relationships with our travelers and partners.', 'bridge', 'The Nine Arch Bridge in Ella, Sri Lanka'],
  ['Quality service', 'We are committed to delivering reliable and professional travel services that exceed expectations.', 'coast', 'Palm trees beside the Sri Lankan coast'],
  ['Passion for travel', 'Our love for exploration drives us to create journeys that inspire and excite travelers.', 'safari', 'A giraffe in Lewa, Kenya'],
  ['Customer satisfaction', 'Every traveler matters to us, and we work hard to ensure each experience is enjoyable and stress-free.', 'tea', 'Green tea country in Sri Lanka'],
];
const questions = [
  ['Where can I travel with Emerald Isle Travels?', 'Our current collection covers Sri Lanka and Kenya, with island tours, cultural discoveries and safari journeys. Explore our packages to see the routes available.'],
  ['How do I start planning a trip?', 'Send us your preferred destination, approximate travel dates, group size and the experiences you have in mind through our contact page. Our team will help you explore the options.'],
  ['Can I discuss a journey around my interests?', 'Yes. Tell us what you enjoy, your preferred pace and any specific needs. We can discuss a travel plan tailored to your interests and confirm what is possible for your dates.'],
  ['What is included in a travel package?', 'Inclusions vary by journey. Check the individual package page and ask our team to confirm accommodation, transport, activities and any exclusions before booking.'],
  ['Can you help me choose between Sri Lanka and Kenya?', 'Share the kind of holiday you want. Sri Lanka’s collection brings together culture, tea country and the coast, while our Kenyan journeys focus on safari experiences. We can help you compare suitable routes.'],
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const journeys = groupPackageVariants(packages);
  const facts = [
    [2, 'Destinations', 'Sri Lanka & Kenya'],
    [journeys.length, 'Distinct journeys', 'In our travel collection'],
    [journeys.filter(p => p.country === 'Sri Lanka').length, 'Island discoveries', 'Across Sri Lanka'],
    [journeys.filter(p => p.country === 'Kenya').length, 'Safari adventures', 'Across Kenya'],
  ];
  return <AboutMotion>
    <section className="about-opening about-container" aria-labelledby="about-title">
      <div className="about-section-heading">
        <span className="about-kicker">About Emerald Isle</span>
        <h1 id="about-title">Get to know us.</h1>
        <p>We bring people closer to the places that move them. Thoughtfully planned journeys through Sri Lanka and Kenya, shaped around you.</p>
      </div>
      <figure className="about-hero-image about-image-card">
        <SiteImage src="/images/gallery/ella-nine-arch-bridge.webp" alt="A blue train winding across the Nine Arch Bridge in Ella, Sri Lanka" loading="eager" fetchPriority="high" sizes="(max-width: 700px) 92vw, 84vw" />
        <figcaption><span>Extraordinary places. Personal journeys.</span><a href="#our-story" aria-label="Discover our story"><span aria-hidden="true">↓</span></a></figcaption>
      </figure>
      <div className="about-photo-strip" aria-label="A glimpse of our destinations">
        {[
          ['safari', 'A giraffe on the open plains of Lewa, Kenya', 'Into the wild'],
          ['coast', 'Palm trees beside the ocean in Sri Lanka', 'Along the coast'],
          ['tea', 'Rolling green tea plantations in Sri Lanka', 'Through tea country'],
        ].map(([name, alt, caption]) => <figure key={name} className="about-image-card"><SiteImage src={`/images/about/${name}.webp`} alt={alt} sizes="(max-width: 700px) 30vw, 28vw" /><figcaption>{caption}</figcaption></figure>)}
      </div>
    </section>

    <section className="about-story about-container" id="our-story" aria-labelledby="our-story-title">
      <div><span className="about-kicker">The people behind the plans</span><h2 id="our-story-title" data-about-reveal>Travel begins<br />with curiosity.</h2></div>
      <div className="about-story-copy"><p>Emerald Isle Travels (Pvt) Ltd creates thoughtfully planned tours, safari adventures and personal travel experiences in Sri Lanka and Kenya.</p><p>We bring together nature, culture and comfort, working closely with trusted travel partners, local guides and hospitality providers. From your first enquiry to your return home, the details matter to us.</p><SiteLink className="about-inline-link" href="/contact/">Meet your next adventure <span aria-hidden="true">↗</span></SiteLink></div>
    </section>

    <section className="about-facts about-container" aria-label="Our travel collection">
      <div className="about-facts-grid">{facts.map(([value, title, description]) => <div key={title}><AboutCount value={value} /><h3>{title}</h3><p>{description}</p></div>)}</div>
    </section>

    <section className="about-values about-container" aria-labelledby="values-title">
      <div className="about-section-heading"><span className="about-kicker">What guides us</span><h2 id="values-title" data-about-reveal>Our values.</h2><p>The principles we bring to every conversation, every plan and every journey.</p></div>
      <div className="about-values-list">{values.map(([title, description, photo, alt]) => <article key={title} data-about-reveal><div className="about-value-photo"><SiteImage src={`/images/about/${photo}.webp`} alt={alt} sizes="(max-width: 600px) 28vw, 150px" /></div><div className="about-value-copy"><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </section>

    <section className="about-purpose about-container" aria-labelledby="mission-title">
      <div className="about-purpose-copy"><span className="about-kicker">Care in every detail</span><h2 id="mission-title" data-about-reveal>Our mission.</h2><p>Our mission is to provide safe, well-organized, and memorable travel experiences by combining expert planning, quality service, and carefully crafted travel packages tailored to our clients’ interests.</p><p>Incredible places. Considered planning. A journey that feels like yours.</p><SiteLink className="about-inline-link" href="/packages/">Find your journey <span aria-hidden="true">↗</span></SiteLink></div>
      <figure className="about-purpose-photo about-image-card"><SiteImage src="/images/navigation/sri-lanka.webp" alt="The ancient rock fortress of Sigiriya surrounded by lush Sri Lankan forest" sizes="(max-width: 760px) 92vw, 50vw" /></figure>
    </section>

    <section className="about-purpose about-purpose-reverse about-container" aria-labelledby="vision-title">
      <div className="about-purpose-copy"><span className="about-kicker">More horizons ahead</span><h2 id="vision-title" data-about-reveal>Our vision.</h2><p>To become a trusted travel brand that inspires people to explore the world through exceptional tours, safaris, and travel experiences.</p><p>From the island landscapes of Sri Lanka to Kenya’s open plains, we want every journey to inspire the next.</p></div>
      <figure className="about-purpose-photo about-image-card"><SiteImage src="/images/navigation/kenya.webp" alt="Elephants on the Amboseli plains with Mount Kilimanjaro beyond" sizes="(max-width: 760px) 92vw, 50vw" /></figure>
    </section>

    <section className="about-invitation" aria-labelledby="invitation-title">
      <SiteImage className="about-invitation-image" src="/images/about/tea.webp" alt="" sizes="100vw" />
      <div className="about-invitation-content"><span className="about-kicker">The next story could be yours</span><h2 id="invitation-title" data-about-reveal>Where do you<br />want to begin?</h2><p>A place you’ve dreamed of. An experience you’ve never tried.<br />Let’s make a journey out of it.</p><SiteLink className="button" href="/contact/">Tell us your travel ideas</SiteLink></div>
    </section>

    <section className="about-faq about-container" aria-labelledby="about-faq-title">
      <div className="about-section-heading"><span className="about-kicker">A little clarity before you go</span><h2 id="about-faq-title" data-about-reveal>Frequently asked questions.</h2><p>Start with the essentials. For anything else, <SiteLink href="/contact/">talk to our team</SiteLink>.</p></div>
      <div className="about-faq-list" role="list">{questions.map(([question, answer], index) => {
        const isOpen = openFaq === index;
        return <details key={question} open={isOpen} role="listitem">
          <summary aria-expanded={isOpen} aria-controls={`about-faq-answer-${index}`} onClick={event => { event.preventDefault(); setOpenFaq(current => current === index ? null : index); }}>
            {question}<span aria-hidden="true">+</span>
          </summary>
          <p id={`about-faq-answer-${index}`}>{answer}</p>
        </details>;
      })}</div>
    </section>
  </AboutMotion>;
}
