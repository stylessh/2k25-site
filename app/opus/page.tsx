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

/** Static, layered preview of the deck images — a quiet nod to the
 * original site's hover-deck without any motion. */
function DeckPreview({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const cards = images.slice(0, 3);
  const offsets = [
    "rotate-[-6deg] -translate-x-3 translate-y-1.5",
    "rotate-[2deg] translate-y-0",
    "rotate-[7deg] translate-x-3 translate-y-2",
  ];

  return (
    <div className="relative h-16 w-[88px] shrink-0" aria-hidden>
      {cards.map((src, i) => (
        <span
          key={src}
          className={cn(
            "absolute inset-0 m-auto block size-14 overflow-hidden rounded-[5px] border border-border bg-muted/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)]",
            offsets[i],
          )}
          style={{ zIndex: i + 1 }}
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
        </span>
      ))}
      <span className="sr-only">Preview deck for {title}</span>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 py-14 pb-28 sm:px-8 sm:py-20">
        {/* Path bar */}
        <div className="flex items-center justify-between gap-4 pb-10">
          <span className={monoLabel}>~ / opus</span>
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
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
        <header className="space-y-5 border-t border-border pt-8">
          <p className={monoLabel}>{hero.role}</p>
          <h1 className="text-[22px] font-medium tracking-[-0.025em] leading-[1.1] text-foreground">
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

        {/* Section: Work */}
        <section className="mt-12" aria-labelledby="opus-work">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 pb-2">
            <h2 id="opus-work" className={monoLabel}>
              [ Work ]
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(projects.length)} / {pad(projects.length)}
            </span>
          </div>

          <ol className="divide-y divide-border">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="grid grid-cols-[1fr_auto] items-start gap-4 py-7 sm:gap-8">
                  <div className="min-w-0 space-y-2.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {pad(i + 1)}
                      </span>
                      <h3 className="text-[15px] font-medium tracking-[-0.01em] truncate">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                    </div>

                    <p className="pl-7 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group ml-7 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="shrink-0 self-start pt-1 transition-opacity hover:opacity-90"
                  >
                    <DeckPreview
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Section: Connect */}
        <section className="mt-10" aria-labelledby="opus-connect">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 pb-3">
            <h2 id="opus-connect" className={monoLabel}>
              [ Connect ]
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
        <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>stylessh.dev / opus</span>
          <span className={monoLabel}>
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
