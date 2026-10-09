import Content from "../../components/Gallery";
import "../../about.css";
import PageShell from "../../components/PageShell";
import { metadata as seo } from "../../lib/seo";
export const metadata = seo(
  "Sri Lanka & Kenya Travel Gallery",
  "Explore photographs of Sri Lanka and Kenya, from tropical coastlines to wildlife and safari landscapes.",
  "/gallery/",
);
export default function Page() {
  return (
    <PageShell>
      <Content />
    </PageShell>
  );
}
