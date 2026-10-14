import "lenis/dist/lenis.css";
import "leaflet/dist/leaflet.css";
import "../styles.css";
import "../navigation.css";
import "../image-cards.css";
import Script from "next/script";
import SmoothScroll from "../components/SmoothScroll";
import ScrollToTop from "../components/ScrollToTop";
import { siteUrl, JsonLd } from "../lib/seo";
import { Analytics } from "@vercel/analytics/next";
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/raleway-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/caveat.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body id="top" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PGB1H0T0KL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PGB1H0T0KL');
          `}
        </Script>
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
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  );
}
