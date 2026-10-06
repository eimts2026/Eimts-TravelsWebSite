'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutCount({ value }) {
  const root = useRef(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let started = false;
    let observer;
    const observeCenter = () => {
      observer?.disconnect();
      if (started || preference.matches) return;
      // Pixel margins keep the trigger centered on wide and narrow screens.
      const margin = Math.round(innerHeight * .4);
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const start = performance.now();
        const tick = now => {
          const progress = Math.min(1, (now - start) / 1800);
          const eased = 1 - (1 - progress) ** 3;
          setCount(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, { rootMargin: `-${margin}px 0px -${margin}px 0px`, threshold: 0 });
      observer.observe(root.current);
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      setCount(value);
    };
    const onPreference = () => {
      if (preference.matches) {
        started = true;
        observer?.disconnect();
        finish();
      }
    };
    if (!preference.matches) {
      setCount(0);
      observeCenter();
    }
    addEventListener('resize', observeCenter);
    preference.addEventListener('change', onPreference);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      removeEventListener('resize', observeCenter);
      preference.removeEventListener('change', onPreference);
    };
  }, [value]);

  return <strong ref={root} aria-label={String(value)}><span aria-hidden="true">{String(count).padStart(2, '0')}</span></strong>;
}
