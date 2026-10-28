"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Info, Lock, Play, X } from "lucide-react";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { projects, siteConfig, type Project } from "@/data/portfolio";
import { genres, matchScore, similarProjects } from "@/lib/projects";
import { EASE } from "@/lib/utils";
import { Artwork } from "./artwork";
import { JBadge, Meta, TopTenBadge, nfButton } from "./brand";

const OpenTitleContext = createContext<(slug: string) => void>(() => {});

/** Opens the project detail modal from any card inside <TitleModalProvider>. */
export const useOpenTitle = () => useContext(OpenTitleContext);

export function TitleModalProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const openRef = useRef<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((next: string) => {
    if (!openRef.current) opener.current = document.activeElement as HTMLElement | null;
    openRef.current = next;
    setSlug(next);
  }, []);

  const close = useCallback(() => {
    openRef.current = null;
    setSlug(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  const project = projects.find((p) => p.slug === slug);

  return (
    <OpenTitleContext value={open}>
      {children}
      <AnimatePresence mode="wait">
        {project && <TitleModal key={project.slug} project={project} onClose={close} onOpen={open} />}
      </AnimatePresence>
    </OpenTitleContext>
  );
}

function TitleModal({ project, onClose, onOpen }: { project: Project; onClose: () => void; onOpen: (slug: string) => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const rank = projects.indexOf(project) + 1;
  const accent = `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`;

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 px-2 py-6 sm:px-6 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="title-modal-heading"
        className="relative mx-auto max-w-[850px] overflow-hidden rounded-md bg-[#181818] shadow-[0_3px_10px_rgba(0,0,0,0.75)]"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-[#181818] text-white transition-colors hover:bg-[#2a2a2a]"
        >
          <X className="size-5" />
        </button>

        {/* Artwork */}
        <div className="relative aspect-video">
          <Artwork project={project} sizes="(min-width: 850px) 850px, 100vw" priority className="brightness-[0.6]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-black/20" />
          <div className="absolute right-[5%] bottom-[6%] left-[5%]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.35em] text-[#ddd] uppercase">
              <JBadge className="text-2xl tracking-normal" /> Project
            </p>
            <h2
              id="title-modal-heading"
              className="mt-1 font-display text-4xl leading-[0.9] tracking-wide text-white drop-shadow-lg sm:text-7xl"
            >
              {project.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={nfButton.play}>
                  <Play className="size-5 fill-current" /> Visit Site
                </a>
              ) : (
                <span className={nfButton.info}>
                  <Lock className="size-4" /> Private build
                </span>
              )}
              <Link href={`/projects/${project.slug}`} className={nfButton.info}>
                <Info className="size-5" /> Case Study
              </Link>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-6 px-[5%] pt-2 pb-8 sm:grid-cols-[2fr_1fr] sm:gap-8">
          <div>
            <Meta project={project} />
            {project.featured && (
              <p className="mt-3 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                <TopTenBadge /> #{rank} in Projects Today
              </p>
            )}
            <p className="mt-4 leading-relaxed text-white">{project.overview}</p>
            {project.note && <p className="mt-4 text-sm text-[#bcbcbc] italic">Note: {project.note}</p>}
          </div>
          <dl className="space-y-3 text-sm leading-relaxed">
            <div>
              <dt className="inline text-[#777]">Stack: </dt>
              <dd className="inline text-[#ddd]">{project.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="inline text-[#777]">Genres: </dt>
              <dd className="inline text-[#ddd]">{genres(project).join(", ")}</dd>
            </div>
            {project.highlights && (
              <div>
                <dt className="inline text-[#777]">This project is: </dt>
                <dd className="inline text-[#ddd]">{project.highlights.map((h) => `${h.value} ${h.label}`).join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Features as episodes */}
        <section aria-labelledby="episodes-heading" className="px-[5%] pb-10">
          <div className="flex items-center justify-between gap-4">
            <h3 id="episodes-heading" className="text-xl font-bold text-white sm:text-2xl">
              Episodes
            </h3>
            <span className="rounded-[4px] border border-[#4d4d4d] bg-[#242424] px-3 py-1.5 text-sm text-white">
              Season 1 · Features
            </span>
          </div>
          <ol className="mt-4">
            {project.features.map((f, i) => (
              <li
                key={f}
                className="flex items-center gap-4 rounded-[4px] border-b border-[#404040] px-2 py-4 first:bg-[#333] sm:gap-6 sm:px-6 sm:py-6"
              >
                <span className="w-6 shrink-0 text-center text-xl text-[#d2d2d2] sm:text-2xl">{i + 1}</span>
                <span
                  aria-hidden="true"
                  className="relative hidden aspect-video w-32 shrink-0 overflow-hidden rounded-[4px] sm:grid sm:place-items-center"
                  style={{ background: accent }}
                >
                  <span className="absolute inset-0 bg-black/35" />
                  <Play className="relative size-6 fill-white text-white opacity-90" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-white">{f}</span>
                  <span className="mt-1 block text-sm text-[#a3a3a3]">
                    {project.title} · {genres(project)[0]}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          {project.role && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white sm:text-2xl">Behind the Scenes</h3>
              <p className="mt-3 leading-relaxed text-[#d2d2d2]">{project.role}</p>
            </div>
          )}
        </section>

        {/* More like this */}
        <section aria-labelledby="similar-heading" className="px-[5%] pb-10">
          <h3 id="similar-heading" className="text-xl font-bold text-white sm:text-2xl">
            More Like This
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {similarProjects(project).map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => onOpen(p.slug)}
                  className="group block h-full w-full overflow-hidden rounded-[4px] bg-[#2f2f2f] text-left transition-colors hover:bg-[#3a3a3a]"
                >
                  <span className="relative block aspect-video">
                    <Artwork project={p} sizes="(min-width: 640px) 270px, 100vw" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-2 left-3 font-display text-2xl leading-none text-white">{p.title}</span>
                  </span>
                  <span className="block p-4">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-match">{matchScore(p)}% Match</span>
                      <span className="rounded-[3px] border border-white/40 px-1 text-[11px] text-[#bcbcbc]">{p.status}</span>
                    </span>
                    <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-[#d2d2d2]">{p.tagline}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section className="border-t-2 border-[#404040] px-[5%] pt-6 pb-10 text-sm leading-relaxed">
          <h3 className="text-xl text-white sm:text-2xl">
            About <span className="font-bold">{project.title}</span>
          </h3>
          <dl className="mt-3 space-y-2">
            <div>
              <dt className="inline text-[#777]">Creator: </dt>
              <dd className="inline text-[#ddd]">{siteConfig.name}</dd>
            </div>
            <div>
              <dt className="inline text-[#777]">Format: </dt>
              <dd className="inline text-[#ddd]">{project.type}</dd>
            </div>
            {project.url && (
              <div>
                <dt className="inline text-[#777]">Watch it live: </dt>
                <dd className="inline">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#ddd] underline-offset-4 hover:underline"
                  >
                    {new URL(project.url).host} <ExternalLink className="size-3.5" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>
      </motion.div>
    </motion.div>
  );
}
