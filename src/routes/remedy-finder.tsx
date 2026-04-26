import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { useMemo, useState } from "react";
import kitPcos1 from "@/assets/kit-pcos-1.png";
import kitPcos2 from "@/assets/kit-pcos-2.png";
import kitDeepCleanse from "@/assets/kit-deep-fertility-cleanse.png";
import kitBlockedTubes from "@/assets/kit-blocked-tubes.png";
import kitAnaemia from "@/assets/kit-anaemia-fertility.png";
import kitProgesterone from "@/assets/kit-progesterone.png";
import kitManOfSteel from "@/assets/kit-man-of-steel.png";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HalaalBadge } from "@/components/HalaalBadge";
import { PregnancySafetyNote } from "@/components/PregnancySafetyNote";
import { HealingStandard, HealingReminder } from "@/components/HealingStandard";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/remedy-finder")({
  head: () => ({
    meta: [
      { title: "Remedy Finder — GaiaBerry" },
      { name: "description", content: "Answer a few questions to discover your personalised GaiaBerry remedy." },
      { property: "og:title", content: "Remedy Finder — GaiaBerry" },
      { property: "og:description", content: "Answer a few questions to discover your personalised GaiaBerry remedy." },
      { property: "og:image", content: "https://gaiaberry.co.za/og-remedy-finder.jpg" },
      { property: "og:url", content: "https://gaiaberry.co.za/remedy-finder" },
      { name: "twitter:image", content: "https://gaiaberry.co.za/og-remedy-finder.jpg" },
    ],
  }),
  loader: async (): Promise<{ products: ShopifyProduct[] }> => {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50, query: null });
    const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
    return { products };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-cream">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">Something went wrong loading your remedies.</h1>
          <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3"
          >
            Try again
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  },
  component: RemedyFinder,
});

const BOOKING_URL = "https://www.gaiaberry.co.za/book-online";

type Concern =
  | "PCOS"
  | "Endometriosis"
  | "Fibroids"
  | "Blocked fallopian tubes"
  | "Recurring miscarriages"
  | "Low progesterone"
  | "Irregular periods"
  | "Pregnancy care"
  | "Postpartum and breastfeeding"
  | "Male fertility"
  | "Not sure";

const concerns: Concern[] = [
  "PCOS",
  "Endometriosis",
  "Fibroids",
  "Blocked fallopian tubes",
  "Recurring miscarriages",
  "Low progesterone",
  "Irregular periods",
  "Pregnancy care",
  "Postpartum and breastfeeding",
  "Male fertility",
  "Not sure",
];

type AddOn = { name: string; price: string; note: string };

type Recommendation = {
  name: string;
  price: string;
  description: string;
  image?: string;
  productHandle?: string;
  addOns?: AddOn[];
  addOnHeading?: string;
  addOnIntro?: string;
};

type Answers = {
  concern?: Concern;
  pcosSymptom?: string;
  endoHasPcos?: "Yes" | "No";
  tubesSymptom?: string;
  miscarriageIron?: "Yes" | "Not sure" | "No";
  lowProgSpotting?: "Yes" | "No" | "Not sure";
  medication?: "Yes" | "No";
  medicationDetail?: string;
};

const ADDONS: Record<string, AddOn> = {
  chasteBerry: {
    name: "Chaste Berry Drops · Fertility Tonic",
    price: "R320",
    note: "Balances progesterone, regulates the cycle and eases PMS. Best with hormonal imbalance, irregular cycles or low progesterone.",
  },
  milkThistle: {
    name: "Milk Thistle Drops · Insulin Care",
    price: "R350",
    note: "Regulates blood sugar, detoxes the liver and supports insulin sensitivity. Best with PCOS tendencies or liver congestion.",
  },
  ashwagandha: {
    name: "Ashwagandha Drops · Stress & Adrenal",
    price: "R340",
    note: "Calms the nervous system, supports adrenals and lifts low libido. Best with stress, anxiety or fatigue.",
  },
  ironSea: {
    name: "IronSea Elixir · Iron Builder",
    price: "R290",
    note: "Plant-based iron tonic that gently lifts iron stores and energy. Best after blood loss or with low iron.",
  },
  wombTea: {
    name: "Womb Nourishment Tea",
    price: "R220",
    note: "A daily nourishing tea to tone the womb and steady the cycle. Beautiful alongside any fertility kit.",
  },
  reproOxidative: {
    name: "Repro Oxidative Care",
    price: "R380",
    note: "Antioxidant support for egg quality and reproductive cellular health. A gentle daily companion.",
  },
};

