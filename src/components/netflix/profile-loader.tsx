"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Profile } from "@/data/portfolio";
import { ProfileAvatar, Wordmark } from "./brand";
import { rememberProfile } from "./use-profile";

/** How long the loader stays up before navigating — long enough to read as a deliberate transition. */
export const PROFILE_LOADER_MS = 1600;

/** Full-screen "loading your profile" screen: avatar inside a spinning red arc. */
export function ProfileLoader({ profile }: { profile: Profile }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] bg-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-16 items-center px-gutter lg:h-[68px]">
        <Wordmark className="text-[1.65rem] sm:text-[2rem]" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid size-44 place-items-center sm:size-56">
          {/* Arc: conic gradient fading into its tail, masked to a ring, with a rounded head */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-spin rounded-full [animation-duration:0.9s] [background:conic-gradient(from_0deg,transparent_0%,transparent_25%,#e50914_100%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-6px),#000_calc(100%-5px))]"
          >
            <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent" />
          </span>
          <ProfileAvatar profile={profile} className="size-16 sm:size-20" />
        </div>
      </div>
      <span className="sr-only">Loading {profile.name} profile…</span>
    </motion.div>
  );
}

/**
 * Click handler for profile links: shows <ProfileLoader>, then navigates.
 * Modified clicks (new tab / window) fall through to the plain link.
 * The loader is tied to the page it started on, so any navigation (including Back) clears it.
 */
export function useProfileSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<Profile | null>(null);
  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setTarget(null);
  }

  const select = (e: React.MouseEvent, profile: Profile) => {
    rememberProfile(profile.id);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const href = `/browse/${profile.id}`;
    router.prefetch(href);
    setTarget(profile);
    window.setTimeout(() => router.push(href), PROFILE_LOADER_MS);
  };

  return { target, select };
}
