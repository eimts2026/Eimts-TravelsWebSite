"use client";
import { useEffect, useRef, useState } from "react";
import SiteLink from "./SiteLink";

export default function PackageHero() {
  const video = useRef(null);
  const section = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const manualPause = useRef(false);
  useEffect(() => {
    const film = video.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const update = () => {
      if (preference.matches || document.hidden || !visible || manualPause.current) film.pause();
      else film.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(section.current);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); film.pause(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  const toggle = () => {
    const film = video.current;
    if (film.paused) { manualPause.current = false; film.play().catch(() => setPlaying(false)); }
    else { manualPause.current = true; film.pause(); }
  };
  return <section ref={section} className="package-hero" aria-labelledby="package-hero-title">
    <div className="package-hero-media" aria-hidden="true">
      <img src="/videos/packages/poster.webp" alt="" fetchPriority="high" />
      <video ref={video} hidden={failed} muted loop playsInline preload="none" poster="/videos/packages/poster.webp" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}>
        <source src="/videos/packages/journeys.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="package-hero-copy">
      <span className="eyebrow">SRI LANKA & KENYA · OUR JOURNEYS</span>
      <h1 id="package-hero-title">Find your<br /><em>somewhere.</em></h1>
      <p>From island trails to open savannahs.<br />Discover a journey that feels like you.</p>
      <SiteLink className="package-hero-cta" href="#journey-collection">Explore packages <span aria-hidden="true">↓</span></SiteLink>
    </div>
    <div className="package-hero-bottom">
      <span>Two destinations. A world of possibility.</span>
      {!failed && <button type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause film Ⅱ" : "Play film ▷"}</button>}
    </div>
  </section>;
}
