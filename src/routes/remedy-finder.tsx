import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { useState } from "react";

export const Route = createFileRoute("/remedy-finder")({
  head: () => ({
    meta: [
      { title: "Remedy Finder — GaiaBerry" },
      { name: "description", content: "Answer a few questions to discover your personalised natural fertility & hormone remedy." },
    ],
  }),
  component: RemedyFinder,
});

type Step = { q: string; key: string; options: string[] };

const steps: Step[] = [
  { q: "What feels most present in your body right now?", key: "concern", options: ["Trying to conceive", "PCOS symptoms", "Irregular cycles", "Hormonal balance"] },
  { q: "How would you describe your cycle?", key: "cycle", options: ["Regular (26–32 days)", "Irregular", "Absent or rare", "Painful but regular"] },
  { q: "What season of life are you in?", key: "season", options: ["20s", "30s", "40s", "Postpartum"] },
  { q: "What feels nourishing to you?", key: "ritual", options: ["Daily teas", "Tinctures & capsules", "Whole-food powders", "Guided plan with check-ins"] },
];

const remedies: Record<string, { name: string; desc: string }> = {
  default: { name: "Cycle Soothe Ritual", desc: "A gentle daily blend to ease symptoms and restore rhythm — a beautiful first step." },
  conceive: { name: "Conception Companion", desc: "A 90-day protocol nurturing egg quality, lining health and cycle regularity." },
  pcos: { name: "PCOS Reset Kit", desc: "Adaptogens and seed-cycling to gently rebalance insulin and androgens." },
};

function RemedyFinder() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = i >= steps.length;

  const pick = (val: string) => {
    const next = { ...answers, [steps[i].key]: val };
    setAnswers(next);
    setI(i + 1);
  };

  const result = (() => {
    if (answers.concern === "Trying to conceive") return remedies.conceive;
    if (answers.concern === "PCOS symptoms") return remedies.pcos;
    return remedies.default;
  })();

  const reset = () => { setAnswers({}); setI(0); };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-20">
        <div className="text-center">
          <Eyebrow>Remedy Finder</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-balance">A personalised ritual, in 2 minutes.</h1>
          <p className="mt-4 text-muted-foreground">No pressure. Just listening.</p>
        </div>

        <div className="mt-12 rounded-[2rem] bg-card border border-border p-8 md:p-12 shadow-[var(--shadow-soft)]">
          {!done ? (
            <>
              <div className="flex items-center gap-2 mb-8">
                {steps.map((_, idx) => (
                  <div key={idx} className={`h-1 flex-1 rounded-full transition ${idx <= i ? "bg-sage-deep" : "bg-border"}`} />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Question {i + 1} of {steps.length}</p>
              <h2 className="mt-3 font-serif text-3xl text-balance">{steps[i].q}</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {steps[i].options.map((o) => (
                  <button
                    key={o}
                    onClick={() => pick(o)}
                    className="text-left rounded-2xl border border-border bg-cream px-5 py-4 hover:border-sage-deep hover:bg-sage/10 transition"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <Eyebrow>Your remedy</Eyebrow>
              <h2 className="mt-3 font-serif text-4xl text-sage-deep">{result.name}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-md mx-auto">{result.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link to="/shop" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 hover:opacity-90 transition">
                  Shop your kit →
                </Link>
                <Link to="/consultation" className="rounded-full border border-sage-deep/30 text-sage-deep px-7 py-3.5 hover:bg-sage/10 transition">
                  Book a 1:1 first
                </Link>
              </div>
              <button onClick={reset} className="mt-6 text-sm text-muted-foreground hover:text-sage-deep underline-offset-4 hover:underline">
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
