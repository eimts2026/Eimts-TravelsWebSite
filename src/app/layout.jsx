import "lenis/dist/lenis.css";
import "leaflet/dist/leaflet.css";
import "../styles.css";
import "../navigation.css";
import "../image-cards.css";
import SmoothScroll from "../components/SmoothScroll";
import ScrollToTop from "../components/ScrollToTop";
import { siteUrl, JsonLd } from "../lib/seo";
export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Emerald Isle Travels",
    template: "%s | Emerald Isle Travels",
  },
  icons: { icon: "/favicon.svg" },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export const viewport = { themeColor: "#163d32" };
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body id="top">
        <SmoothScroll />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "@id": new URL('/#organization', siteUrl).href,
            name: "Emerald Isle Travels",
            url: siteUrl.href,
            email: "travels@emeraldisle.lk",
            telephone: "+94 11 462 7909",
            image: new URL('/images/emerald-isle-logo.webp', siteUrl).href,
            address: { "@type": "PostalAddress", streetAddress: "198, Galle Road", addressLocality: "Dehiwala-Mount Lavinia", postalCode: "10370", addressCountry: "LK" },
            sameAs: ["https://www.instagram.com/emeraldisletravels_/", "https://www.facebook.com/emeraldisletravels", "https://www.linkedin.com/in/emerald-isle-travels"],
          }}
        />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
