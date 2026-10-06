"use client";
import { useEffect } from "react";
export default function Loading() {
  useEffect(() => { window.dispatchEvent(new Event("page-route-pending")); }, []);
  return <div className="route-loading" data-route-pending role="status" aria-live="polite">
    <span className="eyebrow">EMERALD ISLE TRAVELS</span>
    <p>Opening your next destination…</p>
  </div>;
}
