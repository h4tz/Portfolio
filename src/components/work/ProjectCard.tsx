import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusPill } from "@/components/ui/StatusPill";
import { TechTags } from "@/components/ui/TechTags";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-bg-raised transition-colors duration-200 hover:border-line-strong">
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-1 flex-col p-6 focus-visible:outline-none"
      >
        {/* visual: screenshot or flat typographic placeholder */}
        <div className="mb-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-line bg-bg-sunken">
          {project.visual ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.visual}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="display select-none text-5xl text-line-strong">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="mb-3 flex items-center gap-3">
          <StatusPill status={project.status} />
          <span className="label text-text-mute">{project.category}</span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-dim">
          {project.summary}
        </p>

        <div className="mt-5 flex-1">
          <TechTags items={project.stack.slice(0, 4)} />
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-text-dim transition-colors group-hover:text-accent">
          Read case study
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
