"use client";
import ActionButton from "./ActionButton";
import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
import AboutMotion from "./AboutMotion";
import { useEffect, useState, useRef } from "react";
export default function Contact() {
  const [params, setParams] = useState(() => new URLSearchParams());
  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState('');
  const [minDate, setMinDate] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const destinationRef = useRef(null);
  useEffect(() => {
    const today = new Date();
    setMinDate(
      [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-"),
    );
  }, []);
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("destination");
    if (["Sri Lanka", "Kenya"].includes(initial)) setDestination(initial);
    const close = (event) => { if (!destinationRef.current?.contains(event.target)) setDestinationOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus('sending');
    setResult('Sending your enquiry…');
    try {
      const response = await fetch('/api/enquiry/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await response.json();
      if (!response.ok || !body.ok) throw new Error(body.error || 'Unable to send your enquiry. Please try again.');
      event.currentTarget.reset();
      setDestination("");
      setStatus('success');
      setResult('Thank you. Your enquiry has been submitted to our travel team. We’ll reply to the email address you provided.');
    } catch (error) {
      setStatus('error');
      setResult(error.message === 'Failed to fetch' ? 'Connection lost. We could not confirm delivery. Please contact us before submitting again.' : error.message);
    }
  }
  return (
    <AboutMotion>
      <div className="contact-page">
        <section className="contact-opening about-container" aria-labelledby="contact-title">
          <div className="about-section-heading">
            <span className="about-kicker">It starts with a conversation</span>
            <h1 id="contact-title">Let’s talk travel.</h1>
            <p>A place you’ve been dreaming of. A journey you haven’t quite imagined.<br className="contact-desktop-break" /> Tell us your ideas, and we’ll help bring them together.</p>
          </div>
          <div className="contact-channels">
            <SiteLink href="mailto:travels@emeraldisle.lk" className="contact-channel">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
              <span><span className="contact-channel-label">Write to us</span><strong>travels@emeraldisle.lk</strong></span><span className="contact-channel-arrow" aria-hidden="true">↗</span>
            </SiteLink>
            <SiteLink href="https://wa.me/94764190752" className="contact-channel" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp, +94 76 419 0752 (opens in a new tab)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2 1.7-6A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 11h8m-8 4h5" /></svg>
              <span><span className="contact-channel-label">Chat on WhatsApp</span><strong>+94 76 419 0752</strong></span><span className="contact-channel-arrow" aria-hidden="true">↗</span>
            </SiteLink>
            <SiteLink href="tel:+94114627909" className="contact-channel">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 3 4 1 1 5-3 2a15 15 0 0 0 6 6l2-3 5 1 1 4c0 1-1 2-2 2A18 18 0 0 1 3 5c0-1 1-2 2-2Z" /></svg>
              <span><span className="contact-channel-label">Give us a call</span><strong>+94 11 462 7909</strong></span><span className="contact-channel-arrow" aria-hidden="true">↗</span>
            </SiteLink>
          </div>
        </section>
        <section className="contact-enquiry-layout about-container" aria-labelledby="enquiry-heading">
        <form
          key={params.toString()}
          id="enquiry-form"
          className="contact-enquiry-form"
          onSubmit={submit}
          aria-busy={status === 'sending'}
        >
          <span className="about-kicker">Your first step</span>
          <h2 id="enquiry-heading">Tell us about your trip.</h2>
          <p className="contact-form-intro">Share the essentials. We’ll help you work out the details.</p>
          <p className="contact-required-note">Name, email, destination and traveller count are required.</p>
          <div className="contact-form-row">
            <label>
              Your name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Full name"
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <div className="contact-form-row">
            <label>
              Destination
              <div className={`travel-select${destinationOpen ? " is-open" : ""}`} ref={destinationRef}>
                <input type="hidden" name="destination" value={destination} required />
                <button type="button" className={`travel-select-trigger${destination ? " has-value" : ""}`} aria-haspopup="listbox" aria-expanded={destinationOpen} onClick={() => setDestinationOpen(value => !value)}>
                  <span>{destination || "Choose a destination"}</span><span className="travel-select-chevron" aria-hidden="true">⌄</span>
                </button>
                {destinationOpen && <div className="travel-select-menu" role="listbox">
                  {["Sri Lanka", "Kenya"].map(option => <button type="button" role="option" aria-selected={destination === option} className="travel-select-option" key={option} onClick={() => { setDestination(option); setDestinationOpen(false); }}><span>{option}</span>{destination === option && <span aria-hidden="true">✓</span>}</button>)}
                </div>}
              </div>
            </label>
            <label>
              Number of travellers
              <input
                type="number"
                name="guests"
                min="1"
                max="100"
                defaultValue="2"
                required
              />
            </label>
          </div>
          <div className="contact-form-row">
            <label>
              Preferred travel date
              <div className="travel-date">
                <input type="date" name="date" min={minDate} aria-label="Preferred travel date" />
                <button type="button" className="travel-date-trigger" aria-label="Open travel date calendar" onClick={(event) => { const input = event.currentTarget.previousElementSibling; input?.showPicker?.(); input?.focus(); }}><span aria-hidden="true">▣</span></button>
              </div>
            </label>
            <label>
              Journey you’re interested in
              <input
                name="package"
                defaultValue={params.get("package") || ""}
                placeholder="A package, or something tailor-made"
              />
            </label>
          </div>
          <label>
            What would make this trip special?
            <textarea
              name="message"
              rows="5"
              placeholder="Your interests, preferred pace, special occasions…"
            />
          </label>
          <p className="small-note">
            Send your details directly to our travel team. We’ll use them to respond to your enquiry.
          </p>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
          <ActionButton type="submit" className="button" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send my enquiry'}
          </ActionButton>
          {result && <div id="enquiry-result" className={`enquiry-result-${status}`} role="status" aria-live="polite"><p>{result}</p></div>}
        </form>
          <aside className="contact-companion">
            <figure className="contact-destination-photo about-image-card">
              <SiteImage src="/images/gallery/mirissa-coast.webp" alt="Turquoise water and palm-lined coastline at Mirissa, Sri Lanka" loading="eager" sizes="(max-width: 800px) 90vw, 35vw" />
              <figcaption><span>Sri Lanka &amp; Kenya</span><h2>Your next chapter<br />starts here.</h2></figcaption>
            </figure>
            <div className="contact-office" data-about-reveal>
              <span className="about-kicker">Find us in Sri Lanka</span>
              <h3>A local beginning.<br />A world of possibilities.</h3>
              <address>198, Galle Road,<br />Dehiwala-Mount Lavinia 10370,<br />Sri Lanka.</address>
              <SiteLink className="about-inline-link" href="https://maps.app.goo.gl/3vPpcnE5MrizodWDA" target="_blank" rel="noopener noreferrer" aria-label="Find our office on Google Maps (opens in a new tab)">Find us on the map <span aria-hidden="true">↗</span></SiteLink>
            </div>
          </aside>
        </section>
        <section className="contact-questions about-container" aria-labelledby="contact-questions-title">
          <div className="about-section-heading"><span className="about-kicker">Before you get in touch</span><h2 id="contact-questions-title" data-about-reveal>A little help getting started.</h2><p>You don’t need a finished itinerary. Just a little curiosity.</p></div>
          <div className="contact-question-list">
            <details><summary>What if I don’t know my travel dates yet?<span aria-hidden="true">+</span></summary><p>Leave the travel date blank and tell us what you have in mind. Your enquiry will show that your dates are flexible.</p></details>
            <details><summary>Can I ask about a specific package?<span aria-hidden="true">+</span></summary><p>Yes. Add its name in the journey field, or use the enquiry link on a package page to bring its details into this form.</p></details>
            <details><summary>What happens when I send my enquiry?<span aria-hidden="true">+</span></summary><p>Your details are submitted directly to our travel team. Wait for the confirmation on this page. If sending fails, your details stay in the form and you can contact us by phone or WhatsApp.</p></details>
          </div>
        </section>
      </div>
    </AboutMotion>
  );
}
