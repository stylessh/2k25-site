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
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const pad = (n: number, w = 2) => n.toString().padStart(w, "0");

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
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";

const ruleLabel =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFormatter.format(modified) : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 pb-28 sm:px-10 sm:py-16">
        {/* Meta strip */}
        <div className="flex items-center justify-between gap-4 pb-10">
          <span className={cn(monoLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            Opus · Edition
          </span>
          <span className={monoLabel}>
            <span className="text-muted-foreground/70">Latest Modified — </span>
            {modified ? (
              <time
                dateTime={modified.toISOString()}
                className="text-foreground"
              >
                {modifiedLabel}
              </time>
            ) : (
              <span>{modifiedLabel}</span>
            )}
          </span>
        </div>

        {/* Hero */}
        <header className="grid gap-6 border-border border-t pt-8 pb-10 sm:grid-cols-12 sm:gap-10">
          <div className="space-y-3 sm:col-span-7">
            <p className={monoLabel}>{hero.role}</p>
            <h1 className="font-medium text-[24px] leading-[1.05] tracking-[-0.025em] sm:text-[28px]">
              {hero.name}
            </h1>
            <p className="max-w-md pt-2 text-[13px] leading-relaxed text-foreground">
              {hero.intro}
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-1 text-[13px] text-muted-foreground">
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
          </div>

          <dl className="grid h-fit grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 self-start sm:col-span-5 sm:border-border sm:border-l sm:pl-8">
            <dt className={ruleLabel}>Index</dt>
            <dd className="font-mono text-[11px] tabular-nums text-foreground">
              {pad(projects.length)} / {pad(projects.length)}
            </dd>
            <dt className={ruleLabel}>Theme</dt>
            <dd className="text-[12px] text-foreground">System · L/D</dd>
            <dt className={ruleLabel}>Build</dt>
            <dd className="font-mono text-[11px] tabular-nums text-foreground">
              opus.02
            </dd>
            <dt className={ruleLabel}>Updated</dt>
            <dd className="font-mono text-[11px] tabular-nums text-foreground">
              {modifiedLabel}
            </dd>
          </dl>
        </header>

        {/* Section header */}
        <div className="flex items-baseline justify-between gap-4 border-border border-t pt-5">
          <span className={ruleLabel}>Selected Work</span>
          <span className={ruleLabel}>{pad(projects.length)} entries</span>
        </div>

        {/* Bento-style tile grid */}
        <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, i) => {
            return (
              <li key={project.title}>
                <NextLink
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-muted/30 transition-colors hover:border-foreground/30"
                >
                  {/* Stacked deck — base + cross-fading siblings on hover */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
                    {project.deckImages.map((src, idx) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 22rem, 100vw"
                        draggable={false}
                        className={cn(
                          "absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out",
                          idx === 0 && "opacity-100 group-hover:opacity-0",
                          idx === 1 &&
                            "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                          idx === 2 && "opacity-0",
                        )}
                      />
                    ))}

                    {/* Index chip */}
                    <span className="absolute left-2 top-2 rounded-full border border-border/80 bg-background/85 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground backdrop-blur">
                      {pad(i + 1)}
                    </span>

                    {/* Hostname pill */}
                    <span
                      className={cn(
                        "absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur",
                        "transition-colors group-hover:text-foreground",
                      )}
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrow className="size-2.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="flex flex-1 flex-col gap-2 p-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-[14px] font-medium tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </h2>
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                        {pad(project.deckImages.length)} shots
                      </span>
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </NextLink>
              </li>
            );
          })}
        </ol>

        {/* Connect */}
        <section className="mt-10 border-border border-t pt-5">
          <div className="flex items-baseline justify-between gap-4 pb-4">
            <span className={ruleLabel}>Connect</span>
            <span className={ruleLabel}>
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
                  <IconArrow className="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer meta */}
        <div className="mt-12 flex items-baseline justify-between gap-4 border-border border-t pt-3">
          <span className={ruleLabel}>stylessh.dev / opus</span>
          <span className={ruleLabel}>
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
