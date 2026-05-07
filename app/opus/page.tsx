import { execSync } from "node:child_process";
import type { Metadata } from "next";
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

/** Resolved at build time; falls back to "now" if git history is unavailable. */
function getLatestCommitDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {
    /* fall through */
  }
  return new Date();
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
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
      strokeWidth={1.75}
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

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = dateFmt.format(modified);

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground pb-28">
      <div className="mx-auto w-full max-w-xl px-6 sm:px-8 py-14 sm:py-20">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 pb-10">
          <span className={monoLabel}>Opus · Edition</span>
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span>Latest Modified — {modifiedLabel}</span>
          </span>
        </div>

        {/* Hero */}
        <header className="space-y-5 pb-12">
          <p className={monoLabel}>{hero.role}</p>
          <h1 className="text-[26px] sm:text-[28px] font-medium tracking-[-0.02em] leading-[1.1] text-foreground">
            {hero.name}
          </h1>
          <p className="text-[13px] leading-relaxed text-foreground max-w-md">
            {hero.intro}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
            <span>{hero.employmentPrefix}</span>
            {hero.showSupabaseMark ? (
              <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
                <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
                  <SupabaseMark className="h-full w-full" />
                </span>
              </span>
            ) : null}
            <strong className="font-medium text-foreground">
              {hero.orgName}
            </strong>
          </p>
        </header>

        {/* Section header */}
        <div className="flex items-baseline justify-between gap-4 pb-4 border-t border-border pt-5">
          <span className={monoLabel}>Selected Work</span>
          <span className={monoLabel}>{pad(projects.length)} entries</span>
        </div>

        {/* Entries */}
        <ol className="divide-y divide-border">
          {projects.map((project, i) => {
            const cover = project.deckImages[0];
            return (
              <li key={project.title} className="py-8 first:pt-6">
                <article className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground shrink-0">
                        {pad(i + 1)}
                      </span>
                      <h2 className="text-[15px] font-medium tracking-[-0.01em] truncate">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {project.title}
                        </NextLink>
                      </h2>
                    </div>
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrowOut className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  <p className="pl-7 text-[13px] leading-relaxed text-muted-foreground max-w-md">
                    {project.description}
                  </p>

                  {cover ? (
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="block pl-7"
                    >
                      <div className="relative overflow-hidden rounded-md border border-border bg-muted/40 aspect-[16/9]">
                        <img
                          src={cover}
                          alt=""
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.015]"
                          draggable={false}
                        />
                      </div>
                    </NextLink>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>

        {/* Connect */}
        <div className="border-t border-border pt-5 mt-2">
          <div className="flex items-baseline justify-between gap-4 pb-4">
            <span className={monoLabel}>Connect</span>
            <span className={monoLabel}>
              {pad(connectLinks.length)} channels
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="px-2 text-border select-none text-[10px]"
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
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-border/60 group-hover:decoration-foreground transition-all">
                    {link.label}
                  </span>
                  <IconArrowOut className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>stylessh.dev / opus</span>
          <span className={monoLabel}>
            <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </div>
  );
}
