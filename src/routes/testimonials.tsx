import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";
import lifestyleSide from "@/assets/lifestyle-tinctures.jpg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Stories — GaiaBerry" },
      { name: "description", content: "Real stories from women who found their path with GaiaBerry's natural fertility remedies." },
    ],
  }),
  component: Testimonials,
});

const stories = [
  { quote: "After two years of trying, the Remedy Finder pointed me to a routine that worked. I'm now 16 weeks pregnant and full of gratitude.", name: "Amara O.", role: "Conception Companion", location: "Lagos" },
  { quote: "My cycles regulated within three months. I finally feel held by something that understands PCOS, not just medicates it.", name: "Ifeoma A.", role: "PCOS Reset Kit", location: "Abuja" },
  { quote: "The consultation felt like therapy and herbalism combined. Truly personal and gentle.", name: "Lara K.", role: "1:1 Consultation", location: "London" },
  { quote: "I never thought a tea could change my life. The cramps that ruled me are now barely there.", name: "Chiamaka E.", role: "Cycle Soothe Tea", location: "Nairobi" },
  { quote: "My hormones felt like they were screaming. Now they whisper. Thank you, GaiaBerry.", name: "Sade M.", role: "Hormone Harmony Powder", location: "Accra" },
  { quote: "The team treated my journey with such reverence. I felt seen, not sold to.", name: "Priya R.", role: "Conception Companion", location: "Mumbai" },
];

function Testimonials() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Stories of becoming</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">Words from the women we walk with.</h1>
          <p className="mt-5 text-muted-foreground">Each story is shared with permission and held with care.</p>
        </div>
        {/* soft lifestyle divider */}
        <div className="mt-12 relative rounded-[2rem] overflow-hidden h-36 md:h-48">
          <img
            src={lifestyleSide}
            alt="GaiaBerry herbal tinctures in soft natural light"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0.018_25/0.2)_0%,oklch(0.97_0.018_25/0.5)_100%)]" />
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {stories.map((s, i) => (
            <figure key={i} className={`rounded-[2rem] p-10 ${i % 2 === 0 ? "bg-blush/30" : "bg-sage/15"}`}>
              <div className="text-sage-deep font-serif text-5xl leading-none">"</div>
              <blockquote className="mt-2 font-serif text-2xl leading-snug text-ink">{s.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cream grid place-items-center font-serif text-lg text-sage-deep">
                  {s.name[0]}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-ink">{s.name} · {s.location}</div>
                  <div className="text-muted-foreground">{s.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link to="/remedy-finder" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition">
            Begin your story →
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
