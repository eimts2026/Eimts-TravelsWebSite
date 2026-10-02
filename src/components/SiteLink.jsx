import Link from "next/link";

// Load destination routes on demand without prefetching every catalogue card.
export default function SiteLink({ href, children, ...props }) {
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
    return <Link href={href} prefetch={false} {...props}>{children}</Link>;
  }
  return <a href={href} {...props}>{children}</a>;
}
