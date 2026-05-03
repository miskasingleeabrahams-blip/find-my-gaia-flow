import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { AlertTriangle, Clock, MessageCircle, CheckCircle2, XCircle, CalendarClock, Leaf, CreditCard, FileText, Sparkles } from "lucide-react";
import samiyaPhoto from "@/assets/consultants/samiya.jpg";
import nafeesahPhoto from "@/assets/consultants/nafeesah.jpg";
import ronellePhoto from "@/assets/consultants/ronelle.jpg";
import rhodanthePhoto from "@/assets/consultants/rhodanthe.jpg";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book Your 3-Month Follow-Up Consultation — GaiaBerry" },
      { name: "description", content: "Paid 3-month follow-up consultations for existing GaiaBerry customers. Book, pay, and connect with your consultant via WhatsApp." },
      { property: "og:title", content: "Book Your 3-Month Follow-Up Consultation — GaiaBerry" },
      { property: "og:description", content: "For GaiaBerry customers who have completed at least 3 months of product use." },
      { property: "og:image", content: "https://gaiaberry.co.za/og-consultation.jpg" },
      { property: "og:url", content: "https://gaiaberry.co.za/consultation" },
      { name: "twitter:image", content: "https://gaiaberry.co.za/og-consultation.jpg" },
    ],
  }),
  component: Consultation,
});

const consultants = [
  { name: "Ronelle", role: "GaiaBerry Fertility Consultant", photo: ronellePhoto },
  { name: "Samiya", role: "GaiaBerry Fertility Consultant", photo: samiyaPhoto },
  { name: "Nafeesah", role: "GaiaBerry Fertility Consultant", photo: nafeesahPhoto },
  { name: "Rhodanthe", role: "GaiaBerry Fertility Consultant", photo: rhodanthePhoto },
];

const sessions = [
  {
    duration: "15-Minute",
    title: "15-Minute Follow-Up Consultation",
    blurb: "Quick reassessment",
    description: "Ideal for progress check-ins.",
    price: "R100",
  },
  {
    duration: "30-Minute",
    title: "30-Minute Follow-Up Consultation",
    blurb: "In-depth support",
    description: "Ideal for complex cases.",
    price: "R200",
  },
];


