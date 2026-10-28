"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")";

/** Fixed ambient backdrop: masked grid, parallax gradient orbs and film grain. */
export function Background() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid mask-radial" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 left-[8%] size-[38rem] rounded-full bg-accent/20 blur-[140px] dark:bg-accent/25"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[30%] -right-40 size-[34rem] rounded-full bg-accent-2/15 blur-[150px] dark:bg-accent-2/15"
      />
      <div className="absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-accent-3/10 blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]"
        style={{ backgroundImage: noise }}
      />
    </div>
  );
}
