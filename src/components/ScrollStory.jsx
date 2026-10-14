"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollStory() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;
    let dispose = () => {};
    const setup = async () => {
      const current = ++generation;
      dispose();
      if (preference.matches) return;
      const { animate } = await import("animejs");
      if (current !== generation || preference.matches) return;
      const animations = new Set();
      const nodes = new Set();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          observer.unobserve(node);
          // Animate only at entry; content remains readable if scripts fail.
          const animation = animate(node, {
            opacity: [.35, 1], y: [18, 0],
            duration: 700, ease: "outCubic",
            onComplete: self => { self.revert(); animations.delete(self); },
          });
          animations.add(animation);
        });
      }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
      const collect = () => {
        document.querySelectorAll(".page-shell.home main :is(h2,h3,p,.eyebrow), .page-shell.home .journey-grid > *").forEach(node => {
          if (nodes.has(node) || node.closest(".hero, .destination-journey, .morph-gallery, .category-stack-card") || (node.parentElement.closest(".journey-grid") && !node.matches(".journey-grid > *"))) return;
          nodes.add(node);
          if (node.getBoundingClientRect().top >= innerHeight - 24) observer.observe(node);
        });
      };
      collect();
      const mutations = new MutationObserver(collect);
      mutations.observe(document.querySelector("main"), { childList: true, subtree: true });
      dispose = () => {
        observer.disconnect(); mutations.disconnect();
        animations.forEach(animation => animation.revert());
        animations.clear();
      };
    };
    // A failed optional animation import must never hide page content.
    const refresh = () => { setup().catch(() => {}); };
    refresh(); preference.addEventListener("change", refresh);
    return () => { generation++; dispose(); preference.removeEventListener("change", refresh); };
  }, [pathname]);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      let images = [], texts = [], frame = 0, stopped = false;
      const values = new Map();
      const imageSelector = ".home-about-image img, .hero-scene, .philosophy-photo img, .destination-card img, .card-image img, .category-stack-card img, .gallery-grid > a img";
      const collect = () => {
        images = [...document.querySelectorAll(imageSelector)].filter(node => !node.closest('.package-collection-page'));
        texts = [...document.querySelectorAll("main h2, main h3, main p, main .eyebrow")].filter(node => !node.closest(".page-shell.home, .about-narrative, .hero, .package-hero, .package-collection-page, .category-stack-card, .morph-gallery, .journey-map, .information-intro, .information-layout"));
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
        const textPositions = texts.filter(node => node.isConnected).map(node => [node, node.getBoundingClientRect(), values.get(node) || 0]);
        imagePositions.forEach(([node, box]) => {
          if (box.bottom < -80 || box.top > height + 80) return;
          const travel = Math.min(node.matches(".home-about-image img") ? 12 : node.matches(".hero-scene") ? 16 : 28, box.height * .05);
          const shift = Math.max(-travel, Math.min(travel, (height / 2 - box.top - box.height / 2) * .075));
          settling = apply(node, shift, "--story-shift") || settling;
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
