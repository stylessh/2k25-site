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

const isoDateFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

const monoMicro =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

const hairline = "border-t border-border";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

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

function IconArrow(props: SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** A flat, side-by-side strip of the project's three frames — no overlap,
 * no rotation. Read as a contact sheet rather than a deck. */
function ContactStrip({ images }: { images: readonly string[] }) {
  return (
    <div
      aria-hidden
      className="grid grid-cols-3 gap-[3px] overflow-hidden rounded-[3px] border border-border bg-muted/40"
    >
      {images.slice(0, 3).map((src, i) => (
        <span
          key={src}
          className="relative block aspect-[4/3] overflow-hidden bg-background"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 80px, 28vw"
            className="object-cover"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
          <span
            className={cn(
              monoMicro,
              "pointer-events-none absolute bottom-1 left-1 rounded-[2px] bg-background/85 px-1 py-px tracking-[0.12em] backdrop-blur-sm",
            )}
          >
            {pad(i + 1)}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedIso = modified ? isoDateFmt.format(modified) : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 pb-32 pt-10 sm:px-8 sm:pt-14">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={monoMicro}>Alan Daniel · Opus</span>
          <span className={cn(monoMicro, "tabular-nums")}>
            <span className="hidden sm:inline">
              Latest Modified&nbsp;·&nbsp;
            </span>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedIso}</time>
            ) : (
              "—"
            )}
          </span>
        </div>

        {/* Hero — left rule, 2-column */}
        <header
          className={cn(hairline, "grid gap-8 pt-8 sm:grid-cols-[6rem_1fr]")}
        >
          <p className={cn(monoMicro, "sm:pt-1")}>{hero.role}</p>

          <div className="space-y-5">
            <h1 className="text-[18px] font-medium leading-tight tracking-[-0.02em] text-foreground">
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
          </div>
        </header>

        {/* Index header */}
        <div
          className={cn(
            hairline,
            "mt-14 flex items-center justify-between gap-4 pt-4",
          )}
        >
          <h2 className={monoMicro}>Selected Work</h2>
          <span className={cn(monoMicro, "tabular-nums")}>
            {pad(projects.length)} entries
          </span>
        </div>

        {/* Projects */}
        <section aria-labelledby="opus-work">
          <h2 id="opus-work" className="sr-only">
            Selected Work
          </h2>

          <ol>
            {projects.map((project, i) => (
              <li
                key={project.title}
                className={cn(hairline, "first:border-t-0")}
              >
                <article className="grid gap-6 py-8 sm:grid-cols-[6rem_1fr]">
                  {/* Index gutter */}
                  <div className="flex items-baseline justify-between gap-2 sm:flex-col sm:items-start sm:justify-start sm:gap-3">
                    <span
                      className={cn(monoMicro, "tabular-nums text-foreground")}
                    >
                      {pad(i + 1)}
                    </span>
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        monoMicro,
                        "group inline-flex items-center gap-1 transition-colors hover:text-foreground sm:hidden",
                      )}
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrow className="size-3" />
                    </NextLink>
                  </div>

                  {/* Body */}
                  <div className="min-w-0 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-[15px] font-medium leading-snug tracking-[-0.01em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-baseline gap-1.5 text-foreground transition-colors hover:text-accent"
                        >
                          <span>{project.title}</span>
                          <IconArrow className="size-3 translate-y-[1px] text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                        </NextLink>
                      </h3>

                      <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="block transition-opacity hover:opacity-95"
                    >
                      <ContactStrip images={project.deckImages} />
                    </NextLink>

                    <div className="hidden items-center justify-between gap-4 sm:flex">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          monoMicro,
                          "group inline-flex items-center gap-1 transition-colors hover:text-foreground",
                        )}
                      >
                        <span>{hostnameOf(project.href)}</span>
                        <IconArrow className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </NextLink>
                      <span className={cn(monoMicro, "tabular-nums")}>
                        {pad(project.deckImages.length)} frames
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section
          aria-labelledby="opus-connect"
          className={cn(
            hairline,
            "mt-10 grid gap-6 pt-4 sm:grid-cols-[6rem_1fr]",
          )}
        >
          <h2 id="opus-connect" className={cn(monoMicro, "sm:pt-1")}>
            Connect
          </h2>

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
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer rule */}
        <footer
          className={cn(
            hairline,
            "mt-12 flex items-baseline justify-between gap-4 pt-3",
          )}
        >
          <span className={monoMicro}>stylessh.dev / opus</span>
          <span className={cn(monoMicro, "tabular-nums")}>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedIso}</time>
            ) : (
              "—"
            )}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
