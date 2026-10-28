"use client";

import { ChevronDown, Play, Plus, ThumbsUp } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { genres, matchScore } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";
import { JBadge, TopTenBadge, rowItem } from "./brand";
import { useOpenTitle } from "./title-modal";

const lift =
  "transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.06] focus-visible:z-10 focus-visible:scale-[1.06] first:origin-left last:origin-right";

function Art({ project }: { project: Project }) {
  return <ProjectPreview project={project} fill className="h-full rounded-none border-0 shadow-none" />;
}

/** Landscape title card — opens the detail modal. */
export function ProjectCard({ project }: { project: Project }) {
  const open = useOpenTitle();
  return (
    <button
      type="button"
      onClick={() => open(project.slug)}
      aria-label={`${project.title} — ${project.type}. More info`}
      className={cn(rowItem, lift, "group/card relative aspect-video overflow-hidden rounded-[4px] bg-elevated text-left")}
    >
      <Art project={project} />
      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
      <JBadge className="absolute top-1.5 left-2 text-2xl" />
      {project.status !== "Live" && (
        <span className="absolute top-2 right-2 rounded-[2px] bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          {project.status === "In development" ? "New Episodes" : "Coming Soon"}
        </span>
      )}
      <span className="absolute inset-x-3 bottom-2.5 font-display text-2xl leading-none tracking-wide text-white transition-opacity group-hover/card:opacity-0 group-focus-visible/card:opacity-0 sm:text-[1.7rem]">
        {project.title}
      </span>

      {/* Hover details */}
      <span className="absolute inset-x-0 bottom-0 translate-y-2 space-y-1.5 p-3 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="grid size-7 place-items-center rounded-full bg-white text-black">
            <Play className="size-3.5 fill-current" />
          </span>
          <span className="grid size-7 place-items-center rounded-full border-2 border-white/60 bg-black/40">
            <Plus className="size-3.5" />
          </span>
          <span className="grid size-7 place-items-center rounded-full border-2 border-white/60 bg-black/40">
            <ThumbsUp className="size-3.5" />
          </span>
          <span className="ml-auto grid size-7 place-items-center rounded-full border-2 border-white/60 bg-black/40">
            <ChevronDown className="size-4" />
          </span>
        </span>
        <span className="block truncate text-sm font-bold text-white">{project.title}</span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#bcbcbc]">
          <span className="font-semibold text-match">{matchScore(project)}% Match</span>
          <span className="truncate rounded-[2px] border border-white/40 px-1">{project.status}</span>
        </span>
        <span className="block truncate text-[11px] text-white">{genres(project).join(" • ")}</span>
      </span>
    </button>
  );
}

/** Portrait poster with a giant outlined rank number — the "Top 10" row. */
export function PosterCard({ project, rank }: { project: Project; rank: number }) {
  const open = useOpenTitle();
  return (
    <button
      type="button"
      onClick={() => open(project.slug)}
      aria-label={`Number ${rank}: ${project.title}. More info`}
      className={cn(rowItem, "group/card [container-type:inline-size] relative aspect-[7/5] text-left")}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 font-display text-[92cqw] leading-[0.74] tracking-[-0.06em] text-[#141414] [-webkit-text-stroke:max(2px,0.9cqw)_#595959]"
      >
        {rank}
      </span>
      <span
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-[4px] shadow-soft transition-transform duration-300 group-hover/card:scale-[1.05] group-focus-visible/card:scale-[1.05]"
        style={{ background: `linear-gradient(160deg, ${project.accent.from}, ${project.accent.to})` }}
      >
        <span className="absolute top-[14%] -left-[45%] w-[190%] -rotate-[10deg] opacity-80">
          <ProjectPreview project={project} className="border-white/10" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/95" />
        <JBadge className="absolute top-1.5 left-2 text-[14cqw]" />
        {project.featured && <TopTenBadge className="absolute top-0 right-1.5 scale-90" />}
        <span className="absolute inset-x-[8%] bottom-[9%] text-center">
          <span className="block font-display text-[9cqw] leading-[0.9] tracking-wide text-white drop-shadow">
            {project.title}
          </span>
          <span className="mt-[3cqw] block truncate text-[3.2cqw] tracking-[0.15em] text-white/70 uppercase">
            {genres(project)[0]}
          </span>
        </span>
        {project.status !== "Live" && (
          <span className="absolute inset-x-[18%] bottom-0 rounded-t-[2px] bg-accent py-[0.8cqw] text-center text-[3cqw] font-bold tracking-wide text-white uppercase">
            {project.status === "In development" ? "New Episodes" : "Coming Soon"}
          </span>
        )}
      </span>
    </button>
  );
}

type ContinueItem = {
  title: string;
  subtitle: string;
  progress: number;
  art: React.ReactNode;
};

function ContinueBody({ title, subtitle, progress, art }: ContinueItem) {
  return (
    <>
      <span className="relative block aspect-video overflow-hidden">
        {art}
        <span className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          <span className="grid size-11 place-items-center rounded-full border-2 border-white bg-black/50">
            <Play className="size-5 fill-white text-white" />
          </span>
        </span>
      </span>
      <span
        className="block h-0.5 bg-[#5b5b5b]"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Progress"
      >
        <span className="block h-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </span>
      <span className="block bg-[#181818] px-3 py-2.5">
        <span className="block truncate text-sm font-semibold text-white">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-[#a3a3a3]">{subtitle}</span>
      </span>
    </>
  );
}

const continueClass = cn(rowItem, lift, "group/card block overflow-hidden rounded-[4px] text-left");

/** "Continue Watching" card for a project — opens the detail modal. */
export function ContinueProjectCard({ project, progress }: { project: Project; progress: number }) {
  const open = useOpenTitle();
  return (
    <button type="button" onClick={() => open(project.slug)} className={continueClass}>
      <ContinueBody title={project.title} subtitle={project.status} progress={progress} art={<Art project={project} />} />
    </button>
  );
}

/** "Continue Watching" card that jumps to a section of the page. */
export function ContinueLinkCard({ href, ...item }: ContinueItem & { href: string }) {
  return (
    <Link href={href} className={continueClass}>
      <ContinueBody {...item} />
    </Link>
  );
}

/** Large gradient tile in "Today's Top Picks" that jumps to a section. */
export function PickCard({
  href,
  title,
  caption,
  icon,
  gradient,
}: {
  href: string;
  title: string;
  caption: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className={cn(rowItem, lift, "group/card relative block aspect-video overflow-hidden rounded-[4px]")}
      style={{ background: gradient }}
    >
      <span
        aria-hidden="true"
        className="absolute -right-[8%] -bottom-[18%] text-white/15 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:-rotate-6 [&>svg]:size-[9rem] sm:[&>svg]:size-[11rem]"
      >
        {icon}
      </span>
      <span className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
      <JBadge className="absolute top-1.5 left-2 text-2xl" />
      <span className="absolute right-3 bottom-3 left-3">
        <span className="block font-display text-3xl leading-none tracking-wide text-white sm:text-4xl">{title}</span>
        <span className="mt-1 block truncate text-xs text-white/75">{caption}</span>
      </span>
    </Link>
  );
}
