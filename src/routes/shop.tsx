import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HalaalBadge } from "@/components/HalaalBadge";
import { HealingStandard, HealingReminder } from "@/components/HealingStandard";
import { RemedyFinderCallout } from "@/components/RemedyFinderCallout";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import shopBanner from "@/assets/lifestyle-three-jars.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Fertility Kits — GaiaBerry" },
      { name: "description", content: "Shop GaiaBerry's natural fertility, PCOS and hormone wellness kits." },
      { property: "og:title", content: "Shop Fertility Kits — GaiaBerry" },
      { property: "og:description", content: "Shop GaiaBerry's natural fertility, PCOS and hormone wellness kits." },
      { property: "og:image", content: "https://gaiaberry.co.za/og-shop.jpg" },
      { property: "og:url", content: "https://gaiaberry.co.za/shop" },
      { name: "twitter:image", content: "https://gaiaberry.co.za/og-shop.jpg" },
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
        {/* soft lifestyle banner */}
        <div className="relative rounded-[2rem] overflow-hidden mb-14">
          <img
            src={shopBanner}
            alt="GaiaBerry remedies arranged with fresh berries"
            className="w-full h-auto block"
          />
        </div>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The Apothecary</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">
            Crafted with intention. Delivered with care.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Every formula is plant-based, made from natural herbs, and crafted in small batches to the highest quality standard.
          </p>
        </div>

        <div className="mt-12">
          <RemedyFinderCallout />
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
                  <Link
                    to="/product/$handle"
                    params={{ handle: p.node.handle }}
                    className="block"
                  >
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
                    <h3 className="mt-5 font-serif text-2xl group-hover:text-sage-deep transition-colors">{p.node.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {p.node.description}
                    </p>
                  </Link>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sage-deep font-medium text-lg">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </span>
                    <AddToCartButton product={p} />
                  </div>
                  <HalaalBadge className="mt-3" />
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
