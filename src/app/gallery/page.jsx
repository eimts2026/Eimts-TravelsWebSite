import Content from "../../components/Gallery";
import PageShell from "../../components/PageShell";
import { metadata as seo } from "../../lib/seo";
export const metadata = seo(
  "Travel Gallery",
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
