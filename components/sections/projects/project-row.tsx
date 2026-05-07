import type { PortfolioProject } from "@/lib/portfolio-content";
import { ProjectTitleLink } from "./project-title-link";

export function ProjectRow({ work }: { work: PortfolioProject }) {
  return (
    <div className="group space-y-2">
      <h3 className="text-highlight">
        <ProjectTitleLink
          href={work.href}
          title={work.title}
          deckImages={work.deckImages}
        />
      </h3>
      <p className="text-normal text-muted-foreground max-w-lg">
        {work.description}
      </p>
    </div>
  );
}
