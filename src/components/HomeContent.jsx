import SiteImage from "./SiteImage";
export default function HomeContent() {
  return (
    <>
      <section className="intro section" id="introduction">
        <span className="eyebrow">{"WELCOME TO EMERALD ISLE TRAVELS"}</span>
        <div className="intro-grid">
          <h2>
            {"Not just a place."}
            <br />
            <em>{"A feeling you take home."}</em>
          </h2>
          <div>
            <p>
              {
                "That first glimpse of an elephant in the wild. A train winding through the tea hills. A quiet stretch of coastline that feels entirely your own."
              }
            </p>
            <p>
              {
                "We bring together the places, people and little details that turn a trip into something personal. Explore Sri Lanka and Kenya with thoughtfully planned journeys and a team beside you along the way."
              }
            </p>
            <a className="text-link" href="/about/">
              {"Meet Emerald Isle Travels "}
              <span>{"↗"}</span>
            </a>
          </div>
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
      <section className="section selected-journeys">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{"A LITTLE INSPIRATION"}</span>
            <h2>
              {"Journeys worth"}
              <br />
              <em>{"making time for."}</em>
            </h2>
          </div>
          <a className="text-link" href="/packages/">
            {"Explore all journeys "}
            <span>{"↗"}</span>
          </a>
        </div>
        <div className="journey-grid">
          <article
            className="journey-card"
            data-country="Sri Lanka"
            data-days="9"
            data-title="9 days sri lanka beach & wildlife adventure"
          >
            <a
              className="card-image"
              href="/packages/sri-lanka-beach-wildlife-tour/"
            >
              <SiteImage
                src="/images/packages/sri-lanka-beach-wildlife-tour.webp"
                alt="9 Days Sri Lanka Beach & Wildlife Adventure"
                loading="lazy"
              />
              <span className="card-country">{"Sri Lanka"}</span>
              <span className="card-arrow">
                <span aria-hidden="true">{"↗"}</span>
              </span>
            </a>
            <div className="card-meta">
              <span>{"Safari · Tours"}</span>
              <span>{"9 Days · 8 Nights"}</span>
            </div>
            <h3>
              <a href="/packages/sri-lanka-beach-wildlife-tour/">
                {"9 Days Sri Lanka Beach & Wildlife Adventure"}
              </a>
            </h3>
            <a
              className="text-link"
              href="/packages/sri-lanka-beach-wildlife-tour/"
            >
              {"Discover this journey "}
              <span>{"→"}</span>
            </a>
          </article>
          <article
            className="journey-card"
            data-country="Kenya"
            data-days="6"
            data-title="6-day amboseli and masai mara luxury safari"
          >
            <a
              className="card-image"
              href="/packages/6-day-amboseli-and-masai-mara-luxury-safari/"
            >
              <SiteImage
                src="/images/packages/6-day-amboseli-and-masai-mara-luxury-safari.jpg"
                alt="6-Day Amboseli and Masai Mara Luxury Safari"
                loading="lazy"
              />
              <span className="card-country">{"Kenya"}</span>
              <span className="card-arrow">
                <span aria-hidden="true">{"↗"}</span>
              </span>
            </a>
            <div className="card-meta">
              <span>{"Safari"}</span>
              <span>{"6 Days · 5 Nights"}</span>
            </div>
            <h3>
              <a href="/packages/6-day-amboseli-and-masai-mara-luxury-safari/">
                {"6-Day Amboseli and Masai Mara Luxury Safari"}
              </a>
            </h3>
            <a
              className="text-link"
              href="/packages/6-day-amboseli-and-masai-mara-luxury-safari/"
            >
              {"Discover this journey "}
              <span>{"→"}</span>
            </a>
          </article>
          <article
            className="journey-card"
            data-country="Sri Lanka"
            data-days="6"
            data-title="sri lanka honeymoon escape"
          >
            <a
              className="card-image"
              href="/packages/sri-lanka-honeymoon-escape/"
            >
              <SiteImage
                src="/images/packages/sri-lanka-honeymoon-escape.jpg"
                alt="Sri Lanka Honeymoon Escape"
                loading="lazy"
              />
              <span className="card-country">{"Sri Lanka"}</span>
              <span className="card-arrow">
                <span aria-hidden="true">{"↗"}</span>
              </span>
            </a>
            <div className="card-meta">
              <span>{"Honeymoon"}</span>
              <span>{"6 Days · 5 Nights"}</span>
            </div>
            <h3>
              <a href="/packages/sri-lanka-honeymoon-escape/">
                {"Sri Lanka Honeymoon Escape"}
              </a>
            </h3>
            <a
              className="text-link"
              href="/packages/sri-lanka-honeymoon-escape/"
            >
              {"Discover this journey "}
              <span>{"→"}</span>
            </a>
          </article>
        </div>
      </section>
      <section className="philosophy">
        <div className="philosophy-photo">
          <SiteImage
            src="/images/packages/7-day-sopa-lodges-circuit-safari.jpg"
            alt="A quiet moment overlooking the African wilderness"
            loading="lazy"
          />
          <span>{"LESS ORDINARY. MORE EXTRAORDINARY."}</span>
        </div>
        <div className="philosophy-copy">
          <span className="eyebrow">{"THE EMERALD ISLE WAY"}</span>
          <h2>
            {"Care in the details."}
            <br />
            <em>{"Freedom in the journey."}</em>
          </h2>
          <p>
            {
              "Adventure should feel effortless. From your first conversation to your journey home, our team brings together thoughtful planning, carefully chosen stays and meaningful experiences."
            }
          </p>
          <div className="value-row">
            <span>{"✧"}</span>
            <div>
              <h3>{"Made around you"}</h3>
              <p>{"Your interests, your pace, your kind of escape."}</p>
            </div>
          </div>
          <div className="value-row">
            <span>{"⌁"}</span>
            <div>
              <h3>{"Thoughtfully chosen"}</h3>
              <p>
                {
                  "Memorable places and experiences, brought together with care."
                }
              </p>
            </div>
          </div>
          <div className="value-row">
            <span>{"☼"}</span>
            <div>
              <h3>{"With you along the way"}</h3>
              <p>{"Personal support before and throughout your travels."}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section moments">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{"POSTCARDS FROM THE JOURNEY"}</span>
            <h2>
              {"A world to "}
              <em>{"feel."}</em>
            </h2>
          </div>
          <a className="text-link" href="/gallery/">
            {"The travel gallery ↗"}
          </a>
        </div>
        <div className="moments-grid">
          <a href="/packages/sri-lanka-beach-wildlife-tour/">
            <SiteImage
              src="/images/packages/sri-lanka-beach-wildlife-tour.webp"
              alt="9 Days Sri Lanka Beach & Wildlife Adventure"
              loading="lazy"
            />
            <span>{"Into the wild ↗"}</span>
          </a>
          <a href="/packages/7-day-magical-kenya-budget-safari-amboseli-naivasha-nakuru-masai-mara-2/">
            <SiteImage
              src="/images/packages/7-day-magical-kenya-budget-safari-amboseli-naivasha-nakuru-masai-mara-2.jpg"
              alt="7-Day Magical Kenya Budget Safari (Amboseli, Naivasha, Nakuru & Masai Mara)"
              loading="lazy"
            />
            <span>{"Under African skies ↗"}</span>
          </a>
          <a href="/packages/sri-lanka-honeymoon-escape/">
            <SiteImage
              src="/images/packages/sri-lanka-honeymoon-escape.jpg"
              alt="Sri Lanka Honeymoon Escape"
              loading="lazy"
            />
            <span>{"Slow days, island ways ↗"}</span>
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
