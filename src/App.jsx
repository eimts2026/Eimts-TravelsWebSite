import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HomeContent from "./components/HomeContent";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Catalogue from "./components/Catalogue";
import TripDetail from "./components/TripDetail";
import Contact from "./components/Contact";
import packages from "./data/packages.json";
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const trip = packages.find((p) => p.url.replace(/\/+$/, "") === path);
  const home = path === "/";
  let page;
  let title;
  if (home) {
    title = "Journeys that stay with you";
    page = (
      <>
        <Hero />
        <HomeContent />
      </>
    );
  } else if (path === "/packages") {
    title = "Our journeys";
    page = <Catalogue />;
  } else if (
    path === "/destinations/sri-lanka" ||
    path === "/destinations/kenya"
  ) {
    const destination = path.endsWith("kenya") ? "Kenya" : "Sri Lanka";
    title = destination;
    page = <Catalogue key={destination} destination={destination} />;
  } else if (path === "/about") {
    title = "Our story";
    page = <About />;
  } else if (path === "/gallery") {
    title = "Travel gallery";
    page = <Gallery />;
  } else if (path === "/contact") {
    title = "Plan your journey";
    page = <Contact />;
  } else if (trip) {
    title = trip.title;
    page = <TripDetail trip={trip} />;
  } else {
    title = "Page not found";
    page = (
      <section className="page-intro">
        <span className="eyebrow">A DIFFERENT PATH</span>
        <h1>
          Let’s find your
          <br />
          <em>next journey.</em>
        </h1>
        <p>This page is no longer available.</p>
        <a className="button" href="/packages/">
          Explore our journeys ↗
        </a>
      </section>
    );
  }
  useEffect(() => {
    document.title = title + " | Emerald Isle Travels";
    document.body.classList.toggle("home", home);
    return () => document.body.classList.remove("home");
  }, [home, title]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{page}</main>
      <Footer />
    </>
  );
}
