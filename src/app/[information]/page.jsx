import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import SiteLink from "../../components/SiteLink";
import pages from "../../data/information-pages.json";
import cityPhotoCredits from "../../../public/images/places/credits.json";
import { metadata as seo } from "../../lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map(information => ({ information }));
}
export async function generateMetadata({ params }) {
  const { information } = await params;
  const page = pages[information];
  if (!page) notFound();
  return seo(page.title, page.blocks[0].text, `/${information}/`);
}

function Content({ blocks }) {
  const elements = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.tag === "li") {
      const items = [block.text];
      while (blocks[i + 1]?.tag === "li") items.push(blocks[++i].text);
      elements.push(<ul key={i}>{items.map(text => <li key={text}>{text}</li>)}</ul>);
    } else if (block.tag === "h2" && /^\d+\. /.test(block.text)) {
      const answer = [];
      while (blocks[i + 1]?.tag === "p") answer.push(blocks[++i].text);
      elements.push(<details key={i}><summary>{block.text}</summary>{answer.map(text => <p key={text}>{text}</p>)}</details>);
    } else {
      const Tag = block.tag === "strong" ? "h3" : block.tag;
      elements.push(<Tag key={i}>{block.text}</Tag>);
    }
  }
  return elements;
}

export default async function InformationPage({ params }) {
  const { information } = await params;
  const page = pages[information];
  if (!page) notFound();
  return <PageShell>
    <section className="page-intro information-intro">
      <span className="eyebrow">{page.eyebrow}</span>
      <h1>{page.title}</h1>
      <p>{page.blocks[0].text}</p>
    </section>
    <div className="section information-layout">
      <nav className="information-nav" aria-label="Other pages">
        {Object.entries(pages).map(([slug, item]) => <SiteLink key={slug} href={`/${slug}/`} aria-current={slug === information ? "page" : undefined}>{slug === "faq-page" ? "FAQ" : item.title}</SiteLink>)}
        <SiteLink href="/contact/">Contact us</SiteLink>
      </nav>
      <article className="information-content" aria-label={page.title}>
        <Content blocks={page.blocks.slice(1)} />
        {information === "disclaimer" && <section aria-labelledby="photo-credits">
          <h2 id="photo-credits">Photography credits</h2>
          <p>Navigation photograph of Sigiriya: <a href="https://commons.wikimedia.org/wiki/File:SigiriyaRock.jpg">Santhoshj</a>, licensed under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.</p>
          <p>Navigation photograph of Amboseli National Park with Mount Kilimanjaro: <a href="https://commons.wikimedia.org/wiki/File:Amboseli_National_Park_and_Mt._Kilimanjaro.jpg">Ninaras</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
          <p>Both photographs have been resized, converted to WebP and cropped for display.</p>
          <details><summary>Home-page city photography</summary>
            <p>These Wikimedia Commons photographs have been resized, converted to WebP and cropped for display. Each image retains its original licence.</p>
            <ul>{cityPhotoCredits.map(photo => <li key={photo.id}><a href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(photo.file)}`}>{photo.id.replaceAll('-', ' ')}</a>: {photo.author} · <a href={photo.licenseUrl}>{photo.license}</a>.</li>)}</ul>
          </details>
        </section>}
        <SiteLink className="text-link" href="/contact/">Get in touch ↗</SiteLink>
      </article>
    </div>
  </PageShell>;
}
