"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory, ProjectStatus } from "@/content/projects";
import { categories, statuses } from "@/content/projects";
import { filterProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

export function ArchiveExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");

  const results = useMemo(
    () => filterProjects(projects, { query, category, status }),
    [projects, query, category, status],
  );

  const hasFilters = query.trim() !== "" || category !== "All" || status !== "All";

  return (
    <div>
      {/* controls */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 mb-8 border-b border-line bg-bg/80 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* search */}
            <div className="relative flex-1">
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-mute"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
                  <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, stack, keywords…"
                aria-label="Search projects"
                className="w-full rounded-full border border-line bg-bg-raised py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-mute focus:border-line-strong focus:outline-none"
              />
            </div>

            {/* result count */}
            <p className="label shrink-0 text-text-mute" aria-live="polite">
              {results.length} / {projects.length} projects
            </p>
          </div>

          {/* filter pills */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <PillGroup
              label="Category"
              options={["All", ...categories]}
              active={category}
              onChange={(v) => setCategory(v as ProjectCategory | "All")}
            />
            <PillGroup
              label="Status"
              options={["All", ...statuses]}
              active={status}
              onChange={(v) => setStatus(v as ProjectStatus | "All")}
            />
          </div>
        </div>
      </div>

      {/* results */}
      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-line p-12 text-center">
          <p className="text-text">No projects match your search.</p>
          <p className="mt-2 text-sm text-text-dim">
            Try a different keyword, or clear the filters.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setStatus("All");
              }}
              className="mt-6 rounded-full border border-line px-5 py-2 text-sm text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PillGroup({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label mr-1 text-text-mute">{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={active === opt}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            active === opt
              ? "border-accent/50 bg-accent/10 text-accent"
              : "border-line text-text-dim hover:border-line-strong hover:text-text"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
