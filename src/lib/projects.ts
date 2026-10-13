import { projects, type Project, type ProjectCategory, type ProjectStatus } from "@/content/projects";

/** All projects approved for public display, newest first. */
export function getAllProjects(): Project[] {
  return projects
    .filter((p) => p.approvedForPublic)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Homepage "Selected work" set. */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    // newest-first list; "next" = older project
    next: i >= 0 ? all[i + 1] : undefined,
    prev: i > 0 ? all[i - 1] : undefined,
  };
}

export interface ProjectFilters {
  query?: string;
  category?: ProjectCategory | "All";
  status?: ProjectStatus | "All";
}

/** Client-side search + filter used by the archive explorer. */
export function filterProjects(all: Project[], f: ProjectFilters): Project[] {
  const q = (f.query ?? "").trim().toLowerCase();
  return all.filter((p) => {
    if (f.category && f.category !== "All" && p.category !== f.category) return false;
    if (f.status && f.status !== "All" && p.status !== f.status) return false;
    if (!q) return true;
    const haystack = [p.name, p.summary, p.category, p.role, ...p.stack]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
