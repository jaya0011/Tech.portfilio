"use client";

import { cn } from "@/lib/utils";

function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

/** Glass card with a soft radial glow that follows the cursor. */
export function SpotlightCard({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Comp
      onPointerMove={trackPointer}
      className={cn("spotlight rounded-3xl glass transition-colors duration-300 hover:border-line-strong", className)}
    >
      {children}
    </Comp>
  );
}
