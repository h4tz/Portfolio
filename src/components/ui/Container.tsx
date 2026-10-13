import type { ReactNode } from "react";

/**
 * Standard page gutter + max width. Two widths:
 *  - "wide"  : full content column (88rem) for grids/lists
 *  - "prose" : reading column (72rem)
 */
export function Container({
  children,
  width = "wide",
  className = "",
}: {
  children: ReactNode;
  width?: "wide" | "prose";
  className?: string;
}) {
  const max = width === "wide" ? "max-w-[88rem]" : "max-w-[72rem]";
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${max} ${className}`}>
      {children}
    </div>
  );
}
