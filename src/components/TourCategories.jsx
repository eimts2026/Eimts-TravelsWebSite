"use client";
import { useEffect, useRef, useState } from "react";
import SiteLink from "./SiteLink";
import { tourCategories } from "../data/tour-categories";

export default function TourCategories() {
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(1200);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  useEffect(() => {
    const resize = () => setWidth(innerWidth);
    resize(); addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);
  const total = tourCategories.length;
  const active = ((Math.round(position) % total) + total) % total;
  const select = index => {
    let difference = (index - active + total) % total;
    if (difference > total / 2) difference -= total;
    setPosition(Math.round(position) + difference);
  };
  const finish = event => {
    if (!gesture.current) return;
    const { start, x } = gesture.current;
    const shift = Math.max(-3, Math.min(3, Math.round((x - event.clientX) / (width < 640 ? 120 : 200))));
    setPosition(Math.round(start) + shift); gesture.current = null; setDragging(false);
  };
  return <section className="tour-categories stacked-categories" id="introduction" aria-labelledby="tour-categories-heading">
    <div className="category-stage">
      <div className="category-heading"><span className="eyebrow">FOLLOW YOUR KIND OF ADVENTURE</span><h2 id="tour-categories-heading">Travel Tour <em>Categories.</em></h2><p>Choose the experience that speaks to you.</p></div>
      <div className={`category-stack${dragging ? " is-dragging" : ""}`} role="region" aria-roledescription="carousel" aria-label="Travel tour categories" tabIndex={0}
        onKeyDown={event => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); setPosition(Math.round(position) + (event.key === "ArrowRight" ? 1 : -1)); } }}
        onPointerDown={event => { if (event.button !== 0) return; gesture.current = { start: position, x: event.clientX }; event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); }}
        onPointerMove={event => { if (gesture.current) setPosition(gesture.current.start + (gesture.current.x - event.clientX) / (width < 640 ? 180 : 250)); }}
        onPointerUp={finish} onPointerCancel={() => { gesture.current = null; setDragging(false); setPosition(Math.round(position)); }}>
        {tourCategories.map((item, index) => {
          let offset = (index - position) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
          const distance = Math.abs(offset);
          const spacing = width < 640 ? 90 : width < 1024 ? 130 : 170;
          return <div key={item.id} className="category-stack-card" aria-hidden="true" style={{ transform: `translate(-50%, -50%) translate(${offset * spacing}px, ${distance * (width < 640 ? 20 : 40)}px) rotate(${offset * (width < 640 ? 8 : 12)}deg) scale(${1 - distance * (width < 640 ? .06 : .12)})`, zIndex: Math.round(100 - distance * 10), opacity: Math.min(1, (total / 2 - distance) * 2) }}>
            <img src={item.image} alt="" width="800" height="1000" loading="lazy" draggable="false" />
            <div className="category-stack-shade" style={{ opacity: Math.min(.5, distance * .2) }} />
            <span className="category-stack-badge">{String(index + 1).padStart(2, "0")} / 05</span>
            <div className="category-stack-caption" style={{ opacity: Math.max(0, 1 - distance * 2) }}><h3>{item.title}</h3><p>{item.copy}</p></div>
          </div>;
        })}
      </div>
      <div className="category-stack-link"><SiteLink className="text-link" href={tourCategories[active].href}>{`Explore ${tourCategories[active].title}`}</SiteLink></div>
      <div className="category-stack-tabs" aria-label="Choose a tour category">{tourCategories.map((item, index) => <button key={item.id} aria-pressed={active === index} onClick={() => select(index)}>{item.title}</button>)}</div>
    </div>
  </section>;
}
