"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { navLinks, profiles, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { ProfileAvatar, Wordmark } from "./brand";
import { ProfileLoader, useProfileSwitch } from "./profile-loader";
import { useProfile } from "./use-profile";

/** Closes a dropdown on outside click or Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const menuMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.15 },
};

export function Navbar() {
  const profile = useProfile();
  const home = `/browse/${profile.id}`;
  const { target: switching, select } = useProfileSwitch();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );
  const [browseOpen, setBrowseOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const browseRef = useDismiss(browseOpen, () => setBrowseOpen(false));
  const profileRef = useDismiss(profileOpen, () => setProfileOpen(false));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-[#141414]" : "bg-[linear-gradient(180deg,rgba(0,0,0,0.75)_10%,transparent)]",
      )}
    >
      <nav aria-label="Primary" className="flex h-16 items-center gap-6 px-gutter lg:h-[68px] lg:gap-10">
        <Link href={home} aria-label={`${siteConfig.name} — home`} className="shrink-0">
          <Wordmark className="text-[1.65rem] sm:text-[2rem]" />
        </Link>

        <ul className="hidden items-center gap-5 text-sm lg:flex">
          <li>
            <Link href={home} className="font-medium text-white transition-colors hover:text-white/70">
              Home
            </Link>
          </li>
          {navLinks.map((l) => (
            <li key={l.id}>
              <Link href={`${home}#${l.id}`} className="text-[#e5e5e5] transition-colors hover:text-[#b3b3b3]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: Browse dropdown */}
        <div ref={browseRef} className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setBrowseOpen((o) => !o)}
            aria-expanded={browseOpen}
            className="flex items-center gap-1 text-sm font-medium text-white"
          >
            Browse <ChevronDown className={cn("size-4 transition-transform", browseOpen && "rotate-180")} />
          </button>
          <AnimatePresence>
            {browseOpen && (
              <motion.ul
                {...menuMotion}
                className="absolute top-10 -left-16 w-56 border-t-2 border-white bg-black/90 py-2 text-center text-sm"
              >
                {[{ id: "", label: "Home" }, ...navLinks].map((l) => (
                  <li key={l.id}>
                    <Link
                      href={l.id ? `${home}#${l.id}` : home}
                      onClick={() => setBrowseOpen(false)}
                      className="block py-3 text-[#b3b3b3] transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email Jaya"
            className="text-white transition-colors hover:text-white/70"
          >
            <Mail className="size-5" />
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden text-white transition-colors hover:text-white/70 sm:block"
          >
            <GitHubIcon className="size-5" />
          </a>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              aria-expanded={profileOpen}
              aria-label={`Profile: ${profile.name}. Switch profile`}
              className="group flex items-center gap-2"
            >
              <ProfileAvatar profile={profile} className="size-8" />
              <ChevronDown className={cn("size-4 text-white transition-transform duration-300", profileOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  {...menuMotion}
                  className="absolute top-12 right-0 w-56 border border-white/15 bg-black/90 text-sm shadow-soft"
                >
                  <ul className="space-y-1 py-3">
                    {profiles
                      .filter((p) => p.id !== profile.id)
                      .map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/browse/${p.id}`}
                            onClick={(e) => {
                              select(e, p);
                              setProfileOpen(false);
                            }}
                            className="group/item flex items-center gap-3 px-3 py-1.5 text-[#e5e5e5]"
                          >
                            <ProfileAvatar profile={p} className="size-8" />
                            <span className="group-hover/item:underline">{p.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <div className="space-y-1 border-t border-white/15 py-3">
                    <a
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-1.5 text-[#e5e5e5] hover:underline"
                    >
                      <LinkedInIcon className="size-4 text-[#b3b3b3]" /> LinkedIn
                    </a>
                    <a
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-1.5 text-[#e5e5e5] hover:underline"
                    >
                      <GitHubIcon className="size-4 text-[#b3b3b3]" /> GitHub
                    </a>
                  </div>
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 border-t border-white/15 py-3.5 text-[#e5e5e5] hover:underline"
                  >
                    <LogOut className="size-4" /> Switch profiles
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      {switching && <ProfileLoader profile={switching} />}
    </header>
  );
}
