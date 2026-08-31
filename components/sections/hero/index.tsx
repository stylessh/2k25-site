import { Links } from "@/components/sections/links";
import type { PortfolioHero as PortfolioHeroContent } from "@/lib/portfolio-content";
import { ContractBadge } from "./contract-badge";

export function Hero({ hero }: { hero: PortfolioHeroContent }) {
  return (
    <header className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-highlight">{hero.name}</h1>
          <p className="text-normal text-muted-foreground">{hero.role}</p>
        </div>

        <ContractBadge />
      </div>

      <div className="max-w-md space-y-6">
        <p className="text-normal text-foreground">{hero.intro}</p>
        <Links />
      </div>
    </header>
  );
}
