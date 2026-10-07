"use client";
import { useEffect, useRef, useState } from "react";
import SiteImage from "./SiteImage";
import { galleryHero, galleryPhotos } from "../data/gallery";
import "./Gallery.css";

const photos = [galleryHero, ...galleryPhotos];
export default function Gallery() {
  const [active, setActive] = useState(null);
  const viewer = useRef(null);
  const isOpen = active !== null;
  const photo = isOpen ? photos[active] : null;
  const move = direction => setActive(index => (index + direction + photos.length) % photos.length);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = viewer.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return (
    <div className="travel-photo-gallery">
      <section className="travel-photo-hero" aria-labelledby="travel-gallery-title">
        <SiteImage src={galleryHero.src} alt={galleryHero.alt} sizes="100vw" loading="eager" fetchPriority="high" />
        <h1 id="travel-gallery-title">Travel Gallery</h1>
        <button className="travel-photo-hero-open" type="button" aria-label="View the full savannah sunset photograph" onClick={() => setActive(0)} />
      </section>
      <section className="travel-photo-grid" aria-label="Photographs of Sri Lanka and Kenya">
        {galleryPhotos.map((photo, index) => (
          <button type="button" className={`travel-photo${index % 3 === 2 ? " travel-photo-wide" : ""}`} key={photo.id} aria-label={`View full photograph: ${photo.alt}`} onClick={() => setActive(index + 1)}>
            <SiteImage
              src={photo.src}
              alt={photo.alt}
              sizes={index % 3 === 2
                ? "(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) 86vw, 1280px"
                : "(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) 43vw, 628px"}
              style={{ objectPosition: photo.position || "center" }}
            />
          </button>
        ))}
      </section>
      <dialog ref={viewer} className="travel-photo-viewer" aria-label="Full photograph viewer" data-lenis-prevent onClose={() => setActive(null)} onCancel={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
        {photo && <>
          <span className="travel-photo-count" aria-live="polite">{active + 1} / {photos.length}</span>
          <button type="button" className="travel-photo-close" aria-label="Close photograph viewer" autoFocus onClick={() => setActive(null)}>×</button>
          <button type="button" className="travel-photo-previous" aria-label="Previous photograph" onClick={() => move(-1)}>←</button>
          <img className="travel-photo-full" src={photo.src} alt={photo.alt} />
          <button type="button" className="travel-photo-next" aria-label="Next photograph" onClick={() => move(1)}>→</button>
        </>}
      </dialog>
    </div>
  );
}
