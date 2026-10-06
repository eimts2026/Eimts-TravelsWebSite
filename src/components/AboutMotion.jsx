"use client";
import { useEffect, useRef } from 'react';
export default function AboutMotion({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const scene = root.current.querySelector('[data-parallax-layers]');
      const layers = [...scene.querySelectorAll('[data-parallax-layer]')];
      const texts = [...root.current.querySelectorAll('h1, h2, h3, p, .eyebrow')];
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.style.setProperty('--about-reveal-offset', entry.boundingClientRect.bottom <= 24 ? '-12px' : '12px');
        }
        entry.target.classList.toggle('is-revealed', entry.isIntersecting);
      }), { rootMargin: '-24px 0px -24px 0px', threshold: 0 });
      texts.forEach(node => {
        node.classList.add('about-reveal-ready');
        const bounds = node.getBoundingClientRect();
        if (bounds.top < innerHeight && bounds.bottom > 0) node.classList.add('is-revealed');
        reveal.observe(node);
      });
      let frame = 0;
      const update = () => {
        frame = 0;
        const box = scene.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -box.top / box.height));
        const mobile = innerWidth < 700 ? .35 : 1;
        layers.forEach((layer, index) => layer.style.setProperty('--about-layer-y', `${progress * box.height * [ .70, .55, .40, .10 ][index] * mobile}px`));
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      update();
      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule);
      cleanup = () => {
        cancelAnimationFrame(frame); reveal.disconnect();
        removeEventListener('scroll', schedule); removeEventListener('resize', schedule);
        layers.forEach(layer => layer.style.removeProperty('--about-layer-y'));
        texts.forEach(node => {
          node.classList.remove('about-reveal-ready', 'is-revealed');
          node.style.removeProperty('--about-reveal-offset');
        });
      };
    };
    setup(); preference.addEventListener('change', setup);
    return () => { cleanup(); preference.removeEventListener('change', setup); };
  }, []);
  return <div className="about-narrative" ref={root}>{children}</div>;
}
