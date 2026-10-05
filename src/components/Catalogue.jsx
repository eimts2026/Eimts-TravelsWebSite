"use client";
import ActionButton from "./ActionButton";
import SiteImage from "./SiteImage";
import PackageHero from "./PackageHero";
import JourneyCard from "./JourneyCard";
import { useEffect, useState } from "react";
import { tourCategories } from "../data/tour-categories";
import packages from "../data/packages.json";
import { filterPackages } from "../data/filter";
export default function Catalogue({ destination = "" }) {
  const [country, setCountry] = useState(destination);
  const [duration, setDuration] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    const sync = () => { const value = new URLSearchParams(location.search).get("category") || ""; setCategory(tourCategories.some(item => item.id === value) ? value : ""); };
    sync(); addEventListener("popstate", sync);
    return () => removeEventListener("popstate", sync);
  }, []);
  const list = filterPackages(packages, { country, duration, search, category });
  const active = country !== destination || duration || search || category;
  const reset = () => { setCountry(destination); setDuration(""); setSearch(""); setCategory(""); const url = new URL(location.href); url.searchParams.delete("category"); history.replaceState(null, "", url); };
  const kenya = destination === "Kenya";
  return <>
    {!destination ? <PackageHero /> : <section className="collection-intro">
      <div className="collection-copy">
        <span className="eyebrow">{destination ? "THE " + destination.toUpperCase() + " COLLECTION" : "OUR JOURNEYS"}</span>
        <h1>{destination ? <>Discover <em>{destination}.</em></> : <>A little wonder.<br /><em>A world of possibility.</em></>}</h1>
        <p>{kenya ? "Early mornings on the savannah. Wildlife in its element. Journeys that bring you closer to the wild." : destination ? "From ancient wonders to tea country and ocean days. Find your own rhythm on an extraordinary island." : "Ancient island trails or wide-open African skies. Explore our Sri Lanka and Kenya packages, and find the journey that speaks to you."}</p>
        <div className="collection-note"><span aria-hidden="true">✧</span> Thoughtful itineraries. Room for your own story.</div>
      </div>
      <figure className="collection-photo">
        <SiteImage src={kenya ? "/images/travel/kenya-giraffes.webp" : "/images/travel/sigiriya.webp"} alt={kenya ? "Giraffes in Kenya’s wilderness" : "Sigiriya rock fortress above the Sri Lankan forest"} sizes="(max-width: 800px) 100vw, 50vw" loading="eager" fetchPriority="high" />
        <figcaption>{kenya ? "KENYA / WILD AT HEART" : "SRI LANKA / AN ISLAND OF STORIES"}</figcaption>
      </figure>
    </section>}
    <section className="section catalogue" id="journey-collection">
      <div className="collection-toolbar">
        <div><span className="eyebrow">CHOOSE YOUR NEXT CHAPTER</span><h2>The package collection</h2></div>
        {!destination && <div className="country-tabs" role="group" aria-label="Filter packages by destination">{["", "Sri Lanka", "Kenya"].map(c => <ActionButton key={c} type="button" aria-pressed={country === c} onClick={() => setCountry(c)}>{c || "All journeys"}</ActionButton>)}</div>}
      </div>
      <form className="filters" onSubmit={e => e.preventDefault()} onReset={reset}>
        <label>YOUR EXPERIENCE<select value={category} onChange={e => { setCategory(e.target.value); const url = new URL(location.href); if (e.target.value) url.searchParams.set("category", e.target.value); else url.searchParams.delete("category"); history.replaceState(null, "", url); }}><option value="">All categories</option>{tourCategories.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
        <label>TIME TO EXPLORE<select value={duration} onChange={e => setDuration(e.target.value)}><option value="">Any duration</option><option value="short">1–5 days</option><option value="medium">6–9 days</option><option value="long">10+ days</option></select></label>
        <label className="filter-search">FIND YOUR JOURNEY<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Beach, safari, honeymoon…" /></label>
        {active && <ActionButton type="reset" className="text-link">Clear filters ↺</ActionButton>}
      </form>
      <p className="result-count" aria-live="polite"><span>{list.length}</span> {list.length === 1 ? "journey" : "journeys"} {country && "in " + country} to discover</p>
      <div className="journey-grid">{list.map(p => <JourneyCard key={p.url} trip={p} />)}</div>
      {!list.length && <div className="empty-results"><h2>A different path, perhaps?</h2><p>No journeys match these filters. Try another duration or use Clear filters above.</p></div>}
    </section>
  </>;
}
