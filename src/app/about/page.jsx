import Content from "../../components/About";
import PageShell from "../../components/PageShell";
import { metadata as seo } from "../../lib/seo";
export const metadata = seo(
  "Our Story",
  "Meet Emerald Isle Travels and discover our approach to personal journeys in Sri Lanka and Kenya.",
  "/about/",
);
export default function Page() {
  return (
    <PageShell>
      <Content />
    </PageShell>
  );
}
