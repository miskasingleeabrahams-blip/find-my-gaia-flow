import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import logo from "@/assets/gaiaberry-logo.png";

const nav = [
  { to: "/remedy-finder", label: "Remedy Finder" },
  { to: "/shop", label: "Shop" },
  { to: "/testimonials", label: "Stories" },
  { to: "/consultation", label: "3-Month Follow-Up" },
  { to: "/agent", label: "Become an Agent" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group" onClick={() => setOpen(false)} aria-label="GaiaBerry home">
          <img src={logo} alt="GaiaBerry" className="h-20 md:h-28 w-auto object-contain" />
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
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-ink hover:bg-sage/10 transition"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-cream/95 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-base text-ink hover:bg-sage/10 transition"
                activeProps={{ className: "text-sage-deep bg-sage/10" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/remedy-finder"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:opacity-90 transition"
            >
              Find My Remedy
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
