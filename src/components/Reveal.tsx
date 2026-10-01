import type { ReactNode } from "react";

/**
 * Fades content up as it scrolls into view, using a CSS scroll-driven animation (see `.reveal`
 * in globals.css). There is no JavaScript involved: browsers without support, and visitors who
 * prefer reduced motion, simply see the content in place.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}
