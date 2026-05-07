import { SupabaseMark } from "@/components/supabase-mark";
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
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-normal text-muted-foreground">
          <span>{hero.employmentPrefix}</span>
          {hero.showSupabaseMark ? (
            <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
              <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
                <SupabaseMark className="h-full w-full" />
              </span>
            </span>
          ) : null}
          <strong className="text-highlight">{hero.orgName}</strong>
        </p>
      </div>
    </header>
  );
}
