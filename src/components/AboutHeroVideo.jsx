'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutHeroVideo() {
  const film = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = film.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => {
      if (motion.matches || document.hidden || !visible) {
        video.pause();
        if (motion.matches) setPlaying(false);
      } else {
        if (!video.getAttribute('src')) video.src = '/videos/about/hero.mp4';
        video.play().catch(() => setPlaying(false));
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video.closest('.about-opening'));
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      video.pause();
      observer.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <div className="about-hero-film" aria-hidden="true">
    <img src="/videos/about/poster.webp" alt="" width="1600" height="900" fetchPriority="high" />
    <video ref={film} className={playing ? 'is-playing' : ''} muted loop playsInline preload="none" poster="/videos/about/poster.webp" onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} />
  </div>;
}
