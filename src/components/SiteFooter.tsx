import { Link } from "@tanstack/react-router";
import logo from "@/assets/gaiaberry-logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-[var(--gradient-warm)] border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <img src={logo} alt="GaiaBerry" className="h-20 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Nature-led remedies for fertility, hormones and reproductive wellness — created with care, rooted in tradition, guided by science.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/remedy-finder" className="hover:text-sage-deep">Remedy Finder</Link></li>
            <li><Link to="/shop" className="hover:text-sage-deep">Shop Kits</Link></li>
            <li><Link to="/testimonials" className="hover:text-sage-deep">Customer Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/consultation" className="hover:text-sage-deep">Book Your 3-Month Check-In</Link></li>
            <li><Link to="/agent" className="hover:text-sage-deep">Become an Agent</Link></li>
            <li><a href="mailto:info@gaiaberry.co.za" className="hover:text-sage-deep">info@gaiaberry.co.za</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GaiaBerry. Made with intention.
      </div>
    </footer>
  );
}
