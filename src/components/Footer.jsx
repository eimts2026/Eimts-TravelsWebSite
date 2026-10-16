import SiteLink from "./SiteLink";
import SocialLinks from "./SocialLinks";
import SiteImage from "./SiteImage";

function ContactMailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function ContactWhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ContactPhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 3 4 1 1 5-3 2a15 15 0 0 0 6 6l2-3 5 1 1 4c0 1-1 2-2 2A18 18 0 0 1 3 5c0-1 1-2 2-2Z" />
    </svg>
  );
}

function ContactLocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="sticky-footer scenic-footer" aria-label="Site footer">
        <SiteImage className="footer-background-image" src="/images/home-gallery/nine-arch-bridge.webp" alt="" sizes="100vw" />
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
            <SiteLink href="/cancellation-policy/">{"Cancellation Policy"}</SiteLink>
            <SiteLink href="/disclaimer/">{"Disclaimer"}</SiteLink>
            <SiteLink href="/faq-page/">{"FAQ"}</SiteLink>
          </div>
          <div className="footer-contact-column">
            <span className="eyebrow">{"LET’S TALK TRAVEL"}</span>
            <SiteLink className="footer-contact-link" href="mailto:travels@emeraldisle.lk">
              <span className="footer-contact-icon" aria-hidden="true"><ContactMailIcon /></span>
              <span className="footer-contact-text">{"travels@emeraldisle.lk"}</span>
            </SiteLink>
            <SiteLink className="footer-contact-link" href="https://wa.me/447474714569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (+44) 74 7471 4569 (opens in a new tab)">
              <span className="footer-contact-icon" aria-hidden="true"><ContactWhatsAppIcon /></span>
              <span className="footer-contact-text">{"(+44) 74 7471 4569"}</span>
            </SiteLink>
            <SiteLink className="footer-contact-link" href="tel:+94114627909" aria-label="Call (+94) 11 462 7909">
              <span className="footer-contact-icon" aria-hidden="true"><ContactPhoneIcon /></span>
              <span className="footer-contact-text">{"(+94) 11 462 7909"}</span>
            </SiteLink>
            <SiteLink className="footer-contact-link" href="https://wa.me/94743840971" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (+94) 74 384 0971 (opens in a new tab)">
              <span className="footer-contact-icon" aria-hidden="true"><ContactWhatsAppIcon /></span>
              <span className="footer-contact-text">{"(+94) 74 384 0971"}</span>
            </SiteLink>
            <SiteLink className="footer-contact-link" href="https://maps.app.goo.gl/3vPpcnE5MrizodWDA" target="_blank" rel="noopener noreferrer" aria-label="View 198, Galle Road, Dehiwala-Mount Lavinia on Google Maps (opens in a new tab)">
              <span className="footer-contact-icon" aria-hidden="true"><ContactLocationIcon /></span>
              <span className="footer-contact-text">{"198, Galle Rd, Dehiwala-Mount Lavinia 10370, Sri Lanka"}</span>
            </SiteLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{"© 2026 Emerald Isle Travels. All rights reserved."}</span>
          <span>{"A little further from ordinary."}</span>

        </div>
      </footer>
    </>
  );
}

