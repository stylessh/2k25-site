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
      strokeWidth={1.5}
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
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 pt-10 pb-28 sm:px-8 sm:pt-14">
        {/* Meta bar */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={cn(monoLabel, "tabular-nums")}>opus · 2026</span>
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span className="hidden sm:inline">Latest Modified · </span>
            <span className="sm:hidden">Mod · </span>
            {modified ? (
              <time dateTime={modified.toISOString()} className="tabular-nums">
                {modifiedLabel}
              </time>
            ) : (
              <span className="tabular-nums">{modifiedLabel}</span>
            )}
          </span>
        </div>

        {/* Hero — centered, editorial */}
        <header className="space-y-6 text-center">
          <p className={monoLabel}>{hero.role}</p>
          <h1 className="text-[26px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[30px]">
            {hero.name}
          </h1>
          <p className="mx-auto max-w-md text-[13px] leading-relaxed text-foreground">
            {hero.intro}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
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

        {/* Projects — filmstrip catalog */}
        <section className="mt-16" aria-labelledby="opus-index">
          <div className="mb-4 flex items-baseline justify-between gap-4 border-t border-border pt-4">
            <h2 id="opus-index" className={monoLabel}>
              Index
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="flex flex-col gap-12">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="space-y-4">
                  <header className="flex items-baseline justify-between gap-4">
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {pad(i + 1)}
                      </span>
                      <h3 className="text-[16px] font-medium tracking-[-0.015em] truncate">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground transition-colors hover:text-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        monoLabel,
                        "group inline-flex shrink-0 items-center gap-1.5 transition-colors hover:text-foreground",
                      )}
                    >
                      <span className="hidden sm:inline">
                        {hostnameOf(project.href)}
                      </span>
                      <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </header>

                  <p className="pl-7 max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group ml-7 grid grid-cols-3 gap-1.5"
                  >
                    {project.deckImages.map((src, idx) => (
                      <span
                        key={src}
                        className="relative block aspect-[4/3] overflow-hidden rounded-[5px] border border-border bg-muted/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 200px, 30vw"
                          className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                          draggable={false}
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]"
                        />
                        <span className="absolute bottom-1 left-1 rounded-sm border border-border/80 bg-background/85 px-1 py-px font-mono text-[9px] tabular-nums text-muted-foreground backdrop-blur-sm">
                          {pad(idx + 1)}
                        </span>
                      </span>
                    ))}
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-14" aria-labelledby="opus-connect">
          <div className="mb-3 flex items-baseline justify-between gap-4 border-t border-border pt-4">
            <h2 id="opus-connect" className={monoLabel}>
              Connect
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(connectLinks.length)} ch
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-2 text-[10px] text-border"
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
        <div className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>stylessh.dev / opus</span>
          <span className={monoLabel}>
            {modified ? (
              <time dateTime={modified.toISOString()} className="tabular-nums">
                {modifiedLabel}
              </time>
            ) : (
              <span className="tabular-nums">{modifiedLabel}</span>
            )}
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
