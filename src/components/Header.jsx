"use client";
import SiteLink from "./SiteLink";
import { useEffect, useRef, useState } from "react";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const packagesButton = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  const button = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        frame = 0;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { window.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    if (!open && !packagesOpen) return;
    const key = (e) => {
      if (e.key === "Escape") {
        if (packagesOpen) { setPackagesOpen(false); packagesButton.current?.focus(); }
        else { setOpen(false); button.current?.focus(); }
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) { setOpen(false); setPackagesOpen(false); }
    };
    document.addEventListener("keydown", key);
    document.addEventListener("click", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("click", outside);
    };
  }, [open, packagesOpen]);
  return (
    <header className={`site-header${scrolled ? " is-floating" : ""}`} ref={header}>
      <SiteLink className="brand" href="/" aria-label="Emerald Isle Travels home">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M24 2 43 24 24 46 5 24Z" stroke="currentColor" />
          <path d="m24 10 8 14-8 14-8-14Z" fill="currentColor" />
          <path d="M2 24h44M24 2v44" stroke="currentColor" />
        </svg>
        <span>
          EMERALD ISLE<small>TRAVELS</small>
        </span>
      </SiteLink>
      <nav
        id="navigation"
        aria-label="Main navigation"
        className={open ? "is-open" : ""}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPackagesOpen(false); }}
      >
        <div className="packages-menu">
          <button ref={packagesButton} className="packages-toggle" aria-expanded={packagesOpen} aria-controls="package-navigation" onClick={() => setPackagesOpen(!packagesOpen)}>Packages <span aria-hidden="true">⌄</span></button>
          <div id="package-navigation" className="packages-dropdown" hidden={!packagesOpen} onClick={() => { setPackagesOpen(false); setOpen(false); }}>
            <SiteLink href="/packages/">All packages <span aria-hidden="true">↗</span></SiteLink>
            <SiteLink href="/destinations/sri-lanka/">Sri Lanka <small>Island trails & ocean days</small></SiteLink>
            <SiteLink href="/destinations/kenya/">Kenya <small>Safaris & wild horizons</small></SiteLink>
          </div>
        </div>
      </nav>
      <SiteLink className="header-cta" href="/contact/">
        Contact us <span aria-hidden="true">↗</span>
      </SiteLink>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => { setOpen(!open); setPackagesOpen(false); }}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
