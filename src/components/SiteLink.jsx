import Link from "next/link";
import { ButtonContent } from "./ActionButton";

// Load destination routes on demand without prefetching every catalogue card.
export default function SiteLink({ href, children, ...props }) {
  if (/\b(button|header-cta|text-link)\b/.test(props.className || "")) {
    props.className += " story-button";
    children = <ButtonContent>{children}</ButtonContent>;
  }
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
    return <Link href={href} prefetch={false} {...props}>{children}</Link>;
  }
  return <a href={href} {...props}>{children}</a>;
}
