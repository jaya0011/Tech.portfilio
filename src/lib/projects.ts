import { profiles, projectFilters, projects, type Profile, type ProfileId, type Project } from "@/data/portfolio";

export function getProfile(id: string | null | undefined): Profile {
  return profiles.find((p) => p.id === id) ?? profiles[0];
}

export function isProfileId(id: string): id is ProfileId {
  return profiles.some((p) => p.id === id);
}

/** Playful Netflix-style "98% Match" — stable per project, highest for featured work. */
export function matchScore(project: Project) {
  const i = projects.indexOf(project);
  return project.featured ? 98 - (i % 2) : 95 - (i % 4) * 2;
}

export function genres(project: Project) {
  return project.filters.map((f) => projectFilters.find((pf) => pf.id === f)?.label ?? f);
}

/** Projects that share the most filters with `project` ("More Like This"). */
export function similarProjects(project: Project, count = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.filters.filter((f) => project.filters.includes(f)).length + (p.featured ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ p }) => p);
}

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
