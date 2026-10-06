import SiteLink from "./SiteLink";
import SocialLinks from "./SocialLinks";
export default function Footer() {
  return (
    <>
      <footer className="sticky-footer" aria-label="Site footer">
        <div className="footer-top">
          <SiteLink className="brand" href="/" aria-label="Emerald Isle Travels home">
            <span className="brand-artwork"><img src="/images/emerald-isle-logo.webp" alt="Emerald Isle Travels" width="320" height="355" decoding="async" /></span>
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
            <SiteLink href="/packages/?country=Sri%20Lanka">{"Discover Sri Lanka"}</SiteLink>
            <SiteLink href="/packages/?country=Kenya">{"Explore Kenya"}</SiteLink>
            <SiteLink href="/packages/">{"All journeys"}</SiteLink>
            <SocialLinks className="footer-socials" />
          </div>
          <div>
            <span className="eyebrow">{"EMERALD ISLE TRAVELS"}</span>
            <SiteLink href="/about/">{"Our story"}</SiteLink>
            <SiteLink href="/gallery/">{"Travel gallery"}</SiteLink>
            <SiteLink href="/contact/">{"Get in touch"}</SiteLink>
          </div>
          <div>
            <span className="eyebrow">{"OTHER PAGES"}</span>
            <SiteLink href="/privacy-policy/">{"Privacy & Policy"}</SiteLink>
            <SiteLink href="/terms-of-use/">{"Terms of Use"}</SiteLink>
            <SiteLink href="/disclaimer/">{"Disclaimer"}</SiteLink>
            <SiteLink href="/faq-page/">{"FAQ"}</SiteLink>
          </div>
          <div>
            <span className="eyebrow">{"LET’S TALK TRAVEL"}</span>
            <SiteLink href="mailto:travels@emeraldisle.lk">
              {"travels@emeraldisle.lk"}
            </SiteLink>
            <SiteLink href="https://wa.me/447474714569" aria-label="WhatsApp (+44) 74 7471 4569">{"(+44) 74 7471 4569"}</SiteLink>
            <SiteLink href="tel:+94114627909">{"(+94) 11 462 7909"}</SiteLink>
            <SiteLink href="https://wa.me/94764190752" aria-label="WhatsApp (+94) 76 419 0752">{"(+94) 76 419 0752"}</SiteLink>
            <SiteLink href="https://wa.me/94743840971" aria-label="WhatsApp (+94) 74 384 0971">{"(+94) 74 384 0971"}</SiteLink>
            <SiteLink href="https://maps.app.goo.gl/3vPpcnE5MrizodWDA" target="_blank" rel="noopener noreferrer" aria-label="View 198, Galle Road, Dehiwala-Mount Lavinia on Google Maps (opens in a new tab)">{"198, Galle Rd, Dehiwala-Mount Lavinia 10370, Sri Lanka"}</SiteLink>
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
