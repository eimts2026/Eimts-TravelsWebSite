import EnquiryBand from "./EnquiryBand";
// Only trusted, sanitized package content belongs in these editorial fragments.
function RichText({ html }) {
  return (
    <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
export default function TripDetail({ trip: p }) {
  return (
    <>
      <section className="detail-hero">
        <img src={p.image} alt={p.title} />
        <div>
          <a href="/packages/" className="eyebrow">
            ← BACK TO JOURNEYS
          </a>
          <p className="eyebrow">
            {p.country} · {p.category}
          </p>
          <h1>{p.title}</h1>
        </div>
      </section>
      <div className="detail-layout section">
        <article>
          <section className="detail-section">
            <span className="eyebrow">YOUR JOURNEY AT A GLANCE</span>
            <h2>
              A little closer to <em>extraordinary.</em>
            </h2>
            <RichText html={p.overview} />
          </section>
          <section className="detail-section" id="itinerary">
            <span className="eyebrow">ONE DAY AT A TIME</span>
            <h2>The itinerary</h2>
            {p.itinerary.map((d, i) => (
              <details className="itinerary-day" key={i} open={i === 0}>
                <summary>
                  {d.title}
                  <span aria-hidden="true">+</span>
                </summary>
                <RichText html={d.body} />
              </details>
            ))}
          </section>
          {p.sections.map((s, i) => (
            <section className="detail-section" key={i}>
              <h2>{s.title}</h2>
              <RichText html={s.body} />
            </section>
          ))}
        </article>
        <aside className="trip-summary">
          <span className="eyebrow">MAKE THIS JOURNEY YOURS</span>
          <h2>{p.country}</h2>
          <dl>
            {Object.entries(p.details).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {p.durationUnconfirmed && (
            <p className="duration-note">
              The published itinerary and duration differ. We’ll confirm the
              exact schedule when planning your trip.
            </p>
          )}
          <a
            className="button"
            href={
              "/contact/?" +
              new URLSearchParams({ package: p.title, destination: p.country })
            }
          >
            Plan this journey ↗
          </a>
          <p className="small-note">
            Tell us your preferred dates and travel style. We’ll help with the
            details.
          </p>
          <a className="text-link" href="mailto:travels@emeraldisle.lk">
            Ask us a question ↗
          </a>
        </aside>
      </div>
      <EnquiryBand />
    </>
  );
}
