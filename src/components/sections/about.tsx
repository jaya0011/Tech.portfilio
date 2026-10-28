import { Briefcase, GraduationCap } from "lucide-react";
import { about, journey, siteConfig } from "@/data/portfolio";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";

function TerminalCard() {
  const rows: [string, string][] = [
    ["name", `"${siteConfig.name}"`],
    ["role", `"${siteConfig.title}"`],
    ["location", `"Amritsar, Punjab, IN"`],
    ["education", `["MSc CS @ GNDU", "BCA"]`],
    ["focus", `["web", "mobile", "ecommerce"]`],
    ["openToWork", "true"],
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-[#0b0f17] font-mono text-[13px] text-[#d6deeb] shadow-soft">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-white/40">jaya@portfolio: ~</span>
      </div>
      <div className="space-y-1 p-5 leading-relaxed sm:p-6">
        <p>
          <span className="text-[#c3e88d]">➜</span> <span className="text-[#82aaff]">~</span> whoami --json
        </p>
        <p className="text-white/50">{"{"}</p>
        {rows.map(([k, v], i) => (
          <p key={k} className="pl-4 break-words">
            <span className="text-[#89ddff]">&quot;{k}&quot;</span>
            <span className="text-white/50">: </span>
            <span className={v === "true" ? "text-[#f78c6c]" : "text-[#c3e88d]"}>{v}</span>
            {i < rows.length - 1 && <span className="text-white/50">,</span>}
          </p>
        ))}
        <p className="text-white/50">{"}"}</p>
        <p className="pt-2">
          <span className="text-[#c3e88d]">➜</span> <span className="text-[#82aaff]">~</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-[#82aaff]" />
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title={[{ text: "Engineer by craft," }, { text: "problem-solver", className: accent }, { text: "by nature." }]}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-pretty text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl text-fg sm:text-2xl sm:leading-snug" : undefined}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <ul className="flex flex-wrap gap-2 pt-2" aria-label="Strengths">
                {about.strengths.map((s) => (
                  <li key={s} className="rounded-full px-3.5 py-1.5 text-sm text-fg glass">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <TerminalCard />
          </Reveal>
        </div>

        {/* Journey */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Experience & Education</h3>
          </Reveal>
          <Stagger className="relative mt-8 grid gap-4 md:grid-cols-3" stagger={0.12}>
            {journey.map((j) => {
              const Icon = j.type === "work" ? Briefcase : GraduationCap;
              return (
                <StaggerItem
                  key={j.title}
                  className="group relative rounded-3xl p-6 glass transition-colors hover:border-line-strong sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent ring-1 ring-line">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">{j.period}</span>
                  </div>
                  <h4 className="mt-6 text-lg font-semibold tracking-tight">{j.title}</h4>
                  <p className="mt-1 text-sm text-accent">{j.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{j.description}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
