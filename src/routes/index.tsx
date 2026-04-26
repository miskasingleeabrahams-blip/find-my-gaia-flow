import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section, Eyebrow } from "@/components/Section";
import { HealingStandard } from "@/components/HealingStandard";
import { RemedyFinderCallout } from "@/components/RemedyFinderCallout";
import heroImg from "@/assets/hero.jpg";
import kit1 from "@/assets/kit-pcos-1.png";
import kit2 from "@/assets/kit-pcos-2.png";
import kit3 from "@/assets/kit-progesterone.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GaiaBerry — Natural Fertility & Hormone Wellness" },
      { name: "description", content: "Find your personalised natural remedy for PCOS, fertility and hormonal balance." },
    ],
  }),
  component: Home,
});

const kits = [
  { img: kit1, name: "PCOS Kit 1", desc: "Chaste Berry, Repro Oxidative Care & Milk Thistle — restores cycles, balances blood sugar and supports the liver.", price: "R845" },
  { img: kit2, name: "PCOS Kit 2", desc: "Chaste Berry, Repro Oxidative Care & Ashwagandha — for PCOS with anxiety, stress and low libido.", price: "R895" },
  { img: kit3, name: "Progesterone Kit", desc: "Lifts progesterone gently, eases spotting and lengthens short luteal phases.", price: "R720" },
];

const testimonials = [
  { quote: "After two years of trying, the Remedy Finder pointed me to a routine that worked. I'm now 16 weeks pregnant.", name: "Amara O.", role: "Conception Companion" },
  { quote: "My cycles regulated within three months. I finally feel held by something that understands PCOS.", name: "Ifeoma A.", role: "PCOS Reset Kit" },
  { quote: "The consultation felt like therapy and herbalism combined. Truly personal.", name: "Lara K.", role: "1:1 Consultation" },
];

function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-8 md:pt-24 pb-12 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Natural fertility, guided</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[1.05] text-balance text-ink">
              A gentler path to <em className="text-sage-deep not-italic italic">your</em> reproductive wellness.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              For women navigating PCOS, infertility and hormonal imbalance — discover plant-based remedies, personalised to your body, your story, your season.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/remedy-finder"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base shadow-[var(--shadow-soft)] hover:opacity-90 transition"
              >
                Find My Remedy
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/consultation"
                className="inline-flex items-center rounded-full border border-sage-deep/30 text-sage-deep px-8 py-4 text-base hover:bg-sage/10 transition"
              >
                Book a Consultation
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Plant-based</span>
              <span className="h-1 w-1 rounded-full bg-sage" />
              <span>Doctor-reviewed</span>
              <span className="h-1 w-1 rounded-full bg-sage" />
              <span>10,000+ women</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-[var(--gradient-blush)] -z-10 blur-2xl opacity-70" />
            <img
              src={heroImg}
              alt="Natural herbs, berries and eucalyptus on cream linen"
              width={1536}
              height={1280}
              className="rounded-[2.5rem] shadow-[var(--shadow-petal)] object-cover w-full aspect-[5/4]"
            />
          </div>
        </div>
      </section>

      {/* CALLOUT — guide to Remedy Finder */}
      <Section className="pt-0 pb-6 md:pb-10">
        <RemedyFinderCallout />
      </Section>

      {/* HEALING STANDARD — directly under hero */}
      <Section className="pt-0 pb-8 md:pb-16">
        <HealingStandard />
      </Section>

      {/* REMEDY FINDER FEATURE */}
      <Section className="py-10 md:py-24">
        <div className="rounded-[2.5rem] bg-[var(--gradient-sage)] text-cream px-8 md:px-16 py-12 md:py-24 text-center relative overflow-hidden">
          <Eyebrow>
            <span className="text-cream/80">The GaiaBerry Method</span>
          </Eyebrow>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-cream max-w-3xl mx-auto text-balance">
            A 2-minute ritual to find the remedy made for you.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-cream/85 leading-relaxed">
            Answer a few thoughtful questions about your cycle, symptoms and goals. We'll match you with a personalised herbal protocol — and the women who've walked your path.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            {[
              { n: "01", t: "Tell us your story", d: "Cycle, symptoms, season of life." },
              { n: "02", t: "We listen", d: "Matched to a tradition-rooted protocol." },
              { n: "03", t: "Begin gently", d: "Daily rituals delivered to your door." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-cream/10 backdrop-blur-sm p-5 border border-cream/15">
                <div className="font-serif text-2xl text-cream/90">{s.n}</div>
                <div className="mt-2 font-medium">{s.t}</div>
                <div className="text-sm text-cream/75 mt-1">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Link
              to="/remedy-finder"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-sage-deep px-8 py-4 hover:bg-blush transition shadow-[var(--shadow-soft)]"
            >
              Begin the Remedy Finder →
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-cream/70">
              Free · 2 minutes · No sign-up
            </p>
            <div className="mt-2 flex items-center gap-3 text-cream/70">
              <span className="h-px w-10 bg-cream/30" />
              <span className="font-serif italic text-sm">held by nature, guided by women</span>
              <span className="h-px w-10 bg-cream/30" />
            </div>
          </div>
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <Eyebrow>Best-selling kits</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Loved by thousands of women.</h2>
          </div>
          <Link to="/shop" className="text-sm text-sage-deep underline-offset-4 hover:underline">Shop all kits →</Link>
        </div>
        <RemedyFinderCallout variant="compact" className="mb-10" />
        <div className="grid md:grid-cols-3 gap-8">
          {kits.map((k) => (
            <article key={k.name} className="group">
              <div className="overflow-hidden rounded-3xl bg-blush/30 flex items-center justify-center p-8">
                <img
                  src={k.img}
                  alt={k.name}
                  loading="lazy"
                  className="aspect-square object-contain w-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl">{k.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{k.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sage-deep font-medium">{k.price}</span>
                <Link to="/shop" className="text-sm text-ink/70 hover:text-sage-deep">View →</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-blush/20 max-w-none rounded-none">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <Eyebrow>Stories of becoming</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Held, heard, transformed.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-cream p-8 shadow-[var(--shadow-soft)]">
                <div className="text-sage-deep font-serif text-4xl leading-none">"</div>
                <blockquote className="mt-2 text-ink/90 leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/testimonials" className="text-sage-deep underline-offset-4 hover:underline">Read more stories →</Link>
          </div>
        </div>
      </Section>

      {/* CONSULTATION + AGENT */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[2rem] bg-cream border border-border p-10 md:p-14">
            <Eyebrow>3-Month Check-In</Eyebrow>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">Book your 3-month check-in.</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A 45-minute private session with one of our qualified GaiaBerry consultants — to review your progress and design your next phase of healing.
            </p>
            <Link to="/consultation" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 hover:opacity-90 transition">
              Book Your 3-Month Check-In →
            </Link>
          </div>
          <div className="rounded-[2rem] bg-[var(--gradient-blush)] p-10 md:p-14">
            <Eyebrow>Become an agent</Eyebrow>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">Carry the GaiaBerry mission.</h3>
            <p className="mt-4 text-ink/80 leading-relaxed">
              Join a community of women bringing natural fertility care to their cities. Earn, educate, and be part of something that heals.
            </p>
            <Link to="/agent" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 hover:opacity-90 transition">
              Apply to be an agent →
            </Link>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
