import SiteLink from "./SiteLink";
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
            <SiteLink href="/destinations/sri-lanka/">{"Discover Sri Lanka"}</SiteLink>
            <SiteLink href="/destinations/kenya/">{"Explore Kenya"}</SiteLink>
            <SiteLink href="/packages/">{"All journeys"}</SiteLink>
            <nav className="footer-socials" aria-label="Social media">
              <a href="https://www.instagram.com/emeraldisletravels_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.facebook.com/emeraldisletravels" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.021 10.125 11.927v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971h-1.513c-1.491 0-1.956.931-1.956 1.887v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073Z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/emerald-isle-travels" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" /></svg>
              </a>
            </nav>
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
