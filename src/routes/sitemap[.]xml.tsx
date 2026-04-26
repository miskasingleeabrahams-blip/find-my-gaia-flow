import { createFileRoute } from "@tanstack/react-router";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";

const SITE = "https://gaiaberry.co.za";

const STATIC_PATHS = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/shop", priority: "0.9", changefreq: "weekly" },
  { path: "/remedy-finder", priority: "0.9", changefreq: "monthly" },
  { path: "/consultation", priority: "0.8", changefreq: "monthly" },
  { path: "/testimonials", priority: "0.7", changefreq: "weekly" },
  { path: "/legal", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/shipping", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/disclaimer", priority: "0.3", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        let productUrls = "";
        try {
          const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 100, query: null });
          const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
          productUrls = products
            .map(
              (p) =>
                `  <url><loc>${SITE}/product/${p.node.handle}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
            )
            .join("\n");
        } catch {
          // ignore — still serve static sitemap
        }

        const staticUrls = STATIC_PATHS.map(
          (s) =>
            `  <url><loc>${SITE}${s.path}</loc><lastmod>${today}</lastmod><changefreq>${s.changefreq}</changefreq><priority>${s.priority}</priority></url>`
        ).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
