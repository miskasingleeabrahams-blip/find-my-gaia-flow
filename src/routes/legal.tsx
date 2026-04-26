import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/legal")({
  component: LegalLayout,
});

const tabs = [
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms of Service" },
  { to: "/legal/shipping", label: "Shipping & Returns" },
  { to: "/legal/disclaimer", label: "Medical Disclaimer" },
] as const;

function LegalLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-16">
        <nav className="flex flex-wrap gap-2 mb-10 border-b border-border pb-4">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`text-sm rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-sage-deep text-cream"
                    : "text-muted-foreground hover:bg-sage/10 hover:text-sage-deep"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <article className="prose prose-stone max-w-none prose-headings:font-serif prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-2xl prose-h2:mt-10 prose-a:text-sage-deep">
          <Outlet />
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
