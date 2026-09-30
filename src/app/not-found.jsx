import PageShell from "../components/PageShell";
export default function NotFound() {
  return (
    <PageShell>
      <section className="page-intro">
        <span className="eyebrow">A DIFFERENT PATH</span>
        <h1>Page not found</h1>
        <p>This page is no longer available.</p>
        <a className="button" href="/packages/">
          Explore our journeys ↗
        </a>
      </section>
    </PageShell>
  );
}
