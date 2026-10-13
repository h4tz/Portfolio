import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getAllProjects, getAdjacent, getProject } from "@/lib/projects";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — Hari Tiwari`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <nav className="mb-10" aria-label="Breadcrumb">
          <Link
            href="/work"
            className="link-underline text-sm text-text-dim hover:text-text"
          >
            ← All projects
          </Link>
        </nav>

        <CaseStudy project={project} />

        {/* prev / next */}
        <nav
          aria-label="Project navigation"
          className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-sm border border-line p-5 transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              <p className="label text-text-mute">← Previous</p>
              <p className="mt-2 text-text transition-colors group-hover:text-accent">
                {prev.name}
              </p>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-sm border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              <p className="label text-text-mute">Next →</p>
              <p className="mt-2 text-text transition-colors group-hover:text-accent">
                {next.name}
              </p>
            </Link>
          )}
        </nav>
      </Container>
    </section>
  );
}
