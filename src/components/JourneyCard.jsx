import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
export default function JourneyCard({ trip: p }) {
  return <article className="journey-card">
    <SiteLink className="journey-card-link" href={p.url}>
      <div className="card-image">
        <SiteImage src={p.image} alt={p.imageAlt || p.title} />
        <span className="card-country">{p.country}</span>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="card-meta"><span>{p.category}</span><span>{p.durationUnconfirmed ? "Duration to confirm" : p.details.Duration.replace(" / ", " · ").replace("1 Days", "1 Day")}</span></div>
      <h3>{p.title}</h3>
      <span className="card-discover">View itinerary <span aria-hidden="true">→</span></span>
    </SiteLink>
  </article>;
}
