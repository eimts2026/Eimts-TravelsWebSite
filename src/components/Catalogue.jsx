"use client";
import SiteImage from "./SiteImage";
import { useState } from "react";
import packages from "../data/packages.json";
import { filterPackages } from "../data/filter";
import EnquiryBand from "./EnquiryBand";
export function JourneyCard({ trip: p }) {
  return (
    <article className="journey-card">
      <a className="card-image" href={p.url}>
        <SiteImage src={p.image} alt={p.title} loading="lazy" />
        <span className="card-country">{p.country}</span>
        <span className="card-arrow">↗</span>
      </a>
      <div className="card-meta">
        <span>{p.category}</span>
        <span>
          {p.durationUnconfirmed
            ? "Duration to confirm"
            : p.details.Duration.replace(" / ", " · ").replace(
                "1 Days",
                "1 Day",
              )}
        </span>
      </div>
      <h3>
        <a href={p.url}>{p.title}</a>
      </h3>
      <a className="text-link" href={p.url}>
        Discover this journey <span>→</span>
      </a>
    </article>
  );
}
export default function Catalogue({ destination = "" }) {
  const [country, setCountry] = useState(destination);
  const [duration, setDuration] = useState("");
  const [search, setSearch] = useState("");
  const list = filterPackages(packages, { country, duration, search });
  const reset = () => {
    setCountry(destination);
    setDuration("");
    setSearch("");
  };
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">
          {destination ? "YOUR NEXT CHAPTER" : "THE JOURNEY COLLECTION"}
        </span>
        <h1>
          {destination ? (
            <>
              Discover <em>{destination}.</em>
            </>
          ) : (
            <>
              Find your <em>somewhere.</em>
            </>
          )}
        </h1>
        <p>
          {destination === "Sri Lanka"
            ? "Tea hills, ancient cities, golden coastlines. An island with a different story around every bend."
            : destination === "Kenya"
              ? "Follow your sense of wonder into open savannahs, remarkable wildlife and extraordinary landscapes."
              : "Thoughtfully planned escapes to Sri Lanka and Kenya. Find a journey that feels like you."}
        </p>
      </section>
      <section className="section catalogue">
        <form
          className="filters"
          onSubmit={(e) => e.preventDefault()}
          onReset={reset}
        >
          <label>
            DESTINATION
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {!destination && <option value="">All destinations</option>}
              {(destination ? [destination] : ["Sri Lanka", "Kenya"]).map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
          </label>
          <label>
            TIME TO EXPLORE
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Any duration</option>
              <option value="short">1–5 days</option>
              <option value="medium">6–9 days</option>
              <option value="long">10+ days</option>
            </select>
          </label>
          <label className="filter-search">
            FIND YOUR JOURNEY
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Beach, safari, honeymoon…"
            />
          </label>
          <button type="reset" className="text-link">
            Reset filters ↺
          </button>
        </form>
        <p className="result-count" aria-live="polite">
          <span>{list.length}</span> journeys to discover
        </p>
        <div className="journey-grid">
          {list.map((p) => (
            <JourneyCard key={p.url} trip={p} />
          ))}
        </div>
        {!list.length && (
          <div className="empty-results">
            <h2>A different path, perhaps?</h2>
            <p>
              No journeys match these filters. Try another duration or clear
              your search.
            </p>
            <button className="button" onClick={reset}>
              Show all journeys
            </button>
          </div>
        )}
      </section>
      <EnquiryBand />
    </>
  );
}
