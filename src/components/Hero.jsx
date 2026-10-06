"use client";
import SiteLink from './SiteLink';
import { useEffect, useRef, useState } from 'react';
const scenes = [
  { title: 'Palm coast', display: 'Island life', line: 'Find your own rhythm on Sri Lanka’s coast.', image: '/images/home-gallery/palm-coast.webp', place: 'SRI LANKA', href: '/packages/?country=Sri%20Lanka', width: 1536, height: 1024, titleY: 390 },
  { title: 'Sigiriya', display: 'Lion Rock', line: 'Walk into a story centuries in the making.', image: '/images/navigation/sri-lanka.webp', place: 'SRI LANKA', href: '/packages/?country=Sri%20Lanka', width: 1400, height: 1050, titleY: 440, edge: 'M430 460 L420 395 L425 355 L435 323 L450 310 L480 315 L535 311 L555 300 L570 310 L610 299 L642 320 L675 318 L697 331 L724 315 L748 334 L800 334 L854 343 L865 365 L897 365 L925 390 L946 417 L965 445 L974 476 L970 510 L930 535 L860 550 L720 550 L560 550 L455 520Z' },
  { title: 'Amboseli', display: 'Open plains', line: 'Find your wonder on Kenya’s open plains.', image: '/images/navigation/kenya.webp', place: 'KENYA', href: '/packages/?country=Kenya', width: 1400, height: 933, titleY: 440, edge: 'M0 560 L90 565 L180 540 L290 555 L410 538 L540 552 L680 530 L810 550 L940 520 L1080 540 L1200 525 L1400 530 L1400 933 L0 933Z' },
];
const loopScenes = [scenes[scenes.length - 1], ...scenes, scenes[0]];
export default function Hero() {
  const root = useRef(null);
  const [slide, setSlide] = useState(1);
  const [animated, setAnimated] = useState(true);
  const index = (slide - 1 + scenes.length) % scenes.length;
  const [running, setRunning] = useState(false);
  const transitionTo = selected => { setAnimated(true); setSlide(selected + 1); };
  const finishTransition = event => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (slide === loopScenes.length - 1 || slide === 0) {
      setAnimated(false);
      setSlide(slide === 0 ? scenes.length : 1);
    }
  };
  useEffect(() => {
    if (animated) return;
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setAnimated(true));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [animated]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => { if (!disposed) setRunning(!motion.matches && !document.hidden && visible); };
    const observer = new IntersectionObserver(([entry]) => {
      if (disposed || !entry) return;
      visible = entry.isIntersecting;
      update();
    }, { threshold: .15 });
    observer.observe(element);
    // Keep typography anchored to the photographed subject as cover cropping changes.
    const resize = new ResizeObserver(() => {
      if (disposed || !element.isConnected) return;
      const { width, height } = element.getBoundingClientRect();
      element.querySelectorAll('.theatre-scene').forEach((node, position) => {
        const scene = loopScenes[position];
        const scale = Math.max(width / scene.width, height / scene.height);
        const isRock = scene.title === 'Sigiriya';
        const titleY = isRock && width <= 700 ? 270 : scene.titleY;
        const y = titleY * scale - (scene.height * scale - height) / 2;
        node.style.setProperty('--subject-title-y', `${Math.max(height * (isRock && width <= 700 ? .22 : .32), Math.min(height * .50, y))}px`);
      });
    });
    resize.observe(element);
    motion.addEventListener('change', update); document.addEventListener('visibilitychange', update); update();
    return () => { disposed = true; observer.disconnect(); resize.disconnect(); motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (!running || !animated) return;
    const timer = setTimeout(() => setSlide(current => current + 1), 7500);
    return () => clearTimeout(timer);
  }, [slide, running, animated]);
  return <section ref={root} className={`hero destination-theatre${running ? ' is-running' : ''}`} aria-label="Discover Sri Lanka and Kenya">
    <h1 className="theatre-accessible-title">Personal journeys through Sri Lanka and Kenya</h1>
    <div className={`theatre-track${animated ? '' : ' theatre-reset'}`} style={{ transform: `translate3d(-${slide * 100}%,0,0)` }} onTransitionEnd={finishTransition} aria-hidden="true">
      {loopScenes.map((scene, slot) => {
        const position = scenes.indexOf(scene);
        return <div className={`theatre-scene scene-${position}${position === index ? ' is-active' : ''}`} key={`${scene.title}-${slot}`}>
        <img className="theatre-landscape" src={scene.image} alt="" fetchPriority={position === 0 ? 'high' : 'auto'} />
        <div className="theatre-title"><span>{scene.place}</span><strong>{position === 1 ? <><span>Lion</span><span>Rock</span></> : scene.display}</strong></div>
        <svg className={`theatre-foreground foreground-${position}`} viewBox={`0 0 ${scene.width} ${scene.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <clipPath id={`landmark-${slot}`}><path d={scene.edge || ''} /></clipPath>
            {/* Photograph-derived luminance masks retain real palm and acacia silhouettes. */}
            <filter id={`subject-tone-${slot}`} colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0" />
              <feComponentTransfer><feFuncR type="linear" slope="-9" intercept="3.6" /><feFuncG type="linear" slope="-9" intercept="3.6" /><feFuncB type="linear" slope="-9" intercept="3.6" /></feComponentTransfer>
            </filter>
            <mask id={`subject-${slot}`} maskUnits="userSpaceOnUse" x="0" y="0" width={scene.width} height={scene.height} style={{maskType:'luminance'}}>
              <image href={scene.image} width={scene.width} height={scene.height} filter={`url(#subject-tone-${slot})`} />
            </mask>
          </defs>
          <image href={scene.image} width={scene.width} height={scene.height} clipPath={position === 1 ? `url(#landmark-${slot})` : undefined} mask={position !== 1 ? `url(#subject-${slot})` : undefined} />
        </svg>
        <div className="theatre-wash" />
      </div>; })}
    </div>
    <div className="theatre-caption" key={`caption-${index}`}><p>{scenes[index].line}</p><SiteLink className="button light" href={scenes[index].href}>{`Explore ${scenes[index].title}`}</SiteLink></div>
    <div className="theatre-destinations" role="group" aria-label="Choose a hero destination">{scenes.map((scene, position) => <button key={scene.title} type="button" aria-pressed={index === position} onClick={() => transitionTo(position)}><span className="theatre-thumb"><img src={scene.image} alt="" width="52" height="52" /></span><span><small>{scene.place}</small><strong>{scene.title}</strong></span></button>)}</div>
    <SiteLink className="theatre-scroll" href="#about-emerald" aria-label="Scroll to our story"><span aria-hidden="true">↓</span></SiteLink>
  </section>;
}
