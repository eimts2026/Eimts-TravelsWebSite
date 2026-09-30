import packages from "../data/packages.json";
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
    ...packages.map((p) => p.url),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
