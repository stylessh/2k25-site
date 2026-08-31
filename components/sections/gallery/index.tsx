import type { PortfolioProject } from "@/lib/portfolio-content";
import { type GalleryItem, GalleryScroller } from "./gallery-scroller";

type GalleryProps = {
  projects: readonly PortfolioProject[];
};

export function Gallery({ projects }: GalleryProps) {
  const items: GalleryItem[] = projects.flatMap((project) =>
    project.media.map((media) => ({
      src: media.src,
      poster: media.poster,
      type: media.type,
      alt: `${project.title} preview`,
    })),
  );

  return (
    <section aria-label="Selected work" className="h-full w-full">
      <GalleryScroller items={items} />
    </section>
  );
}
