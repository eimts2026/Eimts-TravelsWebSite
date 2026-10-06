import packages from "../data/packages.js";
import { siteUrl } from "../lib/seo";
export default function sitemap() {
  return [
    "/",
    "/packages/",
    "/destinations/sri-lanka/",
    "/destinations/kenya/",
    "/about/",
    "/gallery/",
    "/contact/",
    "/privacy-policy/",
    "/terms-of-use/",
    "/disclaimer/",
    "/faq-page/",
    ...packages.map((p) => p.url),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
