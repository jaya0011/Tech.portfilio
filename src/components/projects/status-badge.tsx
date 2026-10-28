import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const styles: Record<Project["status"], string> = {
  Live: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  "In development": "text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/20",
  "Private build": "text-sky-600 dark:text-sky-400 bg-sky-500/10 ring-sky-500/20",
};

export function StatusBadge({ status, className }: { status: Project["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
