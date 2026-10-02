"use client";
import ActionButton from "./ActionButton";
import { useEffect, useId, useRef, useState } from "react";

const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileCredit = process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const modeNames = { route:"Road route", train:"Railway route", flight:"Flight transfer (illustrative)", boat:"Boat transfer (illustrative)" };

function validatePaths(data, stops) {
  if (data.version !== 1 || !Array.isArray(data.legs) || data.legs.length !== stops.length - 1) throw new Error("Missing route geometry");
  data.legs.forEach((leg, index) => {
    if (leg.from !== stops[index].id || leg.to !== stops[index + 1].id || leg.mode !== stops[index + 1].mode || !Array.isArray(leg.paths) || !leg.paths.length) throw new Error("Mismatched route geometry");
    for (const path of leg.paths) {
      if (!modeNames[path.mode] || !Array.isArray(path.coordinates) || path.coordinates.length < 2 || path.coordinates.some(point => !Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite) || Math.abs(point[0]) > 90 || Math.abs(point[1]) > 180)) throw new Error("Invalid route geometry");
    }
  });
  return data.legs.flatMap(leg => leg.paths);
}

function popupContent(visits) {
  const content = document.createElement("div");
  content.className = "journey-map-popup";
  const heading = document.createElement("strong");
  heading.textContent = visits[0].name;
  content.append(heading);
  for (const stop of visits) {
    const detail = document.createElement("p");
    detail.textContent = (stop.optional ? "Optional / alternative" : "Stop " + stop.number) + " · " + stop.days;
    content.append(detail);
    if (stop.mode !== "route") {
      const transfer = document.createElement("p");
      transfer.textContent = modeNames[stop.mode];
      content.append(transfer);
    }
    if (stop.note) {
      const note = document.createElement("p");
      note.textContent = stop.note;
      content.append(note);
    }
  }
  return content;
}

