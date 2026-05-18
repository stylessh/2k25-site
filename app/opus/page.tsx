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
  const totalFrames = projects.reduce((acc, p) => acc + p.deckImages.length, 0);

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 pt-10 pb-28 sm:px-8 sm:pt-14">
        {/* Path bar */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={monoLabel}>opus · catalog</span>
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
        <header className="space-y-5">
          <p className={monoLabel}>{hero.role}</p>
          <h1 className="text-[26px] font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
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
        <section className="mt-16" aria-labelledby="opus-work">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="opus-work" className={monoLabel}>
              Selected Work
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(projects.length)} entries · {pad(totalFrames)} frames
            </span>
          </div>

          <ol className="space-y-14">
            {projects.map((project, i) => {
              const [cover, ...rest] = project.deckImages;
              return (
                <li key={project.title}>
                  <article className="group space-y-4">
                    {/* Cover image */}
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted/40"
                    >
                      <Image
                        src={cover}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 36rem, 100vw"
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                        draggable={false}
                      />
                      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]" />
                      <span
                        aria-hidden
                        className={cn(
                          monoLabel,
                          "absolute left-2.5 top-2.5 rounded-sm border border-border/80 bg-background/85 px-1.5 py-0.5 tabular-nums backdrop-blur-sm",
                        )}
                      >
                        {pad(i + 1)}
                      </span>
                    </NextLink>

                    {/* Meta row: title + hostname */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 space-y-1.5">
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
                        <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      {/* Remaining frames as film strip */}
                      {rest.length > 0 ? (
                        <div
                          className="hidden shrink-0 sm:flex sm:items-center sm:gap-1"
                          aria-hidden
                        >
                          {rest.map((src, idx) => (
                            <span
                              key={src}
                              className="relative block aspect-[16/10] w-14 overflow-hidden rounded-[5px] border border-border bg-muted/40"
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                                draggable={false}
                              />
                              <span className="absolute bottom-0.5 right-0.5 font-mono text-[8px] text-background/0 tabular-nums">
                                {pad(idx + 2)}
                              </span>
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Footer row: hostname link */}
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </NextLink>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Section: Connect */}
        <section className="mt-16" aria-labelledby="opus-connect">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="opus-connect" className={monoLabel}>
              Connect
            </h2>
            <span className={cn(monoLabel, "tabular-nums")}>
              {pad(connectLinks.length)} channels
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
        <div className="mt-16 flex items-baseline justify-between gap-4 border-t border-border pt-4">
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
