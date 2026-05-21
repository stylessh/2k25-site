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

function IconArrowOut(props: SVGProps<SVGSVGElement>) {
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

const mono =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

/** Inline dot-leader — fills the gap between a left and right element. */
function Leader() {
  return (
    <span
      aria-hidden
      className="mx-2 hidden flex-1 self-end border-border border-b border-dotted pb-1 sm:block"
    />
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 pb-28 sm:px-8 sm:py-16">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={mono}>opus · 02</span>
          <span
            className={cn(mono, "inline-flex items-center gap-2 tabular-nums")}
          >
            <span
              aria-hidden
              className="inline-block size-1 rounded-full bg-accent"
            />
            <span className="hidden sm:inline">Latest Modified</span>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
            ) : (
              <span>{modifiedLabel}</span>
            )}
          </span>
        </div>

        {/* Hero — name leads, role floats right */}
        <header className="border-border border-t pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[20px] font-medium tracking-[-0.02em] leading-[1.1]">
              {hero.name}
            </h1>
            <span className={mono}>{hero.role}</span>
          </div>

          <p className="mt-5 max-w-md text-[13px] leading-relaxed">
            {hero.intro}
          </p>

          <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
            <span>{hero.employmentPrefix}</span>
            {hero.showSupabaseMark ? (
              <span className="inline-flex size-[1lh] items-center rounded-md border border-border bg-muted/40 p-0.5">
                <span className="inline-flex size-full shrink-0 items-center justify-center">
                  <SupabaseMark className="size-full" />
                </span>
              </span>
            ) : null}
            <strong className="font-medium text-foreground">
              {hero.orgName}
            </strong>
          </p>
        </header>

        {/* Projects — catalog with full-width filmstrip per row */}
        <section className="mt-14" aria-labelledby="opus-index">
          <div className="flex items-baseline justify-between gap-4 border-border border-t pt-4 pb-6">
            <h2 id="opus-index" className={mono}>
              Index
            </h2>
            <span className={cn(mono, "tabular-nums")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="space-y-10">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="space-y-3">
                  {/* Leader row: index → title …………… host ↗ */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <h3 className="text-[15px] font-medium tracking-[-0.01em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors hover:text-accent"
                      >
                        {project.title}
                      </NextLink>
                    </h3>
                    <Leader />
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  {/* Filmstrip — 3 evenly sized thumbnails */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-1.5"
                  >
                    {project.deckImages.slice(0, 3).map((src) => (
                      <span
                        key={src}
                        className="relative block aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/40"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 12rem, 30vw"
                          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                          draggable={false}
                        />
                      </span>
                    ))}
                  </NextLink>

                  <p className="max-w-md pl-7 text-[13px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-14" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 border-border border-t pt-4 pb-4">
            <h2 id="opus-connect" className={mono}>
              Connect
            </h2>
            <span className={cn(mono, "tabular-nums")}>
              {pad(connectLinks.length)} ch
            </span>
          </div>

          <ul className="flex flex-wrap items-center">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-2 text-[10px] text-border"
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
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="underline decoration-border/60 underline-offset-4 transition-all group-hover:decoration-foreground">
                    {link.label}
                  </span>
                  <IconArrowOut className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-14 flex items-baseline justify-between gap-4 border-border border-t pt-3">
          <span className={mono}>stylessh.dev / opus</span>
          <span className={mono}>
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
