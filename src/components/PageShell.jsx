import Header from "./Header";
import Footer from "./Footer";
export default function PageShell({ children, home = false }) {
  return (
    <div className={home ? "home" : undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
