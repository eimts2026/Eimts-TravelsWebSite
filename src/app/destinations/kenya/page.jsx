import Catalogue from "../../../components/Catalogue";
import PageShell from "../../../components/PageShell";
import { metadata as seo } from "../../../lib/seo";
export const metadata = seo(
  "Kenya Safari Packages",
  "Explore Kenya safari packages across open savannahs, remarkable wildlife and extraordinary landscapes.",
  "/destinations/kenya/",
);
export default function Page() {
  return (
    <PageShell>
      <Catalogue destination="Kenya" />
    </PageShell>
  );
}
