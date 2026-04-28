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
import magnoliaBranch from "@/assets/magnolia-branch.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GaiaBerry — Natural Fertility & Hormone Wellness" },
      { name: "description", content: "Find your personalised natural remedy for PCOS, fertility and hormonal balance." },
      { property: "og:title", content: "GaiaBerry — Natural Fertility & Hormone Wellness" },
      { property: "og:description", content: "Find your personalised natural remedy for PCOS, fertility and hormonal balance." },
      { property: "og:image", content: "https://gaiaberry.co.za/og-default.jpg" },
      { property: "og:url", content: "https://gaiaberry.co.za/" },
      { name: "twitter:image", content: "https://gaiaberry.co.za/og-default.jpg" },
    ],
  }),
  component: Home,
});

const kits = [
  { img: kit1, name: "PCOS Kit 1", desc: "Restore regular cycles, balance blood sugar and support liver detox — for women navigating PCOS naturally.", price: "R845" },
  { img: kit2, name: "PCOS Kit 2", desc: "Balance hormones while easing anxiety, stress and low libido — PCOS support with a calming edge.", price: "R895" },
  { img: kit3, name: "Progesterone Kit", desc: "Lift low progesterone gently, ease spotting and lengthen short luteal phases for fertility readiness.", price: "R720" },
];

