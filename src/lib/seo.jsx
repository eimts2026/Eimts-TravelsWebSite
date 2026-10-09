export const siteUrl = new URL(new URL(
  process.env.SITE_URL || "https://emeraldisletravels.com",
).origin);
export function metadata(
  title,
  description,
  path,
  image = "/images/travel/sigiriya.webp",
) {
  description = description.replace(/\s+/g, ' ').trim();
  if (description.length > 160) description = description.slice(0, 157).replace(/\s+\S*$/, '') + '…';
  return {
    title: { absolute: title + " | Emerald Isle Travels" },
    description,
    alternates: { canonical: new URL(path, siteUrl).href },
    openGraph: {
      title: title + " | Emerald Isle Travels",
      description,
      url: path,
      siteName: "Emerald Isle Travels",
      type: "website",
      locale: "en_US",
      images: [{ url: image, alt: title }],
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
