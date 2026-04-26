import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HealingStandard } from "@/components/HealingStandard";
import { RemedyFinderCallout } from "@/components/RemedyFinderCallout";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { notFound } from "@tanstack/react-router";

type ProductNode = ShopifyProduct["node"] & { descriptionHtml: string };

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params }): Promise<{ product: ProductNode }> => {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: params.handle });
    const product = data?.data?.productByHandle as ProductNode | null;
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "Product"} — GaiaBerry` },
      { name: "description", content: loaderData?.product.description?.slice(0, 160) ?? "GaiaBerry natural wellness product." },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sage-deep underline-offset-4 hover:underline">
          Back to shop →
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">We couldn't load this product.</h1>
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
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const img = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  // Wrap into ShopifyProduct shape for AddToCartButton
  const productForCart: ShopifyProduct = { node: product };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-16">
        <Link to="/shop" className="text-sm text-sage-deep hover:underline underline-offset-4">
          ← Back to shop
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-3xl bg-blush/30 flex items-center justify-center p-8 md:p-12 aspect-square">
            {img && (
              <img
                src={img.url}
                alt={img.altText || product.title}
                className="object-contain w-full h-full"
              />
            )}
          </div>

          <div>
            <Eyebrow>The Apothecary</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl text-balance">{product.title}</h1>
            <div className="mt-5 text-2xl text-sage-deep font-medium">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </div>

            <div
              className="prose prose-sm mt-8 text-ink/85 leading-relaxed max-w-none [&_h3]:font-serif [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p]:mt-3 [&_strong]:text-ink"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <div className="mt-8">
              <RemedyFinderCallout variant="compact" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AddToCartButton
                product={productForCart}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base hover:opacity-90 transition shadow-[var(--shadow-soft)]"
                label="Add to basket"
              />
              <Link
                to="/consultation"
                className="inline-flex items-center rounded-full border border-sage-deep/30 text-sage-deep px-6 py-4 text-sm hover:bg-sage/10 transition"
              >
                Book 3-Month Check-In
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <HealingStandard />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
