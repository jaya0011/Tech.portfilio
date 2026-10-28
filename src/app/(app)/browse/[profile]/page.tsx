import { Briefcase, Clapperboard, Code2, Layers, Send, Workflow } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import {
  journey,
  processSteps,
  profiles,
  projects,
  services,
  skillGroups,
  type ProjectFilter,
  type RowId,
  type SectionId,
} from "@/data/portfolio";
import { getProfile, isProfileId } from "@/lib/projects";
import { Billboard } from "@/components/netflix/billboard";
import { ContinueLinkCard, ContinueProjectCard, PickCard, PosterCard, ProjectCard } from "@/components/netflix/cards";
import { Row } from "@/components/netflix/row";
import { AboutSection, ContactSection, JourneyArt, ProcessCard, serviceCard, skillCard } from "@/components/netflix/sections";
import { TitleModalProvider } from "@/components/netflix/title-modal";

type Props = { params: Promise<{ profile: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return profiles.map((p) => ({ profile: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profile } = await params;
  return {
    title: `Browse as ${getProfile(profile).name}`,
    // Every profile is a re-ordering of the same content.
    alternates: { canonical: "/browse/recruiter" },
  };
}

const picks: Record<SectionId, { title: string; caption: string; icon: React.ReactNode; gradient: string; image?: string }> = {
  projects: {
    image: "/projects/mr-veg.webp",
    title: "Projects",
    caption: `${projects.length} titles · web, mobile & ecommerce`,
    icon: <Clapperboard />,
    gradient: "linear-gradient(135deg,#e50914,#4a0306)",
  },
  skills: {
    image: "/projects/first-rank.webp",
    title: "Skills",
    caption: "Next.js · NestJS · PostgreSQL · React Native",
    icon: <Code2 />,
    gradient: "linear-gradient(135deg,#2f6fed,#0a1a40)",
  },
  about: {
    image: "/projects/global-hrbook.webp",
    title: "Experience",
    caption: "Freelance developer · MSc CS · BCA",
    icon: <Briefcase />,
    gradient: "linear-gradient(135deg,#8e44ad,#250a33)",
  },
  services: {
    image: "/projects/dentist-pitampura.webp",
    title: "Services",
    caption: "Web apps, mobile apps, stores & more",
    icon: <Layers />,
    gradient: "linear-gradient(135deg,#e5b80b,#4a3200)",
  },
  process: {
    image: "/projects/mendingminds.webp",
    title: "How I Work",
    caption: processSteps.map((s) => s.title).join(" → "),
    icon: <Workflow />,
    gradient: "linear-gradient(135deg,#2ea043,#082611)",
  },
  contact: {
    image: "/projects/electric-marshmallow.webp",
    title: "Hire Me",
    caption: "Usually replies within 24–48 hours",
    icon: <Send />,
    gradient: "linear-gradient(135deg,#f97316,#4a1503)",
  },
};

const byFilter = (...filters: ProjectFilter[]) => projects.filter((p) => p.filters.some((f) => filters.includes(f)));

/** Decorative "watched" amount for things still in progress. */
const progress = { "In development": 0.62, "Private build": 0.85, Present: 0.8, Pursuing: 0.5 } as Record<string, number>;

export default async function BrowsePage({ params }: Props) {
  const { profile: id } = await params;
  if (!isProfileId(id)) notFound();
  const profile = getProfile(id);

  const genreRow = (key: string, title: string, list: typeof projects) => (
    <Row key={key} title={title}>
      {list.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </Row>
  );

  const rows: Record<RowId, React.ReactNode> = {
    picks: (
      <Row title={`Today's Top Picks for ${profile.name}`}>
        {profile.picks.map((s) => (
          <PickCard key={s} href={`#${s}`} {...picks[s]} />
        ))}
      </Row>
    ),
    top: (
      <Row id="projects" title="Top 10 Projects in Portfolio Today" size="lg">
        {projects.map((p, i) => (
          <PosterCard key={p.slug} project={p} rank={i + 1} />
        ))}
      </Row>
    ),
    continue: (
      <Row title={`Continue Watching for ${profile.name}`}>
        {projects
          .filter((p) => p.status !== "Live")
          .map((p) => (
            <ContinueProjectCard key={p.slug} project={p} progress={progress[p.status]} />
          ))}
        {journey
          .filter((j) => j.period in progress)
          .map((j) => (
            <ContinueLinkCard
              key={j.title}
              href="#about"
              title={j.title}
              subtitle={`${j.period} · ${j.org}`}
              progress={progress[j.period]}
              art={<JourneyArt type={j.type} period={j.period} />}
            />
          ))}
      </Row>
    ),
    web: genreRow("web", "Binge-worthy Web Apps & SaaS", byFilter("web-app")),
    commerce: genreRow("commerce", "Ecommerce & WordPress Hits", byFilter("ecommerce", "wordpress")),
    "mobile-ai": genreRow("mobile-ai", "New Releases: Mobile & AI", byFilter("mobile", "ai")),
    skills: (
      <Row id="skills" title="Trending Now: Tech Stack" size="lg">
        {skillGroups.map(skillCard)}
      </Row>
    ),
    services: (
      <Row id="services" title="Only on Jaya: Services" size="lg">
        {services.map(serviceCard)}
      </Row>
    ),
    process: (
      <Row id="process" title="Behind the Scenes: How I Work" size="lg">
        {processSteps.map((s) => (
          <ProcessCard key={s.step} {...s} />
        ))}
      </Row>
    ),
    about: <AboutSection />,
  };

  return (
    <TitleModalProvider>
      <Billboard profile={profile} />
      <div className="relative z-10 -mt-16 space-y-8 sm:-mt-24 sm:space-y-12 lg:-mt-32">
        {profile.rows.map((r) => (
          <Fragment key={r}>{rows[r]}</Fragment>
        ))}
      </div>
      <ContactSection />
    </TitleModalProvider>
  );
}
