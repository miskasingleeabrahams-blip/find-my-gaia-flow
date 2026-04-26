/**
 * Small inline badge noting that products are made to SANHA halaal standards.
 * GaiaBerry is NOT SANHA-certified — wording must reflect "made according to"
 * SANHA regulations, never "certified" or "accredited".
 */
export function HalaalBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-sage/10 border border-sage/30 text-sage-deep px-2.5 py-1 text-[11px] font-medium tracking-wide ${className}`}
      title="Manufactured according to SANHA (South African National Halaal Authority) halaal regulations. Not SANHA-certified."
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-deep" aria-hidden />
      Made to SANHA halaal standards
    </span>
  );
}
