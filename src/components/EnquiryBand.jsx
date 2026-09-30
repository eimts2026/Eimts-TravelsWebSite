export default function EnquiryBand() {
  return (
    <>
      <section className="enquiry-band">
        <div>
          <span className="eyebrow">{"YOUR JOURNEY, YOUR WAY"}</span>
          <h2>
            {"Let’s make it "}
            <em>{"yours."}</em>
          </h2>
          <p>
            {
              "A place you’ve dreamed of. A pace that feels right. Tell us what you have in mind."
            }
          </p>
        </div>
        <a className="button light" href="/contact/">
          {"Plan my journey "}
          <span aria-hidden="true">{"↗"}</span>
        </a>
      </section>
    </>
  );
}
