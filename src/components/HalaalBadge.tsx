/**
 * Small inline badge stating SANHA Halaal compliance.
 * Use on every product and kit card, and on product detail pages.
 */
export function HalaalBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-sage/10 border border-sage/30 text-sage-deep px-2.5 py-1 text-[11px] font-medium tracking-wide ${className}`}
      title="Halaal-compliant under SANHA (South African National Halaal Authority) regulations"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-deep" aria-hidden />
      Halaal · SANHA compliant
    </span>
  );
}
