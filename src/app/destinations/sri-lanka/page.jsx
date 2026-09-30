import Catalogue from "../../../components/Catalogue";
import PageShell from "../../../components/PageShell";
import { metadata as seo } from "../../../lib/seo";
export const metadata = seo(
  "Sri Lanka Tours & Holidays",
  "Discover Sri Lanka tours through tea hills, ancient cities, wildlife parks and golden coastlines.",
  "/destinations/sri-lanka/",
);
export default function Page() {
  return (
    <PageShell>
      <Catalogue destination="Sri Lanka" />
    </PageShell>
  );
}
