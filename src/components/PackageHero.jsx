import SiteImage from './SiteImage';
import SiteLink from './SiteLink';

export default function PackageHero({ destinations }) {
  return <section className="packages-cover about-container" aria-labelledby="packages-title">
    <div className="about-section-heading">
      <span className="about-kicker">The Emerald Isle collection</span>
      <h1 id="packages-title">Find your kind of journey.</h1>
      <p>Island discoveries in Sri Lanka. Wild encounters in Kenya.<br className="packages-desktop-break" /> Thoughtfully planned experiences, with room to make them yours.</p>
    </div>
    <div className="packages-destination-scenes">
      {destinations.map(({ country, count, image, alt, description }, index) => <SiteLink key={country} href={`/packages/?country=${encodeURIComponent(country)}#journey-collection`} className="packages-destination-scene" aria-label={`Explore ${country}, ${count} journeys`}>
        <SiteImage src={image} alt={alt} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} sizes="(max-width: 640px) 90vw, 42vw" />
        <div className="packages-destination-caption"><div><span>{count} journeys to discover</span><h2>{country}</h2><p>{description}</p></div><span className="packages-scene-arrow" aria-hidden="true">↗</span></div>
      </SiteLink>)}
    </div>
  </section>;
}
