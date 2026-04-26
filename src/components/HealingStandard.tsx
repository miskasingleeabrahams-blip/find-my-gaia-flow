import { Link } from "@tanstack/react-router";

export function HealingStandard({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] md:rounded-[2.5rem] border border-blush-deep/15 bg-[linear-gradient(160deg,oklch(0.975_0.012_85)_0%,oklch(0.96_0.022_25)_55%,oklch(0.93_0.04_145/0.35)_100%)] p-8 md:p-14 shadow-[var(--shadow-soft)] ${className}`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-sage-deep">
          Our Philosophy
        </span>
        <h2 className="mt-4 font-serif text-3xl md:text-5xl text-ink text-balance">
          The GaiaBerry Healing Standard
        </h2>
        <p className="mt-6 text-ink/80 leading-relaxed">
          At GaiaBerry, we believe in supporting your body naturally, not rushing it.
        </p>
        <p className="mt-4 text-ink/80 leading-relaxed">
          For best results, all our products should be used consistently for a{" "}
          <span className="font-medium text-sage-deep">minimum of 3 months</span>, alongside a
          balanced, nourishing lifestyle.
        </p>
      </div>

      {variant === "full" && (
        <>
          <div className="mt-10 mx-auto max-w-2xl">
            <p className="text-center text-sm uppercase tracking-[0.2em] text-sage-deep">
              This allows your body the time it needs to
            </p>
            <ul className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                "Restore hormonal balance",
                "Reduce inflammation",
                "Regulate natural cycles",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-cream/70 backdrop-blur-sm border border-blush-deep/15 px-5 py-4 text-center text-sm text-ink/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 mx-auto max-w-2xl text-center">
            <p className="font-serif italic text-xl md:text-2xl text-sage-deep leading-snug">
              🌿 This is not a quick fix. It's a gentle, consistent journey back to balance.
            </p>
            <p className="mt-6 text-ink/80 leading-relaxed">
              After completing 3 months, you may choose to reassess your progress and continue your
              journey with more personalised support. Book a consultation to review your results
              and receive guidance tailored to your next phase.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/remedy-finder"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition shadow-[var(--shadow-soft)]"
              >
                Find My Remedy →
              </Link>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 rounded-full border border-sage-deep/30 bg-cream/70 text-sage-deep px-8 py-4 hover:bg-sage/10 transition"
              >
                Book Your 3-Month Check-In →
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function HealingReminder({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-xs text-muted-foreground italic leading-relaxed ${className}`}
    >
      🌿 Use consistently for at least 3 months alongside a healthy lifestyle for best results.
    </p>
  );
}
