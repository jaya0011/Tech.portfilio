"use client";

import Link from "next/link";
import type { SectionId } from "@/data/portfolio";
import { useProfile } from "./use-profile";

/** Link to a section of the visitor's own browse page (falls back to the default profile). */
export function ProfileLink({ hash, className, children }: { hash: SectionId; className?: string; children: React.ReactNode }) {
  const profile = useProfile();
  return (
    <Link href={`/browse/${profile.id}#${hash}`} className={className}>
      {children}
    </Link>
  );
}
