import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, siteConfig } from "@/data/portfolio";
import { ProjectPreview } from "@/components/projects/project-preview";
import { StatusBadge } from "@/components/projects/status-badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ${project.type}`;
  return {
    title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.tagline, url: `/projects/${project.slug}`, type: "article" },
    twitter: { title, description: project.tagline },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    genre: project.type,
    ...(project.url ? { url: project.url } : {}),
    creator: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: project.stack.join(", "),
  };

  return (
    <article className="relative pt-32 pb-12 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[900px] max-w-full -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})` }}
      />

      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <Reveal>
          <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> All projects
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} />
                <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">{project.type}</span>
              </div>
            </Reveal>
            <h1 className="mt-5 text-5xl leading-[1] font-semibold tracking-[-0.035em] sm:text-7xl">
              <SplitText segments={project.title} animateOnMount delay={0.1} />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">{project.tagline}</p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="flex flex-wrap gap-3 lg:justify-end">
            {project.url ? (
              <ButtonLink href={project.url} size="lg">
                Visit live site
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            ) : (
              <span className="inline-flex h-12 items-center rounded-full px-6 text-sm text-muted glass">
                Private build · demo on request
              </span>
            )}
            <ButtonLink href="/#contact" variant="secondary" size="lg">
              Start a similar project
            </ButtonLink>
          </Reveal>
        </header>

        <Reveal delay={0.25} className="mt-14">
          <div className="rounded-[2rem] p-2 shadow-soft glass sm:p-3">
            <ProjectPreview project={project} className="rounded-[1.5rem]" />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Tech stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="rounded-lg px-3 py-1.5 font-mono text-xs glass">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            {project.highlights && (
              <Reveal delay={0.1}>
                <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">At a glance</h2>
                <dl className="mt-4 grid grid-cols-3 gap-3">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl p-4 glass">
                      <dd className="text-xl font-semibold tracking-tight">{h.value}</dd>
                      <dt className="mt-1 text-xs leading-snug text-muted">{h.label}</dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {project.role && (
              <Reveal delay={0.15}>
                <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">My role</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{project.role}</p>
              </Reveal>
            )}
          </aside>

          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{project.overview}</p>
            </Reveal>

            {project.note && (
              <Reveal delay={0.05}>
                <p className="mt-6 flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
                  <Info className="mt-0.5 size-4 shrink-0" /> {project.note}
                </p>
              </Reveal>
            )}

            <Reveal className="mt-14">
              <h2 className="text-3xl font-semibold tracking-tight">Key features</h2>
            </Reveal>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {project.features.map((f) => (
                <StaggerItem key={f} className="flex items-start gap-3 rounded-2xl p-4 glass">
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})` }}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-[15px] leading-snug">{f}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <nav aria-label="More projects" className="mt-28 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-3xl p-6 glass transition-colors hover:border-line-strong"
          >
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-3 block text-2xl font-semibold tracking-tight">{prev.title}</span>
            <span className="mt-1 block text-sm text-muted">{prev.type}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-3xl p-6 text-right glass transition-colors hover:border-line-strong"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-xs text-muted">
              Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-3 block text-2xl font-semibold tracking-tight">{next.title}</span>
            <span className="mt-1 block text-sm text-muted">{next.type}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
