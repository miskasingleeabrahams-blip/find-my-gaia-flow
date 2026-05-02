import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "gaiaberry_cookie_consent_v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // small delay so it doesn't fight the hero animation
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md z-50 rounded-2xl border border-border/70 bg-cream/95 backdrop-blur-md shadow-[var(--shadow-plum)] p-5"
    >
      <h2 className="font-serif text-lg text-ink">A note about cookies</h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        We use a small number of cookies to remember your cart, keep the site
        running smoothly, and understand how visitors find us. You can read
        more in our{" "}
        <Link to="/legal/privacy" className="text-sage-deep underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
        <button
          type="button"
          onClick={() => persist("declined")}
          className="rounded-full border border-border px-4 py-2 text-sm text-ink hover:bg-sage/10 transition"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => persist("accepted")}
          className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm hover:opacity-90 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
