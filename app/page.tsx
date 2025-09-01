import { Container } from "@/components/container";
import { Hero } from "@/components/sections/hero";
import { Links } from "@/components/sections/links";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="bg-surface-page h-screen">
      <Container>
        <Hero />
        <Projects />
        <Links />
      </Container>
    </main>
  );
}
