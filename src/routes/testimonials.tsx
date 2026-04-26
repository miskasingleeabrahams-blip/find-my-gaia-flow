import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Section";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Reviews — GaiaBerry" },
      { name: "description", content: "Real WhatsApp testimonials from women across South Africa and abroad who walked their fertility journey with GaiaBerry." },
    ],
  }),
  component: Testimonials,
});

// Real WhatsApp testimonial screenshots pulled from gaiaberry.co.za/reviews.
// We request a larger crop (w_900) so the messages are legible in the gallery.
const buildSrc = (id: string, ext: "png" | "jpg" = "png") =>
  `https://static.wixstatic.com/media/7decc0_${id}~mv2.${ext}/v1/fill/w_900,h_1600,al_c,q_90,enc_auto/7decc0_${id}~mv2.${ext}`;

const screenshots: { id: string; ext?: "png" | "jpg" }[] = [
  { id: "1193e529e09145b699f7f774ba86b4d7" },
  { id: "96689a322ea8470c8927fe7c656adfd5" },
  { id: "f241b347760d495ba54326d846cd083d" },
  { id: "0e76492f6d764a1fa00282c51b3850fb" },
  { id: "0d688b0a4b334a558d3546e36221736f" },
  { id: "bd877bb6088e488c8bf4eebbd7ac17ce" },
  { id: "a40b85ab1f094c3facbcefeb4549e602" },
  { id: "8b47db01e0d74636842b48ad0d72da91" },
  { id: "220e7eef79db4f1d8a26f525b16e17c0" },
  { id: "e8d42fa61d7a47e6bddb6eb1b116972b" },
  { id: "dff39b618b794c63ab5f6ed51fa47806" },
  { id: "632dfc6606bf45a6800f636009ea5cf3" },
  { id: "26a75d4f4fcf42baa8bed63939a373c4", ext: "jpg" },
  { id: "3cb1c8c5c32a439b91a5df43d6c8f103" },
  { id: "25a116c841984c3e968585d93d43336c" },
  { id: "8fb69479f47248a68bf2fa2ff17627a0", ext: "jpg" },
  { id: "84fb5b58159740c890a59e1cebffbad5" },
  { id: "5669d203ac3d49c8bfeff30790070812" },
  { id: "efe9e29d038346e793ca28961b80d3bf" },
  { id: "71598f1c503341eb89e103728ff7713c" },
  { id: "44d7a6d983c54a319db52cb9c4db79a0" },
  { id: "d615d5a30b5c4a128b807ab49efca843" },
  { id: "3b6bf8d1ae4f4defb6818430fd6e6022" },
  { id: "b0d773e18ab34ca5a360e39de3cf4014", ext: "jpg" },
  { id: "25213e6d7bc34b3e97fc5425a127394a" },
  { id: "e41e287ca9c547009c654b01304994cb" },
  { id: "675db4ed36404d15b656311de28eeb58", ext: "jpg" },
  { id: "77fa52d63b034964b8603a001f22828f" },
  { id: "78f9a74b57974d2b9c2b78cc99a31e0b" },
  { id: "6a58dc4956cf43daabce6b93857405cd", ext: "jpg" },
  { id: "8bcf97370a8243d381bd5ac5618221c5" },
  { id: "62dd70be6c744515aaa38da86fe46970" },
  { id: "ca7b80c18fca470d8d11ef7b94ff2d74", ext: "jpg" },
  { id: "9ffa6735415e449bb01a3e61ffd52e79", ext: "jpg" },
  { id: "5182fe60efdb4355a5ca732eddf9287a", ext: "jpg" },
  { id: "8528b910a3e2470a87a1ceeceac61a83", ext: "jpg" },
  { id: "817d37ec54ed47f6a93b0ce717961a0c" },
  { id: "c7a2ee44bc104acbb59a6be3ddb9eca2" },
  { id: "fedbd4d62f2d4814aca1e092c0ecb9e7" },
  { id: "eda2b2aec57e4837b409bf1b8658660d" },
  { id: "f5abd733f365451b8d868cfff5eb54ad", ext: "jpg" },
  { id: "3545aaf7d0084e928f0da4d4183d2113", ext: "jpg" },
];

function Testimonials() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Reviews</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">
            A few WhatsApp testimonials from the ladies themselves.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Real messages from women across South Africa and abroad. Shared with permission, held with care.
          </p>
          <p className="mt-4 text-sage-deep font-medium">
            GaiaBerry has helped thousands of women across South Africa conceive naturally. 🌿
          </p>
        </div>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {screenshots.map((s, i) => (
            <figure
              key={s.id}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-cream shadow-[var(--shadow-soft)] border border-border"
            >
              <img
                src={buildSrc(s.id, s.ext)}
                alt={`WhatsApp testimonial from a GaiaBerry customer (${i + 1})`}
                loading="lazy"
                className="w-full h-auto block"
              />
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          We at GaiaBerry are forever grateful to be part of your journeys. 🌿
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/remedy-finder"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 hover:opacity-90 transition"
          >
            Begin your story →
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
