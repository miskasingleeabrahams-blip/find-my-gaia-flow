import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function RemedyFinderCallout({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";

  return (
    <aside
      className={`relative overflow-hidden rounded-3xl border border-blush-deep/20 bg-[linear-gradient(135deg,oklch(0.97_0.018_25)_0%,oklch(0.96_0.025_45)_100%)] shadow-[var(--shadow-soft)] ${
        isCompact ? "px-5 py-5 md:px-6 md:py-6" : "px-6 py-8 md:px-10 md:py-10"
      } ${className}`}
      aria-label="Remedy Finder guidance"
    >
      <div
        className={`flex flex-col ${
          isCompact ? "sm:flex-row sm:items-center sm:gap-5" : "items-center text-center gap-5"
        }`}
      >
        <div
          className={`inline-flex items-center justify-center h-11 w-11 rounded-full bg-cream/80 border border-blush-deep/20 text-sage-deep shrink-0 ${
            isCompact ? "" : "mb-1"
          }`}
          aria-hidden
        >
          <Leaf className="h-5 w-5" />
        </div>
        <div className={`flex-1 ${isCompact ? "text-left" : "text-center"}`}>
          <p
            className={`font-serif text-ink leading-snug ${
              isCompact ? "text-base md:text-lg" : "text-xl md:text-2xl"
            }`}
          >
            Not sure which product is right for you?
          </p>
          <p
            className={`text-ink/75 leading-relaxed ${
              isCompact ? "mt-1 text-sm" : "mt-2 text-base max-w-md mx-auto"
            }`}
          >
            Choose the right fertility support and start your healing journey today.
          </p>
        </div>
        <Link
          to="/remedy-finder"
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition shadow-[var(--shadow-soft)] shrink-0 ${
            isCompact ? "mt-4 sm:mt-0 px-6 py-3 text-sm" : "mt-2 px-7 py-3.5 text-sm"
          }`}
        >
          Start My Journey →
        </Link>
      </div>
    </aside>
  );
}
