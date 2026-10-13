import Link from "next/link";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured && p.approvedForPublic);

  return (
    <section id="work" className="scroll-mt-24 border-b border-line py-24 sm:py-32">
      <Container>
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <p className="label text-text-mute">
            <span className="text-accent">02</span>
            <span className="mx-2 text-line-strong">/</span>Selected work
          </p>
          <Link
            href="/work"
            className="draw-underline text-sm text-text-dim hover:text-text"
          >
            All projects →
          </Link>
        </div>

        <Reveal>
          <h2 className="max-w-3xl text-[clamp(1.9rem,4.5vw,3.25rem)]">
            <span className="sans-display text-text">A few things I&apos;ve</span>{" "}
            <span className="serif italic-accent">shipped.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
