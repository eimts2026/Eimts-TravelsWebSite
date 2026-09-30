import { useEffect, useRef, useState } from "react";
export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const button = useRef(null);
  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (e) => {
      if (!header.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("click", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("click", outside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <a className="brand" href="/" aria-label="Emerald Isle Travels home">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M24 2 43 24 24 46 5 24Z" stroke="currentColor" />
          <path d="m24 10 8 14-8 14-8-14Z" fill="currentColor" />
          <path d="M2 24h44M24 2v44" stroke="currentColor" />
        </svg>
        <span>
          EMERALD ISLE<small>TRAVELS</small>
        </span>
      </a>
      <nav
        id="navigation"
        aria-label="Main navigation"
        className={open ? "is-open" : ""}
      >
        <a href="/destinations/sri-lanka/">Sri Lanka</a>
        <a href="/destinations/kenya/">Kenya</a>
        <a href="/packages/">Our journeys</a>
        <a href="/about/">Our story</a>
      </nav>
      <a className="header-cta" href="/contact/">
        Plan your journey <span aria-hidden="true">↗</span>
      </a>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
