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

const monoLabel =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

/** Two-column meta row used inside the left side rail. */
function RailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className={monoLabel}>{label}</p>
      <div className="text-[12px] leading-snug text-foreground/80">
        {children}
      </div>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";
  const year = (modified ?? new Date()).getUTCFullYear();

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 pb-28 sm:px-10 sm:py-16">
        {/* Top utility bar */}
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <span className={monoLabel}>opus · index</span>
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>v.{year}</span>
          </span>
        </div>

        {/* Editorial grid: side rail + content */}
        <div className="mt-10 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
          {/* Side rail */}
          <aside className="space-y-7 sm:sticky sm:top-10 sm:self-start">
            <RailRow label="Index">
              <span className="font-mono tabular-nums">opus / {year}</span>
            </RailRow>

            <RailRow label="Latest Modified">
              {modified ? (
                <time
                  dateTime={modified.toISOString()}
                  className="font-mono tabular-nums"
                >
                  {modifiedLabel}
                </time>
              ) : (
                <span className="font-mono">{modifiedLabel}</span>
              )}
            </RailRow>

            <RailRow label="Entries">
              <span className="font-mono tabular-nums">
                {pad(projects.length)} of {pad(projects.length)}
              </span>
            </RailRow>

            <RailRow label="Theme">System</RailRow>

            <RailRow label="Source">
              <NextLink
                href="/"
                className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                stylessh.dev
              </NextLink>
            </RailRow>
          </aside>

          {/* Content column */}
          <div className="min-w-0">
            {/* Hero */}
            <header className="space-y-5">
              <p className={monoLabel}>{hero.role}</p>
              <h1 className="text-[26px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[30px]">
                {hero.name}
              </h1>
              <p className="max-w-md text-[13px] leading-relaxed text-foreground">
                {hero.intro}
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
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

            {/* Projects */}
            <section className="mt-14" aria-labelledby="opus-projects-heading">
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-6">
                <h2 id="opus-projects-heading" className={monoLabel}>
                  Selected Works
                </h2>
                <span className={cn(monoLabel, "tabular-nums")}>
                  {pad(projects.length)} entries
                </span>
              </div>

              <ol className="space-y-12">
                {projects.map((project, i) => {
                  const [hero1, hero2, hero3] = project.deckImages;

                  return (
                    <li key={project.title}>
                      <article className="space-y-4">
                        {/* Header row: index + title + hostname */}
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                            {pad(i + 1)}
                          </span>
                          <h3 className="min-w-0 flex-1 truncate text-[16px] font-medium tracking-[-0.015em]">
                            <NextLink
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                            >
                              {project.title}
                            </NextLink>
                          </h3>
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <span className="hidden sm:inline">
                              {hostnameOf(project.href)}
                            </span>
                            <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </NextLink>
                        </div>

                        {/* Image plate: featured 16:10 + two stacked thumbs */}
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title}`}
                          className="group block"
                        >
                          <div className="grid grid-cols-[1fr_auto] gap-1.5">
                            {hero1 ? (
                              <span className="relative block aspect-[16/10] overflow-hidden rounded-md border border-border bg-muted/40">
                                <Image
                                  src={hero1}
                                  alt=""
                                  fill
                                  sizes="(min-width: 640px) 28rem, 90vw"
                                  className="object-cover transition-opacity duration-300 group-hover:opacity-95"
                                  draggable={false}
                                />
                                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]" />
                              </span>
                            ) : null}

                            <span className="hidden w-20 grid-rows-2 gap-1.5 sm:grid">
                              {[hero2, hero3].map((src, idx) =>
                                src ? (
                                  <span
                                    key={src}
                                    className="relative block overflow-hidden rounded-md border border-border bg-muted/40"
                                  >
                                    <Image
                                      src={src}
                                      alt=""
                                      fill
                                      sizes="80px"
                                      className="object-cover"
                                      draggable={false}
                                    />
                                    <span className="absolute bottom-1 left-1 rounded-sm border border-border/80 bg-background/85 px-1 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
                                      {pad(idx + 2)}
                                    </span>
                                    <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]" />
                                  </span>
                                ) : null,
                              )}
                            </span>
                          </div>
                        </NextLink>

                        {/* Description + meta */}
                        <div className="grid gap-2 pl-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                          <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                          <span
                            className={cn(
                              monoLabel,
                              "shrink-0 text-[10px] sm:text-right",
                            )}
                          >
                            {hostnameOf(project.href)}
                          </span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Connect */}
            <section className="mt-14" aria-labelledby="opus-connect-heading">
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-4">
                <h2 id="opus-connect-heading" className={monoLabel}>
                  Connect
                </h2>
                <span className={cn(monoLabel, "tabular-nums")}>
                  {pad(connectLinks.length)} channels
                </span>
              </div>

              <ul className="grid gap-2">
                {connectLinks.map((link, i) => (
                  <li key={link.label}>
                    <NextLink
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 py-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {pad(i + 1)}
                      </span>
                      <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
                        {link.label}
                      </span>
                      <IconArrowOut className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                    </NextLink>
                  </li>
                ))}
              </ul>
            </section>

            {/* Footer */}
            <footer className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <span className={monoLabel}>stylessh.dev / opus</span>
              <span className={monoLabel}>
                {modified ? (
                  <time
                    dateTime={modified.toISOString()}
                    className="tabular-nums"
                  >
                    Latest Modified · {modifiedLabel}
                  </time>
                ) : (
                  <>Latest Modified · {modifiedLabel}</>
                )}
              </span>
            </footer>
          </div>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
