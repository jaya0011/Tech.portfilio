import { Briefcase, Check, GraduationCap } from "lucide-react";
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
    <div className="overflow-hidden rounded-3xl border border-line bg-[#0b0f17] font-mono text-[12.5px] text-[#d6deeb] shadow-soft">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/40">jaya@portfolio: ~</span>
      </div>
      <div className="space-y-0.5 px-5 py-4 leading-relaxed">
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
        <p className="pt-1">
          <span className="text-[#c3e88d]">➜</span> <span className="text-[#82aaff]">~</span>{" "}
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-[#82aaff]" />
        </p>
      </div>
    </div>
  );
}

function JourneyTimeline() {
  return (
    <div className="rounded-3xl p-5 glass sm:p-6">
      <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Experience & Education</h3>
      <Stagger className="relative mt-5 space-y-5" stagger={0.1}>
        {/* Connector line running behind the icons */}
        <span className="absolute top-3 bottom-3 left-[17px] w-px bg-line" aria-hidden="true" />
        {journey.map((j) => {
          const Icon = j.type === "work" ? Briefcase : GraduationCap;
          const current = j.period === "Present";
          return (
            <StaggerItem key={j.title} className="relative flex gap-4">
              <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-xl bg-elevated text-accent ring-1 ring-line">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <h4 className="text-[15px] font-semibold tracking-tight">{j.title}</h4>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
                    {current && (
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                      </span>
                    )}
                    {j.period}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-accent">{j.org}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{j.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:flex lg:min-h-svh lg:items-center lg:py-20">
      <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 xl:gap-20">
          <div>
            <SectionHeading
              index="01"
              eyebrow="About me"
              title={[{ text: "Engineer by craft," }, { text: "problem-solver", className: accent }, { text: "by nature." }]}
            />

            <div className="mt-8 space-y-4 text-base leading-relaxed text-pretty text-muted">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "text-lg leading-snug text-fg sm:text-xl" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <ul className="mt-8 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2" aria-label="Strengths">
                {about.strengths.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-fg">
                    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal delay={0.15}>
              <TerminalCard />
            </Reveal>
            <Reveal delay={0.25}>
              <JourneyTimeline />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
