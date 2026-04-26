// Server-side helper to create a Shopify cart and return a checkout URL.
// Used by the agent-approval flow so the customer pays via Shopify's hosted
// checkout — which means Payflex (and any other Shopify-enabled payment
// methods) appear automatically once the Payflex app is installed.

import { SHOPIFY_STORE_PERMANENT_DOMAIN, SHOPIFY_API_VERSION } from "./shopify";

const STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

interface CreateOpts {
  variantId: string; // gid://shopify/ProductVariant/...
  quantity?: number;
  buyerEmail?: string;
  bookingId: string;
  discountCode?: string;
}

function ensureChannel(checkoutUrl: string): string {
  try {
    const u = new URL(checkoutUrl);
    u.searchParams.set("channel", "online_store");
    return u.toString();
  } catch {
    return checkoutUrl;
  }
}

export async function createConsultationCheckout({
  variantId,
  quantity = 1,
  buyerEmail,
  bookingId,
  discountCode,
}: CreateOpts): Promise<{ checkoutUrl: string; cartId: string } | null> {
  const token =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!token) {
    console.error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");
    return null;
  }

  const input: Record<string, unknown> = {
    lines: [{ quantity, merchandiseId: variantId }],
    attributes: [{ key: "booking_id", value: bookingId }],
    note: `Consultation booking ${bookingId}`,
  };
  if (buyerEmail) {
    input.buyerIdentity = { email: buyerEmail };
  }
  if (discountCode) {
    input.discountCodes = [discountCode];
  }

  const res = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: CART_CREATE,
      variables: { input },
    }),
  });

  if (!res.ok) {
    console.error("Shopify cartCreate HTTP error", res.status, await res.text());
    return null;
  }

  const data = (await res.json()) as any;
  const errs = data?.data?.cartCreate?.userErrors;
  if (errs?.length) {
    console.error("Shopify cartCreate userErrors", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) {
    console.error("Shopify cartCreate: no checkoutUrl", data);
    return null;
  }
  return { checkoutUrl: ensureChannel(cart.checkoutUrl), cartId: cart.id };
}
