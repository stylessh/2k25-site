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

const stampFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
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

const eyebrow =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified
    ? stampFmt.format(modified).toUpperCase()
    : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 pt-10 pb-28 sm:px-8 sm:pt-14">
        {/* Meta strip */}
        <div className="flex items-center justify-between gap-4">
          <span className={eyebrow}>stylessh.dev / opus</span>
          <span className={cn(eyebrow, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span className="hidden sm:inline">Latest Modified</span>
            {modified ? (
              <time
                dateTime={modified.toISOString()}
                className="tabular-nums text-foreground"
              >
                {modifiedLabel}
              </time>
            ) : (
              <span className="text-foreground">{modifiedLabel}</span>
            )}
          </span>
        </div>

        {/* Hero */}
        <header className="mt-10 grid gap-5 border-t border-border pt-8">
          <p className={eyebrow}>{hero.role}</p>
          <h1 className="text-[26px] font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
            {hero.name}
          </h1>
          <p className="max-w-md text-[13px] leading-relaxed text-foreground">
            {hero.intro}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-muted-foreground">
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
        </header>

        {/* Index */}
        <section className="mt-16" aria-labelledby="opus-index">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-1">
            <h2 id="opus-index" className={eyebrow}>
              Index
            </h2>
            <span className={cn(eyebrow, "tabular-nums text-foreground")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="mt-8 space-y-14">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="space-y-4">
                  {/* Title row */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                        {pad(i + 1)}
                      </span>
                      <h3 className="text-[15px] font-medium tracking-[-0.01em] truncate">
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
                      className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  {/* Filmstrip — full-width 3-up edge-to-edge */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block overflow-hidden rounded-md border border-border bg-muted/40"
                  >
                    <div className="grid grid-cols-3">
                      {project.deckImages.slice(0, 3).map((src, j) => (
                        <span
                          key={src}
                          className={cn(
                            "relative block aspect-[4/3]",
                            j > 0 && "border-l border-border",
                          )}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 14rem, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.015]"
                            draggable={false}
                          />
                        </span>
                      ))}
                    </div>
                  </NextLink>

                  {/* Description */}
                  <p className="max-w-md pl-6 text-[13px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-16" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-3">
            <h2 id="opus-connect" className={eyebrow}>
              Connect
            </h2>
            <span className={cn(eyebrow, "tabular-nums text-foreground")}>
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
        <div className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={eyebrow}>
            © {new Date().getUTCFullYear()} · Opus
          </span>
          <span className={cn(eyebrow, "tabular-nums text-foreground")}>
            {modifiedLabel}
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
