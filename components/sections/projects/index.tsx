import type { PortfolioProject } from "@/lib/portfolio-content";
import { ProjectDeckPreload } from "./project-deck-preload";
import { ProjectRow } from "./project-row";

type ProjectsProps = {
  projects: readonly PortfolioProject[];
};

export function Projects({ projects }: ProjectsProps) {
  const allDeckImageUrls = projects.flatMap((w) => [...w.deckImages]);

  return (
    <section className="py-8 first:pt-0">
      <ProjectDeckPreload urls={allDeckImageUrls} />
      <h2 className="text-label mb-6">Projects</h2>

      <div className="space-y-16">
        {projects.map((work) => (
          <ProjectRow key={work.title} work={work} />
        ))}
      </div>
    </section>
  );
}
