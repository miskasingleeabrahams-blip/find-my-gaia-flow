import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import kitDeepCleanse from "@/assets/kit-deep-fertility-cleanse.png";
import kitBlockedTubes from "@/assets/kit-blocked-tubes.png";
import kitManOfSteel from "@/assets/kit-man-of-steel.png";
import kitAnaemia from "@/assets/kit-anaemia-fertility.png";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Fertility Kits — GaiaBerry" },
      { name: "description", content: "Shop GaiaBerry's natural fertility, PCOS and hormone wellness kits." },
    ],
  }),
  component: Shop,
});

const products = [
  { img: kitDeepCleanse, name: "Endo Kit — Deep Fertility Cleanse", desc: "Womb cleanse, increased blood flow & immunity. For Endometriosis, Fibroids and blocked tubes.", price: "R620", tag: "Best seller" },
  { img: kitBlockedTubes, name: "Blocked Tubes Kit", desc: "A 3-step protocol to repair scar tissue, ease inflammation and support tubal health.", price: "R920" },
  { img: kitAnaemia, name: "Anaemia & Fertility Kit", desc: "Chaste Berry, IronSea Elixir and Womb Nourishment Tea for recurring loss recovery.", price: "R820", tag: "New" },
  { img: kitManOfSteel, name: "Man of Steel Kit", desc: "Stamina, Sperm and Erectile support — a potent kit for male fertility and vitality.", price: "R1,350" },
  { img: kitDeepCleanse, name: "PCOS Kit", desc: "Crafted for PCOS — to gently restore metabolic and hormonal harmony.", price: "R845" },
  { img: kitAnaemia, name: "Progesterone Kit", desc: "Lifts progesterone gently, eases spotting and lengthens short luteal phases.", price: "R720" },
];

function Shop() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The Apothecary</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">Crafted with intention. Delivered with care.</h1>
          <p className="mt-5 text-muted-foreground">Every formula is plant-based, doctor-reviewed, and made in small batches.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, idx) => (
            <article key={idx} className="group">
              <div className="relative overflow-hidden rounded-3xl bg-blush/30 flex items-center justify-center p-8">
                {p.tag && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider text-sage-deep">
                    {p.tag}
                  </span>
                )}
                <img src={p.img} alt={p.name} loading="lazy" className="aspect-square object-contain w-full group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="mt-5 font-serif text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sage-deep font-medium text-lg">{p.price}</span>
                <button className="rounded-full border border-sage-deep/30 px-5 py-2.5 text-sm text-sage-deep hover:bg-sage/10 transition">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
