"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./project-preview";
import { StatusBadge } from "./status-badge";

type Props = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

/** A sticky, stacking case-study card. Earlier cards scale back as later ones slide over them. */
export function FeaturedProject({ project, index, total, progress }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const previewScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-24 flex items-start justify-center sm:top-28" style={{ paddingTop: `${index * 18}px` }}>
      <motion.article
        style={{ scale }}
        className="group relative w-full origin-top overflow-hidden rounded-[2rem] p-4 shadow-soft glass-strong sm:p-6 lg:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
          style={{ background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})` }}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Link
            href={`/projects/${project.slug}`}
            className={cn("block overflow-hidden rounded-2xl", index % 2 === 1 && "lg:order-2")}
            aria-label={`Read the ${project.title} case study`}
          >
            <motion.div style={{ scale: previewScale }} className="transition-transform duration-700 group-hover:scale-[1.02]">
              <ProjectPreview project={project} />
            </motion.div>
          </Link>

          <div className="flex flex-col py-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-subtle">
                0{index + 1} / 0{total}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-5 font-mono text-xs tracking-[0.15em] text-muted uppercase">{project.type}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
            <p className="mt-4 leading-relaxed text-pretty text-muted">{project.tagline}</p>

            {project.highlights && (
              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
                {project.highlights.map((h) => (
                  <div key={h.label}>
                    <dd className="text-lg font-semibold tracking-tight sm:text-xl">{h.value}</dd>
                    <dt className="mt-0.5 text-xs leading-snug text-muted">{h.label}</dt>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.slice(0, 6).map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-7">
              <Link
                href={`/projects/${project.slug}`}
                className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                Case study
                <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium glass transition-transform hover:-translate-y-0.5"
                >
                  Visit live site
                  <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