function getRecommendation(a: Answers): Recommendation {
  switch (a.concern) {
    case "PCOS": {
      if (
        a.pcosSymptom === "Weight gain / bloating" ||
        a.pcosSymptom === "Ovarian cysts or pelvic pain"
      ) {
        return {
          name: "PCOS Kit 1",
          price: "R845",
          image: kitPcos1,
          productHandle: "pcos-kit-1",
          description: "Crafted for PCOS with weight gain, bloating or ovarian cysts, to gently restore metabolic and hormonal harmony.",
          addOns: [ADDONS.milkThistle, ADDONS.wombTea],
        };
      }
      return {
        name: "PCOS Kit 2",
        price: "R895",
        image: kitPcos2,
        productHandle: "pcos-kit-2",
        description: "Crafted for PCOS with fatigue, hirsutism and stress-driven imbalance, to nourish the adrenals and rebalance hormones.",
        addOns: [ADDONS.ashwagandha, ADDONS.milkThistle],
      };
    }

    case "Endometriosis":
    case "Fibroids": {
      if (a.endoHasPcos === "Yes") {
        return {
          name: "Endo & PCOS Protocol",
          price: "R620",
          image: kitDeepCleanse,
          productHandle: "endo-kit-deep-fertility-cleanse",
          description: "Deep Fertility Cleanse — your base for Endo and PCOS together. Add Milk Thistle and/or Chaste Berry below for fuller hormonal and liver support.",
          addOns: [ADDONS.milkThistle, ADDONS.chasteBerry],
          addOnIntro: "Choose to add Milk Thistle, Chaste Berry, or both — based on what your body needs most.",
        };
      }
      return {
        name: "Endo Kit (Deep Fertility Cleanse)",
        price: "R620",
        image: kitDeepCleanse,
        productHandle: "endo-kit-deep-fertility-cleanse",
        description: "A deep cleanse to support Endo or Fibroids. Pair with Milk Thistle and/or Chaste Berry drops for fuller support.",
        addOns: [ADDONS.milkThistle, ADDONS.chasteBerry],
      };
    }

    case "Blocked fallopian tubes":
      return {
        name: "Blocked Tubes Kit",
        price: "R920",
        image: kitBlockedTubes,
        productHandle: "blocked-tubes-kit",
        description: "A focused herbal protocol to support tubal health and reproductive flow.",
        addOns: [ADDONS.wombTea, ADDONS.reproOxidative],
      };

    case "Recurring miscarriages":
      return {
        name: "Anaemia & Fertility Kit",
        price: "R820",
        image: kitAnaemia,
        productHandle: "anaemia-fertility-kit",
        description:
          a.miscarriageIron === "No"
            ? "Even without confirmed anaemia, this nourishing kit supports recurring loss recovery and womb strengthening."
            : "Iron-rich, blood-building herbs to nourish the womb and support a thriving pregnancy.",
        addOns: [ADDONS.ironSea, ADDONS.chasteBerry],
      };

    case "Low progesterone":
    case "Irregular periods":
      return {
        name: "Progesterone Kit",
        price: "R720",
        image: kitProgesterone,
        productHandle: "progesterone-kit",
        description: "Designed to lift progesterone gently, ease spotting and lengthen short luteal phases.",
        addOns: [ADDONS.chasteBerry, ADDONS.wombTea],
      };

    case "Pregnancy care":
      return {
        name: "Pregnancy Care · Womb Nourishment Tea",
        price: "R220",
        image: kitAnaemia,
        description: "A daily nourishing tea to support a healthy, thriving pregnancy.",
        addOns: [ADDONS.ironSea],
      };

    case "Postpartum and breastfeeding":
      return {
        name: "Postpartum Tea",
        price: "R220",
        productHandle: "postpartum-tea",
        description: "A restorative herbal blend to nourish and replenish mothers in the fourth trimester.",
        addOnHeading: "Pair with",
        addOnIntro: "For breastfeeding support, add Breastmilk Tea below.",
        addOns: [
          {
            name: "Breastmilk Tea",
            price: "R220",
            note: "A nourishing herbal blend to support healthy lactation and milk supply.",
          },
        ],
      };

    case "Male fertility":
      return {
        name: "Man of Steel Kit",
        price: "R1,350",
        image: kitManOfSteel,
        productHandle: "man-of-steel-kit",
        description: "A potent kit to support male fertility, vitality and sperm health.",
        addOns: [ADDONS.ashwagandha, ADDONS.reproOxidative],
      };

    case "Not sure":
    default:
      return {
        name: "Personal Consultation Recommended",
        price: "—",
        description: "Your story deserves a listening ear. Book a private consultation with our consultant for a tailored protocol.",
      };
  }
}

