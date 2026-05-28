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

const microLabel =
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

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12 pb-28 sm:px-8 sm:py-16">
        {/* Top meta bar */}
        <div className="flex items-center justify-between gap-4">
          <span className={microLabel}>Opus · v02</span>
          <span className={cn(microLabel, "tabular-nums")}>
            {modified ? (
              <time dateTime={modified.toISOString()}>
                <span className="hidden sm:inline">Last modified · </span>
                {modifiedLabel}
              </time>
            ) : (
              modifiedLabel
            )}
          </span>
        </div>

        {/* Hero */}
        <header className="mt-14 space-y-5">
          <p className={microLabel}>{hero.role}</p>
          <h1 className="text-[20px] font-medium tracking-[-0.02em] leading-[1.15]">
            {hero.name}
          </h1>
          <p className="max-w-md text-[13px] leading-[1.65] text-foreground">
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

        {/* Projects index */}
        <section className="mt-16" aria-labelledby="opus-index">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 id="opus-index" className={microLabel}>
              Index — Projects
            </h2>
            <span className={cn(microLabel, "tabular-nums")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="space-y-12">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="group space-y-3">
                  {/* Image triptych */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="grid grid-cols-3 gap-1.5"
                  >
                    {project.deckImages.map((src) => (
                      <span
                        key={src}
                        className="relative block aspect-[4/3] overflow-hidden rounded-[5px] border border-border bg-muted/40"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 10rem, 30vw"
                          className="object-cover transition-opacity duration-200 group-hover:opacity-100 opacity-90"
                          draggable={false}
                        />
                      </span>
                    ))}
                  </NextLink>

                  {/* Meta row */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {pad(i + 1)}
                    </span>

                    <h3 className="flex-1 text-[14px] font-medium tracking-[-0.01em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
                      >
                        <span>{project.title}</span>
                        <IconArrow className="size-3 -rotate-45 transition-transform group-hover:rotate-0" />
                      </NextLink>
                    </h3>

                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {hostnameOf(project.href)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="pl-7 max-w-md text-[12.5px] leading-[1.6] text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-16" aria-labelledby="opus-connect">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="opus-connect" className={microLabel}>
              Connect
            </h2>
            <span className={cn(microLabel, "tabular-nums")}>
              {pad(connectLinks.length)} ch
            </span>
          </div>

          <ul className="flex flex-wrap items-center text-[13px]">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-2.5 text-[10px] text-border"
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
                  className="text-muted-foreground underline decoration-border/60 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer ledger */}
        <footer className="mt-16 flex items-baseline justify-between gap-4 border-t border-border pt-4">
          <span className={microLabel}>stylessh.dev / opus</span>
          <span className={cn(microLabel, "tabular-nums")}>
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
