import type { PortfolioHero as PortfolioHeroContent } from "@/lib/portfolio-content";

export function Hero({ hero }: { hero: PortfolioHeroContent }) {
  return (
    <header className="space-y-8 mb-12">
      <div className="space-y-1">
        <h1 className="text-highlight">{hero.name}</h1>
        <p className="text-normal text-muted-foreground">{hero.role}</p>
      </div>

      <div className="max-w-md space-y-4">
        <p className="text-normal text-foreground">{hero.intro}</p>
      </div>
    </header>
  );
}
