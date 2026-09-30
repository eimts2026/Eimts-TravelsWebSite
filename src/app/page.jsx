import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import PageShell from "../components/PageShell";
import { metadata as seo } from "../lib/seo";
export const metadata = seo(
  "Sri Lanka Tours & Kenya Safaris",
  "Discover Sri Lanka and Kenya with Emerald Isle Travels. Thoughtfully planned safaris, coastal escapes and cultural journeys.",
  "/",
);
export default function Page() {
  return (
    <PageShell home>
      <Hero />
      <HomeContent />
    </PageShell>
  );
}
