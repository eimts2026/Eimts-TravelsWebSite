export const siteUrl = new URL(
  process.env.SITE_URL || "https://emeraldisletravels.com",
);
export function metadata(
  title,
  description,
  path,
  image = "/images/sri-lanka-hero-original.png",
) {
  return {
    title: { absolute: title + " | Emerald Isle Travels" },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title + " | Emerald Isle Travels",
      description,
      url: path,
      siteName: "Emerald Isle Travels",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
