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
      <p>
        We ship abroad on request. Delivery times vary by destination (typically 7–21 business days).
        Customers are responsible for any import duties, taxes or customs fees charged by the destination country.
      </p>

      <h2>4. Tracking</h2>
      <p>Once dispatched, you'll receive a tracking number by email. Please allow 24 hours for tracking updates to appear.</p>

      <h2>5. Returns Policy</h2>
      <p>Please read our returns policy carefully before placing your order:</p>
      <ul>
        <li><strong>Lost or damaged in transit:</strong> If your parcel is misplaced, lost or damaged by the courier, we are unable to offer a replacement or refund.</li>
        <li><strong>Opened or damaged products:</strong> We do not accept returns on products that have been opened or damaged after delivery.</li>
        <li><strong>Pregnancy before delivery:</strong> If you fall pregnant before your order arrives and wish to return it, we are unable to accept the return.</li>
        <li><strong>Exchanges:</strong> In the event of an exchange after purchase, the customer is responsible for paying the delivery fee again.</li>
      </ul>
      <p>
        To request an exchange, please email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> with your order number and reason for the exchange.
      </p>

      <h2>6. Damaged or incorrect orders from us</h2>
      <p>
        If your order arrives with the wrong items packed by us, please email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> with photos within <strong>48 hours</strong> of delivery and we will make it right.
      </p>

      <h2>7. Consumer Protection Act</h2>
      <p>Nothing in this policy limits your rights under South Africa's Consumer Protection Act, 68 of 2008.</p>
    </>
  );
}
