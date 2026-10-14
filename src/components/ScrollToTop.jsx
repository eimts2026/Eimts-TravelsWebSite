"use client";
import { useEffect, useRef, useState } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const marker = useRef(null);
  const label = useRef(null);
  const [labelOnDark, setLabelOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!label.current) return;
      const box = label.current.getBoundingClientRect();
      let surface = document.elementsFromPoint(box.left + box.width / 2, box.top + box.height / 2)
        .find(node => !node.closest('.travel-guide-launcher, .scroll-to-top'));
      if (surface?.closest('.hero, .packages-cover, .about-opening, .about-purpose, .about-horizons, .philosophy, .home-travel-gallery, footer')) {
        setLabelOnDark(true);
        return;
      }
      while (surface) {
        const channels = getComputedStyle(surface).backgroundColor.match(/[\d.]+/g)?.map(Number);
        if (channels && (channels.length === 3 || channels[3] > .8)) {
          setLabelOnDark(channels[0] * .299 + channels[1] * .587 + channels[2] * .114 < 145);
          return;
        }
        surface = surface.parentElement;
      }
      setLabelOnDark(false);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
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
    <a className={`travel-guide-launcher${!menuOpen ? " is-visible" : ""}`} href="https://wa.me/94743840971" target="_blank" rel="noopener noreferrer" aria-label="Ask me — chat on WhatsApp at +94 74 384 0971 (opens in a new tab)" aria-hidden={menuOpen} tabIndex={menuOpen ? -1 : 0}>
      <span ref={label} className={`travel-guide-label${labelOnDark ? ' on-dark' : ''}`} aria-hidden="true"><strong>Ask me</strong></span>
      <img className="travel-guide-portrait" src="/images/travel-guide.webp" alt="" width="300" height="281" decoding="async" />
    </a>
    <button type="button" className={`scroll-to-top${visible ? " is-visible" : ""}`} aria-label="Scroll to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1} disabled={!visible} onClick={() => window.dispatchEvent(new CustomEvent("site:top", { detail: { smooth: true } }))}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  </>;
}
