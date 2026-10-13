import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ArchiveExplorer } from "@/components/work/ArchiveExplorer";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects and case studies — backend systems, web apps, integrations, and AI workflows by Hari Tiwari.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <header className="mb-10 max-w-3xl">
          <p className="label text-text-mute">
            <span className="text-accent">01</span>
            <span className="mx-2 text-line-strong">/</span>Work
          </p>
          <h1 className="display mt-6 text-[clamp(2rem,5vw,3.5rem)] text-text">
            Projects & case studies
          </h1>
          <p className="measure mt-5 leading-relaxed text-text-dim">
            Backend systems, web apps, integrations, and AI workflows. Each one
            covers the problem, my contribution, the architecture, and what came
            out of it. Filter or search below.
          </p>
        </header>

        <ArchiveExplorer projects={projects} />
      </Container>
    </section>
  );
}
