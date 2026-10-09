"use client";
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PackageHero from './PackageHero';
import CatalogueFilter from './CatalogueFilter';
import CatalogueCard from './CatalogueCard';
import SiteLink from './SiteLink';
import SiteImage from './SiteImage';
import AboutMotion from './AboutMotion';
import packages, { groupPackageVariants } from '../data/packages';
import { filterPackages } from '../data/filter';
import { tourCategories } from '../data/tour-categories';

const experiences = [{value:'',label:'Every experience'}, ...tourCategories.map(item=>({value:item.id,label:item.title.replace('Tours','tours')}))];
const durations = [{value:'',label:'Any length of stay'},{value:'short',label:'1–5 days'},{value:'medium',label:'6–9 days'},{value:'long',label:'10 days or more'}];
function PackageQuerySync({ setCountry, setCategory, setSearch }) {
  const params = useSearchParams();
  useEffect(()=>{
    const next=params.get('category') || '';
    const destination=params.get('country') || '';
    setCategory(tourCategories.some(item=>item.id===next) ? next : '');
    setCountry(['Sri Lanka','Kenya'].includes(destination) ? destination : '');
    setSearch(params.get('search') || '');
  },[params, setCountry, setCategory, setSearch]);
  return null;
}
export default function PackageCollection() {
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');
  const changeCountry = value => {
    setCountry(value);
    const url = new URL(location.href);
    if (value) url.searchParams.set('country',value); else url.searchParams.delete('country');
    history.replaceState(null,'',url);
  };
  const changeSearch = value => {
    setSearch(value);
    const url = new URL(location.href);
    if (value) url.searchParams.set('search',value); else url.searchParams.delete('search');
    history.replaceState(null,'',url);
  };
  const changeCategory = value => {
    setCategory(value);
    const url = new URL(location.href);
    if (value) url.searchParams.set('category',value); else url.searchParams.delete('category');
    history.replaceState(null,'',url);
  };
  const clear = () => {
    setCountry(''); setDuration(''); setSearch(''); setCategory(''); setSort('recommended');
    const url = new URL(location.href);
    ['country','category','search'].forEach(key=>url.searchParams.delete(key));
    history.replaceState(null,'',url);
  };
  const matched = filterPackages(packages,{country,category,duration,search});
  const journeys = groupPackageVariants(matched);
  if (sort !== 'recommended') journeys.sort((a,b)=>Number(!!a.durationUnconfirmed)-Number(!!b.durationUnconfirmed) || (sort==='shortest' ? a.days-b.days : b.days-a.days));
  const active = country || category || duration || search;
  const destinations = [
    { country: 'Sri Lanka', image: '/images/gallery/sigiriya.webp', alt: 'Sigiriya rock fortress rising above the forests of Sri Lanka', description: 'Tea country, ancient cities and ocean days.' },
    { country: 'Kenya', image: '/images/navigation/kenya.webp', alt: 'Elephants on the Amboseli plains with Mount Kilimanjaro beyond', description: 'Open plains, extraordinary wildlife and safari skies.' },
  ].map(destination => ({ ...destination, count: groupPackageVariants(packages.filter(trip => trip.country === destination.country)).length }));
  return <AboutMotion><div className="package-collection-page">
    <Suspense fallback={null}><PackageQuerySync setCountry={setCountry} setCategory={setCategory} setSearch={setSearch} /></Suspense>
    <PackageHero destinations={destinations} />
    <section className="packages-explore about-container" id="journey-collection" aria-labelledby="collection-title">
      <div className="packages-section-heading"><div><span className="about-kicker">Go where you feel most alive</span><h2 id="collection-title" data-about-reveal>Explore the collection.</h2></div><p>Choose a place. Follow a feeling.<br />We’ll take care of the details.</p></div>
      <div className="packages-destinations" role="group" aria-label="Choose a destination">{['','Sri Lanka','Kenya'].map(value=><button key={value} type="button" aria-pressed={country===value} onClick={()=>changeCountry(value)}>{value || 'All destinations'}<span>{groupPackageVariants(packages.filter(trip=>!value || trip.country===value)).length}</span></button>)}</div>
      <div className="packages-filters">
        <label className="packages-search"><span className="catalogue-filter-label">Search journeys</span><span className="packages-search-input"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input type="search" value={search} onChange={event=>changeSearch(event.target.value)} placeholder="Safari, tea trail, beach…" /></span></label>
        <CatalogueFilter label="Experience" value={category} options={experiences} onChange={changeCategory} />
        <CatalogueFilter label="Length of stay" value={duration} options={durations} onChange={setDuration} />
      </div>
      <div className="packages-results-bar"><p role="status" aria-live="polite"><strong>{journeys.length}</strong> {journeys.length===1?'journey':'journeys'}{country ? ` in ${country}` : ' to make your own'}</p><div>{active && <button type="button" className="packages-clear" onClick={clear}>Reset filters <span aria-hidden="true">×</span></button>}<CatalogueFilter label="Sort by" value={sort} options={[{value:'recommended',label:'Our selection'},{value:'shortest',label:'Shortest first'},{value:'longest',label:'Longest first'}]} onChange={setSort}/></div></div>
      {active && <div className="packages-active-filters" aria-label="Active filters">{[[country,()=>changeCountry('')],[experiences.find(option=>option.value===category && category)?.label,()=>changeCategory('')],[durations.find(option=>option.value===duration && duration)?.label,()=>setDuration('')],[search,()=>changeSearch('')]].filter(([text])=>text).map(([text,remove])=><button key={text} type="button" onClick={remove} aria-label={`Remove ${text} filter`}>{text} <span aria-hidden="true">×</span></button>)}</div>}
      <div className="packages-card-grid">{journeys.map(trip=><CatalogueCard key={trip.url} trip={trip}/>)}</div>
      {!journeys.length && <div className="packages-empty"><span className="about-kicker">There’s another way to go</span><h3>Let’s find your journey.</h3><p>Try a different destination, experience or length of stay.</p><button type="button" onClick={clear}>Show all journeys ↗</button></div>}
    </section>
    <section className="packages-bespoke" aria-labelledby="packages-bespoke-title">
      <SiteImage className="packages-bespoke-image" src="/images/gallery/diani-beach.webp" alt="" sizes="100vw" />
      <div className="about-container"><span className="about-kicker">Something more personal?</span><h2 id="packages-bespoke-title" data-about-reveal>Your ideas.<br />Our local knowledge.</h2><p>A little more beach. An extra day in the wild. Tell us what your perfect journey looks like, and we’ll shape it around you.</p><SiteLink className="button" href="/contact/">Create my journey</SiteLink></div>
    </section>
  </div></AboutMotion>;
}
