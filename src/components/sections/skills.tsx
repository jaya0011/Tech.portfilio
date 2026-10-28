import { Database, LayoutTemplate, Plug, ServerCog, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { marqueeTech, skillGroups, type SkillGroup } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  frontend: LayoutTemplate,
  backend: ServerCog,
  database: Database,
  mobile: Smartphone,
  cms: ShoppingBag,
  tooling: Plug,
};

// Each domain gets its own tint so the rows read as distinct at a glance.
const tints: Record<SkillGroup["icon"], string> = {
  frontend: "var(--accent)",
  backend: "var(--accent-2)",
  database: "#10b981",
  mobile: "var(--accent-3)",
  cms: "#f59e0b",
  tooling: "#3b82f6",
};

const totalTools = skillGroups.reduce((n, g) => n + g.items.length, 0);
const pad = (n: number) => String(n).padStart(2, "0");

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

function SkillRow({ group, index }: { group: SkillGroup; index: number }) {
  const Icon = icons[group.icon];
  return (
    <div
      style={{ "--tint": tints[group.icon] } as React.CSSProperties}
      className="group relative grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10 lg:px-10"
    >
      {/* Hover sweep + edge marker */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--tint)_9%,transparent),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-0 w-[2px] -translate-y-1/2 rounded-full bg-[var(--tint)] transition-all duration-500 group-hover:h-3/5"
      />

      <div className="relative flex items-start gap-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--tint)_14%,transparent)] text-[var(--tint)] ring-1 ring-[color-mix(in_oklab,var(--tint)_30%,transparent)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
            {pad(index + 1)} <span className="mx-1.5 text-line-strong">/</span> {pad(group.items.length)} tools
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">{group.title}</h3>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">{group.blurb}</p>
        </div>
      </div>

      <ul className="relative flex flex-wrap gap-2 lg:justify-end">
        {group.items.map((s) => (
          <li
            key={s}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg/85 transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--tint)_55%,transparent)] hover:text-fg"
          >
            <span className="size-1.5 rounded-full bg-[var(--tint)] opacity-60 transition-[opacity,box-shadow] duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_var(--tint)]" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="Tech stack"
          title={[{ text: "A modern toolkit for" }, { text: "end-to-end", className: accent }, { text: "delivery." }]}
          description="From pixel-perfect interfaces to APIs, databases and app-store builds — the technologies I use to take products from idea to production."
        />

        <div className="mt-14 overflow-hidden rounded-3xl glass shadow-soft">
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 font-mono text-xs text-subtle sm:px-8 lg:px-10">
            <span className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
              </span>
              ~/stack
            </span>
            <span>
              {skillGroups.length} domains · {totalTools} tools
            </span>
          </div>

          <Stagger className="divide-y divide-line">
            {skillGroups.map((g, i) => (
              <StaggerItem key={g.title}>
                <SkillRow group={g} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
      <Marquee />
    </section>
  );
}
