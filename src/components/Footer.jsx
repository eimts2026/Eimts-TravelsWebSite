export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-top">
          <a className="brand" href="/" aria-label="Emerald Isle Travels home">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 2 43 24 24 46 5 24Z" stroke="currentColor"></path>
              <path d="m24 10 8 14-8 14-8-14Z" fill="currentColor"></path>
              <path d="M2 24h44M24 2v44" stroke="currentColor"></path>
            </svg>
            <span>
              {"EMERALD ISLE"}
              <small>{"TRAVELS"}</small>
            </span>
          </a>
          <p>
            {"Thoughtfully planned."}
            <br />
            {"Extraordinarily experienced."}
          </p>
          <a className="footer-mail" href="mailto:travels@emeraldisle.lk">
            {"Let’s start a conversation "}
            <span aria-hidden="true">{"↗"}</span>
          </a>
        </div>
        <div className="footer-columns">
          <div>
            <span className="eyebrow">{"YOUR NEXT CHAPTER"}</span>
            <a href="/destinations/sri-lanka/">{"Discover Sri Lanka"}</a>
            <a href="/destinations/kenya/">{"Explore Kenya"}</a>
            <a href="/packages/">{"All journeys"}</a>
          </div>
          <div>
            <span className="eyebrow">{"EMERALD ISLE TRAVELS"}</span>
            <a href="/about/">{"Our story"}</a>
            <a href="/gallery/">{"Travel gallery"}</a>
            <a href="/contact/">{"Get in touch"}</a>
          </div>
          <div>
            <span className="eyebrow">{"LET’S TALK TRAVEL"}</span>
            <a href="mailto:travels@emeraldisle.lk">
              {"travels@emeraldisle.lk"}
            </a>
            <a href="tel:+94114627909">{"+94 11 462 7909"}</a>
            <span>{"Sri Lanka & Kenya · Tailor-made journeys"}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{"© 2026 Emerald Isle Travels. All rights reserved."}</span>
          <span>{"A little further from ordinary."}</span>
          <a href="#top">{"Back to top ↑"}</a>
        </div>
      </footer>
    </>
  );
}
