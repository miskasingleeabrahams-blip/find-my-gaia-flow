import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import kit1 from "@/assets/kit-1.jpg";
import kit2 from "@/assets/kit-2.jpg";
import kit3 from "@/assets/kit-3.jpg";

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
  { img: kit1, name: "Conception Companion", desc: "A 90-day herbal ritual for egg quality, lining health and cycle regularity.", price: "$148", tag: "Best seller" },
  { img: kit2, name: "PCOS Reset Kit", desc: "Adaptogens & seed-cycling to gently restore hormonal harmony.", price: "$132", tag: "New" },
  { img: kit3, name: "Cycle Soothe Tea", desc: "Daily blend of red raspberry, chamomile and rose petals.", price: "$48" },
  { img: kit1, name: "Lining Love Tincture", desc: "A nourishing uterine lining tonic for the trying-to-conceive season.", price: "$72" },
  { img: kit2, name: "Hormone Harmony Powder", desc: "Maca, ashwagandha & shatavari blend for daily balance.", price: "$58" },
  { img: kit3, name: "Postpartum Restore", desc: "Replenishing herbs for the fourth trimester and beyond.", price: "$96" },
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
              <div className="relative overflow-hidden rounded-3xl bg-blush/30">
                {p.tag && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider text-sage-deep">
                    {p.tag}
                  </span>
                )}
                <img src={p.img} alt={p.name} width={896} height={896} loading="lazy" className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-700" />
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
