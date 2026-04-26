import { Link } from "@tanstack/react-router";
import logo from "@/assets/gaiaberry-logo.png";
import iaothBadge from "@/assets/iaoth-badge.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-[var(--gradient-warm)] border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <img src={logo} alt="GaiaBerry" className="h-20 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Nature-led remedies for fertility, hormones and reproductive wellness. Created with care, rooted in tradition, guided by science.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/remedy-finder" className="hover:text-sage-deep">Remedy Finder</Link></li>
            <li><Link to="/shop" className="hover:text-sage-deep">Shop Kits</Link></li>
            <li><Link to="/testimonials" className="hover:text-sage-deep">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/consultation" className="hover:text-sage-deep">3-Month Follow-Up</Link></li>
            <li><Link to="/agent" className="hover:text-sage-deep">Become an Agent</Link></li>
            <li><a href="mailto:info@gaiaberry.co.za" className="hover:text-sage-deep">info@gaiaberry.co.za</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/legal/privacy" className="hover:text-sage-deep">Privacy Policy</Link></li>
            <li><Link to="/legal/terms" className="hover:text-sage-deep">Terms of Service</Link></li>
            <li><Link to="/legal/shipping" className="hover:text-sage-deep">Shipping & Returns</Link></li>
            <li><Link to="/legal/disclaimer" className="hover:text-sage-deep">Medical Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      {/* Credentials — qualified & recognised */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <a
              href="https://www.iaoth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              aria-label="International Association of Therapists"
            >
              <img
                src={iaothBadge}
                alt="International Association of Therapists — IAOTH member"
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-sage-deep">Qualified & recognised herbalist.</span>{" "}
              Accredited member of the International Association of Therapists (IAOTH).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="shrink-0 h-14 px-5 rounded-full bg-sage-deep text-cream flex items-center justify-center font-serif text-xs tracking-[0.18em] shadow-[var(--shadow-soft)]" aria-hidden>
              HALAAL
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-sage-deep">Made to halaal standards.</span>{" "}
              All GaiaBerry products are manufactured according to SANHA (South African National Halaal Authority) regulations. We are not SANHA-certified.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GaiaBerry. Made with intention.
      </div>
    </footer>
  );
}
