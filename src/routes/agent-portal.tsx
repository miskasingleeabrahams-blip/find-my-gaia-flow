import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { AddToCartButton } from "@/components/AddToCartButton";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Lock, LogOut, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const AGENT_PASSWORD = "AGENT-GAIA-2145";
const AGENT_DISCOUNT_CODE = "AGENT-GAIA-2145";
const STORAGE_KEY = "gaiaberry_agent_auth";

const AGENT_DISCOUNT_RATE = 0.2145;

export const Route = createFileRoute("/agent-portal")({
  head: () => ({
    meta: [
      { title: "Agent Portal — GaiaBerry" },
      { name: "description", content: "Private portal for GaiaBerry agents." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async (): Promise<{ products: ShopifyProduct[] }> => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 100, query: null });
    const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
    return { products };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">We couldn't load the portal.</h1>
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
  component: AgentPortal,
});

function AgentPortal() {
  const { products } = Route.useLoaderData();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
      setChecking(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === AGENT_PASSWORD.toUpperCase()) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      toast.success("Welcome, agent");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-24" />
        <SiteFooter />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-md px-6 py-24">
          <div className="rounded-3xl bg-card border border-border p-10 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-sage/15 grid place-items-center mx-auto">
              <Lock className="h-5 w-5 text-sage-deep" />
            </div>
            <h1 className="mt-5 font-serif text-3xl text-center">Agent Portal</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Enter your agent password to access wholesale pricing.
            </p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Agent password"
                  className="w-full rounded-full border border-border bg-background px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-sage/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-ink hover:bg-sage/10 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm hover:opacity-90 transition"
              >
                Enter portal
              </button>
            </form>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const agentProducts = products;

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <Eyebrow>Agent Portal</Eyebrow>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">
              Shop with your agent discount.
            </h1>
            <p className="mt-5 text-muted-foreground">
              Browse the catalogue below, add items to your basket, and apply your agent
              discount code at checkout to receive 21.45% off.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-ink transition"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-10 rounded-3xl bg-sage/10 border border-sage/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <p className="font-serif text-xl text-ink">Your agent discount code</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Apply this code at checkout to receive 21.45% off your order.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <code className="rounded-full bg-cream border border-border px-5 py-2.5 text-sm font-mono tracking-wide text-ink">
              {AGENT_DISCOUNT_CODE}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(AGENT_DISCOUNT_CODE);
                toast.success("Discount code copied");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-sage-deep text-cream px-4 py-2.5 text-sm hover:opacity-90 transition"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
        </div>

        {agentProducts.length === 0 ? (
          <div className="mt-16 rounded-3xl bg-card border border-border p-12 text-center">
            <p className="font-serif text-2xl text-ink">No products found</p>
            <p className="mt-3 text-muted-foreground text-sm">Please check back soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {agentProducts.map((p: ShopifyProduct) => {
              const img = p.node.images.edges[0]?.node;
              const retail = p.node.priceRange.minVariantPrice;
              const retailAmount = parseFloat(retail.amount);
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
                  <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                    <span className="text-sage-deep font-medium text-2xl">
                      {retail.currencyCode} {(retailAmount * (1 - AGENT_DISCOUNT_RATE)).toFixed(2)}
                    </span>
                    <span className="text-muted-foreground line-through text-sm">
                      {retail.currencyCode} {retailAmount.toFixed(2)}
                    </span>
                    <span className="text-xs text-sage-deep/80">agent price</span>
                  </div>
                  <div className="mt-5">
                    <AddToCartButton product={p} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-sage-deep text-cream px-5 py-3 text-sm hover:opacity-90 transition disabled:opacity-50" />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
