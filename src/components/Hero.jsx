"use client";
import SiteImage from "./SiteImage";
import { useState } from "react";
import packages from "../data/packages.json";
const kenya = packages.find((p) =>
  p.url.includes("7-day-magical-kenya-budget-safari"),
);
const scenes = [
  {
    id: "sri-lanka",
    label: "Sri Lanka",
    caption: "SRI LANKA · THE CULTURAL TRIANGLE",
    place: "Sigiriya, Sri Lanka",
    image: "/images/sri-lanka-hero-original.png",
    alt: "An original illustrated view of Sigiriya and the Sri Lankan landscape at sunrise",
    subtitle: "ISLAND WONDERS",
  },
  {
    id: "kenya",
    label: "Kenya",
    caption: "WILD HORIZONS · EAST AFRICA",
    place: "The Kenyan savannah",
    image: kenya.image,
    alt: "Giraffes in Kenya’s wide open wilderness",
    subtitle: "UNTAMED BEAUTY",
  },
];
export default function Hero() {
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  return (
    <section className="hero" aria-label="Discover our destinations">
      {scenes.map((s, i) => (
        <SiteImage
          key={s.id}
          className={"hero-scene" + (active === i ? " active" : "")}
          src={s.image}
          sizes="100vw"
          loading={i === 0 ? "eager" : "lazy"}
          alt={s.alt}
          aria-hidden={active !== i}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
      ))}
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow">
          <span className="little-line" /> EXTRAORDINARY PLACES. PERSONAL
          JOURNEYS.
        </span>
        <h1>
          Some places
          <br />
          <em>stay with you.</em>
        </h1>
        <p>
          Go beyond the familiar. Discover the wild beauty
          <br className="desktop" /> of Sri Lanka and Kenya, thoughtfully
          explored.
        </p>
        <a className="button light" href={"/destinations/" + scene.id + "/"}>
          Explore {scene.label} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="hero-location" aria-live="polite">
        <span>{scene.caption}</span>
        <strong>{scene.place}</strong>
      </div>
      <div className="hero-bottom">
        <div className="hero-selector" aria-label="Choose a destination">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span> {s.label} <small>{s.subtitle}</small>
            </button>
          ))}
        </div>
        <a className="scroll-cue" href="#introduction">
          A WORLD WAITING TO BE DISCOVERED <span>↓</span>
        </a>
      </div>
    </section>
  );
}
