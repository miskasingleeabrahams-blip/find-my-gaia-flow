import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { useState } from "react";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "Become a GaiaBerry Agent" },
      { name: "description", content: "Join a community of women bringing natural fertility care to their cities. Apply to become a GaiaBerry agent." },
    ],
  }),
  component: Agent,
});

const benefits = [
  { t: "Earn meaningfully", d: "Generous commissions on every kit and consultation you refer." },
  { t: "Be educated", d: "Quarterly herbalism & women's health trainings, included." },
  { t: "Carry a mission", d: "Bring natural fertility care to women in your community." },
  { t: "Belong", d: "Join a private circle of agents across 12 countries." },
];

function Agent() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      <section className="bg-[var(--gradient-blush)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 text-center">
          <Eyebrow>Become an Agent</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-7xl text-balance max-w-3xl mx-auto">
            Carry the medicine. Hold the women.
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-ink/80 leading-relaxed">
            GaiaBerry agents are educators, healers and community-builders. If you've felt called to walk alongside women on their fertility journey, this is for you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 grid lg:grid-cols-2 gap-14">
        <div>
          <h2 className="font-serif text-4xl">Why our agents stay.</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.t} className="rounded-2xl bg-cream border border-border p-6">
                <div className="font-serif text-xl text-sage-deep">{b.t}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-sage/15 p-8">
            <div className="font-serif text-2xl">"It feels like being a quiet light for the women in my city."</div>
            <div className="mt-4 text-sm text-muted-foreground">Tomi, GaiaBerry agent · Ibadan</div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const fullName = String(fd.get("fullName") || "");
            const email = String(fd.get("email") || "");
            const location = String(fd.get("location") || "");
            const credit = String(fd.get("credit") || "");
            const why = String(fd.get("why") || "");
            const subject = `GaiaBerry Agent Application – ${fullName}`;
            const body =
              `Full name: ${fullName}\n` +
              `Email: ${email}\n` +
              `City & country: ${location}\n` +
              `Clear credit score: ${credit}\n\n` +
              `Why GaiaBerry?\n${why}\n`;
            window.location.href = `mailto:info@gaiaberry.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
          className="rounded-[2rem] bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-soft)] h-fit"
        >
          {!sent ? (
            <>
              <h3 className="font-serif text-2xl">Apply to join</h3>
              <p className="text-sm text-muted-foreground mt-1">We accept new agents in small, considered cohorts.</p>
              <div className="mt-6 grid gap-4">
                <Field label="Full name" type="text" name="fullName" />
                <Field label="Email" type="email" name="email" />
                <Field label="City & country" type="text" name="location" />
                <div>
                  <label className="text-sm text-ink">Do you have a clear credit score?</label>
                  <div className="mt-1.5 flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-ink">
                      <input type="radio" name="credit" value="Yes" required className="accent-sage-deep" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-ink">
                      <input type="radio" name="credit" value="No" className="accent-sage-deep" />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-ink">Why GaiaBerry?</label>
                  <textarea name="why" rows={4} className="mt-1.5 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-sage-deep transition" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Agents must be able to purchase a starter kit and maintain monthly purchases to the value of R1500.
                </p>
                <button type="submit" className="mt-2 rounded-full bg-primary text-primary-foreground py-4 hover:opacity-90 transition">
                  Submit application
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-14 w-14 rounded-full bg-sage/20 grid place-items-center text-sage-deep text-xl">✓</div>
              <h3 className="mt-4 font-serif text-3xl">Thank you for raising your hand.</h3>
              <p className="mt-2 text-muted-foreground">We review every application personally. Look out for our note.</p>
            </div>
          )}
        </form>
      </div>

      <SiteFooter />
    </div>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-sm text-ink">{label}</label>
      <input type={type} required className="mt-1.5 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-sage-deep transition" />
    </div>
  );
}
