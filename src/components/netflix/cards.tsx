"use client";

import { ChevronDown, Play, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { genres, matchScore } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";
import { Artwork } from "./artwork";
import { JBadge, TopTenBadge, rowItem } from "./brand";
import { useOpenTitle } from "./title-modal";

const lift =
  "transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.05] focus-visible:z-10 focus-visible:scale-[1.05] first:origin-left last:origin-right";

/** Matches the row widths in row.tsx, so the browser fetches the right image size. */
const cardSizes = "(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 40vw, 65vw";

const statusRibbon = (p: Project) => (p.status === "In development" ? "New Episodes" : "Coming Soon");

/** Landscape title card — opens the detail modal. */
export function ProjectCard({ project }: { project: Project }) {
  const open = useOpenTitle();
  return (
    <button
      type="button"
      onClick={() => open(project.slug)}
      aria-label={`${project.title} — ${project.type}. More info`}
      className={cn(
        rowItem,
        lift,
        "group/card relative aspect-video overflow-hidden rounded-md bg-elevated text-left shadow-soft",
      )}
    >
      <Artwork project={project} sizes={cardSizes} />
      <span className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <JBadge className="absolute top-2 left-2.5 text-2xl" />
      {project.status !== "Live" && (
        <span className="absolute top-2.5 right-2.5 rounded-[2px] bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          {statusRibbon(project)}
        </span>
      )}
      <span className="absolute inset-x-3.5 bottom-3 transition-opacity group-hover/card:opacity-0 group-focus-visible/card:opacity-0">
        <span className="block font-display text-[1.7rem] leading-none tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:text-3xl">
          {project.title}
        </span>
        <span className="mt-1 block truncate text-xs text-white/75">{project.type}</span>
      </span>

      {/* Hover details */}
      <span className="absolute inset-x-0 bottom-0 translate-y-2 space-y-1.5 bg-gradient-to-t from-black via-black/90 to-transparent p-3.5 pt-8 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
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
        <span className="flex items-center gap-1.5 text-xs text-[#d2d2d2]">
          <span className="font-semibold text-match">{matchScore(project)}% Match</span>
          <span className="truncate rounded-[2px] border border-white/40 px-1">{project.status}</span>
        </span>
        <span className="block truncate text-xs text-white">{genres(project).join(" • ")}</span>
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
        className="absolute bottom-[1%] left-[2%] font-display text-[78cqw] leading-[0.8] tracking-[-0.06em] text-[#141414] [-webkit-text-stroke:max(2px,0.8cqw)_#5f5f5f]"
      >
        {rank}
      </span>
      <span
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover/card:scale-[1.04] group-focus-visible/card:scale-[1.04]"
        style={{ background: `linear-gradient(160deg, ${project.accent.from}, ${project.accent.to})` }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 14vw, 40vw"
            className="object-cover object-[30%_top]"
          />
        ) : (
          <span className="absolute top-[14%] -left-[45%] w-[190%] -rotate-[10deg] opacity-80">
            <ProjectPreview project={project} className="border-white/10" />
          </span>
        )}
        <span className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black" />
        <JBadge className="absolute top-1.5 left-2 text-[14cqw]" />
        {project.featured && <TopTenBadge className="absolute top-0 right-1.5" />}
        <span className="absolute inset-x-[7%] bottom-[10%] text-center">
          <span className="block font-display text-[9.5cqw] leading-[0.9] tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {project.title}
          </span>
          <span className="mt-[2.5cqw] block truncate text-[3.2cqw] font-semibold tracking-[0.15em] text-white/80 uppercase">
            {genres(project)[0]}
          </span>
        </span>
        {project.status !== "Live" && (
          <span className="absolute inset-x-[18%] bottom-0 rounded-t-[2px] bg-accent py-[0.8cqw] text-center text-[3cqw] font-bold tracking-wide text-white uppercase">
            {statusRibbon(project)}
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
        <span className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition-opacity group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          <span className="grid size-12 place-items-center rounded-full border-2 border-white bg-black/50">
            <Play className="size-5 fill-white text-white" />
          </span>
        </span>
      </span>
      <span
        className="block h-1 bg-[#4d4d4d]"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Progress"
      >
        <span className="block h-full bg-accent" style={{ width: `${progress * 100}%` }} />
      </span>
      <span className="block bg-[#1f1f1f] px-4 py-3">
        <span className="block truncate font-semibold text-white">{title}</span>
        <span className="mt-0.5 block truncate text-sm text-[#b3b3b3]">{subtitle}</span>
      </span>
    </>
  );
}

const continueClass = cn(rowItem, lift, "group/card block overflow-hidden rounded-md text-left shadow-soft");

/** "Continue Watching" card for a project — opens the detail modal. */
export function ContinueProjectCard({ project, progress }: { project: Project; progress: number }) {
  const open = useOpenTitle();
  return (
    <button type="button" onClick={() => open(project.slug)} className={continueClass}>
      <ContinueBody
        title={project.title}
        subtitle={`${project.status} · ${project.type}`}
        progress={progress}
        art={<Artwork project={project} sizes={cardSizes} />}
      />
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

/** Large tile in "Today's Top Picks": colour wash over a project screenshot, jumps to a section. */
export function PickCard({
  href,
  title,
  caption,
  icon,
  gradient,
  image,
}: {
  href: string;
  title: string;
  caption: string;
  icon: React.ReactNode;
  gradient: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(rowItem, lift, "group/card relative isolate block aspect-video overflow-hidden rounded-md shadow-soft")}
      style={{ background: gradient }}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes={cardSizes}
          className="object-cover object-top opacity-45 mix-blend-luminosity transition-transform duration-700 group-hover/card:scale-110"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm [&>svg]:size-5"
      >
        {icon}
      </span>
      <JBadge className="absolute top-2 left-2.5 text-2xl" />
      <span className="absolute right-4 bottom-3.5 left-4">
        <span className="block font-display text-4xl leading-none tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {title}
        </span>
        <span className="mt-1.5 block truncate text-sm text-white/85">{caption}</span>
      </span>
    </Link>
  );
}
