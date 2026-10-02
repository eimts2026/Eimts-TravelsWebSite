"use client";
import SiteLink from "./SiteLink";
import { useEffect, useState } from "react";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 48);
    scroll(); addEventListener("scroll", scroll, { passive: true });
    return () => removeEventListener("scroll", scroll);
  }, []);
  return <header className={`site-header reference-header${scrolled ? " is-floating" : ""}`}>
    <SiteLink className="brand" href="/" aria-label="Emerald Isle Travels home"><span className="brand-artwork"><img src="/images/emerald-isle-logo.webp" alt="Emerald Isle Travels" width="320" height="355" decoding="async" /></span></SiteLink>
    <nav className="reference-primary simple-primary" aria-label="Main navigation"><SiteLink href="/">Home</SiteLink><SiteLink href="/packages/">Packages</SiteLink><SiteLink href="/contact/">Contact Us</SiteLink></nav>
  </header>;
}
