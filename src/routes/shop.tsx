import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HealingStandard, HealingReminder } from "@/components/HealingStandard";
import { RemedyFinderCallout } from "@/components/RemedyFinderCallout";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Fertility Kits — GaiaBerry" },
      { name: "description", content: "Shop GaiaBerry's natural fertility, PCOS and hormone wellness kits." },
    ],
  }),
  loader: async (): Promise<{ products: ShopifyProduct[] }> => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50, query: null });
    const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
    return { products };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">We couldn't load the apothecary.</h1>
          <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3"
          >
            Try again
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  },
  component: Shop,
});

function Shop() {
  const { products } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The Apothecary</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">
            Crafted with intention. Delivered with care.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Every formula is plant-based, doctor-reviewed, and made in small batches.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 rounded-3xl bg-card border border-border p-12 text-center">
            <p className="font-serif text-2xl text-ink">No products found</p>
            <p className="mt-3 text-muted-foreground text-sm">
              We're restocking. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((p: ShopifyProduct) => {
              const img = p.node.images.edges[0]?.node;
              const price = p.node.priceRange.minVariantPrice;
              return (
                <article key={p.node.id} className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-blush/30 flex items-center justify-center p-8 aspect-square">
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText || p.node.title}
                        loading="lazy"
                        className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{p.node.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {p.node.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sage-deep font-medium text-lg">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </span>
                    <AddToCartButton product={p} />
                  </div>
                  <HealingReminder className="mt-3" />
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-24">
          <HealingStandard />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
