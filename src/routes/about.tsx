import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section, Eyebrow } from "@/components/Section";
import iaothBadge from "@/assets/iaoth-badge.png";
import magnoliaBranch from "@/assets/magnolia-branch.png";
import lifestyleFlatlay from "@/assets/lifestyle-flatlay-four.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GaiaBerry — Our Story & Founder" },
      {
        name: "description",
        content:
          "Meet the qualified herbalist behind GaiaBerry. Nature-led remedies for fertility, PCOS and hormone balance — created with care, rooted in tradition, guided by science.",
      },
      { property: "og:title", content: "About GaiaBerry — Our Story & Founder" },
      {
        property: "og:description",
        content:
          "A qualified, IAOTH-accredited herbalist creating nature-led fertility and hormone remedies for South African women.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gaiaberry.co.za/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={magnoliaBranch}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-16 w-[220px] md:w-[420px] opacity-60 -rotate-12 select-none z-0"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10 pt-16 md:pt-28 pb-12 md:pb-20 text-center">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.1] text-balance text-ink">
            Held by nature, <em className="text-plum-deep not-italic italic">guided by women</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            GaiaBerry was born from a simple belief: that women deserve gentle,
            intelligent support for their bodies — rooted in plants, guided by
            tradition, and held to a standard of real care.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <Section className="bg-gradient-to-b from-transparent to-cream">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Eyebrow>Meet the founder</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-ink">
              Miska — qualified herbalist & women's wellness guide
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                After years of watching women in her own circle quietly struggle
                with PCOS, irregular cycles and unexplained fertility
                challenges, Miska set out to build the kind of support she
                wished they'd had — calm, personal, plant-led, and grounded in
                proper training.
              </p>
              <p>
                Every GaiaBerry remedy is formulated by hand, in small batches,
                using herbs chosen for the women who'll receive them. There are
                no quick-fix promises here — just the slow, honest work of
                helping a body come back into balance.
              </p>
              <p>
                Miska is an accredited member of the{" "}
                <a
                  href="https://www.iaoth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-deep underline underline-offset-2"
                >
                  International Association of Therapists (IAOTH)
                </a>
                , and every product is made to SANHA halaal standards.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]">
              <img
                src={lifestyleFlatlay}
                alt="GaiaBerry herbal remedies arranged with botanicals"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>What we stand for</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-ink">
            Care that earns your trust
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Qualified & accredited",
              body: "IAOTH-recognised herbalist. Real training, real responsibility.",
            },
            {
              title: "Made by hand, in small batches",
              body: "No mass production. Each kit is prepared with intention for the woman it's going to.",
            },
            {
              title: "Halaal & ethically sourced",
              body: "Manufactured to SANHA halaal standards. Plant-led, with respect for the source.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border/60 bg-cream p-6 shadow-[var(--shadow-soft)]"
            >
              <h3 className="font-serif text-xl text-ink">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <img
            src={iaothBadge}
            alt="International Association of Therapists — IAOTH member"
            loading="lazy"
            className="h-16 w-auto object-contain"
          />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl bg-[var(--gradient-plum)] text-cream px-8 py-12 md:px-14 md:py-16 text-center shadow-[var(--shadow-plum)]">
          <h2 className="font-serif text-3xl md:text-4xl">Ready to begin your journey?</h2>
          <p className="mt-4 max-w-xl mx-auto opacity-90">
            Take our short Remedy Finder and we'll guide you to the kit that
            best fits where your body is right now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/remedy-finder"
              className="inline-flex items-center justify-center rounded-full bg-cream text-plum-deep px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start My Journey
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-cream/60 text-cream px-6 py-3 text-sm hover:bg-cream/10 transition"
            >
              Browse Kits
            </Link>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
