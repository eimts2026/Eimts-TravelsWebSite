"use client";
import { useEffect, useId, useRef, useState } from "react";

export default function CatalogueFilter({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const id = useId();
  const selected = options.find(option => option.value === value) || options[0];
  const focusOption = index => requestAnimationFrame(() => root.current?.querySelectorAll('[role="option"]')[index]?.focus());
  const show = () => { setOpen(true); focusOption(Math.max(0, options.findIndex(option => option.value === value))); };
  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  const keys = event => {
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const buttons = [...root.current.querySelectorAll('[role="option"]')];
      const index = buttons.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next]?.focus();
    }
  };
  return <div className="catalogue-filter" ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <span id={`${id}-label`} className="catalogue-filter-label">{label}</span>
    <button ref={trigger} className="catalogue-filter-trigger" type="button" aria-labelledby={`${id}-label ${id}-value`} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => open ? setOpen(false) : show()} onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); show(); } }}>
      <span id={`${id}-value`}>{selected.label}</span><span aria-hidden="true">⌄</span>
    </button>
    {open && <div className="catalogue-filter-options" id={id} role="listbox" aria-labelledby={`${id}-label`} onKeyDown={keys}>
      {options.map(option => <button type="button" role="option" aria-selected={value === option.value} key={option.value} tabIndex={-1} onClick={() => { onChange(option.value); setOpen(false); trigger.current?.focus(); }}>{option.label}<span aria-hidden="true">{value === option.value ? '✓' : ''}</span></button>)}
    </div>}
  </div>;
}