type StepKey = "concern" | "branch" | "medication" | "result";

function RemedyFinder() {
  const [step, setStep] = useState<StepKey>("concern");
  const [answers, setAnswers] = useState<Answers>({});

  const setConcern = (c: Concern) => {
    const next: Answers = { concern: c };
    setAnswers(next);
    // Skip directly to medication question for these concerns (no branch needed)
    if (c === "Pregnancy care" || c === "Postpartum and breastfeeding" || c === "Male fertility" || c === "Not sure" || c === "Irregular periods") {
      setStep("medication");
    } else {
      setStep("branch");
    }
  };

  const setBranch = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep("medication");
  };

  const setMedication = (val: "Yes" | "No") => {
    setAnswers((a) => ({ ...a, medication: val }));
    if (val === "No") setStep("result");
  };

  const submitMedication = () => setStep("result");

  const reset = () => {
    setAnswers({});
    setStep("concern");
  };

  const { products } = Route.useLoaderData();
  const result = useMemo(() => getRecommendation(answers), [answers]);

  const progress =
    step === "concern" ? 1 : step === "branch" ? 2 : step === "medication" ? 3 : 4;

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
        <div className="text-center">
          <Eyebrow>Remedy Finder</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-balance">A guided ritual to your remedy.</h1>
          <p className="mt-4 text-muted-foreground">A few thoughtful questions. No pressure. Just listening.</p>
        </div>

        <div className="mt-10 md:mt-12 rounded-[2rem] bg-card border border-border p-6 md:p-12 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full transition ${n <= progress ? "bg-sage-deep" : "bg-border"}`}
              />
            ))}
          </div>

          {step === "concern" && (
            <ConcernStep onPick={setConcern} />
          )}

          {step === "branch" && answers.concern && (
            <BranchStep
              concern={answers.concern}
              onPick={(key, val) => setBranch(key, val)}
              onBack={() => setStep("concern")}
            />
          )}

          {step === "medication" && (
            <MedicationStep
              answers={answers}
              setAnswers={setAnswers}
              onAnswer={setMedication}
              onSubmit={submitMedication}
              onBack={() => setStep(answers.concern && needsBranch(answers.concern) ? "branch" : "concern")}
            />
          )}

          {step === "result" && (
            <ResultStep result={result} answers={answers} onReset={reset} products={products} />
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function needsBranch(c: Concern) {
  return (
    c === "PCOS" ||
    c === "Endometriosis" ||
    c === "Fibroids" ||
    c === "Blocked fallopian tubes" ||
    c === "Recurring miscarriages" ||
    c === "Low progesterone"
  );
}

function ConcernStep({ onPick }: { onPick: (c: Concern) => void }) {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Question 1 of 3</p>
      <h2 className="mt-3 font-serif text-3xl text-balance">What is your main concern or condition?</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {concerns.map((c) => (
          <button
            key={c}
            onClick={() => onPick(c)}
            className="text-left rounded-2xl border border-border bg-cream px-5 py-4 hover:border-sage-deep hover:bg-sage/10 transition"
          >
            {c}
          </button>
        ))}
      </div>
    </>
  );
}

function BranchStep({
  concern,
  onPick,
  onBack,
}: {
  concern: Concern;
  onPick: (key: keyof Answers, val: string) => void;
  onBack: () => void;
}) {
  let question = "";
  let options: string[] = [];
  let key: keyof Answers = "pcosSymptom";

  if (concern === "PCOS") {
    question = "Which symptoms do you experience?";
    key = "pcosSymptom";
    options = [
      "Weight gain / bloating",
      "Fatigue and excess hair growth (hirsutism)",
      "Ovarian cysts or pelvic pain",
      "Irregular cycles",
      "Difficulty conceiving",
    ];
  } else if (concern === "Endometriosis" || concern === "Fibroids") {
    question = "Do you also have PCOS?";
    key = "endoHasPcos";
    options = ["Yes, I have both Endo and PCOS", "No, Endo or Fibroids only"];
  } else if (concern === "Blocked fallopian tubes") {
    question = "Which of these do you experience?";
    key = "tubesSymptom";
    options = [
      "Abdominal pain",
      "Back pain",
      "Pain when urinating",
      "Heavy bleeding or clots",
      "Difficulty conceiving",
    ];
  } else if (concern === "Recurring miscarriages") {
    question = "Do you have low iron or anaemia?";
    key = "miscarriageIron";
    options = ["Yes, confirmed low iron", "Not sure", "No"];
  } else if (concern === "Low progesterone") {
    question = "Do you experience spotting before your period or have a short cycle?";
    key = "lowProgSpotting";
    options = ["Yes", "No", "Not sure"];
  }

  // Normalize answers for endo/miscarriage/lowProg to enum strings
  const normalize = (val: string): string => {
    if (key === "endoHasPcos") return val.startsWith("Yes") ? "Yes" : "No";
    if (key === "miscarriageIron") {
      if (val.startsWith("Yes")) return "Yes";
      if (val === "Not sure") return "Not sure";
      return "No";
    }
    return val;
  };

  return (
    <>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Question 2 of 3</p>
      <h2 className="mt-3 font-serif text-3xl text-balance">{question}</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onPick(key, normalize(o))}
            className="text-left rounded-2xl border border-border bg-cream px-5 py-4 hover:border-sage-deep hover:bg-sage/10 transition"
          >
            {o}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-8 text-sm text-muted-foreground hover:text-sage-deep underline-offset-4 hover:underline"
      >
        ← Back
      </button>
    </>
  );
}

