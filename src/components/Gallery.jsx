import SiteLink from "./SiteLink";
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
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/sri-lanka-beach-wildlife-tour.webp"
            alt="9 Days Sri Lanka Beach & Wildlife Adventure"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"9 Days Sri Lanka Beach & Wildlife Adventure"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/kenya-giraffes.webp"
            alt="7-Day Kenya Safari Adventure"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"7-Day Kenya Safari Adventure"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/7-day-sopa-lodges-circuit-safari.webp"
            alt="7-Day Sopa Lodges Circuit Safari"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"7-Day Sopa Lodges Circuit Safari"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/kenya-elephants.webp"
            alt="6-Day Amboseli and Masai Mara Luxury Safari"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"6-Day Amboseli and Masai Mara Luxury Safari"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/kenya-elephants.webp"
            alt="6-Day Sopa All-inclusive Safari in Kenya"
            loading="lazy"
          />
          <span>
            {"Kenya"}
            <strong>{"6-Day Sopa All-inclusive Safari in Kenya"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/sigiriya.webp"
            alt="Sri Lanka Island Loop Tour"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Island Loop Tour"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/sri-lanka-wildlife-safari-experience.webp"
            alt="Sri Lanka Wildlife Safari Experience"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Wildlife Safari Experience"}</strong>
            {"↗"}
          </span>
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/8-day-masai-mara-amboseli-all-inclusive-kenya-safari.webp"
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
        </SiteLink>
        <SiteLink href="/packages/">
          <SiteImage
            src="/images/travel/sri-lanka-pilgrimage-tour.webp"
            alt="Sri Lanka Pilgrimage Tour"
            loading="lazy"
          />
          <span>
            {"Sri Lanka"}
            <strong>{"Sri Lanka Pilgrimage Tour"}</strong>
            {"↗"}
          </span>
        </SiteLink>
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
        <SiteLink className="button light" href="/contact/">
          {"Plan my journey "}
          <span aria-hidden="true">{"↗"}</span>
        </SiteLink>
      </section>
    </>
  );
}
