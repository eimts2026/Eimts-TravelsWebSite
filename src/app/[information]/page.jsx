import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import SiteLink from "../../components/SiteLink";
import pages from "../../data/information-pages.json";
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
        <SiteLink className="text-link" href="/contact/">Get in touch ↗</SiteLink>
      </article>
    </div>
  </PageShell>;
}
