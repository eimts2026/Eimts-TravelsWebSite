import { notFound } from "next/navigation";
import packages from "../../../data/packages.json";
import TripDetail from "../../../components/TripDetail";
import PageShell from "../../../components/PageShell";
import { metadata as seo, JsonLd, siteUrl } from "../../../lib/seo";
const slugOf = (p) => p.url.split("/").filter(Boolean).at(-1);
export const dynamicParams = false;
export function generateStaticParams() {
  return packages.map((p) => ({ slug: slugOf(p) }));
}
async function tripFor(params) {
  const { slug } = await params;
  const trip = packages.find((p) => slugOf(p) === slug);
  if (!trip) notFound();
  return trip;
}
export async function generateMetadata({ params }) {
  const p = await tripFor(params);
  const description = p.overview
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return seo(
    p.title,
    description.length > 157 ? description.slice(0, 157) + "…" : description,
    p.url,
    p.image,
  );
}
export default async function Page({ params }) {
  const p = await tripFor(params);
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl.href,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Our journeys",
              item: new URL("/packages/", siteUrl).href,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: p.title,
              item: new URL(p.url, siteUrl).href,
            },
          ],
        }}
      />
      <TripDetail trip={p} />
    </PageShell>
  );
}
