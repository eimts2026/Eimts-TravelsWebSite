import Content from "../../components/Contact";
import PageShell from "../../components/PageShell";
import { metadata as seo } from "../../lib/seo";
export const metadata = seo(
  "Contact Us",
  "Contact Emerald Isle Travels to plan your Sri Lanka holiday or Kenya safari around your dates and travel style.",
  "/contact/",
);
export default function Page() {
  return (
    <PageShell>
      <Content />
    </PageShell>
  );
}
