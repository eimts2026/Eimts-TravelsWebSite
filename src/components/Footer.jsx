import SiteLink from "./SiteLink";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-top">
          <SiteLink className="brand" href="/" aria-label="Emerald Isle Travels home">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 2 43 24 24 46 5 24Z" stroke="currentColor"></path>
              <path d="m24 10 8 14-8 14-8-14Z" fill="currentColor"></path>
              <path d="M2 24h44M24 2v44" stroke="currentColor"></path>
            </svg>
            <span>
              {"EMERALD ISLE"}
              <small>{"TRAVELS"}</small>
            </span>
          </SiteLink>
          <p>
            {"Thoughtfully planned."}
            <br />
            {"Extraordinarily experienced."}
          </p>
          <SiteLink className="footer-mail" href="mailto:travels@emeraldisle.lk">
            {"Let’s start a conversation "}
            <span aria-hidden="true">{"↗"}</span>
          </SiteLink>
        </div>
        <div className="footer-columns">
          <div>
            <span className="eyebrow">{"YOUR NEXT CHAPTER"}</span>
            <SiteLink href="/destinations/sri-lanka/">{"Discover Sri Lanka"}</SiteLink>
            <SiteLink href="/destinations/kenya/">{"Explore Kenya"}</SiteLink>
            <SiteLink href="/packages/">{"All journeys"}</SiteLink>
          </div>
          <div>
            <span className="eyebrow">{"EMERALD ISLE TRAVELS"}</span>
            <SiteLink href="/about/">{"Our story"}</SiteLink>
            <SiteLink href="/gallery/">{"Travel gallery"}</SiteLink>
            <SiteLink href="/contact/">{"Get in touch"}</SiteLink>
          </div>
          <div>
            <span className="eyebrow">{"LET’S TALK TRAVEL"}</span>
            <SiteLink href="mailto:travels@emeraldisle.lk">
              {"travels@emeraldisle.lk"}
            </SiteLink>
            <SiteLink href="tel:+94114627909">{"+94 11 462 7909"}</SiteLink>
            <span>{"Sri Lanka & Kenya · Tailor-made journeys"}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{"© 2026 Emerald Isle Travels. All rights reserved."}</span>
          <span>{"A little further from ordinary."}</span>
          <SiteLink href="#top">{"Back to top ↑"}</SiteLink>
        </div>
      </footer>
    </>
  );
}
