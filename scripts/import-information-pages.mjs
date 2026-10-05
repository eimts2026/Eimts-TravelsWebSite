import fs from "node:fs/promises";
import assert from "node:assert/strict";

// Import text only: never execute or embed the original site's scripts or markup.
const decode = value => value.replace(/<[^>]*>/g, " ").replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === "x" ? parseInt(n.slice(1), 16) : Number(n))).replace(/&(amp|lt|gt|quot|apos|nbsp|rsquo|lsquo|rdquo|ldquo|ndash|mdash);/g, (_, n) => ({amp:"&",lt:"<",gt:">",quot:'"',apos:"'",nbsp:" ",rsquo:"’",lsquo:"‘",rdquo:"”",ldquo:"“",ndash:"–",mdash:"—"}[n])).replace(/\s+/g, " ").trim();
const pages = {};
for (const slug of ["privacy-policy", "terms-of-use", "disclaimer", "faq-page"]) {
  const response = await fetch(`https://emeraldisletravels.com/wp-json/wp/v2/pages?slug=${slug}`);
  assert.ok(response.ok, `Cannot retrieve ${slug}`);
  const [page] = await response.json();
  assert.ok(page?.content?.rendered, `Missing content for ${slug}`);
  const html = page.content.rendered.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  const blocks = [...html.matchAll(/<(h[1-3]|p|li|strong|span)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(([, tag, body]) => ({tag: tag === "span" ? "p" : tag, text: decode(body)})).filter(block => block.text);
  const titleIndex = blocks.findIndex(block => block.tag === "h1");
  assert.ok(titleIndex >= 0);
  const title = blocks[titleIndex].text;
  const eyebrow = blocks.slice(0, titleIndex).map(block => block.text).join(" ");
  const content = blocks.slice(titleIndex + 1);
  assert.ok(content.length > 20, `Incomplete content for ${slug}`);
  if (slug === "faq-page") {
    for (const block of content) {
      if (/^\d+\. /.test(block.text)) block.tag = "h2";
    }
    assert.equal(content.filter(block => block.tag === "h2").length, 12);
  }
  pages[slug] = {title, eyebrow, source: page.link, sourceModified: page.modified_gmt, blocks: content};
  console.log(`${slug}: ${content.length} text blocks imported`);
}
await fs.writeFile("src/data/information-pages.json", JSON.stringify(pages, null, 2) + "\n");
