import { SupabaseMark } from "@/components/supabase-mark";

export function Hero() {
  return (
    <header className="space-y-8 mb-12">
      <div className="space-y-1">
        <h1 className="text-highlight">Alan Daniel</h1>
        <p className="text-normal text-muted-foreground">Design Engineer</p>
      </div>

      <div className="max-w-md space-y-4">
        <p className="text-normal text-foreground">
          Designing and Engineering fresh, functional, accessible and
          great-looking user interfaces and experiences.
        </p>
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-normal text-muted-foreground">
          <span>Currently working at</span>
          <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
            <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
              <SupabaseMark className="h-full w-full" />
            </span>
          </span>
          <strong className="text-highlight">Supabase</strong>
        </p>
      </div>
    </header>
  );
}
