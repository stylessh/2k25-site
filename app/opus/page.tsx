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
  const year = new Date().getUTCFullYear();

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-4xl px-6 pt-14 pb-28 sm:px-10 sm:pt-20">
        {/* Editorial masthead */}
        <header className="text-center">
          <p className={monoLabel}>Index · {year}</p>
          <h1 className="mt-3 font-medium text-[26px] leading-[1.05] tracking-[-0.03em] sm:text-[34px]">
            {hero.name}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            {hero.role}
          </p>

          <p className="mx-auto mt-5 max-w-md text-[13px] leading-relaxed text-foreground">
            {hero.intro}
          </p>

          <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[12px] text-muted-foreground">
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

        {/* Metadata strip */}
        <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border text-[12px]">
          <div className="bg-background px-3 py-2.5">
            <dt className={monoLabel}>Latest Modified</dt>
            <dd className="mt-1 tabular-nums">
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
              ) : (
                modifiedLabel
              )}
            </dd>
          </div>
          <div className="bg-background px-3 py-2.5">
            <dt className={monoLabel}>Entries</dt>
            <dd className="mt-1 tabular-nums">
              {pad(projects.length)} / {pad(projects.length)}
            </dd>
          </div>
          <div className="bg-background px-3 py-2.5">
            <dt className={monoLabel}>Theme</dt>
            <dd className="mt-1">Auto</dd>
          </div>
        </dl>

        {/* Contact sheet — project grid */}
        <section className="mt-12" aria-labelledby="opus-portfolios">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <h2 id="opus-portfolios" className={monoLabel}>
              Portfolios
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>Sheet 01</span>
          </div>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {projects.map((project, i) => {
              const [cover, ...rest] = project.deckImages;

              return (
                <li key={project.title} className="bg-background">
                  <article className="flex h-full flex-col">
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="group relative block aspect-[4/3] w-full overflow-hidden border-b border-border bg-muted/30"
                    >
                      <Image
                        src={cover}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        draggable={false}
                      />
                      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
                      <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center rounded-sm border border-border/80 bg-background/85 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase backdrop-blur-sm tabular-nums">
                        {pad(i + 1)} · {project.title}
                      </span>
                    </NextLink>

                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-[14px] font-medium tracking-[-0.01em]">
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
                          className="group inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span>{hostnameOf(project.href)}</span>
                          <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </NextLink>
                      </div>

                      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      {rest.length > 0 ? (
                        <div className="mt-auto flex items-center gap-2 pt-2">
                          <span className={monoLabel}>Plates</span>
                          <ul className="flex items-center gap-1.5">
                            {rest.map((src, idx) => (
                              <li
                                key={src}
                                className="relative size-7 overflow-hidden rounded-[3px] border border-border bg-muted/40"
                              >
                                <Image
                                  src={src}
                                  alt=""
                                  fill
                                  sizes="28px"
                                  className="object-cover"
                                  draggable={false}
                                />
                                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
                                <span className="sr-only">Plate {idx + 2}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Connect */}
        <section className="mt-12" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <h2 id="opus-connect" className={monoLabel}>
              Connect
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(connectLinks.length)} ch
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 border-t border-border pt-3">
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

        {/* Colophon */}
        <footer className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>stylessh.dev / opus</span>
          <span className={monoLabel}>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
            ) : (
              modifiedLabel
            )}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
