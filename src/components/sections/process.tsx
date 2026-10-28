"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/portfolio";
import { EASE } from "@/lib/utils";
import { SectionHeading, accent } from "@/components/ui/section-heading";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-page gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:px-10 xl:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="05"
            eyebrow="How I work"
            title={[{ text: "A clear process," }, { text: "zero surprises.", className: accent }]}
            description="Transparent communication and steady progress at every stage — you always know what's being built, why, and when it ships."
          />
        </div>

        <div ref={ref} className="relative pl-10 sm:pl-14">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[15px] w-px bg-line sm:left-[19px]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-accent sm:left-[19px]"
          />
          <ol className="space-y-6">
            {processSteps.map((s) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative"
              >
                <span className="absolute top-6 -left-10 grid size-8 place-items-center rounded-full font-mono text-[11px] text-accent glass-strong sm:-left-14 sm:size-10">
                  {s.step}
                </span>
                <div className="rounded-3xl p-6 glass transition-colors hover:border-line-strong sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
