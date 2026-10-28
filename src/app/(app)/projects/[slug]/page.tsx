import { ArrowLeft, Info, Lock, Play } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, siteConfig } from "@/data/portfolio";
import { genres, matchScore, similarProjects } from "@/lib/projects";
import { JBadge, Meta, TopTenBadge, nfButton } from "@/components/netflix/brand";
import { ProfileLink } from "@/components/netflix/profile-link";
import { ProjectPreview } from "@/components/projects/project-preview";

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
  const accent = `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`;

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
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <header className="relative flex min-h-[620px] items-end overflow-hidden pt-24 pb-14 sm:h-[85svh] sm:pb-20">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-[10%] -right-[10%] w-[100%] [perspective:1800px] sm:top-[8%] sm:-right-[4%] sm:w-[68%]">
            <div className="origin-[70%_40%] animate-billboard">
              <ProjectPreview project={project} className="[transform:rotateY(-14deg)_rotateX(6deg)]" />
            </div>
          </div>
          <div
            className="absolute top-[10%] right-[10%] size-[40vw] rounded-full opacity-25 blur-[120px]"
            style={{ background: accent }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_42%,rgba(0,0,0,0.05)_85%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#141414] to-transparent" />
        </div>

        <div className="relative w-full px-gutter sm:w-[64%] lg:w-[52%]">
          <ProfileLink
            hash="projects"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-[#b3b3b3] transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Back to browse
          </ProfileLink>
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.35em] text-[#ddd] uppercase sm:text-sm">
            <JBadge className="text-3xl tracking-normal sm:text-4xl" /> Project
          </p>
          <h1 className="mt-1 font-display text-[clamp(3.4rem,9vw,8rem)] leading-[0.88] tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {project.title}
          </h1>
          <div className="mt-4">
            <Meta project={project} />
          </div>
          {project.featured && (
            <p className="mt-3 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
              <TopTenBadge /> #{index + 1} in Projects Today
            </p>
          )}
          <p className="mt-4 max-w-xl leading-relaxed text-white sm:text-lg">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={nfButton.play}>
                <Play className="size-5 fill-current sm:size-6" /> Visit Live Site
              </a>
            ) : (
              <span className={nfButton.info}>
                <Lock className="size-5" /> Private build · demo on request
              </span>
            )}
            <ProfileLink hash="contact" className={nfButton.info}>
              <Info className="size-5 sm:size-6" /> Start a Similar Project
            </ProfileLink>
          </div>
        </div>
      </header>

      {/* Details */}
      <div className="grid gap-10 px-gutter lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <p className="text-lg leading-relaxed text-[#e5e5e5]">{project.overview}</p>
          {project.note && <p className="mt-4 text-sm text-[#bcbcbc] italic">Note: {project.note}</p>}

          <section aria-labelledby="episodes-heading" className="mt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 id="episodes-heading" className="text-2xl font-bold text-white">
                Episodes
              </h2>
              <span className="rounded-[4px] border border-[#4d4d4d] bg-[#242424] px-3 py-1.5 text-sm text-white">
                Season 1 · Features
              </span>
            </div>
            <ol className="mt-4">
              {project.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center gap-4 rounded-[4px] border-b border-[#404040] px-2 py-5 first:bg-[#2a2a2a] sm:gap-6 sm:px-6"
                >
                  <span className="w-6 shrink-0 text-center text-2xl text-[#d2d2d2]">{i + 1}</span>
                  <span
                    aria-hidden="true"
                    className="relative hidden aspect-video w-32 shrink-0 overflow-hidden rounded-[4px] sm:grid sm:place-items-center"
                    style={{ background: accent }}
                  >
                    <span className="absolute inset-0 bg-black/35" />
                    <Play className="relative size-6 fill-white text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">{f}</span>
                    <span className="mt-1 block text-sm text-[#a3a3a3]">
                      {project.title} · {genres(project)[0]}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-8 text-sm leading-relaxed lg:pt-1">
          <dl className="space-y-3">
            <div>
              <dt className="inline text-[#777]">Stack: </dt>
              <dd className="inline text-[#ddd]">{project.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="inline text-[#777]">Genres: </dt>
              <dd className="inline text-[#ddd]">{genres(project).join(", ")}</dd>
            </div>
            <div>
              <dt className="inline text-[#777]">Creator: </dt>
              <dd className="inline text-[#ddd]">{siteConfig.name}</dd>
            </div>
          </dl>
          {project.highlights && (
            <ul className="grid grid-cols-3 gap-2">
              {project.highlights.map((h) => (
                <li key={h.label} className="rounded-[4px] bg-[#232323] p-3">
                  <span className="block font-display text-2xl leading-none tracking-wide text-white">{h.value}</span>
                  <span className="mt-1 block text-xs text-[#a3a3a3]">{h.label}</span>
                </li>
              ))}
            </ul>
          )}
          {project.role && (
            <div>
              <h2 className="text-xl font-bold text-white">Behind the Scenes</h2>
              <p className="mt-2 text-[15px] text-[#d2d2d2]">{project.role}</p>
            </div>
          )}
        </aside>
      </div>

      {/* More like this */}
      <section aria-labelledby="similar-heading" className="mt-16 px-gutter">
        <h2 id="similar-heading" className="text-2xl font-bold text-white">
          More Like This
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {similarProjects(project).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full overflow-hidden rounded-[4px] bg-[#2f2f2f] transition-colors hover:bg-[#3a3a3a]"
              >
                <span className="relative block aspect-video overflow-hidden">
                  <ProjectPreview
                    project={p}
                    fill
                    className="h-full rounded-none border-0 shadow-none transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2 left-3 font-display text-2xl leading-none text-white">{p.title}</span>
                </span>
                <span className="block p-4">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-match">{matchScore(p)}% Match</span>
                    <span className="rounded-[3px] border border-white/40 px-1 text-[11px] text-[#bcbcbc]">{p.status}</span>
                  </span>
                  <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-[#d2d2d2]">{p.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
