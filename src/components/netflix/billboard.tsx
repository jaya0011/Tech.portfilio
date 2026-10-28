import { Info, Play } from "lucide-react";
import Link from "next/link";
import { projects, siteConfig, type Profile } from "@/data/portfolio";
import { projectBySlug } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";
import { Backdrop } from "./artwork";
import { JBadge, TopTenBadge, nfButton } from "./brand";

/** Full-bleed hero, like the featured title at the top of a streaming home page. */
export function Billboard({ profile }: { profile: Profile }) {
  const backdrop = projectBySlug(profile.backdrop);

  return (
    <section
      aria-labelledby="billboard-title"
      className="relative h-[max(620px,56.25vw)] max-h-[100svh] min-h-[600px] overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {backdrop?.image ? <Backdrop src={backdrop.image} /> : <Collage />}
        {/* Readability: dim, then fade to the page colour on the left, top and bottom */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#141414_0%,rgba(20,20,20,0.94)_26%,rgba(20,20,20,0.6)_52%,rgba(20,20,20,0.1)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
      </div>

      <div className="absolute bottom-[24%] left-0 w-full px-gutter sm:bottom-[27%] sm:w-[62%] lg:w-[46%]">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.4em] text-[#e5e5e5] uppercase sm:text-sm">
          <JBadge className="text-3xl tracking-normal sm:text-4xl" /> Portfolio
        </p>
        <h1
          id="billboard-title"
          className="mt-1 font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          {siteConfig.name}
        </h1>
        <p className="mt-4 flex items-center gap-2.5 text-base font-semibold text-white sm:text-xl">
          <TopTenBadge /> #1 in Full-Stack Development Today
        </p>
        <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-[#e5e5e5] [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] sm:text-lg">
          {profile.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="#projects" className={nfButton.play}>
            <Play className="size-5 fill-current sm:size-6" /> Browse Work
          </Link>
          <Link href="#about" className={nfButton.info}>
            <Info className="size-5 sm:size-6" /> More Info
          </Link>
        </div>
      </div>

      <div className="absolute right-0 bottom-[27%] hidden flex-col items-end gap-3 sm:flex">
        {backdrop?.image && (
          <p className="pr-[max(1rem,4vw)] text-right text-xs text-white/70 [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
            On screen: <span className="font-semibold text-white">{backdrop.title}</span> · {backdrop.type}
          </p>
        )}
        <p className="border-l-[3px] border-[#dcdcdc] bg-[rgba(51,51,51,0.6)] py-1.5 pr-[max(1rem,4vw)] pl-3 text-sm text-white backdrop-blur-sm lg:text-base">
          Open to freelance
        </p>
      </div>
    </section>
  );
}

/** Fallback backdrop: drifting, tilted drawn previews of the featured projects. */
function Collage() {
  const art = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <div className="absolute top-[9%] -right-[14%] w-[100%] [perspective:1800px] sm:top-[5%] sm:-right-[8%] sm:w-[72%]">
      <div className="origin-[70%_40%] animate-billboard">
        <div className="grid [transform:rotateY(-18deg)_rotateX(8deg)_rotateZ(2deg)] grid-cols-2 gap-3 sm:gap-5">
          {art.map((p, i) => (
            <ProjectPreview key={p.slug} project={p} className={cn(i % 2 === 1 && "translate-y-[14%]")} />
          ))}
        </div>
      </div>
    </div>
  );
}
