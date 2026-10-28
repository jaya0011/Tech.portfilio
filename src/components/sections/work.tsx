"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/portfolio";
import { FeaturedProject } from "@/components/projects/featured-project";
import { ProjectArchive } from "@/components/projects/project-archive";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";

const featured = projects.filter((p) => p.featured);

export function Work() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title={[{ text: "Products I've" }, { text: "designed & shipped.", className: accent }]}
          description="Real platforms used by real businesses — ecommerce, SaaS, healthcare, education and more. Open any project for the full case study."
        />

        <div ref={stackRef} className="mt-14 flex flex-col gap-8 pb-8">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} index={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">Project archive</h3>
                <p className="mt-2 text-muted">Every product, filtered by what you&apos;re looking for.</p>
              </div>
            </div>
          </Reveal>
          {/* Not wrapped in <Reveal>: its filter would break the fixed-position hover preview. */}
          <div className="mt-8">
            <ProjectArchive />
          </div>
        </div>
      </div>
    </section>
  );
}
