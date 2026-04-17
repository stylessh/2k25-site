import { Container } from "@/components/container";
import { Hero } from "@/components/sections/hero";
import { Links } from "@/components/sections/links";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent selection:text-accent-foreground">
      <Container>
        <Hero />
        <Projects />
        <Links />
      </Container>
    </div>
  );
}
