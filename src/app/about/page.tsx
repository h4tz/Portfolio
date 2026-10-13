import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { experience, education, skills } from "@/content/experience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hari Tiwari — software engineer focused on backend systems, full-stack products, and AI workflows. Experience, skills, and resume.",
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        {/* intro */}
        <header className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label text-text-mute">
              <span className="text-accent">About</span>
            </p>
            <h1 className="display mt-6 text-[clamp(2rem,5vw,3.5rem)] text-text">
              I build useful software and care about the parts that make it hold
              up.
            </h1>
            <p className="measure mt-6 leading-relaxed text-text-dim">
              I&apos;m {site.name}, a software engineer with 2+ years across
              frontend, full-stack product engineering, backend systems, and AI
              automation. I&apos;ve built for marketplaces, healthcare, and
              content workflows — from React interfaces and Django APIs to
              enterprise integrations and AWS event-driven services.
            </p>
            <p className="measure mt-4 leading-relaxed text-text-dim">
              I care about efficient delivery, maintainable architecture, and
              performance — including {site.headlineMetric.toLowerCase()}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
              >
                Download resume <span aria-hidden>↓</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-line bg-bg-raised p-6">
              <dl className="space-y-4 text-sm">
                <Row term="Location" value={`${site.location} · ${site.availability[0]}`} />
                <Row term="Status" value={site.availability[2]} accent />
                <Row term="Phone" value={site.phone} href={`tel:${site.phoneHref}`} />
                <Row term="GitHub" value={`@${site.githubHandle}`} href={site.github} />
                <Row term="LinkedIn" value={`in/${site.linkedinHandle}`} href={site.linkedin} />
              </dl>
            </div>
          </div>
        </header>

        {/* experience */}
        <div className="mt-20">
          <h2 className="label text-text-mute">
            <span className="text-accent">01</span>
            <span className="mx-2 text-line-strong">/</span>Experience
          </h2>
          <ol className="mt-8 border-l border-line">
            {experience.map((role, i) => (
              <Reveal key={role.company + role.period} as="li" delay={i * 60}>
                <div className="relative pb-10 pl-8 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border border-bg bg-accent"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-text">
                      {role.role}
                      <span className="text-text-mute"> · {role.company}</span>
                    </h3>
                    <p className="label shrink-0 text-text-mute">{role.period}</p>
                  </div>
                  <p className="measure mt-2 text-sm leading-relaxed text-text-dim">
                    {role.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {role.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm text-text-dim">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-strong" aria-hidden />
                        <span className="measure leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {role.tech.map((t) => (
                      <li key={t} className="rounded-full border border-line px-2.5 py-1 label text-text-mute">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* skills */}
        <div className="mt-20">
          <h2 className="label text-text-mute">
            <span className="text-accent">02</span>
            <span className="mx-2 text-line-strong">/</span>Skills
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="text-text">{group}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-1 label text-text-mute">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* education */}
        <div className="mt-20">
          <h2 className="label text-text-mute">
            <span className="text-accent">03</span>
            <span className="mx-2 text-line-strong">/</span>Education
          </h2>
          <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-text">{education.degree}</p>
              <p className="text-sm text-text-dim">{education.school}</p>
            </div>
            <p className="label text-text-mute">{education.period}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Row({
  term,
  value,
  href,
  accent = false,
}: {
  term: string;
  value: string;
  href?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-text-mute">{term}</dt>
      <dd
        className={`text-right ${
          accent
            ? "flex items-center gap-2 text-accent"
            : href
              ? "text-text-dim"
              : "text-text-dim"
        }`}
      >
        {accent && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
        {href ? (
          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="link-underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
