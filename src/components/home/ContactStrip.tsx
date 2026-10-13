import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ContactStrip() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="label text-text-mute">
            <span className="text-accent">05</span>
            <span className="mx-2 text-line-strong">/</span>Contact
          </p>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2rem,5vw,3.75rem)] text-text">
            Have something to build? Let&apos;s talk.
          </h2>
          <p className="measure mt-6 leading-relaxed text-text-dim">
            Freelance project, a full-time role, or a quick technical question —
            email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
