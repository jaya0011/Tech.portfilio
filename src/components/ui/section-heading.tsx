import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitText, type TextSegment } from "./split-text";

/** Serif-italic gradient accent used inside headings. */
export const accent = "font-serif italic font-normal text-gradient pr-1";

type Props = {
  eyebrow: string;
  index: string;
  title: TextSegment[];
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, index, title, description, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
        <SplitText segments={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
