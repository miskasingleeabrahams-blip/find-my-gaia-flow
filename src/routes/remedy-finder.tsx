import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import { useEffect, useMemo, useRef, useState } from "react";
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
      { name: "description", content: "A gentle conversation to discover your personalised GaiaBerry remedy." },
      { property: "og:title", content: "Remedy Finder — GaiaBerry" },
      { property: "og:description", content: "A gentle conversation to discover your personalised GaiaBerry remedy." },
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

// ────────────────────────────────────────────────────────────────────────────
// Types & data
// ────────────────────────────────────────────────────────────────────────────

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

const CONCERNS: Concern[] = [
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
  symptoms?: string[];          // multi-select per condition
  endoHasPcos?: "Yes" | "No";   // sub-question for endo/fibroids
  cycleLength?: string;
  cycleRegularity?: string;
  periodPain?: string;
  flow?: string;
  stress?: string;
  sleep?: string;
  energy?: string;
  ttcTimeline?: string;
  ageRange?: string;
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

// Symptom checklists per condition
const SYMPTOMS: Partial<Record<Concern, string[]>> = {
  PCOS: [
    "Weight gain or bloating",
    "Excess facial or body hair (hirsutism)",
    "Acne or oily skin",
    "Hair thinning on the scalp",
    "Ovarian cysts or pelvic pain",
    "Irregular or missed periods",
    "Fatigue or low energy",
    "Sugar cravings or insulin resistance",
    "Mood swings or anxiety",
    "Difficulty conceiving",
  ],
  Endometriosis: [
    "Painful periods (dysmenorrhea)",
    "Pelvic pain outside of periods",
    "Pain during intimacy",
    "Heavy or clotted bleeding",
    "Bloating or 'endo belly'",
    "Lower back pain",
    "Fatigue around your cycle",
    "Difficulty conceiving",
  ],
  Fibroids: [
    "Heavy or prolonged periods",
    "Pelvic pressure or fullness",
    "Frequent urination",
    "Lower back or leg pain",
    "Bloating or a swollen lower belly",
    "Painful periods",
    "Difficulty conceiving",
  ],
  "Blocked fallopian tubes": [
    "Lower abdominal pain",
    "Lower back pain",
    "Pain when urinating",
    "Heavy bleeding or clots",
    "Pain during intimacy",
    "Past pelvic infection or surgery",
    "Difficulty conceiving",
  ],
  "Recurring miscarriages": [
    "Confirmed low iron or anaemia",
    "Heavy periods",
    "Fatigue or shortness of breath",
    "Spotting before periods",
    "Short luteal phase (under 10 days)",
    "Previous early pregnancy loss",
  ],
  "Low progesterone": [
    "Spotting before periods",
    "Short cycles (under 25 days)",
    "PMS, mood swings or anxiety",
    "Trouble sleeping in the second half of the cycle",
    "Sore breasts before periods",
    "Difficulty staying pregnant",
  ],
  "Irregular periods": [
    "Cycles vary by more than 7 days",
    "Missed periods",
    "Very light or very heavy bleeding",
    "Long cycles (over 35 days)",
    "Stress or recent lifestyle changes",
    "Coming off hormonal contraception",
  ],
  "Pregnancy care": [
    "Fatigue",
    "Low iron",
    "Nausea",
    "Anxiety or low mood",
    "Just want daily nourishment",
  ],
  "Postpartum and breastfeeding": [
    "Recovering from birth",
    "Low milk supply",
    "Fatigue or depleted energy",
    "Hair shedding",
    "Mood swings or low mood",
  ],
  "Male fertility": [
    "Low sperm count",
    "Low motility or morphology",
    "Low libido",
    "Fatigue or low stamina",
    "Stress or burnout",
    "Trying to conceive over 6 months",
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// Recommendation logic — kits unchanged
// ────────────────────────────────────────────────────────────────────────────

function getRecommendation(a: Answers): Recommendation {
  const has = (s: string) => (a.symptoms ?? []).includes(s);

  switch (a.concern) {
    case "PCOS": {
      const metabolic =
        has("Weight gain or bloating") ||
        has("Ovarian cysts or pelvic pain") ||
        has("Sugar cravings or insulin resistance");
      if (metabolic) {
        return {
          name: "PCOS Kit 1",
          price: "R845",
          image: kitPcos1,
          productHandle: "pcos-kit-1",
          description:
            "Crafted for PCOS with weight gain, bloating or ovarian cysts, to gently restore metabolic and hormonal harmony.",
          addOns: [ADDONS.milkThistle, ADDONS.wombTea],
        };
      }
      return {
        name: "PCOS Kit 2",
        price: "R895",
        image: kitPcos2,
        productHandle: "pcos-kit-2",
        description:
          "Crafted for PCOS with fatigue, hirsutism and stress-driven imbalance, to nourish the adrenals and rebalance hormones.",
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
          description:
            "Deep Fertility Cleanse — your base for Endo and PCOS together. Add Milk Thistle and/or Chaste Berry below for fuller hormonal and liver support.",
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
        description: has("Confirmed low iron or anaemia")
          ? "Iron-rich, blood-building herbs to nourish the womb and support a thriving pregnancy."
          : "Even without confirmed anaemia, this nourishing kit supports recurring loss recovery and womb strengthening.",
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
        description:
          "Your story deserves a listening ear. Chat with our consultant on WhatsApp and we'll guide you to the right remedy together.",
      };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Conversation flow
// ────────────────────────────────────────────────────────────────────────────

type StepKey =
  | "intro"
  | "concern"
  | "symptoms"
  | "endoPcos"
  | "cycle"
  | "lifestyle"
  | "ttc"
  | "age"
  | "medication"
  | "result";

function buildSteps(a: Answers): StepKey[] {
  const steps: StepKey[] = ["intro", "concern"];

  if (!a.concern) return steps;

  // Symptom checklist for any concern that has one
  if (SYMPTOMS[a.concern]) steps.push("symptoms");

  if (a.concern === "Endometriosis" || a.concern === "Fibroids") steps.push("endoPcos");

  // Cycle questions for women's cycle-related concerns
  const cycleConcerns: Concern[] = [
    "PCOS",
    "Endometriosis",
    "Fibroids",
    "Recurring miscarriages",
    "Low progesterone",
    "Irregular periods",
    "Not sure",
  ];
  if (cycleConcerns.includes(a.concern)) steps.push("cycle");

  // Lifestyle for everyone except postpartum (covered separately)
  if (a.concern !== "Postpartum and breastfeeding") steps.push("lifestyle");

  // TTC timeline only for fertility-related concerns
  const ttcConcerns: Concern[] = [
    "PCOS",
    "Endometriosis",
    "Fibroids",
    "Blocked fallopian tubes",
    "Recurring miscarriages",
    "Low progesterone",
    "Irregular periods",
    "Male fertility",
    "Not sure",
  ];
  if (ttcConcerns.includes(a.concern)) steps.push("ttc");

  // Age for everyone except male fertility & postpartum
  if (a.concern !== "Postpartum and breastfeeding") steps.push("age");

  steps.push("medication", "result");
  return steps;
}

function RemedyFinder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const reset = () => {
    setAnswers({});
    setStepIndex(0);
  };

  const { products } = Route.useLoaderData();
  const result = useMemo(() => getRecommendation(answers), [answers]);

  // Auto-scroll the conversation to the bottom as new bubbles appear
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stepIndex, answers.symptoms?.length, answers.medication]);

  // Total steps shown in progress (exclude intro and result)
  const totalProgressSteps = Math.max(steps.length - 2, 1);
  const currentProgressStep = Math.min(
    Math.max(stepIndex - 1, 0),
    totalProgressSteps,
  );

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10 py-12 md:py-20">
        <div className="text-center">
          <Eyebrow>Remedy Finder</Eyebrow>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-balance">
            A gentle conversation to your remedy.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Take your time. There are no wrong answers — just listening.
          </p>
        </div>

        <div className="mt-8 md:mt-12 rounded-[2rem] bg-card border border-border p-4 sm:p-6 md:p-10 shadow-[var(--shadow-soft)]">
          {step !== "result" && step !== "intro" && (
            <div className="mb-6 flex items-center gap-2">
              {Array.from({ length: totalProgressSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition ${
                    i <= currentProgressStep ? "bg-sage-deep" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Conversation transcript: bubbles for previous answers */}
          {step !== "intro" && step !== "result" && (
            <Transcript answers={answers} steps={steps} currentIndex={stepIndex} />
          )}

          {step === "intro" && <IntroStep onStart={goNext} />}

          {step === "concern" && (
            <ChatBubble
              role="consultant"
              question="Let's start gently — what is bringing you here today?"
            >
              <OptionGrid
                options={CONCERNS}
                onPick={(c) => {
                  setAnswers({ concern: c as Concern });
                  setStepIndex(2);
                }}
              />
            </ChatBubble>
          )}

          {step === "symptoms" && answers.concern && (
            <ChatBubble
              role="consultant"
              question={symptomsQuestion(answers.concern)}
              hint="Tick everything that feels true for you. The fuller the picture, the more accurate your remedy."
            >
              <MultiSelect
                options={SYMPTOMS[answers.concern] ?? []}
                value={answers.symptoms ?? []}
                onChange={(symptoms) => setAnswers((a) => ({ ...a, symptoms }))}
              />
              <NavButtons onBack={goBack} onNext={goNext} canNext={(answers.symptoms?.length ?? 0) > 0} />
            </ChatBubble>
          )}

          {step === "endoPcos" && (
            <ChatBubble
              role="consultant"
              question="Thank you for sharing. One more — do you also have PCOS alongside this?"
            >
              <OptionGrid
                options={["Yes, I have both", "No, just this"]}
                onPick={(val) => {
                  setAnswers((a) => ({ ...a, endoHasPcos: val.startsWith("Yes") ? "Yes" : "No" }));
                  goNext();
                }}
              />
              <NavButtons onBack={goBack} hideNext />
            </ChatBubble>
          )}

          {step === "cycle" && (
            <ChatBubble
              role="consultant"
              question="Tell me a little about your cycle."
              hint="This helps me understand your rhythm — skip anything you're not sure about."
            >
              <FieldGroup>
                <OptionRow
                  label="How long is your cycle, usually?"
                  options={["Under 25 days", "25–28 days", "28–32 days", "Over 32 days", "Very irregular", "I don't track"]}
                  value={answers.cycleLength}
                  onChange={(v) => setAnswers((a) => ({ ...a, cycleLength: v }))}
                />
                <OptionRow
                  label="Is it regular?"
                  options={["Like clockwork", "Mostly regular", "Often irregular", "I'm not sure"]}
                  value={answers.cycleRegularity}
                  onChange={(v) => setAnswers((a) => ({ ...a, cycleRegularity: v }))}
                />
                <OptionRow
                  label="Period pain?"
                  options={["None", "Mild", "Moderate", "Severe / debilitating"]}
                  value={answers.periodPain}
                  onChange={(v) => setAnswers((a) => ({ ...a, periodPain: v }))}
                />
                <OptionRow
                  label="How is your flow?"
                  options={["Light", "Moderate", "Heavy", "Heavy with clots", "Very light or absent"]}
                  value={answers.flow}
                  onChange={(v) => setAnswers((a) => ({ ...a, flow: v }))}
                />
              </FieldGroup>
              <NavButtons onBack={goBack} onNext={goNext} canNext />
            </ChatBubble>
          )}

          {step === "lifestyle" && (
            <ChatBubble
              role="consultant"
              question="And how is life feeling right now?"
              hint="Stress, sleep and energy all touch the womb. Be honest with yourself here."
            >
              <FieldGroup>
                <OptionRow
                  label="Stress levels"
                  options={["Calm", "Manageable", "High", "Burnt out"]}
                  value={answers.stress}
                  onChange={(v) => setAnswers((a) => ({ ...a, stress: v }))}
                />
                <OptionRow
                  label="Sleep"
                  options={["Restful", "Okay", "Restless", "Poor"]}
                  value={answers.sleep}
                  onChange={(v) => setAnswers((a) => ({ ...a, sleep: v }))}
                />
                <OptionRow
                  label="Energy"
                  options={["Good", "Up and down", "Often tired", "Exhausted"]}
                  value={answers.energy}
                  onChange={(v) => setAnswers((a) => ({ ...a, energy: v }))}
                />
              </FieldGroup>
              <NavButtons onBack={goBack} onNext={goNext} canNext />
            </ChatBubble>
          )}

          {step === "ttc" && (
            <ChatBubble
              role="consultant"
              question="Are you trying to conceive? If so, for how long?"
            >
              <OptionGrid
                options={[
                  "Not trying right now",
                  "Just started (under 3 months)",
                  "3–6 months",
                  "6–12 months",
                  "1–2 years",
                  "Over 2 years",
                ]}
                onPick={(v) => {
                  setAnswers((a) => ({ ...a, ttcTimeline: v }));
                  goNext();
                }}
              />
              <NavButtons onBack={goBack} hideNext />
            </ChatBubble>
          )}

          {step === "age" && (
            <ChatBubble role="consultant" question="May I ask your age range?">
              <OptionGrid
                options={["Under 25", "25–30", "31–35", "36–40", "41–45", "Over 45"]}
                onPick={(v) => {
                  setAnswers((a) => ({ ...a, ageRange: v }));
                  goNext();
                }}
              />
              <NavButtons onBack={goBack} hideNext />
            </ChatBubble>
          )}

          {step === "medication" && (
            <ChatBubble
              role="consultant"
              question="Last one — are you currently on any medication?"
              hint="So we can keep your remedy safe alongside what you're already taking."
            >
              <OptionGrid
                options={["Yes", "No"]}
                onPick={(v) => {
                  setAnswers((a) => ({ ...a, medication: v as "Yes" | "No" }));
                  if (v === "No") goNext();
                }}
                selected={answers.medication}
              />
              {answers.medication === "Yes" && (
                <div className="mt-5">
                  <label className="text-sm text-ink">Please share what you're taking</label>
                  <textarea
                    rows={3}
                    value={answers.medicationDetail ?? ""}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, medicationDetail: e.target.value }))
                    }
                    className="mt-1.5 w-full rounded-2xl border border-border bg-cream px-4 py-3 outline-none focus:border-sage-deep transition"
                    placeholder="e.g. Metformin, Letrozole…"
                  />
                </div>
              )}
              <NavButtons
                onBack={goBack}
                onNext={goNext}
                canNext={answers.medication === "No" || answers.medication === "Yes"}
                nextLabel="See my remedy →"
              />
            </ChatBubble>
          )}

          {step === "result" && (
            <ResultStep
              result={result}
              answers={answers}
              onReset={reset}
              products={products}
            />
          )}

          <div ref={bottomRef} />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────

function symptomsQuestion(c: Concern): string {
  switch (c) {
    case "PCOS":
      return "PCOS shows up so differently for every woman. Which of these do you experience?";
    case "Endometriosis":
      return "Endo can be heavy to carry. Which of these resonate with you?";
    case "Fibroids":
      return "Which of these symptoms have you been noticing?";
    case "Blocked fallopian tubes":
      return "Which of these have you been experiencing?";
    case "Recurring miscarriages":
      return "I'm so sorry. To support you well, which of these apply?";
    case "Low progesterone":
      return "Low progesterone has gentle clues. Which feel familiar?";
    case "Irregular periods":
      return "Tell me a little more — which apply to you?";
    case "Pregnancy care":
      return "What would you like extra support with?";
    case "Postpartum and breastfeeding":
      return "How are you feeling in this season?";
    case "Male fertility":
      return "Which of these are showing up?";
    default:
      return "Which of these resonate?";
  }
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-4 sm:py-6">
      <p className="font-serif text-2xl sm:text-3xl text-ink leading-snug max-w-xl mx-auto">
        "Hi love, I'm here to listen. Let's find the remedy your body is asking for —
        together, gently."
      </p>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm">
        A few thoughtful questions — about 2 minutes. Free, private, and no pressure to buy.
      </p>
      <button
        onClick={onStart}
        className="mt-8 rounded-full bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition shadow-[var(--shadow-soft)]"
      >
        Begin the conversation →
      </button>
    </div>
  );
}

function ChatBubble({
  role,
  question,
  hint,
  children,
}: {
  role: "consultant" | "you";
  question: string;
  hint?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        {role === "consultant" && (
          <div className="shrink-0 h-9 w-9 rounded-full bg-sage/30 border border-sage-deep/20 flex items-center justify-center text-sage-deep font-serif">
            G
          </div>
        )}
        <div className="flex-1 max-w-[90%] rounded-3xl rounded-tl-sm bg-blush/30 border border-border px-5 py-4">
          <p className="font-serif text-lg sm:text-xl text-ink leading-snug">{question}</p>
          {hint && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{hint}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-12">{children}</div>
    </div>
  );
}

function YouBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-3xl rounded-tr-sm bg-sage/15 border border-sage-deep/20 px-4 py-2.5 text-sm text-ink">
        {text}
      </div>
    </div>
  );
}

function Transcript({
  answers,
  steps,
  currentIndex,
}: {
  answers: Answers;
  steps: StepKey[];
  currentIndex: number;
}) {
  // Build a list of past consultant question + your answer pairs to show as transcript.
  const pastSteps = steps.slice(0, currentIndex).filter((s) => s !== "intro");

  const lines: { q: string; a: string }[] = [];
  for (const s of pastSteps) {
    if (s === "concern" && answers.concern) {
      lines.push({ q: "What is bringing you here today?", a: answers.concern });
    } else if (s === "symptoms" && answers.symptoms?.length) {
      lines.push({ q: "Which symptoms do you experience?", a: answers.symptoms.join(", ") });
    } else if (s === "endoPcos" && answers.endoHasPcos) {
      lines.push({
        q: "Do you also have PCOS?",
        a: answers.endoHasPcos === "Yes" ? "Yes, I have both" : "No, just this",
      });
    } else if (s === "cycle") {
      const parts = [
        answers.cycleLength && `Cycle: ${answers.cycleLength}`,
        answers.cycleRegularity && `Regularity: ${answers.cycleRegularity}`,
        answers.periodPain && `Pain: ${answers.periodPain}`,
        answers.flow && `Flow: ${answers.flow}`,
      ].filter(Boolean) as string[];
      if (parts.length) lines.push({ q: "About your cycle", a: parts.join(" · ") });
    } else if (s === "lifestyle") {
      const parts = [
        answers.stress && `Stress: ${answers.stress}`,
        answers.sleep && `Sleep: ${answers.sleep}`,
        answers.energy && `Energy: ${answers.energy}`,
      ].filter(Boolean) as string[];
      if (parts.length) lines.push({ q: "About your life right now", a: parts.join(" · ") });
    } else if (s === "ttc" && answers.ttcTimeline) {
      lines.push({ q: "Trying to conceive?", a: answers.ttcTimeline });
    } else if (s === "age" && answers.ageRange) {
      lines.push({ q: "Age range", a: answers.ageRange });
    } else if (s === "medication" && answers.medication) {
      lines.push({
        q: "Currently on any medication?",
        a:
          answers.medication === "Yes" && answers.medicationDetail
            ? `Yes — ${answers.medicationDetail}`
            : answers.medication,
      });
    }
  }

  if (lines.length === 0) return null;

  return (
    <div className="mb-6 space-y-3 opacity-80">
      {lines.map((l, i) => (
        <div key={i} className="space-y-1.5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground pl-12">
            {l.q}
          </p>
          <YouBubble text={l.a} />
        </div>
      ))}
    </div>
  );
}

function OptionGrid({
  options,
  onPick,
  selected,
}: {
  options: string[];
  onPick: (val: string) => void;
  selected?: string;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onPick(o)}
          className={`text-left rounded-2xl border px-5 py-4 transition ${
            selected === o
              ? "border-sage-deep bg-sage/15"
              : "border-border bg-cream hover:border-sage-deep hover:bg-sage/10"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function MultiSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (o: string) => {
    if (value.includes(o)) onChange(value.filter((x) => x !== o));
    else onChange([...value, o]);
  };
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {options.map((o) => {
        const active = value.includes(o);
        return (
          <button
            key={o}
            onClick={() => toggle(o)}
            className={`flex items-center gap-3 text-left rounded-2xl border px-4 py-3 transition ${
              active
                ? "border-sage-deep bg-sage/15"
                : "border-border bg-cream hover:border-sage-deep hover:bg-sage/10"
            }`}
          >
            <span
              className={`shrink-0 h-5 w-5 rounded-md border flex items-center justify-center transition ${
                active ? "bg-sage-deep border-sage-deep text-white" : "border-border bg-card"
              }`}
              aria-hidden
            >
              {active && (
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="text-sm">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

function OptionRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm text-ink mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-sage-deep bg-sage/15 text-ink"
                  : "border-border bg-cream text-ink/80 hover:border-sage-deep"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  canNext,
  hideNext,
  nextLabel = "Continue →",
}: {
  onBack: () => void;
  onNext?: () => void;
  canNext?: boolean;
  hideNext?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-sage-deep underline-offset-4 hover:underline"
      >
        ← Back
      </button>
      {!hideNext && onNext && (
        <button
          onClick={onNext}
          disabled={!canNext}
          className="rounded-full bg-primary text-primary-foreground px-7 py-3 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Result
// ────────────────────────────────────────────────────────────────────────────

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
          <p className="mt-3 font-serif text-2xl text-ink text-center">
            {result.addOnHeading ?? "Recommended to use with this kit"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-lg mx-auto">
            {result.addOnIntro ?? "These complementary remedies deepen and accelerate your results, chosen specifically for your concern."}
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
