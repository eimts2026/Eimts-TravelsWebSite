"use client";
import SiteLink from './SiteLink';
import { useEffect, useRef, useState } from 'react';

export default function PackageHero() {
  const film = useRef(null);
  const cover = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = film.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => {
      if (motion.matches || document.hidden || !visible) {
        video.pause();
        if (motion.matches) setReady(false);
      } else {
        if (!video.getAttribute('src')) video.src = '/videos/packages/tourism.mp4';
        video.play().catch(() => setReady(false));
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(cover.current);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { video.pause(); observer.disconnect(); motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <section ref={cover} className="packages-cover" aria-labelledby="packages-title">
    <div className="packages-cover-media" aria-hidden="true">
      <img src="/videos/packages/poster.webp" alt="" width="1280" height="720" fetchPriority="high" />
      <video ref={film} className={ready ? 'is-ready' : ''} muted loop playsInline preload="none" poster="/videos/packages/poster.webp" onPlaying={() => setReady(true)} onError={() => setReady(false)} />
    </div>
    <div className="packages-cover-shade" />
    <div className="packages-cover-copy">
      <span className="packages-kicker">THE EMERALD ISLE COLLECTION</span>
      <h1 id="packages-title">Extraordinary places.<br /><em>Your kind of journey.</em></h1>
      <p>Island discoveries in Sri Lanka.<br />Wild encounters in Kenya. Find the journey that calls to you.</p>
      <SiteLink className="button light" href="#journey-collection">Find your journey</SiteLink>
    </div>
  </section>;
}
