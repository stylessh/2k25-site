import { SupabaseMark } from "@/components/supabase-mark";

export function Hero() {
  return (
    <header className="space-y-8 mb-24">
      <div className="space-y-1">
        <h1 className="text-xl font-medium tracking-tight text-foreground">
          Alan Daniel
        </h1>
        <p className="text-sm text-muted-foreground">Design Engineer</p>
      </div>

      <div className="max-w-md space-y-4">
        <p className="text-sm leading-relaxed text-foreground">
          Designing and Engineering fresh, functional, accessible and
          great-looking user interfaces and experiences.
        </p>
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
          <span>Currently working at</span>
          <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
            <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
              <SupabaseMark className="h-full w-full" />
            </span>
          </span>
          <strong className="font-medium text-foreground">Supabase</strong>
        </p>
      </div>
    </header>
  );
}
