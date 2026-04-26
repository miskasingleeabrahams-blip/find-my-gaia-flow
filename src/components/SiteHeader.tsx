import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";

const nav = [
  { to: "/remedy-finder", label: "Remedy Finder" },
  { to: "/shop", label: "Shop" },
  { to: "/testimonials", label: "Stories" },
  { to: "/consultation", label: "Consultation" },
  { to: "/agent", label: "Become an Agent" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-sage to-sage-deep grid place-items-center text-cream font-serif text-lg">G</span>
          <span className="font-serif text-2xl tracking-tight text-ink">GaiaBerry</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-sage-deep transition-colors"
              activeProps={{ className: "text-sage-deep" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CartDrawer />
          <Link
            to="/remedy-finder"
            className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm hover:opacity-90 transition"
          >
            Find My Remedy
          </Link>
        </div>
      </div>
    </header>
  );
}