export default function JourneyMap({ route, country }) {
  const section = useRef(null);
  const canvas = useRef(null);
  const mapRef = useRef(null);
  const markers = useRef(new Map());
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("waiting");
  const [tilesFailed, setTilesFailed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const id = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEnabled(true); observer.disconnect(); }
    }, { rootMargin:"300px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let map;
    let resize;
    let preference;
    let updateMotion;
    const controller = new AbortController();
    setStatus("loading");
    setTilesFailed(false);
    setSelected(null);
    async function initialize() {
      try {
        const [leaflet, geometry] = await Promise.all([
          import("leaflet"),
          fetch(route.pathUrl, {signal:controller.signal}).then(response => {
            if (!response.ok) throw new Error("Route path unavailable");
            return response.json();
          }),
        ]);
        if (disposed) return;
        const paths = validatePaths(geometry, route.stops);
        const positions = new Map([...route.stops,...route.optionalStops].map(stop => [stop.id,[stop.lat,stop.lng]]));
        for (const leg of geometry.legs) {
          if (!["route","train"].includes(leg.mode)) continue;
          positions.set(leg.from, leg.paths[0].coordinates[0]);
          positions.set(leg.to, leg.paths.at(-1).coordinates.at(-1));
        }
        const L = leaflet.default || leaflet;
        preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const touch = window.matchMedia("(pointer: coarse)").matches;
        map = L.map(canvas.current, {
          scrollWheelZoom:false, dragging:!touch, touchZoom:true,
          zoomAnimation:!preference.matches, fadeAnimation:!preference.matches,
          markerZoomAnimation:!preference.matches, inertia:!preference.matches,
          zoomSnap:0.25, minZoom:4, maxZoom:17,
        });
        mapRef.current = map;
        map.getContainer().setAttribute("aria-label", "Journey map of " + country + ". Use the numbered stop list or zoom controls to explore.");
        const points = [...positions.values()].concat(paths.flatMap(path => path.coordinates));
        const fit = () => map.fitBounds(L.latLngBounds(points).pad(0.12), { padding:[40,48],maxZoom:12,animate:false });
        fit();
        let errors = 0;
        const tiles = L.tileLayer(tileUrl, { attribution:tileCredit, maxZoom:19 });
        tiles.on("loading", () => { errors = 0; });
        tiles.on("tileerror", () => { errors += 1; });
        tiles.on("load", () => { if (!disposed) setTilesFailed(errors > 0); });
        tiles.addTo(map);

        paths.forEach(path => {
          L.polyline(path.coordinates, {
            color:"#557ce0", weight:4, opacity:0.9, smoothFactor:0.5,
            className:"journey-path journey-path-" + path.mode,
            dashArray:path.mode === "flight" ? "4 9" : path.mode === "train" ? "10 7" : path.mode === "boat" ? "2 7" : undefined,
            interactive:false,
          }).addTo(map);
        });
        const grouped = new Map();
        for (const stop of [...route.stops, ...route.optionalStops]) {
          if (!grouped.has(stop.id)) grouped.set(stop.id, []);
          grouped.get(stop.id).push(stop);
        }
        markers.current.clear();
        for (const visits of grouped.values()) {
          const first = visits[0];
          const numbers = visits.filter(stop => !stop.optional).map(stop => stop.number);
          const label = numbers.length ? numbers.join("·") : "◇";
          const icon = L.divIcon({
            className:"journey-map-marker" + (first.optional ? " is-optional" : "") + (numbers.length > 1 ? " is-return" : ""),
            html:"<span>" + label + "</span>",
            iconSize:[numbers.length > 1 ? 54 : 38,38], iconAnchor:[numbers.length > 1 ? 27 : 19,19],
          });
          const marker = L.marker(positions.get(first.id), {icon,keyboard:true,title:first.name,riseOnHover:true})
            .bindPopup(popupContent(visits), {maxWidth:280,autoPanPadding:[30,45]})
            .addTo(map);
          marker.getElement().setAttribute("aria-label",(numbers.length ? "Stops " + numbers.join(", ") : "Optional stop") + ": " + first.name);
          marker.getElement().addEventListener("keydown", event => {
            if (event.key === " ") { event.preventDefault(); marker.openPopup(); }
          });
          marker.on("popupopen", () => { if (!disposed) setSelected(first.optional ? first.id : first.number); });
          marker.on("popupclose", () => { if (!disposed) setSelected(null); });
          for (const stop of visits) markers.current.set(stop.optional ? stop.id : stop.number, marker);
        }
        resize = new ResizeObserver(() => { map.invalidateSize({pan:false}); fit(); });
        resize.observe(canvas.current);
        updateMotion = () => {
          map.options.zoomAnimation = !preference.matches;
          map.options.fadeAnimation = !preference.matches;
          map.options.markerZoomAnimation = !preference.matches;
          map.options.inertia = !preference.matches;
        };
        preference.addEventListener("change",updateMotion);
        if (!disposed) setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
        map?.remove();
        map = undefined;
        mapRef.current = null;
      }
    }
    initialize();
    return () => {
      disposed = true;
      controller.abort();
      resize?.disconnect();
      if (updateMotion) preference.removeEventListener("change",updateMotion);
      map?.remove();
      mapRef.current = null;
      markers.current.clear();
    };
  }, [enabled, route, country, attempt]);

  function selectStop(stop) {
    const key = stop.optional ? stop.id : stop.number;
    const marker = markers.current.get(key);
    if (!marker) return;
    mapRef.current.panInside(marker.getLatLng(), {padding:[60,60],animate:!window.matchMedia("(prefers-reduced-motion: reduce)").matches});
    marker.openPopup();
    setSelected(key);
    canvas.current.scrollIntoView({ block:"center", behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <section id="journey-map" ref={section} className="detail-section journey-map-section" aria-labelledby={id + "-heading"}>
    <span className="eyebrow">ROUTE VIEW</span>
    <h2 id={id + "-heading"}>Journey <em>Map</em></h2>
    <p className="journey-map-intro">A visual route based on the key destinations in this package.</p>
    <div className="journey-map-frame">
      <div id={id + "-canvas"} ref={canvas} className="journey-map-canvas" data-map-ready={status === "ready"} aria-describedby={id + "-hint"} />
      {status !== "ready" && <div className="journey-map-loading" role="status">
        <span aria-hidden="true">⌁</span>
        <p>{status === "error" ? "The interactive map could not load. You can still explore the stops below." : status === "loading" ? "Loading your journey map…" : "Your journey map will load as you reach this section."}</p>
        {status === "error" && <ActionButton type="button" className="text-link" onClick={() => setAttempt(value => value + 1)}>Retry map ↺</ActionButton>}
      </div>}
    </div>
    <div className="journey-map-note" id={id + "-hint"}>
      <p>{route.stops.some(stop => ["route","train"].includes(stop.mode) && stop.number > 1) ? "Road paths follow mapped roads; train journeys follow railway tracks. " : ""}Final transfers depend on your itinerary and accommodation.</p>
      {route.stops.some(stop => ["flight","boat"].includes(stop.mode)) && <p>Flight and boat connections are shown as illustrative curves.</p>}
      <p className="map-touch-hint">Use two fingers to move or zoom the map on touch screens.</p>
      {tilesFailed && <p role="status">Some map tiles could not load. The route and destination list are still available.</p>}
    </div>
    <div className="journey-map-legend" aria-label="Map legend">
      {route.stops.some(stop => ["route","train"].includes(stop.mode) && stop.number > 1) && <span><i className="legend-route" /> Road route</span>}
      {["flight","train","boat"].filter(mode => route.stops.some(stop => stop.mode === mode)).map(mode => <span key={mode}><i className={"legend-" + mode} />{modeNames[mode]}</span>)}
      {route.optionalStops.length > 0 && <span><i className="legend-optional" />Optional / alternative</span>}
    </div>
    {route.note && <p className="journey-route-advice">{route.note}</p>}
    <ol className="journey-stop-list" aria-label="Destinations in itinerary order">
      {route.stops.map(stop => <li key={stop.number}>
        <span className="journey-stop-number" aria-hidden="true">{stop.number}</span>
        <div>{status === "ready" ? <ActionButton type="button" aria-controls={id + "-canvas"} aria-pressed={selected === stop.number} onClick={() => selectStop(stop)}>{stop.name}</ActionButton> : <strong>{stop.name}</strong>}
          <span>{stop.days}{stop.mode !== "route" && " · " + modeNames[stop.mode]}</span>
          {stop.note && <p>{stop.note}</p>}
        </div>
      </li>)}
    </ol>
    {route.optionalStops.length > 0 && <div className="journey-optional-stops"><h3>Optional or alternative stops</h3>
      <ul>{route.optionalStops.map(stop => <li key={stop.id}>
        {status === "ready" ? <ActionButton type="button" aria-controls={id + "-canvas"} aria-pressed={selected === stop.id} onClick={() => selectStop(stop)}>{stop.name}</ActionButton> : <strong>{stop.name}</strong>}
        <span>{stop.days}</span><p>{stop.note}</p>
      </li>)}</ul>
    </div>}
    <p className="journey-map-credit">Map data: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>. Road routing: <a href="https://project-osrm.org/" target="_blank" rel="noreferrer">OSRM</a> / <a href="https://routing.openstreetmap.de/about.html" target="_blank" rel="noreferrer">FOSSGIS</a>. Destination coordinates: <a href="https://www.geonames.org/" target="_blank" rel="noreferrer">GeoNames</a>. <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer">Fix the map</a>. Markers represent destination areas or road approaches.</p>
  </section>;
}
