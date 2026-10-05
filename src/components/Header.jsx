"use client";
import SiteLink from "./SiteLink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    let previous = Math.max(0, scrollY);
    setHidden(false);
    const scroll = () => {
      const current = Math.max(0, scrollY);
      setScrolled(current > 48);
      if (current < 120) setHidden(false);
      else if (Math.abs(current - previous) >= 12) setHidden(current > previous);
      if (Math.abs(current - previous) >= 12 || current < 120) previous = current;
    };
    setScrolled(previous > 48);
    addEventListener("scroll", scroll, { passive: true });
    return () => removeEventListener("scroll", scroll);
  }, [pathname]);
  return <header className={`site-header reference-header${scrolled ? " is-floating" : ""}${hidden ? " is-hidden" : ""}`} onFocusCapture={() => setHidden(false)}>
    <SiteLink className="brand" href="/" aria-label="Emerald Isle Travels home"><span className="brand-artwork"><img src="/images/emerald-isle-logo.webp" alt="Emerald Isle Travels" width="320" height="355" decoding="async" /></span></SiteLink>
    <nav className="reference-primary simple-primary" aria-label="Main navigation"><SiteLink href="/">Home</SiteLink><SiteLink href="/packages/">Packages</SiteLink><SiteLink href="/contact/">Contact Us</SiteLink></nav>
  </header>;
}
