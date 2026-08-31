import { Container } from "@/components/container";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

export function PortfolioLayout() {
  const content = CANONICAL_PORTFOLIO;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Container className="shrink-0 py-0 pt-16 sm:pt-20">
        <Hero hero={content.hero} />
      </Container>

      <div className="min-h-0 flex-1 pt-10 pb-10 sm:pb-16">
        <Gallery projects={content.projects} />
      </div>
    </div>
  );
}
