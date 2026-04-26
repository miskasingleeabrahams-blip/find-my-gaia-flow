import { AlertTriangle } from "lucide-react";

// Products that ARE safe in specific windows (whitelist by handle/title keyword).
// Everything else: not safe if pregnant, suspected pregnant, or breastfeeding.
type Safety =
  | { safe: true; window: string }
  | { safe: false };

function classify(input: string): Safety {
  const s = input.toLowerCase();
  if (s.includes("womb nourishment") || s.includes("womb-nourishment") || s.includes("womb tea")) {
    return { safe: true, window: "Safe to use from the 2nd trimester onward only." };
  }
  if (s.includes("postpartum") || s.includes("breastfeeding") || s.includes("breastmilk") || s.includes("breast milk")) {
    return { safe: true, window: "Safe to use from the 3rd trimester and while breastfeeding." };
  }
  return { safe: false };
}

export function PregnancySafetyNote({
  productKey,
  className = "",
}: {
  productKey: string;
  className?: string;
}) {
  const result = classify(productKey);

  return (
    <div
      className={`rounded-2xl border border-blush-deep/25 bg-blush/20 p-4 flex gap-3 items-start ${className}`}
      role="note"
    >
      <AlertTriangle className="h-4 w-4 text-blush-deep mt-0.5 shrink-0" aria-hidden />
      <div className="text-xs leading-relaxed text-ink/85">
        <p className="font-medium text-ink">Pregnancy & breastfeeding</p>
        {result.safe ? (
          <p className="mt-1">{result.window} Always check with your healthcare practitioner first.</p>
        ) : (
          <p className="mt-1">
            Do not use if pregnant, if you suspect you may be pregnant, or while breastfeeding.
          </p>
        )}
      </div>
    </div>
  );
}
