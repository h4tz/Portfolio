import type { ReactNode } from "react";

/**
 * Seamless horizontal marquee. The children are rendered twice inside a
 * `width: max-content` track that scrolls -50% — so the copy loops without a
 * visible seam. Pure CSS; freezes to a horizontal scroller under reduced motion.
 */
export function Marquee({
  children,
  duration = 32,
  className = "",
}: {
  children: ReactNode;
  /** seconds for one full -50% pass */
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-hidden
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
