import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import type { SVGProps } from "react";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — Opus variant",
  description:
    "Alternate portfolio build (Opus). Canonical site: stylessh.dev.",
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

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

function ThumbStrip({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {images.slice(0, 3).map((src, i) => (
        <span
          key={src}
          className="relative block h-14 w-14 overflow-hidden rounded-[5px] border border-border bg-muted/40"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]" />
          <span className="sr-only">
            {title} preview {i + 1}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";

  return (
    <main className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground pb-28">
      <div className="mx-auto w-full max-w-2xl px-8 py-16 sm:py-20">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <span className="text-label">Index</span>
          <span className="text-label inline-flex items-center gap-2">
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>
              <span className="hidden sm:inline">Latest Modified · </span>
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
              ) : (
                modifiedLabel
              )}
            </span>
          </span>
        </div>

        {/* Hero */}
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

        {/* Projects */}
        <section className="py-8" aria-labelledby="opus-projects">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="opus-projects" className="text-label">
              Projects
            </h2>
            <span className="text-label tabular-nums">
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="divide-y divide-border border-y border-border">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-label tabular-nums">
                        {pad(i + 1)}
                      </span>
                      <h3 className="text-highlight truncate">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-border/60 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                    </div>

                    <p className="pl-[1.625rem] max-w-md text-normal text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group ml-[1.625rem] inline-flex items-center gap-1.5",
                        "text-label hover:text-foreground transition-colors",
                      )}
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrow className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="ml-[1.625rem] sm:ml-0 shrink-0 self-start transition-opacity hover:opacity-90"
                  >
                    <ThumbStrip
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="py-8" aria-labelledby="opus-connect">
          <h2 id="opus-connect" className="text-label mb-6">
            Connect
          </h2>

          <ul className="flex flex-wrap items-center">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-3 text-[10px] text-border"
                  >
                    ·
                  </span>
                ) : null}
                <NextLink
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group inline-flex items-center gap-1.5 text-normal text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="underline decoration-border/60 underline-offset-4 transition-all group-hover:decoration-foreground">
                    {link.label}
                  </span>
                  <IconArrow className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-4">
          <span className="text-label">stylessh.dev / opus</span>
          <span className="text-label">
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
            ) : (
              modifiedLabel
            )}
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
