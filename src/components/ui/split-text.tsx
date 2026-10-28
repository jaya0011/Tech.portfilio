"use client";

import { motion } from "framer-motion";
import { EASE, cn } from "@/lib/utils";

export type TextSegment = { text: string; className?: string };

/**
 * Word-by-word masked reveal. Accepts plain text or segments so individual
 * phrases can carry their own styling (e.g. gradient or serif accents).
 */
export function SplitText({
  segments,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  segments: TextSegment[] | string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const parts: TextSegment[] = typeof segments === "string" ? [{ text: segments }] : segments;
  const words = parts.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: seg.className })),
  );
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{parts.map((p) => p.text).join(" ")}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", w.className)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {w.word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
