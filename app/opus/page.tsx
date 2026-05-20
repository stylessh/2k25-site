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

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";
  const total = projects.length;

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 pt-10 pb-28 sm:px-8 sm:pt-14">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={mono}>Folio · Opus</span>
          <span className={cn(mono, "inline-flex items-center gap-2")}>
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
        <header className="grid gap-5">
          <p className={mono}>{hero.role}</p>
          <h1 className="text-[20px] font-medium tracking-[-0.025em] leading-[1.15]">
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

        {/* Section header */}
        <div className="mt-16 mb-6 flex items-baseline justify-between gap-4">
          <h2 className={mono}>Selected — Contact Sheet</h2>
          <span className={cn(mono, "tabular-nums")}>{pad(total)} entries</span>
        </div>

        {/* Contact sheet — one large frame + caption per project */}
        <ol className="space-y-14">
          {projects.map((project, i) => {
            const primary = project.deckImages[0];
            const aux = project.deckImages.slice(1, 3);

            return (
              <li key={project.title}>
                <article className="grid gap-4">
                  {/* Caption header line */}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className={cn(mono, "tabular-nums")}>
                      Entry {pad(i + 1)} / {pad(total)}
                    </span>
                    <span className={cn(mono, "truncate")}>
                      {hostnameOf(project.href)}
                    </span>
                  </div>

                  {/* Primary frame */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group relative block overflow-hidden rounded-md border border-border bg-muted/30"
                  >
                    {primary ? (
                      <span className="relative block aspect-[16/10] w-full">
                        <Image
                          src={primary}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 36rem, 90vw"
                          className="object-cover transition-opacity duration-300 group-hover:opacity-95"
                          draggable={false}
                          priority={i === 0}
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]"
                        />
                      </span>
                    ) : null}

                    {/* Frame corners — quiet contact-sheet ticks */}
                    <FrameTicks />
                  </NextLink>

                  {/* Aux strip (remaining deck images, small) */}
                  {aux.length > 0 ? (
                    <ul className="grid grid-cols-6 gap-1.5" aria-hidden>
                      {aux.map((src) => (
                        <li
                          key={src}
                          className="relative col-span-1 block aspect-square overflow-hidden rounded-[3px] border border-border bg-muted/40"
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                            draggable={false}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Caption body */}
                  <div className="grid gap-2 pt-1">
                    <h3 className="text-[15px] font-medium tracking-[-0.01em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
                      >
                        <span className="underline decoration-border/70 underline-offset-4 transition-colors group-hover:decoration-accent">
                          {project.title}
                        </span>
                        <IconArrowOut className="size-3 opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </NextLink>
                    </h3>
                    <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Connect */}
        <section className="mt-16" aria-labelledby="opus-connect">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 id="opus-connect" className={mono}>
              Channels
            </h2>
            <span className={cn(mono, "tabular-nums")}>
              {pad(connectLinks.length)} open
            </span>
          </div>
          <ul className="flex flex-wrap items-center text-[13px]">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="inline-flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-2 text-[11px] text-border"
                  >
                    |
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
                  className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
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

        {/* Footer stamp */}
        <div className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={mono}>stylessh.dev / opus</span>
          <span className={mono}>
            Rev ·{" "}
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

function FrameTicks() {
  const base =
    "pointer-events-none absolute size-2 border-foreground/30 dark:border-foreground/25";
  return (
    <>
      <span
        aria-hidden
        className={cn(base, "left-1 top-1 border-l border-t")}
      />
      <span
        aria-hidden
        className={cn(base, "right-1 top-1 border-r border-t")}
      />
      <span
        aria-hidden
        className={cn(base, "left-1 bottom-1 border-l border-b")}
      />
      <span
        aria-hidden
        className={cn(base, "right-1 bottom-1 border-r border-b")}
      />
    </>
  );
}
