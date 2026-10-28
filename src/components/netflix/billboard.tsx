import { Info, Play } from "lucide-react";
import Link from "next/link";
import { projects, siteConfig, type Profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";
import { JBadge, TopTenBadge, nfButton } from "./brand";

/** Full-bleed hero, like the featured title at the top of a streaming home page. */
export function Billboard({ profile }: { profile: Profile }) {
  const art = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      aria-labelledby="billboard-title"
      className="relative h-[max(600px,56.25vw)] max-h-[100svh] min-h-[560px] overflow-hidden"
    >
      {/* Slowly drifting "trailer" artwork */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute top-[9%] -right-[14%] w-[100%] [perspective:1800px] sm:top-[5%] sm:-right-[8%] sm:w-[72%]">
          <div className="origin-[70%_40%] animate-billboard">
            <div className="grid [transform:rotateY(-18deg)_rotateX(8deg)_rotateZ(2deg)] grid-cols-2 gap-3 sm:gap-5">
              {art.map((p, i) => (
                <ProjectPreview key={p.slug} project={p} className={cn(i % 2 === 1 && "translate-y-[14%]")} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-[15%] right-[5%] size-[45vw] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.05)_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      <div className="absolute bottom-[20%] left-0 w-full px-gutter sm:bottom-[26%] sm:w-[64%] lg:w-[50%]">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.4em] text-[#e5e5e5] uppercase sm:text-sm">
          <JBadge className="text-3xl tracking-normal sm:text-4xl" /> Portfolio
        </p>
        <h1
          id="billboard-title"
          className="mt-1 font-display text-[clamp(3.6rem,10vw,9.5rem)] leading-[0.85] tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          {siteConfig.name}
        </h1>
        <p className="mt-3 flex items-center gap-2 text-base font-semibold text-white sm:text-xl">
          <TopTenBadge /> #1 in Full-Stack Development Today
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-lg">
          {profile.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#projects" className={nfButton.play}>
            <Play className="size-5 fill-current sm:size-6" /> Browse Work
          </Link>
          <Link href="#about" className={nfButton.info}>
            <Info className="size-5 sm:size-6" /> More Info
          </Link>
        </div>
      </div>

      <p className="absolute right-0 bottom-[26%] hidden border-l-[3px] border-[#dcdcdc] bg-[rgba(51,51,51,0.6)] py-1.5 pr-[max(1rem,4vw)] pl-3 text-sm text-white sm:block lg:text-base">
        Open to freelance
      </p>
    </section>
  );
}
