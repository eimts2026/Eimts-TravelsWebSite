import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';

const base = process.env.SEO_AUDIT_URL || 'http://127.0.0.1:4173';
const sitemap = await fetch(`${base}/sitemap.xml`).then(r => { assert.equal(r.status, 200); return r.text(); });
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.ok(urls.length >= 43, 'Sitemap must include all public pages and packages');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const results = [];
const titles = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await fetch(new URL(path, base));
  const html = await response.text();
  const tags = [...html.matchAll(/<meta\b[^>]*>|<link\b[^>]*>/g)].map(m => m[0]);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = tags.find(t => /name="description"/.test(t))?.match(/content="([^"]*)"/)?.[1];
  const canonical = tags.find(t => /rel="canonical"/.test(t))?.match(/href="([^"]*)"/)?.[1];
  const failures = [];
  if (response.status !== 200) failures.push(`HTTP ${response.status}`);
  if (!title || titles.has(title)) failures.push('Missing or duplicate title');
  titles.add(title);
  if (!description) failures.push('Missing description');
  if (canonical !== url) failures.push('Canonical differs from sitemap');
  if ((html.match(/<h1\b/g) || []).length !== 1) failures.push('Expected one H1');
  if (tags.some(t => /name="(?:robots|googlebot)"/.test(t) && /noindex/.test(t))) failures.push('Noindex found');
  if (/noindex/i.test(response.headers.get('x-robots-tag') || '')) failures.push('Noindex HTTP header');
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(match[1]); } catch { failures.push('Invalid JSON-LD'); }
  }
  results.push({ path, status: response.status, title, failures });
}
const robots = await fetch(`${base}/robots.txt`).then(r => r.text());
assert.ok(robots.includes('Sitemap:'));
assert.ok(!/Disallow:\s*\/\s*$/m.test(robots));
assert.equal((await fetch(`${base}/not-a-real-page-seo-check/`)).status, 404);
await mkdir('output/seo', { recursive: true });
await writeFile('output/seo/routes.json', JSON.stringify({ checkedAt: new Date().toISOString(), base, results }, null, 2));
const failed = results.filter(r => r.failures.length);
console.log(`${results.length} sitemap pages checked; ${failed.length} failures.`);
if (failed.length) { console.log(JSON.stringify(failed, null, 2)); process.exitCode = 1; }
