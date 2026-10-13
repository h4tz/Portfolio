import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Magnetic } from "@/components/ui/Magnetic";

const ticker = [
  "Python / Django",
  "FastAPI",
  "Next.js / React",
  "AI workflows",
  "Third-party integrations",
  "Backend systems",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <Container>
        <div className="pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="label text-text-mute">
              <span
                className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle"
                aria-hidden
              />
              Independent Engineer
              <span className="mx-2 text-line-strong">·</span>
              {site.availability[1]}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-8 text-[clamp(2.75rem,8.5vw,7.5rem)]">
              <span className="sans-display block text-text">
                I build useful
              </span>
              <span className="block text-text">
                <span className="serif">digital products,</span>{" "}
                <span className="italic-accent">backend systems,</span>
              </span>
              <span className="block text-text">
                integrations{" "}
                <span className="serif text-text-mute">&amp;</span>{" "}
                <span className="serif">AI workflows</span>
                <span className="caret" aria-hidden />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
              <p className="measure md:col-span-7 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-text-dim">
                {site.intro}
              </p>

              <div className="md:col-span-5 md:justify-self-end">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Magnetic>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        "Project enquiry",
                      )}`}
                      className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
                    >
                      Start a conversation
                    </a>
                  </Magnetic>
                  <Link
                    href="/work"
                    className="draw-underline inline-flex items-center justify-center gap-2 px-1 py-3 text-sm font-medium text-text"
                  >
                    View selected work
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-16 grid grid-cols-2 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              <Meta label="Based in" value={site.location} />
              <Meta label="Mode" value={site.availability[0]} />
              <Meta label="Status" value={site.availability[2]} accent />
              <Meta label="Focus" value={site.disciplines.join(" · ")} />
            </dl>
          </Reveal>
        </div>
      </Container>

      {/* signature: scrolling discipline ticker */}
      <div className="border-t border-line bg-bg-sunken py-4">
        <Marquee duration={38}>
          {ticker.map((t) => (
            <span
              key={t}
              className="flex items-center gap-6 whitespace-nowrap px-6 text-sm text-text-dim"
            >
              <span className="serif text-[1.35rem] italic text-text">{t}</span>
              <span className="text-accent" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Meta({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="label text-text-mute">{label}</dt>
      <dd
        className={`mt-1.5 text-sm ${
          accent ? "flex items-center gap-2 text-accent" : "text-text-dim"
        }`}
      >
        {accent && (
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        )}
        {value}
      </dd>
    </div>
  );
}
