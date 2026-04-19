import { ProjectDeckPreload } from "./project-deck-preload";
import { ProjectTitleLink } from "./project-title-link";

const works = [
  {
    title: "DiffKit",
    href: "https://diff-kit.com",
    description:
      "A fast, design-first GitHub dashboard for developers who want to stay on top of their pull requests, issues, and code reviews — without the noise.",
    deckImages: [
      "/projects/diffkit/1.png",
      "/projects/diffkit/2.png",
      "/projects/diffkit/3.png",
    ],
  },
  {
    title: "Peel",
    href: "https://peel.studio",
    description: "Extract design tokens from any website, image or video.",
    deckImages: [
      "/projects/peel/1.png",
      "/projects/peel/2.png",
      "/projects/peel/3.png",
    ],
  },
  {
    title: "Interactions",
    href: "https://interactions-matter.vercel.app/",
    description:
      "Delightful User Interfaces and interactions, and how to create them.",
    deckImages: [
      "/projects/interactions/1.png",
      "/projects/interactions/2.png",
      "/projects/interactions/3.png",
    ],
  },
] as const;

const allDeckImageUrls = works.flatMap((w) => [...w.deckImages]);

export function Projects() {
  return (
    <section className="py-8 first:pt-0">
      <ProjectDeckPreload urls={allDeckImageUrls} />
      <h2 className="text-label mb-6">Projects</h2>

      <div className="space-y-16">
        {works.map((work) => (
          <div key={work.title} className="group space-y-2">
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
        ))}
      </div>
    </section>
  );
}
