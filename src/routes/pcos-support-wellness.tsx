import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pcos-support-wellness")({
  component: PcosSupportWellness,
});

function PcosSupportWellness() {
  return (
    <main>
      <section>
        <h1>PCOS Support & Wellness</h1>

        <p>
          Polycystic Ovary Syndrome (PCOS) can affect menstrual cycles,
          ovulation, hormones, metabolism and overall wellbeing. Every
          woman's experience with PCOS is different.
        </p>

        <p>
          At GaiaBerry, we take a personalised, nature-led approach to
          reproductive and hormonal wellness. Our botanical products and
          educational resources are designed to complement healthy lifestyle
          habits and support general wellbeing.
        </p>

        <h2>Understanding PCOS</h2>

        <p>
          PCOS can be associated with irregular or unpredictable cycles,
          changes in ovulation, acne, unwanted hair growth, hair thinning and
          difficulties with fertility. Some women may also experience
          challenges with blood-sugar regulation or weight management.
        </p>

        <p>
          PCOS does not look the same for everyone. Understanding your
          individual symptoms, cycle and wellness goals can help you find
          appropriate support.
        </p>

        <h2>GaiaBerry PCOS Support</h2>

        <p>
          GaiaBerry offers PCOS-focused products and educational resources
          centred around hormonal and reproductive wellness.
        </p>

        <h2>Find Your Personalised Support</h2>

        <p>
          Not sure where to start? Take our short Remedy Finder to explore
          which GaiaBerry support pathway may be relevant to your current
          needs.
        </p>

        <Link to="/remedy-finder">
          Start your GaiaBerry journey →
        </Link>

        <p>
          GaiaBerry products are intended to support general wellness and are
          not intended to diagnose, treat, cure or prevent PCOS or any medical
          condition. If you have concerns about PCOS or persistent symptoms,
          speak with a qualified healthcare professional.
        </p>
      </section>
    </main>
  );
}
