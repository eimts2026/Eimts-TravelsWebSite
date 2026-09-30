import Content from "../../components/Catalogue";
import PageShell from "../../components/PageShell";
import { metadata as seo } from "../../lib/seo";
export const metadata = seo(
  "Sri Lanka Tours & Kenya Safari Packages",
  "Explore our collection of Sri Lanka holidays and Kenya safaris. Find cultural tours, beach escapes and wildlife journeys.",
  "/packages/",
);
export default function Page() {
  return (
    <PageShell>
      <Content />
    </PageShell>
  );
}
