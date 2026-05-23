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

const isoDateFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
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
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

const meta =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

/** Compact 3-frame contact sheet — a single key strip per project. */
function ContactSheet({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const frames = images.slice(0, 3);

  return (
    <div className="flex gap-1" aria-hidden>
      {frames.map((src, i) => (
        <span
          key={src}
          className={cn(
            "relative block h-10 w-10 overflow-hidden rounded-[3px] border border-border bg-muted/40",
            i === 0 ? "" : "hidden sm:block",
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
            draggable={false}
          />
        </span>
      ))}
      <span className="sr-only">Contact sheet for {title}</span>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";
  const modifiedIso = modified ? isoDateFmt.format(modified) : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-14 pb-28 sm:px-8 sm:py-20">
        {/* Top marker bar */}
        <div className="flex items-center justify-between gap-4 pb-12">
          <span className={cn(meta, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            <span>Opus · Variant</span>
          </span>
          <span className={cn(meta, "tabular-nums")}>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedIso}</time>
            ) : (
              modifiedIso
            )}
          </span>
        </div>

        {/* Hero — one compact reading column */}
        <header className="space-y-4">
          <h1 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[18px] font-medium tracking-[-0.02em] leading-[1.2]">
            <span className="text-foreground">{hero.name}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-[13px] font-normal text-muted-foreground">
              {hero.role}
            </span>
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

        {/* Spec strip */}
        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-4">
          <div className="space-y-1">
            <dt className={meta}>Latest Modified</dt>
            <dd className="text-[12px] tabular-nums text-foreground">
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
              ) : (
                modifiedLabel
              )}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className={meta}>Entries</dt>
            <dd className="text-[12px] tabular-nums text-foreground">
              {pad(projects.length)}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className={meta}>Theme</dt>
            <dd className="text-[12px] text-foreground">System</dd>
          </div>
        </dl>

        {/* Index — projects */}
        <section className="mt-12" aria-labelledby="opus-index">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 id="opus-index" className={meta}>
              Index
            </h2>
            <span className={cn(meta, "tabular-nums")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="divide-y divide-border border-t border-border">
            {projects.map((project, i) => (
              <li key={project.title}>
                <NextLink
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-2 py-5"
                >
                  <span className="pt-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                    {pad(i + 1)}
                  </span>

                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[14px] font-medium tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent">
                        {project.title}
                      </span>
                      <span className={cn(meta, "normal-case tracking-normal")}>
                        {hostnameOf(project.href)}
                      </span>
                    </div>
                    <p className="max-w-md text-[12.5px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="col-start-2 row-start-2 -mt-1 flex items-center justify-between gap-4 pt-1 sm:col-start-3 sm:row-start-1 sm:row-span-2 sm:mt-0 sm:pt-0">
                    <ContactSheet
                      images={project.deckImages}
                      title={project.title}
                    />
                    <IconArrow className="size-3.5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </NextLink>
              </li>
            ))}
          </ol>
        </section>

        {/* Channels */}
        <section className="mt-10" aria-labelledby="opus-channels">
          <div className="mb-3 flex items-baseline justify-between gap-4 border-t border-border pt-4">
            <h2 id="opus-channels" className={meta}>
              Channels
            </h2>
            <span className={cn(meta, "tabular-nums")}>
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
                  className="text-[12.5px] text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={meta}>stylessh.dev</span>
          <span className={cn(meta, "tabular-nums")}>
            <span className="hidden sm:inline">Latest Modified · </span>
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
