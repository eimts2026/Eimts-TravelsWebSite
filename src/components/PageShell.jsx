import SiteLink from "./SiteLink";
import Header from "./Header";
import Footer from "./Footer";
export default function PageShell({ children, home = false }) {
  return (
    <div className={home ? "page-shell home" : "page-shell"}>
      <SiteLink className="skip-link" href="#main">
        Skip to content
      </SiteLink>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
