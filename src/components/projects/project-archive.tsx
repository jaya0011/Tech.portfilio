"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./project-preview";
import { StatusBadge } from "./status-badge";

type FilterId = (typeof projectFilters)[number]["id"];

/** Filterable index of every project, with a cursor-following preview on desktop. */
export function ProjectArchive() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  const list = filter === "all" ? projects : projects.filter((p) => p.filters.includes(filter));

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div
        role="tablist"
        aria-label="Filter projects"
        className="-mx-5 no-scrollbar flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {projectFilters.map((f) => {
          const count =
            f.id === "all"
              ? projects.length
              : projects.filter((p) => p.filters.includes(f.id as Project["filters"][number])).length;
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative isolate shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
                active ? "text-bg" : "text-muted hover:text-fg",
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {!active && <span className="absolute inset-0 -z-20 rounded-full border border-line" />}
              {f.label}
              <sup className="ml-1 font-mono text-[10px] opacity-60">{count}</sup>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 border-t border-line" onPointerLeave={() => setHovered(null)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
              className="border-b border-line"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors sm:gap-6 md:grid-cols-[3rem_1.2fr_1fr_auto_auto]"
              >
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block truncate text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted md:hidden">{p.type}</span>
                </span>
                <span className="hidden truncate text-sm text-muted md:block">{p.type}</span>
                <StatusBadge status={p.status} className="hidden sm:inline-flex" />
                <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-transparent group-hover:bg-fg group-hover:text-bg">
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Floating preview */}
      <motion.div
        aria-hidden="true"
        style={{ left: sx, top: sy }}
        className="pointer-events-none fixed z-30 hidden w-[340px] -translate-x-1/2 lg:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-6"
            >
              <ProjectPreview project={hovered} className="shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
