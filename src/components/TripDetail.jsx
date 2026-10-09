import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
import JourneyMap from "./JourneyMap";
import AboutMotion from "./AboutMotion";
import { getJourneyRoute } from "../data/journey-routes";

// Only trusted, sanitized package content belongs in these editorial fragments.
function RichText({ html }) {
  return (
    <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
export default function TripDetail({ trip: p }) {
  return (
    <AboutMotion><div className="trip-detail-page">
      <section className="detail-hero">
        <SiteImage src={p.image} sizes="100vw" loading="eager" fetchPriority="high" alt={p.imageAlt || p.title} />
        <div>
          <SiteLink href="/packages/" className="eyebrow">
            ← BACK TO JOURNEYS
          </SiteLink>
          <p className="eyebrow">
            {p.country} · {p.category}
          </p>
          <h1>{p.title}</h1>
        </div>
      </section>
      <div className="detail-layout section">
        <article>
          <section className="detail-section" data-about-reveal>
            <span className="eyebrow">YOUR JOURNEY AT A GLANCE</span>
            <h2>
              A little closer to extraordinary.
            </h2>
            <RichText html={p.overview} />
          </section>
          <JourneyMap route={getJourneyRoute(p)} country={p.country} />
          <section className="detail-section" id="itinerary" data-about-reveal>
            <span className="eyebrow">ONE DAY AT A TIME</span>
            <h2>The itinerary</h2>
            {p.itinerary.map((d, i) => (
              <details className="itinerary-day" name="journey-itinerary" key={i} open={i === 0}>
                <summary>
                  {d.title}
                  <span aria-hidden="true">+</span>
                </summary>
                <RichText html={d.body} />
              </details>
            ))}
          </section>
          {p.sections.map((s, i) => {
            if (s.title === "Highlights") {
              const activitiesSection = p.sections.find(
                (sec) => sec.title === "Activities"
              );
              return (
                <section
                  className="detail-section highlights-activities-grid"
                  data-about-reveal
                  key={i}
                >
                  <div>
                    <h2>{s.title}</h2>
                    <RichText html={s.body} />
                  </div>
                  {activitiesSection && (
                    <div>
                      <h2>{activitiesSection.title}</h2>
                      <RichText html={activitiesSection.body} />
                    </div>
                  )}
                </section>
              );
            }

            if (s.title === "Activities") {
              return null;
            }

            if (
              s.title === "Inclusions & Exclusions" ||
              s.title === "Inclusions and Exclusions"
            ) {
              const parts = s.body.split(/(?=<h3>What[’']s Not Included<\/h3>)/i);
              if (parts.length === 2) {
                return (
                  <section className="detail-section" key={i} data-about-reveal>
                    <h2>{s.title}</h2>
                    <div className="inclusions-grid">
                      <RichText html={parts[0]} />
                      <RichText html={parts[1]} />
                    </div>
                  </section>
                );
              }
            }

            return (
              <section className="detail-section" key={i} data-about-reveal>
                <h2>{s.title}</h2>
                <RichText html={s.body} />
              </section>
            );
          })}
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
          <SiteLink
            className="button"
            href={
              "/contact/?" +
              new URLSearchParams({ package: p.title, destination: p.country })
            }
          >
            Plan this journey ↗
          </SiteLink>
          <p className="small-note">
            Tell us your preferred dates and travel style. We’ll help with the
            details.
          </p>

        </aside>
      </div>

    </div></AboutMotion>
  );
}
