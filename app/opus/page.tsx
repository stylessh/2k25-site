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

const eyebrow =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

function Rule() {
  return <span aria-hidden className="block h-px w-full bg-border" />;
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";
  const count = projects.length;

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12 pb-28 sm:px-8 sm:py-16">
        {/* Top status strip */}
        <div className="flex items-center justify-between gap-4">
          <span className={eyebrow}>stylessh.dev / opus</span>
          <span className={cn(eyebrow, "inline-flex items-center gap-1.5")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>
              v{pad(count)}.{pad(0)}
            </span>
          </span>
        </div>

        <div className="mt-6">
          <Rule />
        </div>

        {/* Hero */}
        <header className="grid gap-5 pt-6 sm:grid-cols-[1fr_auto] sm:gap-8">
          <div className="space-y-3">
            <p className={eyebrow}>{hero.role}</p>
            <h1 className="text-[20px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground">
              {hero.name}
            </h1>
            <p className="max-w-md text-[12.5px] leading-relaxed text-foreground">
              {hero.intro}
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-muted-foreground">
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
          </div>
        </header>

        {/* Stats / meta strip */}
        <dl className="mt-10 grid grid-cols-3 gap-x-4 border-t border-b border-border py-3">
          <div className="flex flex-col gap-1">
            <dt className={eyebrow}>Latest Modified</dt>
            <dd className="font-mono text-[11px] tabular-nums text-foreground">
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
              ) : (
                modifiedLabel
              )}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className={eyebrow}>Entries</dt>
            <dd className="font-mono text-[11px] tabular-nums text-foreground">
              {pad(count)} / {pad(count)}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className={eyebrow}>Theme</dt>
            <dd className="font-mono text-[11px] text-foreground">System</dd>
          </div>
        </dl>

        {/* Catalog */}
        <section className="mt-10" aria-labelledby="opus-catalog">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <h2 id="opus-catalog" className={eyebrow}>
              § Catalog
            </h2>
            <span className={cn(eyebrow, "tabular-nums")}>
              {pad(count)} entries
            </span>
          </div>

          <ol className="divide-y divide-border border-t border-border">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="space-y-3.5 py-6">
                  {/* Title row */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <h3 className="flex-1 text-[14px] font-medium tracking-[-0.01em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors hover:text-accent"
                      >
                        {project.title}
                      </NextLink>
                    </h3>
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrow className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  {/* Description */}
                  <p className="pl-7 max-w-md text-[12.5px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Filmstrip */}
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
                        className="relative block aspect-[4/3] overflow-hidden rounded-[4px] border border-border bg-muted/40 transition-colors group-hover:border-foreground/20"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 9rem, 30vw"
                          className="object-cover opacity-95 transition-opacity group-hover:opacity-100"
                          draggable={false}
                        />
                        <span className="pointer-events-none absolute left-1 top-1 rounded-sm border border-border/70 bg-background/85 px-1 py-[1px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
                          {pad(i + 1)}.{pad(idx + 1)}
                        </span>
                      </span>
                    ))}
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Channels */}
        <section className="mt-10" aria-labelledby="opus-channels">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-3">
            <h2 id="opus-channels" className={eyebrow}>
              § Channels
            </h2>
            <span className={cn(eyebrow, "tabular-nums")}>
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
                  className="group inline-flex items-center gap-1 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="underline decoration-border/60 underline-offset-4 transition-colors group-hover:decoration-foreground">
                    {link.label}
                  </span>
                  <IconArrow className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer colophon */}
        <footer className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={eyebrow}>— end of catalog —</span>
          <span className={cn(eyebrow, "inline-flex items-center gap-1.5")}>
            <span>Updated</span>
            {modified ? (
              <time
                dateTime={modified.toISOString()}
                className="font-mono tabular-nums text-foreground"
              >
                {modifiedLabel}
              </time>
            ) : (
              <span className="text-foreground">{modifiedLabel}</span>
            )}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
