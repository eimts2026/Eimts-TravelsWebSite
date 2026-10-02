"use client";
import SiteLink from "./SiteLink";
import SiteImage from "./SiteImage";
import { useEffect, useState } from "react";
export default function Contact() {
  const [params, setParams] = useState(() => new URLSearchParams());
  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);
  const [draft, setDraft] = useState("");
  const [minDate, setMinDate] = useState("");
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
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Destination: ${data.get("destination")}`,
      `Travellers: ${data.get("guests")}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      `Journey: ${data.get("package") || "Tailor-made"}`,
      "",
      data.get("message"),
    ].join("\n");
    setDraft(
      "mailto:travels@emeraldisle.lk?subject=" +
        encodeURIComponent("Journey enquiry · " + data.get("destination")) +
        "&body=" +
        encodeURIComponent(body),
    );
  }
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">IT STARTS WITH A CONVERSATION</span>
        <h1>
          Contact us.<br /><em>Let’s make it personal.</em>
        </h1>
        <p>
          Tell us a little about your plans. We’ll help you bring the journey
          together.
        </p>
      </section>
      <section className="section contact-layout">
        <div className="contact-information">
          <div className="contact-photo"><SiteImage src="/images/travel/sri-lanka-beach.webp" alt="A peaceful beach in Batticaloa, Sri Lanka" sizes="(max-width: 800px) 100vw, 40vw" /></div>
          <h2>
            Let’s talk <em>travel.</em>
          </h2>
          <p>
            Whether you have an itinerary in mind or just a spark of an idea,
            we’d love to hear it.
          </p>
          <SiteLink href="mailto:travels@emeraldisle.lk">travels@emeraldisle.lk ↗</SiteLink>
          <SiteLink href="tel:+94114627909">+94 11 462 7909</SiteLink>
          <div className="contact-note">
            <span className="eyebrow">TWO EXTRAORDINARY DESTINATIONS</span>
            <p>
              Sri Lanka & Kenya.
              <br />
              One journey that’s entirely yours.
            </p>
          </div>
        </div>
        <form
          key={params.toString()}
          id="enquiry-form"
          onSubmit={submit}
          onChange={() => setDraft("")}
        >
          <span className="eyebrow">YOUR FIRST STEP</span>
          <h2 className="form-heading">Tell us about your trip</h2>
          <div className="form-row">
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
          <div className="form-row">
            <label>
              Destination
              <select
                name="destination"
                required
                defaultValue={
                  ["Sri Lanka", "Kenya"].includes(params.get("destination"))
                    ? params.get("destination")
                    : ""
                }
              >
                <option value="">Choose a destination</option>
                <option>Sri Lanka</option>
                <option>Kenya</option>
              </select>
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
          <div className="form-row">
            <label>
              Preferred travel date
              <input type="date" name="date" min={minDate} />
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
            This form prepares an email for you to review and send through your
            email app.
          </p>
          <button type="submit" className="button" hidden={!!draft}>
            Prepare my enquiry ↗
          </button>
          <div id="enquiry-result" role="status" hidden={!draft}>
            {draft && (
              <>
                <p>
                  Your enquiry is ready to review. Open it in your email app,
                  then send it when you’re happy with the details.
                </p>
                <SiteLink className="button" href={draft}>
                  Open email draft ↗
                </SiteLink>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
