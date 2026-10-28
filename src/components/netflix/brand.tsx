import type { Profile, Project } from "@/data/portfolio";
import { matchScore } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Red display wordmark, like a streaming-service logo. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display leading-none tracking-[0.04em] text-accent [text-shadow:0_2px_12px_rgba(229,9,20,0.35)]",
        className,
      )}
    >
      Jaya Arora
    </span>
  );
}

/** The little red "J" that marks original titles on cards and posters. */
export function JBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("font-display leading-none text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]", className)}
    >
      J
    </span>
  );
}

/** Square "Top 10" ribbon. */
export function TopTenBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-7 shrink-0 flex-col items-center justify-center rounded-[2px] bg-accent leading-none font-bold text-white",
        className,
      )}
    >
      <span className="text-[6.5px] tracking-wider">TOP</span>
      <span className="text-[13px] tracking-tight">10</span>
    </span>
  );
}

const faces: Record<Profile["face"], React.ReactNode> = {
  smile: (
    <>
      <ellipse cx="33" cy="40" rx="6" ry="9" fill="#fff" />
      <ellipse cx="67" cy="40" rx="6" ry="9" fill="#fff" />
      <path d="M27 62q23 20 46 0" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" />
    </>
  ),
  grin: (
    <>
      <circle cx="33" cy="40" r="7" fill="#fff" />
      <circle cx="67" cy="40" r="7" fill="#fff" />
      <path d="M25 58h50q-4 24-25 24T25 58Z" fill="#fff" />
    </>
  ),
  shades: (
    <>
      <path d="M18 34h64v6c0 9-7 14-14 14s-12-5-14-10h-8c-2 5-7 10-14 10s-14-5-14-14Z" fill="#111" />
      <path d="M33 70q17 10 34-2" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" />
    </>
  ),
  wink: (
    <>
      <ellipse cx="33" cy="40" rx="6" ry="9" fill="#fff" />
      <path d="M59 42q8-8 16 0" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M30 64q20 16 40-2" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" />
    </>
  ),
};

/** Simple smiley avatar on a coloured tile. */
export function ProfileAvatar({ profile, className }: { profile: Profile; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("rounded-[6%]", className)}>
      <rect width="100" height="100" rx="6" fill={profile.color} />
      <rect width="100" height="100" rx="6" fill="url(#avatar-shine)" />
      <defs>
        <linearGradient id="avatar-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {faces[profile.face]}
    </svg>
  );
}

/** Width class for a direct child of <Row> — fills exactly 1/n of the visible track. */
export const rowItem = "w-[calc((100cqw-2*var(--gutter)-(var(--n)-1)*var(--gap))/var(--n))] shrink-0 snap-start";

/** Button class names shared across the Netflix-style UI. */
export const nfButton = {
  play: "inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-2 text-[15px] font-semibold text-black transition-colors hover:bg-white/75 sm:px-7 sm:py-2.5 sm:text-lg",
  info: "inline-flex items-center justify-center gap-2 rounded-[4px] bg-[rgba(109,109,110,0.7)] px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[rgba(109,109,110,0.4)] sm:px-7 sm:py-2.5 sm:text-lg",
  red: "inline-flex items-center justify-center gap-2 rounded-[4px] bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70",
  round:
    "grid size-9 shrink-0 place-items-center rounded-full border-2 border-white/50 bg-[#2a2a2a]/60 text-white transition-colors hover:border-white",
};

/** "98% Match · Live · Type · HD" line under a title. */
export function Meta({ project }: { project: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#bcbcbc] sm:text-base">
      <span className="font-semibold text-match">{matchScore(project)}% Match</span>
      <span className="rounded-[3px] border border-white/40 px-1.5 text-xs leading-5">{project.status}</span>
      <span>{project.type}</span>
      <span className="rounded-[3px] border border-white/40 px-1 text-[10px] leading-4 font-semibold">HD</span>
    </p>
  );
}
