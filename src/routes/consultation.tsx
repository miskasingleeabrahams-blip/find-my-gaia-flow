import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { useState } from "react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book Your 3-Month Check-In — GaiaBerry" },
      { name: "description", content: "Book your 3-month check-in with one of our qualified GaiaBerry consultants." },
    ],
  }),
  component: Consultation,
});

function Consultation() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <Eyebrow>3-Month Check-In</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">Book Your 3-Month Check-In.</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A 45-minute private session with one of our qualified GaiaBerry consultants. We'll review your progress, decode your symptoms, and guide your next phase of healing.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { t: "45-minute private session", d: "On video, in your own quiet space." },
              { t: "Personal protocol", d: "A written plan with rituals, remedies and lifestyle guidance." },
              { t: "Two follow-up notes", d: "Check-ins over the following weeks as you settle in." },
            ].map((b) => (
              <div key={b.t} className="flex gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-sage/30 grid place-items-center text-sage-deep">✓</div>
                <div>
                  <div className="font-medium text-ink">{b.t}</div>
                  <div className="text-sm text-muted-foreground">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 inline-flex items-baseline gap-2">
            <span className="font-serif text-4xl text-sage-deep">$120</span>
            <span className="text-sm text-muted-foreground">per session</span>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-[2rem] bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-soft)]"
        >
          {!sent ? (
            <>
              <h2 className="font-serif text-2xl">Book your 3-month check-in</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll reach out within 24 hours to confirm.</p>
              <div className="mt-6 grid gap-4">
                <Field label="Your name" type="text" />
                <Field label="Email" type="email" />
                <Field label="Preferred date" type="date" />
                <div>
                  <label className="text-sm text-ink">What's on your heart?</label>
                  <textarea rows={4} className="mt-1.5 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-sage-deep transition" />
                </div>
                <button type="submit" className="mt-2 rounded-full bg-primary text-primary-foreground py-4 hover:opacity-90 transition">
                  Request session
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-14 w-14 rounded-full bg-sage/20 grid place-items-center text-sage-deep text-xl">✓</div>
              <h2 className="mt-4 font-serif text-3xl">Thank you.</h2>
              <p className="mt-2 text-muted-foreground">Your request is received. One of our qualified consultants will write to you soon.</p>
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
