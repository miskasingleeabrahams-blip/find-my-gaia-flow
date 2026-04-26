import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section, Eyebrow } from "@/components/Section";
import { HealingStandard } from "@/components/HealingStandard";
import { RemedyFinderCallout } from "@/components/RemedyFinderCallout";
import heroImg from "@/assets/lifestyle-trio-berries.jpg";
import lifestyleFlatlay from "@/assets/lifestyle-flatlay-four.jpg";
import lifestyleTea from "@/assets/lifestyle-tea-pouch.jpg";
import lifestyleTrioFront from "@/assets/lifestyle-trio-front.jpg";
import lifestyleFullRange from "@/assets/lifestyle-full-range.jpg";
import lifestyleTinctures from "@/assets/lifestyle-tinctures.jpg";
import kit1 from "@/assets/kit-pcos-1.png";
import kit2 from "@/assets/kit-pcos-2.png";
import kit3 from "@/assets/kit-progesterone.png";
import firstBaby from "@/assets/first-gaiaberry-baby.jpg";

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
  { img: kit1, name: "PCOS Kit 1", desc: "Chaste Berry, Repro Oxidative Care & Milk Thistle. Restores cycles, balances blood sugar and supports the liver.", price: "R845" },
  { img: kit2, name: "PCOS Kit 2", desc: "Chaste Berry, Repro Oxidative Care & Ashwagandha. For PCOS with anxiety, stress and low libido.", price: "R895" },
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
              For women navigating PCOS, infertility and hormonal imbalance. Discover plant-based remedies, personalised to your body, your story, your season.
            </p>
            <p className="mt-4 max-w-lg text-base text-sage-deep font-medium">
              Trusted by thousands of women across South Africa to conceive naturally. 🌿
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
                Book Your 3-Month Follow-Up
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Natural herbs</span>
              <span className="h-1 w-1 rounded-full bg-sage" />
              <span>High quality</span>
              <span className="h-1 w-1 rounded-full bg-sage" />
              <span>SA & abroad</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-[var(--gradient-blush)] -z-10 blur-2xl opacity-70" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-petal)]">
              <img
                src={heroImg}
                alt="GaiaBerry natural fertility products with fresh berries on a cream surface"
                width={1536}
                height={1280}
                className="object-cover w-full aspect-[5/4]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.97_0.018_25/0.35)_100%)] pointer-events-none" />
            </div>
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
          {/* subtle lifestyle backdrop */}
          <img
            src={lifestyleFlatlay}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-soft-light pointer-events-none"
          />
          <div className="absolute inset-0 bg-[var(--gradient-sage)] opacity-70 pointer-events-none" />
          <div className="relative">
            <Eyebrow>
              <span className="text-cream/80">The GaiaBerry Method</span>
            </Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-cream max-w-3xl mx-auto text-balance">
              A 2-minute ritual to find the remedy made for you.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-cream/85 leading-relaxed">
              Answer a few thoughtful questions about your cycle, symptoms and goals. We'll match you with a personalised herbal protocol, and the women who've walked your path.
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
        </div>
      </Section>

      {/* DIVIDER — soft lifestyle flatlay */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative rounded-[2rem] overflow-hidden h-32 md:h-48">
          <img
            src={lifestyleTrioFront}
            alt="GaiaBerry trio of natural remedies"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0.018_25/0.25)_0%,oklch(0.97_0.018_25/0.55)_100%)]" />
        </div>
      </div>

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
      <Section className="bg-blush/20 max-w-none rounded-none relative overflow-hidden">
        {/* subtle background lifestyle texture */}
        <img
          src={lifestyleTea}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-14 items-start">
            {/* side visual */}
            <div className="hidden lg:block">
              <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] aspect-[4/5]">
                <img
                  src={lifestyleTinctures}
                  alt="GaiaBerry herbal tinctures in soft natural light"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="text-center lg:text-left mb-10">
                <Eyebrow>Stories of becoming</Eyebrow>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">Held, heard, transformed.</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <figure key={t.name} className="rounded-3xl bg-cream/95 backdrop-blur-sm p-8 shadow-[var(--shadow-soft)]">
                    <div className="text-sage-deep font-serif text-4xl leading-none">"</div>
                    <blockquote className="mt-2 text-ink/90 leading-relaxed">{t.quote}</blockquote>
                    <figcaption className="mt-6 text-sm">
                      <div className="font-medium text-ink">{t.name}</div>
                      <div className="text-muted-foreground">{t.role}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="text-center lg:text-left mt-10">
                <Link to="/testimonials" className="text-sage-deep underline-offset-4 hover:underline">Read more stories →</Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* OUR STORY — first GaiaBerry baby */}
      <Section className="bg-blush/30 max-w-none rounded-none">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[var(--gradient-blush)] -z-10 blur-2xl opacity-60" />
            <div className="relative rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
              <div className="bg-cream p-3 pb-12 shadow-[var(--shadow-petal)] rounded-sm">
                <img
                  src={firstBaby}
                  alt="Ultrasound of the first GaiaBerry baby — a gift after years of trying"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <p className="mt-3 text-center font-serif italic text-ink/70 text-sm">
                  Our very first GaiaBerry baby 🌿
                </p>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-ink leading-tight">
              The little heartbeat that started it all.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              GaiaBerry was founded in 2020 by a woman with PCOS who knew the heartbreak of infertility.
              After years of unsuccessful treatments and months of patient research, she found her way
              back to the plants — and to a positive test of her own.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This ultrasound is the very first GaiaBerry baby. Since then, thousands of women across
              South Africa have walked the same gentle path home to their bodies.
            </p>
          </div>
        </div>
      </Section>

      {/* CONSULTATION + AGENT */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[2rem] bg-cream border border-border overflow-hidden flex flex-col">
            <div className="relative h-48 md:h-56 overflow-hidden">
              <img
                src={lifestyleFullRange}
                alt="The GaiaBerry range of natural fertility remedies"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,oklch(0.97_0.018_25/0.55)_100%)]" />
            </div>
            <div className="p-10 md:p-14">
              <Eyebrow>3-Month Follow-Up</Eyebrow>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">Book your 3-month follow-up.</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A private WhatsApp session with one of our qualified GaiaBerry consultants — choose 15 minutes (R100) or 30 minutes (R200) to review your progress and design your next phase of healing.
              </p>
              <Link to="/consultation" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 hover:opacity-90 transition">
                Book Your 3-Month Follow-Up →
              </Link>
            </div>
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

      {/* MEDICAL DISCLAIMER */}
      <div className="mx-auto max-w-4xl px-6 md:px-10 pb-16">
        <div className="rounded-2xl border border-sage/30 bg-sage/5 p-6 md:p-8 text-sm text-muted-foreground leading-relaxed">
          <p className="font-medium text-sage-deep mb-2">A gentle note 🌿</p>
          <p>
            GaiaBerry products and consultations are offered for educational and wellness purposes only.
            They are not intended to diagnose, treat, cure or prevent any medical condition. Always speak
            to a qualified healthcare practitioner before starting a new herbal regimen — especially if
            you are pregnant, breastfeeding or taking medication.{" "}
            <Link to="/legal/disclaimer" className="text-sage-deep underline-offset-4 hover:underline">
              Read the full medical disclaimer →
            </Link>
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
