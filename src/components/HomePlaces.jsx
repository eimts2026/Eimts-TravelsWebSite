"use client";
import Image from "next/image";
import { animate } from "animejs";
import { useEffect, useRef, useState } from 'react';
import coastline from '../data/sri-lanka-coastline';
import sriLankaPlaces from '../data/home-places';
import kenyaPlaces from '../data/kenya-home-places';
import kenyaBoundary from '../data/kenya-boundary';

const countries = [
  { id: 'sri-lanka', name: 'Sri Lanka', title: 'Small island.', line: 'Endless discovery.', intro: 'From forest-covered fortresses to hill-country railways and palm-lined shores, discover the places that could become part of your journey.', places: sriLankaPlaces, outline: coastline, bounds: [[5.7,79.4],[9.95,82]], divide: 80.5 },
  { id: 'kenya', name: 'Kenya', title: 'Wide horizons.', line: 'Wild possibilities.', intro: 'From open savannahs to the Indian Ocean, explore the landscapes that make a Kenyan journey unforgettable.', places: kenyaPlaces, outline: kenyaBoundary, bounds: [[-4.8,33.7],[5.5,42]], divide: 37 },
];

function DestinationPanel({ country, onFocus }) {
  const places = country.places;
  const section = useRef(null);
  const canvas = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState(country.places[0].id);
  const [pinPositions, setPinPositions] = useState({});
  const [mapFailed, setMapFailed] = useState(false);
  const place = places.find(item => item.id === selected);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEnabled(true); observer.disconnect(); }
    }, { rootMargin: '250px' });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const element = canvas.current;
    if (!element) return;
    let disposed = false, map, resize;
    import('leaflet').then(module => {
      if (disposed) return;
      const L = module.default || module;
      map = L.map(element, { attributionControl: false, scrollWheelZoom: false, dragging: false, zoomControl: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: .1 });
      const fit = () => {
        if (disposed || !element.isConnected) return;
        map.fitBounds(country.bounds, { padding: [28, 32], animate: false });
        const path = country.outline.map(ring => ring.map(([lng, lat], index) => {
          const point = map.latLngToContainerPoint([lat, lng]);
          return `${index ? 'L' : 'M'}${point.x} ${point.y}`;
        }).join(' ') + 'Z').join(' ');
        element.style.clipPath = `path('${path}')`;
        const { width, height } = element.getBoundingClientRect();
        const labels = [];
        setPinPositions(Object.fromEntries([...places].sort((a, b) => b.lat - a.lat).map(item => {
          const point = map.latLngToContainerPoint([item.lat, item.lng]);
          const labelWidth = item.name.length * 6;
          const left = item.lng < country.divide ? point.x - 15 - labelWidth : point.x + 15;
          let offset = 0;
          for (const candidate of [0, -16, 16, -32, 32]) {
            const top = point.y - 25 + candidate;
            if (!labels.some(box => left < box.right + 3 && left + labelWidth > box.left - 3 && top < box.bottom + 3 && top + 12 > box.top - 3)) { offset = candidate; break; }
          }
          labels.push({ left, right: left + labelWidth, top: point.y - 25 + offset, bottom: point.y - 13 + offset });
          return [item.id, { left: `${point.x / width * 100}%`, top: `${point.y / height * 100}%`, '--label-offset': `${offset}px` }];
        })));
      };
      fit();
      L.tileLayer(process.env.NEXT_PUBLIC_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19,
      }).addTo(map);
      resize = new ResizeObserver(() => {
        if (disposed || !element.isConnected) return;
        map.invalidateSize({ pan: false }); fit();
      });
      resize.observe(element);
    }).catch(() => { if (!disposed) setMapFailed(true); });
    return () => { disposed = true; resize?.disconnect(); map?.remove(); };
  }, [enabled, country, places]);

  return <section ref={section} className={`home-places country-${country.id}`} aria-labelledby={`${country.id}-heading`} onFocusCapture={onFocus}>
    <div className="home-places-intro">
      <span className="eyebrow">{country.name} · A PLACE FOR EVERY KIND OF DAY</span>
      <h2 id={`${country.id}-heading`}>{country.title}<br /><em>{country.line}</em></h2>
      <p>{country.intro}</p>
    </div>
    <div className="home-places-map-wrap">
      <div className="home-places-island" role="group" aria-label={`Explore places on the ${country.name} map`}>
        <div ref={canvas} className="home-places-map" aria-hidden="true" />
        {places.map(item => pinPositions[item.id] && <button key={item.id} type="button" className={`home-island-pin${selected === item.id ? ' is-selected' : ''}${item.lng < country.divide ? ' label-west' : ''}`} style={pinPositions[item.id]} aria-label={`Discover ${item.name}`} aria-pressed={selected === item.id} aria-controls={`${country.id}-place-card`} onClick={() => setSelected(item.id)}>
          <svg viewBox="0 0 44 58" aria-hidden="true"><path d="M22 0C10 0 0 10 0 22c0 15 22 36 22 36s22-21 22-36C44 10 34 0 22 0Z" fill="currentColor" /><circle cx="22" cy="22" r="13" fill="#fff" /></svg><span>{item.name}</span>
        </button>)}
      </div>
      {mapFailed && <p className="home-places-map-fallback">The map is unavailable. Explore {place.name} below.</p>}
      <details className="home-map-attribution"><summary aria-label="Map attribution">ⓘ</summary><p>Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>. Boundary via <a href="https://www.geoboundaries.org/" target="_blank" rel="noreferrer">geoBoundaries</a> ({country.id === 'kenya' ? 'public domain' : <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noreferrer">ODbL</a>}).</p></details>
    </div>
    <article id={`${country.id}-place-card`} className="home-place-card" aria-live="polite" aria-atomic="true">
      <div key={place.id} className="home-place-card-content">
        <div className="home-place-photo"><Image sizes="(max-width: 700px) 90vw, 35vw" src={place.image} alt={place.alt} width="1400" height="1050" loading="lazy" /></div>
        <div className="home-place-copy"><span className="eyebrow">{place.label}</span><h3>{place.name}</h3><p>{place.description}</p></div>
      </div>
    </article>
  </section>;
}


export default function HomePlaces() {
  const root = useRef(null);
  const track = useRef(null);
  const pinned = useRef(false);
  const travel = useRef({ first: 0, horizontal: 0, second: 0 });
  useEffect(() => {
    const element = root.current;
    const rail = track.current;
    const viewport = rail.parentElement;
    const panels = [...rail.children];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, setupFrame = 0, animations = [], dimensions = '';
    const clamp = value => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      if (!pinned.current) return;
      const distance = Math.max(0, -element.getBoundingClientRect().top);
      const { first, horizontal, second } = travel.current;
      animations[0]?.seek(clamp((distance - first - 100) / horizontal) * 1000);
      animations[1]?.seek(clamp(distance / Math.max(1, first)) * 1000);
      animations[2]?.seek(clamp((distance - first - 200 - horizontal) / Math.max(1, second)) * 1000);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      setupFrame = 0;
      pinned.current = !motion.matches && CSS.supports('position', 'sticky');
      element.classList.toggle('is-pinned', pinned.current);
      const height = viewport.clientHeight;
      const first = Math.max(0, panels[0].scrollHeight - height);
      const second = Math.max(0, panels[1].scrollHeight - height);
      const horizontal = Math.max(element.clientWidth * 1.4, height * .9);
      const next = [pinned.current, element.clientWidth, height, first, second].join(':');
      if (next === dimensions) { schedule(); return; }
      dimensions = next;
      animations.forEach(animation => animation.revert());
      animations = [];
      travel.current = { first, horizontal, second };
      if (pinned.current) {
        element.style.setProperty('--destination-travel', (first + horizontal + second + 300) + 'px');
        animations = [
          animate(rail, { translateX: [0, -element.clientWidth], duration: 1000, ease: 'linear', autoplay: false }),
          animate(panels[0], { translateY: [0, -first], duration: 1000, ease: 'linear', autoplay: false }),
          animate(panels[1], { translateY: [0, -second], duration: 1000, ease: 'linear', autoplay: false }),
        ];
      } else element.style.removeProperty('--destination-travel');
      schedule();
    };
    const resize = new ResizeObserver(() => { if (!setupFrame) setupFrame = requestAnimationFrame(configure); });
    [element, viewport, ...panels].forEach(node => resize.observe(node));
    motion.addEventListener('change', configure);
    addEventListener('scroll', schedule, { passive: true });
    configure();
    return () => {
      resize.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(setupFrame);
      animations.forEach(animation => animation.revert());
      motion.removeEventListener('change', configure);
      removeEventListener('scroll', schedule);
      element.classList.remove('is-pinned');
      element.style.removeProperty('--destination-travel');
    };
  }, []);
  const revealFocusedPanel = (index, event) => {
    if (!pinned.current) return;
    const element = root.current;
    const { first, horizontal, second } = travel.current;
    const start = element.getBoundingClientRect().top + scrollY;
    const viewport = track.current.parentElement;
    const panel = track.current.children[index];
    const focused = event.target.getBoundingClientRect();
    const panelBounds = panel.getBoundingClientRect();
    const vertical = Math.max(0, Math.min(index ? second : first, focused.top - panelBounds.top + focused.height / 2 - viewport.clientHeight / 2));
    const target = start + (index ? first + horizontal + 200 : 0) + vertical;
    const current = scrollY - start;
    if ((!index && current > first + 100) || (index && current < first + horizontal + 100) || focused.top < 76 || focused.bottom > innerHeight - 24) {
      window.scrollTo({ top: target, behavior: 'instant' });
    }

  };
  return <div className="destination-journey" ref={root}>
    <div className="destination-viewport"><div className="destination-track" ref={track}>
      {countries.map((country, index) => <DestinationPanel key={country.id} country={country} onFocus={event => revealFocusedPanel(index, event)} />)}
    </div></div>
    <p className="destination-swipe-note">Sri Lanka → Kenya · Keep scrolling to explore</p>
  </div>;
}