function MedicationStep({
  answers,
  setAnswers,
  onAnswer,
  onSubmit,
  onBack,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onAnswer: (val: "Yes" | "No") => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Question 3 of 3</p>
      <h2 className="mt-3 font-serif text-3xl text-balance">Are you currently on any medication?</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {(["Yes", "No"] as const).map((o) => (
          <button
            key={o}
            onClick={() => onAnswer(o)}
            className={`text-left rounded-2xl border px-5 py-4 transition ${
              answers.medication === o
                ? "border-sage-deep bg-sage/10"
                : "border-border bg-cream hover:border-sage-deep hover:bg-sage/10"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      {answers.medication === "Yes" && (
        <div className="mt-6">
          <label className="text-sm text-ink">Please specify if you can</label>
          <textarea
            rows={3}
            value={answers.medicationDetail ?? ""}
            onChange={(e) => setAnswers((a) => ({ ...a, medicationDetail: e.target.value }))}
            className="mt-1.5 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-sage-deep transition"
            placeholder="e.g. Metformin, Letrozole…"
          />
          <button
            onClick={onSubmit}
            className="mt-4 rounded-full bg-primary text-primary-foreground px-7 py-3.5 hover:opacity-90 transition"
          >
            See my remedy →
          </button>
        </div>
      )}

      <button
        onClick={onBack}
        className="mt-8 text-sm text-muted-foreground hover:text-sage-deep underline-offset-4 hover:underline"
      >
        ← Back
      </button>
    </>
  );
}

function ResultStep({
  result,
  answers,
  onReset,
  products,
}: {
  result: Recommendation;
  answers: Answers;
  onReset: () => void;
  products: ShopifyProduct[];
}) {
  const matchedProduct = result.productHandle
    ? products.find((p) => p.node.handle === result.productHandle)
    : undefined;

  return (
    <div>
      <HealingStandard variant="compact" className="mb-12" />

      <div className="text-center">
        <Eyebrow>Your remedy</Eyebrow>
        {result.image && (
          <div className="mt-6 mx-auto max-w-xs rounded-3xl bg-blush/30 p-6 flex items-center justify-center">
            <img
              src={result.image}
              alt={result.name}
              className="w-full aspect-square object-contain"
            />
          </div>
        )}
        <h2 className="mt-6 font-serif text-4xl md:text-5xl text-sage-deep">{result.name}</h2>
        {result.price !== "—" && (
          <div className="mt-3 inline-flex items-baseline gap-2">
            <span className="font-serif text-2xl text-ink">{result.price}</span>
          </div>
        )}
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-md mx-auto">
          {result.description}
        </p>
        {matchedProduct && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <HalaalBadge />
            <AddToCartButton
              product={matchedProduct}
              label="Add to basket"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition disabled:opacity-50"
            />
            <HealingReminder className="max-w-sm text-center" />
            <PregnancySafetyNote productKey={`${result.name}`} className="max-w-sm text-left" />
          </div>
        )}
      </div>

      {result.addOns && result.addOns.length > 0 && (
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.25em] text-sage-deep text-center">Enhance your results</p>
          <p className="mt-3 font-serif text-2xl text-ink text-center">Recommended to use with this kit</p>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-lg mx-auto">
            These complementary remedies deepen and accelerate your results, chosen specifically for your concern.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {result.addOns.map((a) => (
              <div key={a.name} className="rounded-2xl bg-blush/25 p-5 border border-border">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-lg text-ink">{a.name}</div>
                  <div className="text-sage-deep font-medium text-sm">{a.price}</div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-sage/15 p-6 text-center">
        <p className="font-serif text-xl text-ink leading-snug">
          "Healing begins within. If you would like free guidance on your recommendation, chat directly with our consultant on WhatsApp."
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/27728929308?text=Hi%20GaiaBerry%2C%20I%20just%20received%20my%20free%20product%20recommendation%20and%20would%20love%20some%20guidance."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3.5 hover:opacity-90 transition shadow-[var(--shadow-soft)]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp a consultant
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Free guidance on your product recommendation — chat directly on WhatsApp.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/shop"
          className="rounded-full border border-sage-deep/30 text-sage-deep px-7 py-3.5 hover:bg-sage/10 transition"
        >
          Shop the apothecary
        </Link>
        <button
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-sage-deep underline-offset-4 hover:underline"
        >
          Start over
        </button>
      </div>

      {answers.medication === "Yes" && answers.medicationDetail && (
        <p className="mt-6 text-xs text-muted-foreground text-center">
          Note shared: currently taking {answers.medicationDetail}. Please mention this in your consultation.
        </p>
      )}
    </div>
  );
}
