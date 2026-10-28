import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";

/**
 * Fills its (relative, sized) parent with the project's live-site screenshot,
 * or the code-drawn preview when there isn't one.
 */
export function Artwork({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return (
    <span className={cn("absolute inset-0 block", className)}>
      <ProjectPreview project={project} fill className="h-full rounded-none border-0 shadow-none" />
    </span>
  );
}

/**
 * Hero backdrop: screenshot softened into scenery — scaled from the bottom so the site's own
 * navbar is cropped away, dimmed, slightly blurred and faded in from the left.
 */
export function Backdrop({ src }: { src: string }) {
  return (
    <div className="absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[80%] sm:[mask-image:linear-gradient(90deg,transparent,#000_40%)]">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="(min-width: 640px) 80vw, 100vw"
        className="origin-[50%_90%] scale-[1.18] animate-billboard object-cover object-top blur-[1.5px] brightness-[0.65]"
      />
    </div>
  );
}
