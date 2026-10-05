"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollStory() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      let images = [], cards = [], texts = [], frame = 0, stopped = false;
      const values = new Map();
      const imageSelector = ".hero-scene, .philosophy-photo img, .destination-card img, .card-image img, .category-stack-card img, .gallery-grid > a img";
      const collect = () => {
        images = [...document.querySelectorAll(imageSelector)];
        cards = [...document.querySelectorAll(".home-about-image")];
        texts = [...document.querySelectorAll("main h2, main h3, main p, main .eyebrow")].filter(node => !node.closest(".hero, .package-hero, .category-stack-card, .morph-gallery, .journey-map, .information-intro, .information-layout"));
        texts.forEach(node => node.setAttribute("data-story-text", ""));
        schedule();
      };
      const apply = (node, target, property) => {
        const previous = values.get(node) ?? target;
        const next = Math.abs(target - previous) < .02 ? target : previous + (target - previous) * .12;
        values.set(node, next);
        node.style.setProperty(property, `${next.toFixed(3)}px`);
        return Math.abs(target - next) > .02;
      };
      const update = () => {
        frame = 0;
        if (stopped) return;
        const height = innerHeight;
        let settling = false;
        // Read all geometry before changing styles; text offsets are removed
        // from their bounds so the effect does not feed back into itself.
        const imagePositions = images.filter(node => node.isConnected && node.parentElement).map(node => [node, node.parentElement.getBoundingClientRect()]);
        const cardPositions = cards.filter(node => node.isConnected).map(node => [node, node.getBoundingClientRect(), values.get(node) || 0]);
        const textPositions = texts.filter(node => node.isConnected).map(node => [node, node.getBoundingClientRect(), values.get(node) || 0]);
        imagePositions.forEach(([node, box]) => {
          const travel = Math.min(node.matches(".hero-scene") ? 16 : 28, box.height * .07);
          const shift = Math.max(-travel, Math.min(travel, (height / 2 - box.top - box.height / 2) * .075));
          settling = apply(node, shift, "--story-shift") || settling;
        });
        cardPositions.forEach(([node, box, previous]) => {
          // Measure the unshifted card to avoid feeding its animation back into itself.
          const center = box.top - previous + box.height / 2;
          const travel = innerWidth <= 640 ? 8 : 24;
          const shift = Math.max(-travel, Math.min(travel, (height / 2 - center) * .08));
          settling = apply(node, shift, "--about-card-shift") || settling;
        });
        textPositions.forEach(([node, box, previous]) => {
          const center = box.top - previous + box.height / 2;
          const shift = Math.max(-10, Math.min(10, (center - height / 2) * .025));
          settling = apply(node, shift, "--story-text-shift") || settling;
        });
        const max = document.documentElement.scrollHeight - height;
        document.documentElement.style.setProperty("--story-progress", `${max > 0 ? Math.min(1, scrollY / max) : 0}`);
        if (settling) schedule();
      };
      function schedule() { if (!frame && !stopped) frame = requestAnimationFrame(update); }
      collect();
      const mutations = new MutationObserver(collect);
      mutations.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule);
      dispose = () => {
        stopped = true; mutations.disconnect(); cancelAnimationFrame(frame);
        removeEventListener("scroll", schedule); removeEventListener("resize", schedule);
        values.forEach((_, node) => { node.style.removeProperty("--story-shift"); node.style.removeProperty("--story-text-shift"); node.style.removeProperty("--about-card-shift"); node.removeAttribute("data-story-text"); });
      };
    };
    setup(); preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, [pathname]);
  return <div className="story-progress" aria-hidden="true" />;
}
