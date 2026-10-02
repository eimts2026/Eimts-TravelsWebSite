"use client";
import SiteLink from "./SiteLink";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const hero = useRef(null);
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const film = video.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intersecting = true;
    let disposed = false;
    const update = () => {
      if (preference.matches || document.hidden || !intersecting) {
        film.pause();
        if (preference.matches) setReady(false);
      } else {
        film.play().catch(() => { if (!disposed) setReady(false); });
      }
    };
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); }, { threshold: 0.15 });
    observer.observe(hero.current);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { disposed = true; film.pause(); observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <section ref={hero} className="hero hero-cinema hero-journey" aria-label="Discover Sri Lanka and Kenya">
    <div className="hero-scene active" aria-hidden="true">
      <img src="/images/sigiriya-hero.webp" alt="" className="hero-poster" fetchPriority="high" />
      <video ref={video} className={`hero-film${ready && !failed ? " is-ready" : ""}`} muted loop playsInline preload="none" poster="/images/sigiriya-hero.webp"
        onPlaying={() => setReady(true)} onError={() => { setFailed(true); setReady(false); }}>
        <source src="/videos/hero/journey-720.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/videos/hero/journey-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/videos/hero/journey-1440.webm" type="video/webm" />
        <source src="/videos/hero/journey-1440.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="hero-shade" />
    <div className="hero-content">
      <span className="eyebrow"><span className="little-line" /> EXTRAORDINARY PLACES. PERSONAL JOURNEYS.</span>
      <h1>Some places<br /><em>stay with you.</em></h1>
      <p>Ancient wonders. Wild encounters. Discover Sri Lanka and Kenya through journeys made around you.</p>
      <SiteLink className="button light" href="/packages/">Find your journey <span aria-hidden="true">↗</span></SiteLink>
    </div>
    <div className="hero-bottom">
      <span className="hero-endnote">A LITTLE FURTHER FROM ORDINARY</span>
      <SiteLink className="scroll-cue" href="#about-emerald">LET YOUR CURIOSITY LEAD <span aria-hidden="true">↓</span></SiteLink>
    </div>
  </section>;
}
