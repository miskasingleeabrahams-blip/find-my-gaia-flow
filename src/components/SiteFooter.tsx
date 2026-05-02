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
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/gaiaberry_fertility"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow GaiaBerry on Instagram"
              className="h-10 w-10 rounded-full bg-cream border border-border/60 flex items-center justify-center text-sage-deep hover:bg-sage-deep hover:text-cream hover:border-sage-deep transition-colors shadow-[var(--shadow-soft)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@gaiaberry_fertility"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow GaiaBerry on TikTok"
              className="h-10 w-10 rounded-full bg-cream border border-border/60 flex items-center justify-center text-sage-deep hover:bg-sage-deep hover:text-cream hover:border-sage-deep transition-colors shadow-[var(--shadow-soft)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/remedy-finder" className="hover:text-sage-deep">Start My Journey</Link></li>
            <li><Link to="/shop" className="hover:text-sage-deep">Shop Kits</Link></li>
            <li><Link to="/about" className="hover:text-sage-deep">About</Link></li>
            <li><Link to="/testimonials" className="hover:text-sage-deep">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/consultation" className="hover:text-sage-deep">Reassess My Journey</Link></li>
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
              All GaiaBerry products are manufactured according to SANHA (South African National Halaal Authority) regulations.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GaiaBerry (Pty) Ltd. Made with intention.
      </div>
    </footer>
  );
}
