import "../styles.css";
import { siteUrl, JsonLd } from "../lib/seo";
export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Emerald Isle Travels",
    template: "%s | Emerald Isle Travels",
  },
  icons: { icon: "/favicon.svg" },
};
export const viewport = { themeColor: "#163d32" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body id="top">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Emerald Isle Travels",
            url: siteUrl.href,
            email: "travels@emeraldisle.lk",
            telephone: "+94 11 462 7909",
          }}
        />
        {children}
      </body>
    </html>
  );
}
