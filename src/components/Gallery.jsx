import SiteImage from "./SiteImage";
export default function Gallery() {
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">{"A WINDOW INTO THE JOURNEY"}</span>
        <h1>
          {"Stay a little."}
          <br />
          <em>{"Look a little closer."}</em>
        </h1>
        <p>
          {
            "Wildlife encounters, island escapes and moments worth travelling for."
          }
        </p>
      </section>
      <section className="section gallery-grid">
        <a href="/packages/sri-lanka-beach-wildlife-tour/">
          <SiteImage
            src="/images/packages/sri-lanka-beach-wildlife-tour.webp"
            alt="9 Days Sri Lanka Beach & Wildlife Adventure"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"9 Days Sri Lanka Beach & Wildlife Adventure"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/7-day-kenya-safari-adventure-2/">
          <SiteImage
            src="/images/packages/7-day-kenya-safari-adventure-2.webp"
            alt="7-Day Kenya Safari Adventure"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"7-Day Kenya Safari Adventure"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/7-day-sopa-lodges-circuit-safari/">
          <SiteImage
            src="/images/packages/7-day-sopa-lodges-circuit-safari.jpg"
            alt="7-Day Sopa Lodges Circuit Safari"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"7-Day Sopa Lodges Circuit Safari"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/6-day-amboseli-and-masai-mara-luxury-safari/">
          <SiteImage
            src="/images/packages/6-day-amboseli-and-masai-mara-luxury-safari.jpg"
            alt="6-Day Amboseli and Masai Mara Luxury Safari"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"6-Day Amboseli and Masai Mara Luxury Safari"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/6-day-sopa-all-inclusive-safari-in-kenya/">
          <SiteImage
            src="/images/packages/6-day-sopa-all-inclusive-safari-in-kenya.jpg"
            alt="6-Day Sopa All-inclusive Safari in Kenya"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"6-Day Sopa All-inclusive Safari in Kenya"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/sri-lanka-lsland-loop-our/">
          <SiteImage
            src="/images/packages/sri-lanka-lsland-loop-our.png"
            alt="Sri Lanka Island Loop Tour"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Island Loop Tour"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/sri-lanka-wildlife-safari-experience/">
          <SiteImage
            src="/images/packages/sri-lanka-wildlife-safari-experience.jpg"
            alt="Sri Lanka Wildlife Safari Experience"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Wildlife Safari Experience"}</strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/8-day-masai-mara-amboseli-all-inclusive-kenya-safari/">
          <SiteImage
            src="/images/packages/8-day-masai-mara-amboseli-all-inclusive-kenya-safari.jpg"
            alt="8-Day Masai Mara, Amboseli, All-Inclusive Kenya Safari"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>
              {"8-Day Masai Mara, Amboseli, All-Inclusive Kenya Safari"}
            </strong>
            {"↗"}
          </span>
        </a>
        <a href="/packages/sri-lanka-pilgrimage-tour/">
          <SiteImage
            src="/images/packages/sri-lanka-pilgrimage-tour.jpg"
            alt="Sri Lanka Pilgrimage Tour"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Pilgrimage Tour"}</strong>
            {"↗"}
          </span>
        </a>
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
