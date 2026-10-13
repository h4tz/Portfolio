import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const includes = [
  "Mobile-first design",
  "Services, gallery & proof",
  "WhatsApp & enquiry capture",
  "SEO fundamentals",
  "Hosting setup",
];

export function StoreTeaser() {
  return (
    <section id="store" className="scroll-mt-24 border-b border-line py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label text-text-mute">
                <span className="text-accent">03</span>
                <span className="mx-2 text-line-strong">/</span>Digital Store
              </p>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.75rem)]">
                <span className="sans-display text-text">
                  Websites for small businesses,
                </span>{" "}
                <span className="serif italic-accent">productized.</span>
              </h2>
              <p className="measure mt-6 leading-relaxed text-text-dim">
                A fixed-scope, done-for-you website for local businesses —
                services, proof of work, gallery, offers, and a direct line via
                WhatsApp or enquiry. One product, many businesses.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/store"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
                >
                  Explore the Store
                </Link>
                <a
                  href="https://digital-store-tan-six.vercel.app/s/herbal-parlour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
                >
                  View live example <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div className="rounded-sm border border-line bg-bg-raised p-8">
                <p className="label text-text-mute">What&apos;s included</p>
                <ul className="mt-5 divide-y divide-line">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 py-3 text-text-dim"
                    >
                      <span className="text-accent" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-5 text-sm text-text-mute">
                  Pricing on request — scoped per business.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
