"use client";
import { useEffect } from "react";
export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance;
    let disposed = false;
    async function setup() {
      instance?.destroy();
      instance = undefined;
      if (motion.matches) return;
      const { default: Lenis } = await import("lenis");
      if (!disposed && !motion.matches) instance = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -100 }, syncTouch: false, stopInertiaOnNavigate: true });
    }
    setup();
    motion.addEventListener("change", setup);
    return () => { disposed = true; instance?.destroy(); motion.removeEventListener("change", setup); };
  }, []);
  return null;
}
