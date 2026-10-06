"use client";
import { useEffect, useRef, useState } from 'react';
import coastline from '../data/sri-lanka-coastline';
import places from '../data/home-places';

export default function HomePlaces() {
  const section = useRef(null);
  const canvas = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState('sigiriya');
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
    let disposed = false, map, resize;
    import('leaflet').then(module => {
      if (disposed) return;
      const L = module.default || module;
      map = L.map(canvas.current, { attributionControl: false, scrollWheelZoom: false, dragging: false, zoomControl: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: .1 });
      const fit = () => {
        map.fitBounds([[5.7, 79.4], [9.95, 82]], { padding: [28, 32], animate: false });
        const path = coastline.map(ring => ring.map(([lng, lat], index) => {
          const point = map.latLngToContainerPoint([lat, lng]);
          return `${index ? 'L' : 'M'}${point.x} ${point.y}`;
        }).join(' ') + 'Z').join(' ');
        canvas.current.style.clipPath = `path('${path}')`;
        const { width, height } = canvas.current.getBoundingClientRect();
        const labels = [];
        setPinPositions(Object.fromEntries([...places].sort((a, b) => b.lat - a.lat).map(item => {
          const point = map.latLngToContainerPoint([item.lat, item.lng]);
          const labelWidth = item.name.length * 6;
          const left = item.lng < 80.5 ? point.x - 15 - labelWidth : point.x + 15;
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
      resize = new ResizeObserver(() => { map.invalidateSize({ pan: false }); fit(); });
      resize.observe(canvas.current);
    }).catch(() => { if (!disposed) setMapFailed(true); });
    return () => { disposed = true; resize?.disconnect(); map?.remove(); };
  }, [enabled]);

  return <section ref={section} className="home-places" aria-labelledby="home-places-heading">
    <div className="home-places-intro">
      <span className="eyebrow">A PLACE FOR EVERY KIND OF DAY</span>
      <h2 id="home-places-heading">Small island.<br /><em>Endless discovery.</em></h2>
      <p>From forest-covered fortresses to hill-country railways and palm-lined shores, discover the places that could become part of your journey.</p>
    </div>
    <div className="home-places-map-wrap">
      <div className="home-places-island" role="group" aria-label="Explore places on the Sri Lanka map">
        <div ref={canvas} className="home-places-map" aria-hidden="true" />
        {places.map(item => pinPositions[item.id] && <button key={item.id} type="button" className={`home-island-pin${selected === item.id ? ' is-selected' : ''}${item.lng < 80.5 ? ' label-west' : ''}`} style={pinPositions[item.id]} aria-label={`Discover ${item.name}`} aria-pressed={selected === item.id} aria-controls="home-place-card" onClick={() => setSelected(item.id)}>
          <svg viewBox="0 0 44 58" aria-hidden="true"><path d="M22 0C10 0 0 10 0 22c0 15 22 36 22 36s22-21 22-36C44 10 34 0 22 0Z" fill="currentColor" /><circle cx="22" cy="22" r="13" fill="#fff" /></svg><span>{item.name}</span>
        </button>)}
      </div>
      {mapFailed && <p className="home-places-map-fallback">Use the place buttons to explore Sri Lanka.</p>}
      <details className="home-map-attribution"><summary aria-label="Map attribution">ⓘ</summary><p>Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>. Coastline via <a href="https://www.geoboundaries.org/" target="_blank" rel="noreferrer">geoBoundaries</a> (<a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noreferrer">ODbL</a>).</p></details>
    </div>
    <article id="home-place-card" className="home-place-card" aria-live="polite" aria-atomic="true">
      <div key={place.id} className="home-place-card-content">
        <div className="home-place-photo"><img src={place.image} alt={place.alt} width="1400" height="1050" loading="lazy" /></div>
        <div className="home-place-copy"><span className="eyebrow">{place.label}</span><h3>{place.name}</h3><p>{place.description}</p></div>
      </div>
    </article>
  </section>;
}
