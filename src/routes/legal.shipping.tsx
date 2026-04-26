import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — GaiaBerry" },
      { name: "description", content: "How GaiaBerry ships orders within South Africa and internationally, and our returns policy." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <>
      <h1>Shipping & Returns</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</em></p>

      <h2>1. Processing time</h2>
      <p>Orders are typically dispatched within 1–3 business days from our facility in South Africa.</p>

      <h2>2. Shipping within South Africa</h2>
      <ul>
        <li><strong>Main centres:</strong> 2–4 business days via courier.</li>
        <li><strong>Outlying areas:</strong> 4–7 business days.</li>
        <li>Shipping fees are calculated at checkout based on weight and destination.</li>
      </ul>

      <h2>3. International shipping</h2>
      <p>We ship abroad on request. Delivery times vary by destination (typically 7–21 business days). Customers are responsible for any import duties, taxes or customs fees charged by the destination country.</p>

      <h2>4. Tracking</h2>
      <p>Once dispatched, you'll receive a tracking number by email. Please allow 24 hours for tracking updates to appear.</p>

      <h2>5. Returns</h2>
      <p>For health, safety and product-integrity reasons, we cannot accept returns of opened herbal products, teas, tinctures or powders.</p>
      <p>Unopened products in original sealed packaging may be returned within <strong>7 days</strong> of delivery, provided they are in resaleable condition. Return shipping is at the customer's cost.</p>

      <h2>6. Damaged or incorrect orders</h2>
      <p>If your order arrives damaged or incorrect, please email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> with photos within <strong>48 hours</strong> of delivery and we will make it right.</p>

      <h2>7. Refunds</h2>
      <p>Approved refunds are processed to the original payment method within 7–14 business days.</p>

      <h2>8. Consumer Protection Act</h2>
      <p>Nothing in this policy limits your rights under South Africa's Consumer Protection Act, 68 of 2008.</p>
    </>
  );
}
