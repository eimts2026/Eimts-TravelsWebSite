"use client";
import { useEffect, useRef, useState } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const marker = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(marker.current);
    const menu = event => setMenuOpen(Boolean(event.detail));
    window.addEventListener("site:menu", menu);
    return () => {
      observer.disconnect();
      window.removeEventListener("site:menu", menu);
    };
  }, []);
  const visible = scrolled && !menuOpen;
  return <>
    <span ref={marker} className="scroll-top-marker" aria-hidden="true" />
    <button type="button" className={`scroll-to-top${visible ? " is-visible" : ""}`} aria-label="Scroll to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} disabled={!visible} onClick={() => window.dispatchEvent(new CustomEvent("site:top", { detail: { smooth: true } }))}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  </>;
}
