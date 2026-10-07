"use client";
import { useEffect } from "react";
export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance;
    let disposed = false;
    let generation = 0;
    let menuOpen = false;
    const top = event => {
      const immediate = event?.detail?.smooth !== true || motion.matches;
      if (instance) instance.scrollTo(0, { immediate, force: true });
      else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
    };
    const menu = event => {
      menuOpen = event.detail;
      if (menuOpen) instance?.stop(); else instance?.start();
    };
    async function setup() {
      const current = ++generation;
      instance?.destroy();
      instance = undefined;
      if (motion.matches) return;
      const { default: Lenis } = await import("lenis");
      if (!disposed && current === generation && !motion.matches) {
        instance = new Lenis({ autoRaf: true, lerp: 0.075, smoothWheel: true, anchors: { offset: -100 }, syncTouch: false, stopInertiaOnNavigate: true });
        if (menuOpen) instance.stop();
      }
    }
    setup();
    motion.addEventListener("change", setup);
    addEventListener('site:menu', menu);
    addEventListener('site:top', top);
    return () => { disposed = true; instance?.destroy(); motion.removeEventListener("change", setup); removeEventListener('site:menu', menu); removeEventListener('site:top', top); };
  }, []);
  return null;
}
