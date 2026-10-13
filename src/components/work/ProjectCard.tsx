import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusPill } from "@/components/ui/StatusPill";
import { TechTags } from "@/components/ui/TechTags";

/** Deterministic duotone per slug so the grid has variety without hand-tuned art. */
const duotones = [
  "from-[#2a1f16] via-[#1a1712] to-[#0e0d0c]",
  "from-[#16202a] via-[#12161a] to-[#0c0e0e]",
  "from-[#241622] via-[#17121a] to-[#0d0c0e]",
  "from-[#1f2416] via-[#161a12] to-[#0d0e0c]",
  "from-[#2a2116] via-[#1a1712] to-[#0e0d0c]",
];
function duotone(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return duotones[h % duotones.length];
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-bg-raised transition-colors duration-300 hover:-translate-y-1 hover:border-line-strong">
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-1 flex-col p-6 focus-visible:outline-none"
      >
        {/* visual: screenshot or duotone typographic plate */}
        <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-line">
          {project.visual ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.visual}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${duotone(
                project.slug,
              )}`}
            >
              <span
                aria-hidden
                className="display select-none text-7xl text-text/15 transition-colors duration-300 group-hover:text-accent/30"
              >
                {project.name.charAt(0)}
              </span>
              {/* faint grid lines for texture */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#ecebe8_1px,transparent_1px),linear-gradient(to_bottom,#ecebe8_1px,transparent_1px)] [background-size:28px_28px]"
              />
            </div>
          )}
        </div>

        <div className="mb-3 flex items-center gap-3">
          <StatusPill status={project.status} />
          <span className="label text-text-mute">{project.category}</span>
        </div>

        <h3 className="sans-display text-xl text-text transition-colors group-hover:text-accent">
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
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
