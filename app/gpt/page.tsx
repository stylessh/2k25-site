import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — GPT variant",
  description: "Alternate portfolio build (GPT). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

function getLatestCommitDate(): Date | null {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
  timeZoneName: "short",
});

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

const quietLinkClass =
  "underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function hostName(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      role="presentation"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3.25 8.75 8.75 3.25M4.25 3.25h4.5v4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectFrames({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [primary, ...supporting] = images;

  return (
    <div className="grid gap-1.5 sm:grid-cols-[1fr_4.75rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/40">
        {primary ? (
          <Image
            src={primary}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 768px) 280px, 100vw"
            className="object-cover"
            draggable={false}
          />
        ) : null}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-1">
        {supporting.slice(0, 2).map((image, index) => (
          <div
            key={image}
            className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/40 sm:aspect-square"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="76px"
              className="object-cover"
              draggable={false}
            />
            <span className="absolute top-1.5 left-1.5 rounded-sm border border-border/80 bg-background/80 px-1 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
              {pad(index + 2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GptVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-[15rem_1fr]">
        <aside className="space-y-8 lg:sticky lg:top-16 lg:self-start">
          <nav className="flex items-center justify-between gap-4 lg:block lg:space-y-2">
            <NextLink
              href="/"
              className={cn(
                quietLinkClass,
                "text-[13px] text-muted-foreground",
              )}
            >
              Original
            </NextLink>
            <p className={labelClass}>GPT / Index</p>
          </nav>

          <header className="space-y-5 border-border border-t pt-6">
            <div className="space-y-1">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[24px] leading-tight tracking-[-0.03em]">
                {hero.name}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-[13px] leading-relaxed text-foreground">
                {hero.intro}
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                <span>{hero.employmentPrefix}</span>
                {hero.showSupabaseMark ? (
                  <span className="inline-flex size-[1lh] items-center rounded-md border border-border bg-muted/40 p-0.5">
                    <SupabaseMark className="size-full" />
                  </span>
                ) : null}
                <strong className="font-medium text-foreground">
                  {hero.orgName}
                </strong>
              </p>
            </div>
          </header>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-border border-t pt-5 text-[12px] sm:grid-cols-3 lg:grid-cols-1">
            <div className="grid gap-1">
              <dt className={labelClass}>Latest Modified</dt>
              <dd className="tabular-nums">
                {latestModified ? (
                  <time dateTime={latestModified.toISOString()}>
                    {latestModifiedText}
                  </time>
                ) : (
                  latestModifiedText
                )}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Entries</dt>
              <dd className="tabular-nums">{pad(projects.length)}</dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Theme</dt>
              <dd>System</dd>
            </div>
          </dl>
        </aside>

        <div className="min-w-0">
          <section aria-labelledby="gpt-projects">
            <div className="mb-4 flex items-baseline justify-between gap-4 border-border border-t pt-5">
              <h2 id="gpt-projects" className={labelClass}>
                Portfolio entries
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                shared source
              </span>
            </div>

            <ol className="divide-y divide-border border-border border-y">
              {projects.map((project, projectIndex) => (
                <li key={project.title}>
                  <article className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                            {pad(projectIndex + 1)}
                          </span>
                          <h3 className="font-medium text-[18px] leading-snug tracking-[-0.025em]">
                            <NextLink
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-accent"
                            >
                              {project.title}
                            </NextLink>
                          </h3>
                        </div>

                        <p className="max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pl-8">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span>{hostName(project.href)}</span>
                          <ExternalArrow className="size-3 opacity-60 transition-opacity group-hover:opacity-100" />
                        </NextLink>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {pad(project.deckImages.length)} frames
                        </span>
                      </div>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="group block rounded-lg outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <ProjectFrames
                        images={project.deckImages}
                        title={project.title}
                      />
                    </NextLink>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="mt-10 border-border border-t pt-5"
            aria-labelledby="gpt-connect"
          >
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="gpt-connect" className={labelClass}>
                Connect
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                {pad(connectLinks.length)} links
              </span>
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <NextLink
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={cn(
                      quietLinkClass,
                      "text-[13px] text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
