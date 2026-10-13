import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Digital Store",
  description:
    "Productized, done-for-you websites for small businesses — built and shipped by Hari Tiwari.",
};

const includes = [
  { title: "Mobile-first design", detail: "Looks right on phones first, then scales up." },
  { title: "Services, gallery & proof", detail: "Show what you offer and why people should trust you." },
  { title: "Offers & pricing", detail: "Highlight current offers and clear pricing." },
  { title: "Hours, location & contact", detail: "Everything a customer needs to reach you." },
  { title: "WhatsApp & enquiries", detail: "Direct deep-links and a simple enquiry flow." },
  { title: "SEO fundamentals", detail: "Titles, structure, and speed so you can be found." },
  { title: "Hosting setup", detail: "Deployed and live — not just handed over." },
];

const steps = [
  { n: "01", title: "Tell me about the business", detail: "What you do, who you serve, and what you want on the site." },
  { n: "02", title: "I build it", detail: "A focused, productized build — no bloated custom scope." },
  { n: "03", title: "Review & go live", detail: "You review, we refine, and it ships to your domain." },
];

export default function StorePage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <header className="max-w-3xl">
          <p className="label text-text-mute">
            <span className="text-accent">Digital Store</span>
          </p>
          <h1 className="display mt-6 text-[clamp(2.25rem,6vw,4.5rem)] text-text">
            A professional website for your business — productized.
          </h1>
          <p className="measure mt-6 text-[clamp(1.1rem,1.8vw,1.4rem)] leading-relaxed text-text-dim">
            For local businesses that need a credible online presence without a
            heavy custom build. Fixed scope, done for you, shipped live.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Digital Store enquiry")}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
            >
              Get a quote
            </a>
            <a
              href="https://digital-store-tan-six.vercel.app/s/herbal-parlour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              View live example <span aria-hidden>↗</span>
            </a>
          </div>
        </header>

        {/* live example preview */}
        <Reveal>
          <div className="mt-16 overflow-hidden rounded-sm border border-line bg-bg-raised">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
              <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
              <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
              <span className="ml-3 label text-text-mute">
                digital-store-tan-six.vercel.app/s/herbal-parlour
              </span>
            </div>
            <div className="grid place-items-center px-6 py-16 text-center sm:py-24">
              <div>
                <p className="label text-text-mute">Live example</p>
                <p className="display mt-4 text-[clamp(1.5rem,3vw,2.5rem)] text-text">
                  Herbal Beauty Parlour
                </p>
                <p className="measure mt-4 mx-auto text-sm leading-relaxed text-text-dim">
                  A real, deployed store — services, gallery, reviews, offers,
                  and WhatsApp contact in a single page.
                </p>
                <a
                  href="https://digital-store-tan-six.vercel.app/s/herbal-parlour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-6 inline-block text-sm text-accent"
                >
                  Open the live site ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* what's included */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="label text-text-mute">What&apos;s included</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {includes.map((item) => (
                <li key={item.title} className="flex gap-4 py-4">
                  <span className="mt-0.5 text-accent" aria-hidden>✓</span>
                  <div>
                    <p className="text-text">{item.title}</p>
                    <p className="mt-0.5 text-sm text-text-dim">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="label text-text-mute">How it works</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="label mt-1 shrink-0 text-accent">{s.n}</span>
                  <div>
                    <p className="text-text">{s.title}</p>
                    <p className="mt-0.5 text-sm text-text-dim">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-sm border border-line bg-bg-raised p-6">
              <p className="label text-text-mute">Pricing</p>
              <p className="mt-2 text-text">Priced per business.</p>
              <p className="mt-1 text-sm text-text-dim">
                Scoped to what you actually need — get in touch for a quote.
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Digital Store enquiry")}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
              >
                Get a quote <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
