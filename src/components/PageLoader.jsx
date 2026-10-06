"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    let timer, dismissTimer, generation = 0, cleanup = () => {};
    const start = (target = location.pathname) => {
      cleanup(); clearTimeout(dismissTimer);
      const run = ++generation;
      const started = performance.now();
      let settled = false;
      setProgress(0); setSlow(false); setVisible(true);
      const pendingImages = () => [...document.querySelectorAll('main img')].filter(img => img.loading !== 'lazy' && img.getBoundingClientRect().top < innerHeight && !img.complete);
      timer = setInterval(() => {
        if (run !== generation) return;
        const elapsed = performance.now() - started;
        const ready = (!target || location.pathname === target) && document.readyState === 'complete' && document.querySelector('main') && !document.querySelector('[data-route-pending]') && pendingImages().length === 0 && document.fonts.status !== 'loading';
        if (ready && elapsed >= 450 && !settled) {
          settled = true; clearInterval(timer); setProgress(100);
          dismissTimer = setTimeout(() => setVisible(false), 300);
        } else if (!settled) {
          setProgress(Math.min(94, Math.floor(94 * (1 - Math.exp(-elapsed / 1800)))));
          if (elapsed > 8000) setSlow(true);
          // Failed resources must not trap the visitor behind an overlay.
          if (elapsed > 20000) { clearInterval(timer); setVisible(false); }
        }
      }, 80);
      cleanup = () => clearInterval(timer);
    };
    const navigate = event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) start(url.pathname);
    };
    const pop = () => start();
    const pending = () => start(null);
    document.addEventListener('click', navigate, true);
    window.addEventListener('popstate', pop);
    window.addEventListener('page-route-pending', pending);
    start();
    return () => { generation++; cleanup(); clearTimeout(dismissTimer); document.removeEventListener('click', navigate, true); window.removeEventListener('popstate', pop); window.removeEventListener('page-route-pending', pending); };
  }, []);
  if (!visible) return null;
  return <div className="flight-loader" role="status" aria-live="polite" aria-label="Loading your next destination">
    <span className="eyebrow">EMERALD ISLE TRAVELS</span>
    <div className="flight-loader-scene" aria-hidden="true" style={{'--flight-progress': progress / 100}}>
      <div className="flight-loader-runway" />
      <svg className="flight-loader-plane" viewBox="0 0 24 24" fill="currentColor"><path d="m21 16-8-5V5.5C13 4.67 12.33 4 11.5 4S10 4.67 10 5.5V11l-8 5v2l8-2.5V21l-2 1.5V24l3.5-1 3.5 1v-1.5L13 21v-5.5l8 2.5z" /></svg>
    </div>
    <p>Taking you somewhere extraordinary.</p>
    <div className="flight-loader-progress" role="progressbar" aria-label="Page loading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={progress === 100 ? 'Page ready' : `${progress}% estimated progress`}><span style={{width: `${progress}%`}} /></div>
    <span className="flight-loader-percent" aria-hidden="true">{progress}%</span>
    {slow && <button type="button" onClick={() => setVisible(false)}>Continue while the page loads</button>}
  </div>;
}
