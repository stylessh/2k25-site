import { Container } from "@/components/container";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { Hero } from "@/components/sections/hero";
import { Links } from "@/components/sections/links";
import { Projects } from "@/components/sections/projects";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

export function PortfolioLayout() {
  const content = CANONICAL_PORTFOLIO;

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground pb-24">
      <Container>
        <Hero hero={content.hero} />
        <Projects projects={content.projects} />
        <Links />
      </Container>
      <ModelVariantToolbar />
    </div>
  );
}
