import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GaiaBerry" },
      { name: "description", content: "How GaiaBerry collects, uses and protects your personal information under South Africa's POPIA." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</em></p>

      <p>
        GaiaBerry ("we", "us", "our") is committed to protecting your privacy in line with the
        <strong> Protection of Personal Information Act, 4 of 2013 (POPIA)</strong>. This policy explains
        what we collect, why, and how we keep it safe.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Contact details</strong> — name, email, phone, shipping address.</li>
        <li><strong>Health & wellness information</strong> you voluntarily share via the Remedy Finder or consultations (e.g. cycle, symptoms, goals).</li>
        <li><strong>Order & payment information</strong> — items purchased, amounts, and limited payment metadata. Card details are processed by our payment partners and never stored by us.</li>
        <li><strong>Technical data</strong> — device type, browser, IP address, cookies for site functionality and analytics.</li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To process orders, deliver products and provide consultations.</li>
        <li>To personalise remedy recommendations based on what you tell us.</li>
        <li>To respond to enquiries and provide customer support.</li>
        <li>To send order confirmations and, with your consent, occasional product news.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing your information</h2>
      <p>
        We share data only with operators who help us run the business (couriers, payment processors,
        email and hosting providers). They are bound by confidentiality and may not use your data
        for any other purpose. We do not sell your personal information.
      </p>

      <h2>4. Your rights under POPIA</h2>
      <p>You have the right to access, correct, delete or object to the processing of your personal
        information. Contact us at <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a> to exercise these rights.
        You may also lodge a complaint with the Information Regulator of South Africa.</p>

      <h2>5. Data retention & security</h2>
      <p>We keep your data only as long as needed to provide our services and meet legal requirements.
        We use industry-standard safeguards to protect it, but no system is 100% secure.</p>

      <h2>6. Cookies</h2>
      <p>We use essential cookies to make the site work and analytics cookies to understand usage. You
        can disable cookies in your browser, but some features may not function correctly.</p>

      <h2>7. Contact</h2>
      <p>Questions? Email <a href="mailto:info@gaiaberry.co.za">info@gaiaberry.co.za</a>.</p>
    </>
  );
}
