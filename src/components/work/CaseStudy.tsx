import type { Project } from "@/content/projects";
import { StatusPill } from "@/components/ui/StatusPill";
import { TechTags } from "@/components/ui/TechTags";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article>
      {/* header */}
      <header className="border-b border-line pb-12">
        <p className="label text-text-mute">
          <span className="text-accent">{project.category}</span>
          <span className="mx-2 text-line-strong">·</span>
          {project.date}
        </p>
        <h1 className="display mt-5 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] text-text">
          {project.name}
        </h1>
        <p className="measure mt-6 text-[clamp(1.1rem,1.8vw,1.4rem)] leading-relaxed text-text-dim">
          {project.summary}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <StatusPill status={project.status} />
          <span className="label text-text-mute">{project.role}</span>
        </div>
      </header>

      {/* body: content + sticky meta */}
      <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <Block label="The problem">
            <p className="measure leading-relaxed text-text-dim">
              {project.problem}
            </p>
          </Block>

          <Block label="My contribution">
            <p className="measure leading-relaxed text-text-dim">
              {project.contribution}
            </p>
          </Block>

          <Block label="Architecture & decisions">
            <ul className="space-y-3">
              {project.architecture.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="label mt-1 shrink-0 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="measure leading-relaxed text-text-dim">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Outcome">
            {project.outcome ? (
              <p className="measure leading-relaxed text-text">{project.outcome}</p>
            ) : (
              <p className="measure leading-relaxed text-text-mute">
                This one is still in progress or kept private — no measured
                outcome to report yet. I&apos;d rather say that than invent a
                number.
              </p>
            )}
          </Block>
        </div>

        {/* sticky meta sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="rounded-sm border border-line bg-bg-raised p-6">
              <p className="label mb-3 text-text-mute">Stack</p>
              <TechTags items={project.stack} />

              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <MetaRow term="Role" value={project.role} />
                <MetaRow term="Category" value={project.category} />
                <MetaRow term="Status" value={project.status} />
              </dl>

              <div className="mt-6 space-y-2 border-t border-line pt-5">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-sm border border-line px-4 py-2.5 text-sm text-text transition-colors hover:border-line-strong hover:bg-bg-sunken"
                  >
                    Live demo <span aria-hidden>↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-sm border border-line px-4 py-2.5 text-sm text-text transition-colors hover:border-line-strong hover:bg-bg-sunken"
                  >
                    View repository <span aria-hidden>↗</span>
                  </a>
                )}
                <a
                  href={`mailto:hari.anant777@gmail.com?subject=${encodeURIComponent(
                    `Enquiry — ${project.name}`,
                  )}`}
                  className="flex items-center justify-between rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
                >
                  Ask about this project <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="label mb-4 text-text-mute">{label}</h2>
      {children}
    </section>
  );
}

function MetaRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-text-mute">{term}</dt>
      <dd className="text-right text-text-dim">{value}</dd>
    </div>
  );
}
