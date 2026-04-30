import { createFileRoute } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/legal/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — GaiaBerry" },
      { name: "description", content: "How GaiaBerry ships orders within South Africa and internationally, including weight-based rates and our returns policy." },
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

      <h2>2. How we calculate shipping</h2>
      <p>
        Shipping is based on the <strong>total weight of your order</strong>. For reference, our product weights are:
      </p>
      <ul>
        <li>100ml tincture — 0.18&nbsp;kg</li>
        <li>Capsule container — 0.065&nbsp;kg</li>
        <li>Tea — 0.075&nbsp;kg</li>
      </ul>
      <p>The correct rate is automatically applied at checkout based on your cart weight and destination.</p>

      <h2>3. Shipping within South Africa</h2>
      <ul>
        <li><strong>Main centres:</strong> 2–4 business days via courier.</li>
        <li><strong>Outlying areas:</strong> 4–7 business days.</li>
      </ul>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order weight</TableHead>
            <TableHead>Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Up to 1.5&nbsp;kg</TableCell>
            <TableCell>R&nbsp;99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Above 1.5&nbsp;kg</TableCell>
            <TableCell>R&nbsp;169</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2>4. International shipping</h2>
      <p>
        We ship worldwide via DHL Express. Delivery typically takes 3–7 business days once dispatched.
        Customers are responsible for any import duties, taxes or customs fees charged by the destination country.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Zone</TableHead>
            <TableHead>Up to 1.5&nbsp;kg</TableHead>
            <TableHead>Above 1.5&nbsp;kg</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Sub-Saharan Africa</TableCell>
            <TableCell>R&nbsp;1,250</TableCell>
            <TableCell>R&nbsp;1,950</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Europe & Middle East</TableCell>
            <TableCell>R&nbsp;1,550</TableCell>
            <TableCell>R&nbsp;3,050</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>USA, Canada & Mexico</TableCell>
            <TableCell>R&nbsp;1,690</TableCell>
            <TableCell>R&nbsp;3,220</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rest of World</TableCell>
            <TableCell>R&nbsp;2,160</TableCell>
            <TableCell>R&nbsp;4,100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        <small>Rates are based on DHL Express Easy tariffs and may be adjusted in line with carrier updates. Final rate is confirmed at checkout.</small>
      </p>

      <h2>5. Tracking</h2>
      <p>Once dispatched, you'll receive a tracking number by email. Please allow 24 hours for tracking updates to appear.</p>

      <h2>6. Returns Policy</h2>
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

      <h2>7. Damaged or incorrect orders from us</h2>
      <p>
        If your order arrives with the wrong items packed by us, please email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> with photos within <strong>48 hours</strong> of delivery and we will make it right.
      </p>

      <h2>8. Consumer Protection Act</h2>
      <p>Nothing in this policy limits your rights under South Africa's Consumer Protection Act, 68 of 2008.</p>
    </>
  );
}
