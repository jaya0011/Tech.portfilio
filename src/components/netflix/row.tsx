"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Items per visible page (fractions let the next card peek in on small screens). */
const sizes = {
  sm: "[--n:2.3] sm:[--n:3.3] lg:[--n:5] xl:[--n:6]",
  md: "[--n:1.6] sm:[--n:2.6] lg:[--n:4] xl:[--n:5]",
  lg: "[--n:1.25] sm:[--n:2.2] lg:[--n:3] xl:[--n:4]",
};

type RowProps = {
  title: React.ReactNode;
  id?: string;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

/** Netflix-style horizontally scrolling row with paging arrows and a page indicator. */
export function Row({ title, id, size = "md", className, children }: RowProps) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState({ index: 0, count: 1, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPage({
      index: Math.round(el.scrollLeft / el.clientWidth),
      count: Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05)),
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: "smooth" });
  };

  const arrow =
    "absolute inset-y-5 z-20 hidden w-[var(--gutter)] min-w-8 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover/row:opacity-100 hover:bg-black/70 focus-visible:opacity-100 sm:flex disabled:pointer-events-none disabled:!opacity-0";

  return (
    <section
      id={id}
      className={cn(
        "group/row [container-type:inline-size] relative [--gap:0.625rem] [--gutter:max(1rem,4cqw)] sm:[--gap:0.875rem]",
        className,
      )}
    >
      <div className="flex items-end justify-between px-gutter">
        <h2 className="group/title flex items-baseline gap-2 text-xl font-bold tracking-tight text-[#e5e5e5] sm:text-2xl xl:text-[1.75rem]">
          {title}
        </h2>
        {page.count > 1 && (
          <ol aria-hidden="true" className="hidden gap-0.5 opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex">
            {Array.from({ length: page.count }, (_, i) => (
              <li key={i} className={cn("h-0.5 w-3", i === page.index ? "bg-[#aaa]" : "bg-[#4d4d4d]")} />
            ))}
          </ol>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          disabled={page.atStart}
          className={cn(arrow, "left-0 rounded-r")}
        >
          <ChevronLeft className="size-8 transition-transform hover:scale-125" />
        </button>
        <div
          ref={track}
          onScroll={measure}
          className={cn(
            "no-scrollbar flex snap-x snap-mandatory [scroll-padding-inline:var(--gutter)] gap-[var(--gap)] overflow-x-auto overflow-y-hidden overscroll-x-contain px-gutter py-5",
            sizes[size],
          )}
        >
          {children}
        </div>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          disabled={page.atEnd}
          className={cn(arrow, "right-0 rounded-l")}
        >
          <ChevronRight className="size-8 transition-transform hover:scale-125" />
        </button>
      </div>
    </section>
  );
}
