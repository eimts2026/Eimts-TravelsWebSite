"use client";
// Full-screen wipe and character-roll links adapted from the supplied Hyperiux reference.
import SiteLink from './SiteLink';
import SiteImage from './SiteImage';
import SocialLinks from './SocialLinks';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages/' },
  { label: 'About us', href: '/about/' },
  { label: 'Travel gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    let previous = Math.max(0, scrollY);
    setHidden(false);
    const scroll = () => {
      const current = Math.max(0, scrollY);
      setOnDark([...document.querySelectorAll('.hero, .packages-cover, .about-opening, .about-purpose, .about-horizons, .philosophy, .home-travel-gallery, footer')].some(node => {
        const rect = node.getBoundingClientRect();
        return rect.top <= 48 && rect.bottom > 70;
      }));
      setScrolled(current > 48);
      if (current < 120) setHidden(false);
      else if (Math.abs(current - previous) >= 12) setHidden(current > previous);
      if (Math.abs(current - previous) >= 12 || current < 120) previous = current;
    };
    scroll();
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('resize', scroll);
    return () => { removeEventListener('scroll', scroll); removeEventListener('resize', scroll); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    root.current.querySelector('.immersive-menu-panel').scrollTop = 0;
    const previousOverflow = document.body.style.overflow;
    const background = [...root.current.parentElement.children].filter(node => node !== root.current);
    const previousInert = background.map(node => node.inert);
    background.forEach(node => { node.inert = true; });
    document.body.style.overflow = 'hidden';
    dispatchEvent(new CustomEvent('site:menu', { detail: true }));
    const frame = requestAnimationFrame(() => {
      if (document.activeElement !== toggle.current) toggle.current?.focus({ preventScroll: true });
    });
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const focusable = [...root.current.querySelectorAll('a[href], button:not([disabled])')].filter(node => node.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || !root.current.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !root.current.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keys);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', keys);
      background.forEach((node, index) => { node.inert = previousInert[index]; });
      document.body.style.overflow = previousOverflow;
      dispatchEvent(new CustomEvent('site:menu', { detail: false }));
      toggle.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return <div className={`immersive-navigation${open ? ' menu-open' : ''}`} ref={root} role={open ? 'dialog' : undefined} aria-modal={open || undefined} aria-label={open ? 'Explore Emerald Isle Travels' : undefined}>
    <header className={`site-header reference-header immersive-header${scrolled ? ' is-floating' : ''}${hidden && !open ? ' is-hidden' : ''}${onDark || open ? ' on-dark' : ''}`} onFocusCapture={() => setHidden(false)}>
      <SiteLink className="brand" href="/#top" aria-label="Emerald Isle Travels home" onClick={event => {
        setOpen(false);
        if (pathname === '/') {
          event.preventDefault();
          requestAnimationFrame(() => dispatchEvent(new CustomEvent('site:top')));
        }
      }}><span className="brand-artwork"><img src="/images/emerald-isle-logo.webp" alt="Emerald Isle Travels" width="320" height="355" decoding="async" /></span></SiteLink>
      <button className="immersive-menu-toggle" ref={toggle} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="immersive-menu-panel" onClick={() => setOpen(value => !value)}>
        <span className="immersive-toggle-bars" aria-hidden="true"><i /><i /><i /></span>
      </button>
    </header>
    <div className="immersive-menu-panel" id="immersive-menu-panel" aria-hidden={!open} inert={!open} data-lenis-prevent>
      <div className="immersive-menu-content">
        <div className="immersive-menu-intro"><span>EMERALD ISLE TRAVELS</span><p>Thoughtfully planned. Extraordinarily experienced.</p></div>
        <div className="immersive-menu-main">
          <nav className="immersive-menu-links" aria-label="Main navigation">{links.map((link, index) => <div className="immersive-menu-row" key={link.href} style={{ '--reveal-order': index }}>
            <SiteLink href={link.href} onClick={() => setOpen(false)} aria-label={link.label} aria-current={(pathname.replace(/\/$/, '') || '/') === (link.href.replace(/\/$/, '') || '/') ? 'page' : undefined}>
              <span className="immersive-link-roll" aria-hidden="true">{[...link.label].map((char, position) => <span key={position} style={{ '--char-index': position }}>{char}</span>)}</span>
            </SiteLink>
          </div>)}</nav>
          <div className="immersive-menu-destinations">
            <div className="immersive-menu-images">
              <SiteLink href="/packages/?country=Sri%20Lanka" aria-label="Explore Sri Lanka" onClick={() => setOpen(false)}><SiteImage src="/images/navigation/sri-lanka-sunset.webp" alt="Sri Lankan stilt fishermen silhouetted against an orange sunset" sizes="(max-width: 700px) 45vw, 23vw" /><span>Sri Lanka <i aria-hidden="true">↗</i></span></SiteLink>
              <SiteLink href="/packages/?country=Kenya" aria-label="Explore Kenya" onClick={() => setOpen(false)}><SiteImage src="/images/navigation/kenya-sunset.webp" alt="Elephants and acacia trees at sunset in Amboseli, Kenya" sizes="(max-width: 700px) 45vw, 23vw" /><span>Kenya <i aria-hidden="true">↗</i></span></SiteLink>
            </div>
          </div>
        </div>
        <div className="immersive-menu-bottom"><SocialLinks className="immersive-socials" label="Navigation social media" /><span>Sri Lanka &amp; Kenya</span></div>
      </div>
    </div>
  </div>;
}
