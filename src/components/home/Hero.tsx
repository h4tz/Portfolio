import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative border-b border-line py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <p className="label text-text-mute">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden />
            Independent Engineer
            <span className="mx-2 text-line-strong">·</span>
            {site.availability[1]}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] text-text">
            {site.tagline}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="measure mt-8 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-text-dim">
            {site.intro}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
            >
              Start a conversation
            </a>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              View selected work
            </Link>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <dl className="mt-16 grid grid-cols-2 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            <Meta label="Based in" value={site.location} />
            <Meta label="Mode" value={site.availability[0]} />
            <Meta label="Status" value={site.availability[2]} accent />
            <Meta label="Focus" value={site.disciplines.join(" · ")} />
          </dl>
        </Reveal>
      </Container>
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
