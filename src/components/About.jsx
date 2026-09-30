import SiteImage from "./SiteImage";
export default function About() {
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">{"EMERALD ISLE TRAVELS"}</span>
        <h1>
          {"Travel with a little"}
          <br />
          <em>{"more meaning."}</em>
        </h1>
        <p>
          {
            "Safari adventures, immersive tours and personal journeys through Sri Lanka and Kenya."
          }
        </p>
      </section>
      <section className="about-layout section">
        <SiteImage
          src="/images/sri-lanka-hero.jpeg"
          alt="Sigiriya surrounded by Sri Lankan forest"
        />
        <div>
          <span className="eyebrow">{"OUR STORY"}</span>
          <h2>
            {"The world is better"}
            <br />
            <em>{"experienced."}</em>
          </h2>
          <p>
            {
              "Emerald Isle Travels (Pvt) Ltd creates safari adventures, guided tours and curated travel experiences. We bring together nature, culture and comfort, with expert planning that helps you travel with confidence."
            }
          </p>
          <p>
            {
              "From wildlife safaris in Kenya to scenic tours and cultural discoveries in Sri Lanka, our journeys are designed around memorable experiences and thoughtful support."
            }
          </p>
          <h3>{"Thoughtful planning. Personal attention."}</h3>
          <p>
            {
              "Our approach combines handpicked destinations, carefully planned itineraries and support from your first enquiry to your return home."
            }
          </p>
          <a className="button" href="/contact/">
            {"Let’s plan something special ↗"}
          </a>
        </div>
      </section>
      <section className="section destinations" id="destinations">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {"TWO DESTINATIONS. ENDLESS POSSIBILITIES."}
            </span>
            <h2>
              {"Where will your"}
              <br />
              <em>{"curiosity take you?"}</em>
            </h2>
          </div>
          <p>
            {"From the Indian Ocean to the African savannah."}
            <br />
            {"Two extraordinary places, explored your way."}
          </p>
        </div>
        <div className="destination-grid">
          <a href="/destinations/sri-lanka/" className="destination-card">
            <SiteImage
              src="/images/sri-lanka-hero.jpeg"
              alt="Sigiriya rising above the forests of Sri Lanka"
              loading="lazy"
            />
            <div>
              <span className="eyebrow">
                {"THE ISLAND OF A THOUSAND STORIES"}
              </span>
              <h3>{"Sri Lanka"}</h3>
              <p>{"Ancient wonders. Tea country. Ocean days."}</p>
            </div>
            <span className="destination-arrow">{"↗"}</span>
          </a>
          <a href="/destinations/kenya/" className="destination-card">
            <SiteImage
              src="/images/packages/7-day-magical-kenya-budget-safari-amboseli-naivasha-nakuru-masai-mara-2.jpg"
              alt="Giraffes on the open Kenyan savannah"
              loading="lazy"
            />
            <div>
              <span className="eyebrow">{"WILD AT HEART"}</span>
              <h3>{"Kenya"}</h3>
              <p>{"Open horizons. Remarkable wildlife. Pure wonder."}</p>
            </div>
            <span className="destination-arrow">{"↗"}</span>
          </a>
        </div>
      </section>
      <section className="enquiry-band">
        <div>
          <span className="eyebrow">{"YOUR JOURNEY, YOUR WAY"}</span>
          <h2>
            {"Let’s make it "}
            <em>{"yours."}</em>
          </h2>
          <p>
            {
              "A place you’ve dreamed of. A pace that feels right. Tell us what you have in mind."
            }
          </p>
        </div>
        <a className="button light" href="/contact/">
          {"Plan my journey "}
          <span aria-hidden="true">{"↗"}</span>
        </a>
      </section>
    </>
  );
}
