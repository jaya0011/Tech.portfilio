import {
  Blocks,
  Briefcase,
  Database,
  Globe,
  GraduationCap,
  MonitorSmartphone,
  Play,
  Plug,
  Plus,
  Server,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Webhook,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { about, faqs, journey, siteConfig, type Service, type SkillGroup } from "@/data/portfolio";
import { projectBySlug } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/sections/contact-form";
import { Artwork } from "./artwork";
import { JBadge, rowItem } from "./brand";

const skillIcons: Record<SkillGroup["icon"], React.ElementType> = {
  frontend: MonitorSmartphone,
  backend: Server,
  database: Database,
  mobile: Smartphone,
  cms: ShoppingBag,
  tooling: Plug,
};

const serviceIcons: Record<Service["icon"], React.ElementType> = {
  web: Globe,
  mobile: Smartphone,
  ecommerce: ShoppingCart,
  wordpress: Blocks,
  api: Webhook,
  maintenance: Wrench,
};

const gradients = [
  "linear-gradient(135deg,#e50914,#4a0306)",
  "linear-gradient(135deg,#2f6fed,#0a1a40)",
  "linear-gradient(135deg,#8e44ad,#250a33)",
  "linear-gradient(135deg,#2ea043,#082611)",
  "linear-gradient(135deg,#e5b80b,#4a3200)",
  "linear-gradient(135deg,#f97316,#4a1503)",
];

/** Artwork header + readable body; used for skills and services rows. */
export function InfoCard({
  art,
  icon: Icon,
  title,
  blurb,
  chips,
}: {
  art: React.ReactNode;
  icon: React.ElementType;
  title: string;
  blurb: string;
  chips: readonly string[];
}) {
  return (
    <article className={cn(rowItem, "flex flex-col overflow-hidden rounded-md bg-[#1f1f1f] shadow-soft")}>
      <div className="relative isolate aspect-video overflow-hidden">
        {art}
        <span className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <JBadge className="absolute top-2 left-2.5 text-2xl" />
        <div className="absolute right-4 bottom-3.5 left-4 flex items-end justify-between gap-3">
          <h3 className="font-display text-[1.75rem] leading-[0.95] tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] sm:text-[2rem]">
            {title}
          </h3>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm">
            <Icon aria-hidden="true" className="size-5" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[15px] leading-relaxed text-[#e5e5e5]">{blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-xs text-[#d2d2d2]">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Tech logos as tilted app-icon tiles on a coloured backdrop. */
function LogoArt({ logos, gradient }: { logos: string[]; gradient: string }) {
  return (
    <div className="absolute inset-0" style={{ background: gradient }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <ul className="absolute inset-x-0 top-[14%] flex justify-center gap-2.5 sm:gap-3">
        {logos.map((l, i) => (
          <li
            key={l}
            className={cn(
              "grid size-12 place-items-center rounded-xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] sm:size-14",
              i % 2 ? "translate-y-3 rotate-6" : "-rotate-6",
            )}
          >
            <Image src={`/tech/${l}.svg`} alt="" width={40} height={40} className="size-7 sm:size-8" />
          </li>
        ))}
      </ul>
    </div>
  );
}

const cardSizes = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 45vw, 80vw";

export const skillCard = (g: SkillGroup, i: number) => (
  <InfoCard
    key={g.title}
    art={<LogoArt logos={g.logos} gradient={gradients[(i + 1) % gradients.length]} />}
    icon={skillIcons[g.icon]}
    title={g.title}
    blurb={g.blurb}
    chips={g.items}
  />
);

export const serviceCard = (s: Service) => {
  const showcase = projectBySlug(s.showcase);
  return (
    <InfoCard
      key={s.title}
      art={showcase && <Artwork project={showcase} sizes={cardSizes} />}
      icon={serviceIcons[s.icon]}
      title={s.title}
      blurb={s.description}
      chips={s.points}
    />
  );
};

export function ProcessCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <article
      className={cn(
        rowItem,
        "relative flex min-h-64 flex-col overflow-hidden rounded-md bg-[linear-gradient(160deg,#262626,#181818)] p-6 shadow-soft",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -top-6 -right-1 font-display text-[10rem] leading-none text-transparent [-webkit-text-stroke:2px_#3d3d3d]"
      >
        {Number(step)}
      </span>
      <span className="font-display text-xl tracking-[0.2em] text-accent">Step {step}</span>
      <h3 className="mt-auto font-display text-4xl leading-none tracking-wide text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[#e5e5e5]">{description}</p>
    </article>
  );
}

/** Small artwork for journey entries (education / work). */
export function JourneyArt({ type, period }: { type: "work" | "education"; period: string }) {
  const Icon = type === "work" ? Briefcase : GraduationCap;
  return (
    <span
      className="relative grid size-full place-items-center"
      style={{ background: type === "work" ? gradients[0] : gradients[2] }}
    >
      <Icon aria-hidden="true" className="size-1/3 text-white/80" strokeWidth={1.5} />
      <span className="absolute right-1.5 bottom-1 text-[10px] font-semibold text-white/90">{period}</span>
    </span>
  );
}

/** "The Series" — bio on the left, career journey as episodes on the right. */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-gutter py-6">
      <div className="grid overflow-hidden rounded-md bg-[#181818] shadow-soft lg:grid-cols-[1.15fr_1fr]">
        <div className="relative p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/20 blur-[100px]"
          />
          <p className="relative flex items-center gap-1.5 text-xs font-semibold tracking-[0.35em] text-[#ddd] uppercase">
            <JBadge className="text-3xl tracking-normal" /> Documentary
          </p>
          <h2
            id="about-heading"
            className="relative mt-1 font-display text-5xl leading-[0.9] tracking-wide text-white sm:text-6xl"
          >
            {siteConfig.name}: The Developer
          </h2>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#bcbcbc] sm:text-base">
            <span className="font-semibold text-match">100% Match</span>
            <span className="rounded-[3px] border border-white/40 px-1.5 text-xs leading-5">MSc in progress</span>
            <span>{siteConfig.location}</span>
          </p>
          <p className="mt-5 text-lg font-semibold text-white sm:text-xl">{about.heading}</p>
          <div className="mt-3 space-y-3 leading-relaxed text-[#e5e5e5]">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-6 space-y-2 text-sm leading-relaxed">
            <div>
              <dt className="inline text-[#777]">Starring: </dt>
              <dd className="inline text-[#ddd]">{siteConfig.name}</dd>
            </div>
            <div>
              <dt className="inline text-[#777]">This developer is: </dt>
              <dd className="inline text-[#ddd]">{about.strengths.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-[#2a2a2a] p-6 sm:p-10 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Episodes</h3>
            <span className="rounded-[4px] border border-[#4d4d4d] bg-[#242424] px-3 py-1.5 text-sm text-white">
              Season 1 · Journey
            </span>
          </div>
          <ol className="mt-4">
            {journey.map((j, i) => (
              <li
                key={j.title}
                className="group flex gap-4 rounded-[4px] border-b border-[#404040] px-2 py-5 first:bg-[#333] sm:items-center sm:px-4"
              >
                <span className="w-5 shrink-0 text-center text-xl text-[#e5e5e5]">{i + 1}</span>
                <span className="relative hidden aspect-video w-28 shrink-0 overflow-hidden rounded-[4px] sm:block">
                  <JourneyArt type={j.type} period={j.period} />
                  <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="size-6 fill-white text-white" />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="font-semibold text-white">{j.title}</span>
                    <span className="text-sm text-[#a3a3a3]">{j.period}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-[#bcbcbc]">{j.org}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-[#c8c8c8]">{j.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Landing-page style call to action, contact form and FAQ. */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mt-14 overflow-hidden border-t-8 border-[#232323] bg-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(229,9,20,0.32),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-4xl px-gutter pt-16 pb-10 text-center sm:pt-24">
        <h2 id="contact-heading" className="text-3xl font-black tracking-tight text-white sm:text-5xl">
          Unlimited ideas, websites, apps and more.
        </h2>
        <p className="mt-4 text-lg font-medium text-white sm:text-2xl">Starts with one message. No commitment.</p>
        <p className="mt-6 text-base text-[#d2d2d2] sm:text-xl">
          Ready to build? Tell me about your project — or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-white underline-offset-4 hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
      <div className="relative mx-auto max-w-3xl px-gutter pb-16">
        <ContactForm />
      </div>

      <div className="relative mx-auto max-w-5xl px-gutter pb-20">
        <h2 className="text-center text-2xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
        <ul className="mt-8 space-y-2">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className="group bg-[#2d2d2d] text-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg transition-colors hover:bg-[#414141] sm:p-6 sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    className="size-7 shrink-0 transition-transform duration-300 group-open:rotate-45 sm:size-9"
                    strokeWidth={1.5}
                  />
                </summary>
                <p className="border-t border-black p-5 text-base leading-relaxed sm:p-6 sm:text-xl">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
