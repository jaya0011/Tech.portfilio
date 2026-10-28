"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import type { ProfileId } from "@/data/portfolio";
import { getProfile } from "@/lib/projects";

const KEY = "jaya:profile";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readStored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function rememberProfile(id: ProfileId) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // Storage can be unavailable (private mode) — the URL still carries the profile.
  }
}

/** The active profile: taken from `/browse/[profile]`, else the last one picked, else the default. */
export function useProfile() {
  const pathname = usePathname();
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const fromPath = pathname.match(/^\/browse\/([^/]+)/)?.[1];
  return getProfile(fromPath ?? stored);
}
