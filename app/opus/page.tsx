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

/** Resolved at build time; falls back to "now" if git history is unavailable. */
function getLatestCommitDate(): Date | null {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

const longDateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const isoDateFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function IconArrowOut(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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

const monoLabel =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

/**
 * Fanned/stacked thumbnail of a project's deck images.
 * Pure CSS hover effect spreads the cards slightly on hover.
 */
function ProjectStack({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const visible = images.slice(0, 3);
  // Pre-baked transforms so the markup stays simple and SSR-friendly.
  const restTransforms = [
    "-rotate-[6deg] -translate-x-2 translate-y-1.5 group-hover:-rotate-[10deg] group-hover:-translate-x-3.5 group-hover:translate-y-2",
    "rotate-[5deg] translate-x-2 -translate-y-0.5 group-hover:rotate-[9deg] group-hover:translate-x-3.5 group-hover:-translate-y-1.5",
  ];

  return (
    <div
      className="relative h-[88px] w-[120px] sm:h-[96px] sm:w-[132px] shrink-0"
      aria-hidden
    >
      {visible.slice(1).map((src, i) => (
        <span
          key={src}
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[5px] border border-border bg-muted/40",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
            "transition-transform duration-500 ease-out",
            restTransforms[i],
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="132px"
            className="object-cover opacity-90"
            draggable={false}
          />
        </span>
      ))}
      {visible[0] ? (
        <span
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[5px] border border-border bg-muted/40",
            "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
            "transition-transform duration-500 ease-out",
            "group-hover:-translate-y-0.5",
          )}
        >
          <Image
            src={visible[0]}
            alt={`${title} preview`}
            fill
            sizes="132px"
            className="object-cover"
            draggable={false}
          />
        </span>
      ) : null}
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLong = modified ? longDateFmt.format(modified) : "—";
  const modifiedIso = modified ? isoDateFmt.format(modified) : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground pb-28">
      <div className="mx-auto w-full max-w-[640px] px-6 sm:px-8 py-12 sm:py-16">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-border">
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>Opus · Specimen</span>
          </span>
          <span className={monoLabel}>v.{modifiedIso}</span>
        </div>

        {/* Hero — two-column on sm+ */}
        <header className="grid gap-8 sm:grid-cols-12 sm:gap-10 pt-10 pb-12">
          <div className="sm:col-span-7 space-y-5">
            <p className={monoLabel}>{hero.role}</p>
            <h1 className="text-[26px] sm:text-[30px] font-medium tracking-[-0.025em] leading-[1.05]">
              {hero.name}
            </h1>
            <p className="text-[13px] leading-relaxed text-foreground max-w-[34ch]">
              {hero.intro}
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
              <span>{hero.employmentPrefix}</span>
              {hero.showSupabaseMark ? (
                <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
                  <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
                    <SupabaseMark className="h-full w-full" />
                  </span>
                </span>
              ) : null}
              <strong className="font-medium text-foreground">
                {hero.orgName}
              </strong>
            </p>
          </div>

          <dl className="sm:col-span-5 sm:border-l sm:border-border sm:pl-6 grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-2.5">
            <dt className={monoLabel}>Latest Modified</dt>
            <dd className="text-[12px] text-foreground tabular-nums">
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLong}</time>
              ) : (
                "Unavailable"
              )}
            </dd>
            <dt className={monoLabel}>Entries</dt>
            <dd className="text-[12px] text-foreground tabular-nums">
              {pad(projects.length)}
            </dd>
            <dt className={monoLabel}>Theme</dt>
            <dd className="text-[12px] text-foreground">System</dd>
            <dt className={monoLabel}>Edition</dt>
            <dd className="text-[12px] text-foreground">Opus</dd>
          </dl>
        </header>

        {/* Section header */}
        <div className="flex items-baseline justify-between gap-4 border-t border-border pt-5 pb-2">
          <span className={monoLabel}>Selected Work</span>
          <span className={monoLabel}>{pad(projects.length)} / specimens</span>
        </div>

        {/* Entries */}
        <ol className="divide-y divide-border">
          {projects.map((project, i) => (
            <li key={project.title}>
              <article className="group grid grid-cols-[auto_1fr] items-start gap-5 py-7">
                <NextLink
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="block"
                >
                  <ProjectStack
                    images={project.deckImages}
                    title={project.title}
                  />
                </NextLink>

                <div className="min-w-0 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground shrink-0">
                      {pad(i + 1)}
                    </span>
                    <h2 className="text-[15px] font-medium tracking-[-0.01em] truncate">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {project.title}
                      </NextLink>
                    </h2>
                  </div>

                  <p className="pl-7 text-[12.5px] leading-relaxed text-muted-foreground max-w-[42ch]">
                    {project.description}
                  </p>

                  <div className="pl-7">
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </NextLink>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Connect */}
        <div className="border-t border-border pt-5 mt-2">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <span className={monoLabel}>Connect</span>
            <span className={monoLabel}>
              {pad(connectLinks.length)} channels
            </span>
          </div>
          <ul className="flex flex-wrap items-center">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="px-2 text-border select-none text-[10px]"
                  >
                    /
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
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-border/60 group-hover:decoration-foreground transition-all">
                    {link.label}
                  </span>
                  <IconArrowOut className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>stylessh.dev / opus</span>
          <span className={monoLabel}>
            Last edit ·{" "}
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedIso}</time>
            ) : (
              "—"
            )}
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
