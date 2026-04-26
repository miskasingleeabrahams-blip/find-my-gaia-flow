import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — GaiaBerry" },
      { name: "description", content: "The terms governing the use of the GaiaBerry website, products and consultations." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</em></p>

      <p>By using gaiaberry.co.za or purchasing our products, you agree to these terms. Please read them carefully.</p>

      <h2>1. About us</h2>
      <p>GaiaBerry sells natural herbal products and offers wellness consultations. We are based in South Africa and ship within SA and abroad.</p>

      <h2>2. Orders & pricing</h2>
      <p>Prices are shown in South African Rand (ZAR) and include VAT where applicable. We reserve the right to refuse or cancel orders in cases of pricing errors, suspected fraud or stock issues. A confirmation email does not constitute acceptance until your order has been dispatched.</p>

      <h2>3. Payment</h2>
      <p>Payments are processed by trusted third-party providers (e.g. Yoco, Shopify Payments). By submitting payment details, you authorise us to charge the relevant amount.</p>

      <h2>4. Consultations</h2>
      <p>Consultations are educational wellness sessions and are not a substitute for medical care. Booking fees are non-refundable once your session has been scheduled. Please review our <a href="/legal/disclaimer">Medical Disclaimer</a>.</p>

      <h2>5. Use of the site</h2>
      <p>You agree not to misuse the site, attempt to gain unauthorised access, or use our content for commercial purposes without permission. All content (text, images, branding) is owned by GaiaBerry.</p>

      <h2>6. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, GaiaBerry is not liable for indirect, incidental or consequential losses arising from your use of our products or services. Our total liability is limited to the amount you paid for the relevant order.</p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa. Any disputes will be resolved in South African courts.</p>

      <h2>8. Changes</h2>
      <p>We may update these terms from time to time. The latest version will always be posted on this page.</p>

      <h2>9. Contact</h2>
      <p>Email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> with any questions.</p>
    </>
  );
}
