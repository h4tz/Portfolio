import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/store`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 },
  ];

  const projectRoutes = getAllProjects().map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