function Consultation() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 pt-16 md:pt-24 pb-10 text-center">
        <Eyebrow>Existing Customers Only</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl text-balance leading-tight">
          Book Your 3-Month Follow-Up Consultation
        </h1>
        <p className="mt-6 text-lg text-body leading-relaxed max-w-2xl mx-auto">
          For GaiaBerry customers who have completed at least <span className="text-highlight">3 months</span> of product use and are ready to reassess their progress.
        </p>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="rounded-3xl border border-blush-deep/30 bg-blush/30 p-7 md:p-9 shadow-[var(--shadow-soft)]">
          <div className="flex gap-4">
            <div className="shrink-0 h-11 w-11 rounded-full bg-cream grid place-items-center text-blush-deep">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-xl md:text-2xl text-ink leading-snug">
                This consultation is <span className="text-highlight">only</span> for customers who have used GaiaBerry products for a minimum of 3 months.
              </p>
              <p className="mt-3 text-body">
                If you are new, please start with our Remedy Finder.
              </p>
              <Link
                to="/remedy-finder"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm hover:opacity-90 transition shadow-[var(--shadow-soft)]"
              >
                <Leaf className="h-4 w-4" />
                Start My Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-5xl px-6 md:px-10 py-20 md:py-28">
        <div className="text-center">
          <Eyebrow>The Process</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">How It Works</h2>
        </div>
        <ol className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            { icon: CalendarClock, t: "Choose your session", d: "Select the consultation length that fits your needs below." },
            { icon: CreditCard, t: "Complete your payment", d: "Securely pay for your booking on the website." },
            { icon: MessageCircle, t: "Consultant contacts you", d: "Once confirmed, your selected consultant will reach out via WhatsApp." },
            { icon: FileText, t: "Pre-consultation questions", d: "You'll receive a few questions to personalise your session." },
            { icon: Sparkles, t: "Your consultation", d: "Takes place via WhatsApp at your scheduled time." },
          ].map((s, i) => (
            <li key={s.t} className="rounded-3xl bg-card border border-border p-6 md:p-7 flex gap-4 shadow-[var(--shadow-soft)]">
              <div className="shrink-0 h-11 w-11 rounded-full bg-sage/20 text-sage-deep grid place-items-center">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-sage-deep">Step {i + 1}</div>
                <div className="mt-1 font-serif text-xl text-ink">{s.t}</div>
                <p className="mt-1.5 text-body text-sm leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* MEET YOUR CONSULTANTS */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-20 md:pb-28">
        <div className="text-center">
          <Eyebrow>Your Care Team</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Meet Your Consultants</h2>
          <p className="mt-4 text-body max-w-xl mx-auto">
            Qualified GaiaBerry fertility consultants, here to guide your next chapter.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {consultants.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl bg-card border border-border p-5 md:p-7 text-center shadow-[var(--shadow-soft)]"
            >
              <div className="mx-auto h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-2 ring-blush-deep/20 shadow-[var(--shadow-soft)]">
                <img
                  src={c.photo}
                  alt={`${c.name}, ${c.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 font-serif text-xl text-ink">{c.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-sage-deep">{c.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AFTER YOU BOOK */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 pb-20 md:pb-28">
        <div className="rounded-[2.5rem] bg-[var(--gradient-warm)] border border-border p-8 md:p-12 shadow-[var(--shadow-soft)]">
          <div className="text-center">
            <Eyebrow>What's Next</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">After You Book</h2>
          </div>
          <ul className="mt-10 space-y-5">
            {[
              "Once your consultation is paid and confirmed, your selected consultant will contact you directly via WhatsApp.",
              "You will be sent a few pre-consultation questions.",
              "This ensures your session is personalised and effective.",
              "Your consultation will take place via WhatsApp at your scheduled time.",
            ].map((t) => (
              <li key={t} className="flex gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-sage/30 grid place-items-center text-sage-deep shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <p className="text-body leading-relaxed">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONSULTATION POLICY */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 pb-20 md:pb-28">
        <div className="text-center">
          <Eyebrow>Please Read</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">GaiaBerry Consultation Policy</h2>
        </div>

        {/* Booking notice highlight */}
        <div className="mt-10 rounded-3xl border border-sage-deep/25 bg-sage/15 p-6 md:p-8 flex gap-4 items-start">
          <div className="shrink-0 h-11 w-11 rounded-full bg-cream grid place-items-center text-sage-deep">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-sage-deep">Booking Notice</div>
            <p className="mt-1 font-serif text-xl md:text-2xl text-ink leading-snug">
              Consultations must be booked at least <span className="text-highlight">24 hours</span> in advance.
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <PolicyCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="sage"
            title="Rescheduling"
            points={[
              "Reschedule up to 2 hours before your scheduled time at no additional cost.",
              "To reschedule, contact us via WhatsApp or email.",
            ]}
          />
          <PolicyCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="sage"
            title="Cancellations"
            points={[
              "Cancellations made at least 2 hours before your session receive a credit to rebook.",
              "Cancellations less than 2 hours before are considered a missed appointment.",
            ]}
          />
          <PolicyCard
            icon={<XCircle className="h-5 w-5" />}
            tone="blush"
            title="Missed Appointments"
            points={[
              "If you do not attend, or request to reschedule after the session time, your booking is considered used.",
              "A new booking and payment will be required to schedule another session.",
            ]}
          />
          <PolicyCard
            icon={<AlertTriangle className="h-5 w-5" />}
            tone="blush"
            title="Important Note"
            points={[
              "Our consultations are prepared in advance.",
              "To respect both your time and ours, please honour your scheduled booking.",
            ]}
          />
        </div>
      </section>

      {/* FILTER / REMEDY FINDER */}
      <section className="mx-auto max-w-3xl px-6 md:px-10 pb-24 md:pb-32">
        <div className="rounded-[2.5rem] border border-blush-deep/20 bg-[linear-gradient(135deg,oklch(0.97_0.018_25)_0%,oklch(0.96_0.025_45)_100%)] p-8 md:p-12 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto h-12 w-12 rounded-full bg-cream/80 border border-blush-deep/20 grid place-items-center text-sage-deep">
            <Leaf className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-serif text-3xl md:text-4xl">Not sure where to start?</h2>
          <p className="mt-4 text-body max-w-xl mx-auto">
            If you are new to GaiaBerry, please use our Remedy Finder first to get your personalised recommendation.
          </p>
          <Link
            to="/remedy-finder"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm hover:opacity-90 transition shadow-[var(--shadow-soft)]"
          >
            Start My Journey →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PolicyCard({
  icon,
  title,
  points,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  points: string[];
  tone: "sage" | "blush";
}) {
  const toneClass =
    tone === "sage"
      ? "bg-sage/20 text-sage-deep"
      : "bg-blush/40 text-blush-deep";
  return (
    <div className="rounded-3xl bg-card border border-border p-6 md:p-7 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full grid place-items-center ${toneClass}`}>{icon}</div>
        <h3 className="font-serif text-xl text-ink">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5 text-body text-sm leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage-deep shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
