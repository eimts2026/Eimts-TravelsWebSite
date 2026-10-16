"use client";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// A local loading boundary prevents this on-scroll import from suspending
// the entire route and collapsing its scroll height while the chunk loads.
const Gallery = dynamic(() => import('./MorphGallery'), { loading: () => null });

function Deferred({ children, className }) {
  const root = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '400px' });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className={className}>{ready ? children : null}</div>;
}
export function HomeTravelGallery(props) {
  return <Deferred className="deferred-gallery"><Gallery {...props} /></Deferred>;
}
