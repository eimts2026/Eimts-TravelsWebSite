'use client';
import { useEffect, useRef } from 'react';
export default function AboutMotion({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const nodes = [...root.current.querySelectorAll('[data-about-reveal]')];
    const clean = () => { observer?.disconnect(); nodes.forEach(node => node.classList.remove('about-reveal-ready', 'is-revealed')); };
    const setup = () => {
      clean();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
      }), { rootMargin: '0px 0px -24px 0px', threshold: 0 });
      nodes.forEach(node => { if (node.getBoundingClientRect().top >= innerHeight) node.classList.add('about-reveal-ready'); observer.observe(node); });
    };
    setup(); preference.addEventListener('change', setup);
    return () => { clean(); preference.removeEventListener('change', setup); };
  }, []);
  return <div className="about-narrative" ref={root}>{children}</div>;
}
