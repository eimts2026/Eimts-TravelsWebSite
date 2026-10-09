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
    <a className={`scroll-to-top floating-whatsapp${!menuOpen ? " is-visible" : ""}`} href="https://wa.me/94743840971" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +94 74 384 0971 (opens in a new tab)" aria-hidden={menuOpen} tabIndex={menuOpen ? -1 : 0}>
      <span className="floating-whatsapp-label" aria-hidden="true"><strong>Click here</strong><span>Let’s plan your trip!</span></span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L.02 24l6.26-1.64a11.9 11.9 0 0 0 5.77 1.47h.01C18.64 23.83 24 18.48 24 11.9c0-3.18-1.24-6.18-3.48-8.42ZM12.06 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.72.98.99-3.63-.24-.38a9.86 9.86 0 0 1-1.51-5.25c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.86-9.97 9.86Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.65-2.05-.18-.3-.02-.46.13-.61.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35Z" /></svg>
    </a>
    <button type="button" className={`scroll-to-top${visible ? " is-visible" : ""}`} aria-label="Scroll to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} disabled={!visible} onClick={() => window.dispatchEvent(new CustomEvent("site:top", { detail: { smooth: true } }))}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  </>;
}