const testimonials = [
  {
    quote:
      "I highly recommend this product — it's by far the best I've used since being diagnosed with PCOS, thyroid issues, endometriosis and low iron levels. Their products work!",
    name: "Nikita Jansen van Niewenhuizen",
    role: "Verified Google review · ★★★★★",
  },
  {
    quote:
      "I've had irregular periods for 17 years and I finally decided to try Gaia Berry. The products have helped me so much — I only wish I had found them sooner.",
    name: "Aziza Alibedi",
    role: "Verified Google review · ★★★★★",
  },
  {
    quote:
      "Not only are their products good and so helpful, but Miska is so supportive and willing to give advice and offer guidance where she can. I've been using GaiaBerry since March and I'm so happy 😊",
    name: "Letascha-Lee Dreyden",
    role: "Verified Google review · ★★★★★",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Decorative magnolia branch — top-right flourish (mirrored) */}
        <img
          src={magnoliaBranch}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-16 w-[220px] md:w-[420px] opacity-70 rotate-12 scale-x-[-1] select-none z-0"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-8 md:pt-24 pb-12 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
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
                Start My Journey
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full border border-sage-deep/30 text-sage-deep px-8 py-4 text-base hover:bg-sage/10 transition"
              >
                Shop Kits
              </Link>
            </div>
            <p className="mt-4 max-w-lg text-sm text-ink/70 leading-relaxed">
              Choose the right fertility support and start your healing journey today.
            </p>
            <p className="mt-3 max-w-lg text-xs text-muted-foreground">
              Already 3 months in?{" "}
              <Link to="/consultation" className="text-sage-deep underline-offset-4 hover:underline">
                Reassess my journey →
              </Link>
            </p>
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

      {/* OUR STORY — first GaiaBerry baby */}
      <Section className="pt-10 md:pt-24 pb-6 md:pb-10">
        <div className="rounded-[2.5rem] bg-[var(--gradient-sage)] text-cream px-6 md:px-16 py-12 md:py-20 relative overflow-hidden">
          <img
            src={lifestyleFlatlay}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-soft-light pointer-events-none"
          />
          <div className="absolute inset-0 bg-[var(--gradient-sage)] opacity-70 pointer-events-none" />
          {/* Magnolia accent — bottom-left, soft */}
          <img
            src={magnoliaBranch}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 w-[220px] md:w-[360px] opacity-40 mix-blend-screen rotate-[200deg] select-none"
          />
          <div className="relative mx-auto max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              {/* Magnolia branch tucked behind the polaroid */}
              <img
                src={magnoliaBranch}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-6 md:-top-14 md:-right-12 w-[170px] md:w-[240px] opacity-80 -rotate-[18deg] select-none drop-shadow-[0_8px_18px_oklch(0_0_0/0.18)]"
              />
              <div className="rotate-[-3deg] hover:rotate-0 transition-transform duration-700 max-w-[420px] sm:max-w-[480px] md:max-w-none mx-auto">
                <div className="relative bg-cream p-5 md:p-6 pb-14 md:pb-16 shadow-[var(--shadow-petal)] rounded-sm">
                  <img
                    src={firstBaby}
                    alt="Ultrasound of the first GaiaBerry baby — a gift after years of trying"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <p className="mt-5 text-center font-serif italic text-ink/70 text-base md:text-lg">
                    Our very first GaiaBerry baby 🌿
                  </p>
                  {/* Small magnolia bloom resting on the polaroid corner */}
                  <img
                    src={magnoliaBranch}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute -bottom-8 -left-8 md:-bottom-10 md:-left-12 w-[120px] md:w-[170px] rotate-[160deg] opacity-90 select-none drop-shadow-[0_6px_14px_oklch(0_0_0/0.2)]"
                  />
                </div>
              </div>
            </div>
            <div>
              <Eyebrow>
                <span className="text-cream/80">Our Story</span>
              </Eyebrow>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl text-cream leading-tight text-balance">
                The little heartbeat that started it all.
              </h2>
              <p className="mt-6 text-cream/85 leading-relaxed">
                GaiaBerry was founded in 2020 by a woman with PCOS who knew the heartbreak of infertility.
                After years of unsuccessful treatments and months of patient research, she found her way
                back to the plants — and to a positive test of her own.
              </p>
              <p className="mt-4 text-cream/85 leading-relaxed">
                This ultrasound is the very first GaiaBerry baby. Since then, thousands of women across
                South Africa have walked the same gentle path home to their bodies.
              </p>
              <div className="mt-8 flex items-center gap-3 text-cream/70">
                <span className="h-px w-10 bg-cream/30" />
                <span className="font-serif italic text-sm">held by nature, guided by women</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MILESTONES — poetic line after Our Story */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-2 md:mt-4">
        <div className="relative rounded-[2rem] overflow-hidden">
          <img
            src={lifestyleTrioFront}
            alt="GaiaBerry trio of natural remedies"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.35_0.04_150/0.55)_0%,oklch(0.35_0.04_150/0.75)_100%)]" />
          <div className="relative px-6 md:px-12 py-10 md:py-14 text-center text-cream">
            <p className="font-serif italic text-xl md:text-3xl text-cream max-w-2xl mx-auto leading-snug">
              "Too many heartbeats to count, and counting still."
            </p>
            <div className="mt-4 text-xs md:text-sm uppercase tracking-[0.25em] text-cream/80">
              Babies conceived · Cycles restored · Women held
            </div>
          </div>
        </div>
      </div>

      {/* BEST SELLERS */}
      <Section>
        {/* Reviews trust strip — placed right before the buying decision */}
        <div className="mb-8 md:mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-2xl border border-sage/25 bg-sage/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl text-sage-deep leading-none">4.9</span>
            <div className="flex flex-col items-start">
              <span className="text-base tracking-widest text-[#f59e0b] leading-none">★★★★★</span>
              <span className="text-xs text-muted-foreground mt-1">Based on 34 verified Google reviews</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://maps.app.goo.gl/HcqhpkhN8unXM7Gx8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sage-deep/30 text-sage-deep px-5 py-2 text-sm hover:bg-sage/10 transition"
            >
              Read reviews
            </a>
            <a
              href="https://maps.app.goo.gl/HcqhpkhN8unXM7Gx8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition shadow-[var(--shadow-soft)]"
            >
              Leave a review →
            </a>
          </div>
        </div>

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
        {/* Magnolia accent — mirrored, top-right */}
        <img
          src={magnoliaBranch}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-16 w-[260px] md:w-[380px] opacity-70 rotate-[160deg] scale-x-[-1] select-none"
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

      {/* START HERE — 3 clear pathways for new customers */}
      <Section className="pt-0 pb-8 md:pb-14">
        <div className="text-center mb-8 md:mb-10">
          <Eyebrow>New here? Start your journey</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-ink">Choose the path that sounds like you.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Three simple starting points — pick the one closest to your story and we'll guide you from there.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tag: "PCOS / Irregular periods",
              title: "Fertility Cleansing Kit",
              desc: "Reset your cycle, clear stagnation and prepare your body for balanced, regular periods.",
            },
            {
              tag: "Trying to conceive / Blocked tubes",
              title: "Blocked Tubes Kit",
              desc: "Open the way naturally — support tubal health and improve your chances of conceiving.",
            },
            {
              tag: "Hormonal balance",
              title: "Womb Support",
              desc: "Nourish your womb, balance hormones and feel like yourself again — gently and naturally.",
            },
          ].map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-sage/25 bg-cream p-7 md:p-8 flex flex-col shadow-[var(--shadow-soft)]"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-sage-deep">{p.tag}</span>
              <h3 className="mt-3 font-serif text-2xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
              <Link
                to="/remedy-finder"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm hover:opacity-90 transition shadow-[var(--shadow-soft)]"
              >
                Start My Journey →
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* RETURNING CUSTOMERS — secondary, de-emphasized */}
      <Section className="py-10 md:py-14">
        <div className="rounded-3xl border border-sage/25 bg-sage/5 px-6 md:px-10 py-7 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.18em] text-sage-deep">Already started?</span>
            <h3 className="mt-2 font-serif text-xl md:text-2xl text-ink">Reassess My Journey</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              For existing customers after 3 months — a private WhatsApp session (15 min R100 / 30 min R200) to review your progress and plan your next phase.
            </p>
          </div>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-sage-deep/40 bg-cream/70 text-sage-deep px-6 py-2.5 text-sm hover:bg-sage/10 transition shrink-0"
          >
            Reassess My Journey →
          </Link>
        </div>
      </Section>

      {/* AGENT */}
      <Section className="pt-0">
        <div className="rounded-[2rem] bg-[var(--gradient-blush)] p-10 md:p-14">
          <Eyebrow>Become an agent</Eyebrow>
          <h3 className="mt-3 font-serif text-3xl md:text-4xl">Carry the GaiaBerry mission.</h3>
          <p className="mt-4 text-ink/80 leading-relaxed max-w-2xl">
            Join a community of women bringing natural fertility care to their cities. Earn, educate, and be part of something that heals.
          </p>
          <Link to="/agent" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 hover:opacity-90 transition">
            Apply to be an agent →
          </Link>
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
