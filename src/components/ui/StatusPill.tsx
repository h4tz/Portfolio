import type { ProjectStatus } from "@/content/projects";

const styles: Record<ProjectStatus, string> = {
  Live: "text-accent border-accent/40",
  Delivered: "text-accent border-accent/40",
  Completed: "text-text-dim border-line-strong",
  "In Progress": "text-text-mute border-line",
  Experiment: "text-text-mute border-line",
  Archived: "text-text-mute border-line",
};

const dot: Record<ProjectStatus, string> = {
  Live: "bg-accent",
  Delivered: "bg-accent",
  Completed: "bg-text-dim",
  "In Progress": "bg-text-mute",
  Experiment: "bg-text-mute",
  Archived: "bg-text-mute",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 label ${styles[status]}`}
    >
      <span className={`size-1.5 rounded-full ${dot[status]}`} aria-hidden />
      {status}
    </span>
  );
}
