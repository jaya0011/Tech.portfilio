import { Database, LayoutTemplate, Plug, ServerCog, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { marqueeTech, skillGroups, type SkillGroup } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  frontend: LayoutTemplate,
  backend: ServerCog,
  database: Database,
  mobile: Smartphone,
  cms: ShoppingBag,
  tooling: Plug,
};

// Bento layout: wide cards for the two largest groups.
const spans = ["md:col-span-2", "", "", "md:col-span-2", "", ""];

function Marquee() {
  const row = [...marqueeTech, ...marqueeTech];
  return (
    <div className="relative mt-16 overflow-hidden mask-fade-x py-2" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm whitespace-nowrap text-muted glass"
          >
            <span className="text-accent">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Tech stack"
          title={[{ text: "A modern toolkit for" }, { text: "end-to-end", className: accent }, { text: "delivery." }]}
          description="From pixel-perfect interfaces to APIs, databases and app-store builds — the technologies I use to take products from idea to production."
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <StaggerItem key={g.title} className={cn(spans[i])}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{g.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{g.blurb}</p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent ring-1 ring-line">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg/90 transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
      <Marquee />
    </section>
  );
}
