import SiteImage from './SiteImage';
import SiteLink from './SiteLink';

export default function CatalogueCard({ trip }) {
  return <article className="collection-card">
    <SiteLink href={`/packages/?search=${encodeURIComponent(trip.title)}#journey-collection`} className="collection-card-link">
      <div className="collection-card-photo">
        <SiteImage src={trip.image} alt={trip.imageAlt || trip.title} sizes="(max-width: 640px) 100vw, (max-width: 1050px) 50vw, 33vw" />
        <span className="collection-card-country">{trip.country}</span>
      </div>
      <div className="collection-card-body">
        <div className="collection-card-meta"><span>{trip.category}</span><span>{trip.durationUnconfirmed ? 'Duration to confirm' : `${trip.days} ${trip.days === 1 ? 'day' : 'days'}`}</span></div>
        <h3>{trip.title}</h3>
        <span className="collection-card-action">Explore packages <span aria-hidden="true">↗</span></span>
      </div>
    </SiteLink>
    {trip.variants?.length > 0 && <div className="collection-card-variants"><span>Choose your travel style</span>{trip.variants.map(option => <SiteLink key={option.url} href={`/packages/?search=${encodeURIComponent(option.title)}#journey-collection`}>{option.details['Group Size'] === '6-12' ? 'Group of 6–12 travellers' : option.details['Group Size']} <span aria-hidden="true">↗</span></SiteLink>)}</div>}
  </article>;
}
