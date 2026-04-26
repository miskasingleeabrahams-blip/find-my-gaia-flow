import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/disclaimer")({
  head: () => ({
    meta: [
      { title: "Medical Disclaimer — GaiaBerry" },
      { name: "description", content: "Important health information about GaiaBerry's herbal products and consultations." },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <>
      <h1>Medical Disclaimer</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</em></p>

      <p>
        The information, products and consultations offered by GaiaBerry are for
        <strong> educational and wellness purposes only</strong>. They are not intended to
        diagnose, treat, cure or prevent any disease or medical condition.
      </p>

      <h2>1. Not medical advice</h2>
      <p>
        Nothing on this website, in our consultations, or accompanying our products
        constitutes medical advice. Always consult a qualified healthcare practitioner
        before starting any new herbal supplement, especially if you:
      </p>
      <ul>
        <li>Are pregnant, trying to conceive, or breastfeeding</li>
        <li>Have a diagnosed medical condition</li>
        <li>Are taking prescription medication (including hormonal contraceptives or fertility medication)</li>
        <li>Are scheduled for surgery</li>
      </ul>

      <h2>2. Individual results vary</h2>
      <p>
        Testimonials and stories shared on this site reflect the experiences of individual
        women. They are not guarantees. Herbal remedies work differently for every body and
        results depend on many personal factors.
      </p>

      <h2>3. Allergies & sensitivities</h2>
      <p>
        Please review the ingredient list of every product before use. Discontinue use
        immediately and seek medical attention if you experience an adverse reaction.
      </p>

      <h2>4. Not a substitute for emergency care</h2>
      <p>
        If you are experiencing a medical emergency, call your local emergency services
        immediately. Do not delay seeking medical care because of information you have
        read on this site.
      </p>

      <h2>5. Regulatory note</h2>
      <p>
        These statements have not been evaluated by the South African Health Products
        Regulatory Authority (SAHPRA). Our products are sold as natural herbal
        supplements and complementary wellness aids.
      </p>

      <p>By using our website, products or consultations, you acknowledge and accept this disclaimer.</p>
    </>
  );
}
