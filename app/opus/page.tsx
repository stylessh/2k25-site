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
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const microLabel =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

/** A contact-sheet style strip: cover image takes the lead,
 *  the remaining frames sit to the right as smaller cells. */
function ContactStrip({ images }: { images: readonly string[] }) {
  const [cover, ...rest] = images;

  return (
    <div className="grid grid-cols-[1.6fr_1fr] gap-1.5 sm:gap-2">
      {cover ? (
        <span className="relative block aspect-[16/10] overflow-hidden rounded-md border border-border bg-muted/40">
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 640px) 22rem, 60vw"
            className="object-cover"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
        </span>
      ) : null}

      <div className="grid grid-rows-2 gap-1.5 sm:gap-2">
        {rest.map((src, i) => (
          <span
            key={src}
            className="relative block overflow-hidden rounded-md border border-border bg-muted/40"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 12rem, 40vw"
              className="object-cover opacity-90"
              draggable={false}
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
            <span
              className={cn(
                "absolute bottom-1 right-1 rounded-[3px] px-1 py-[1px]",
                "font-mono text-[9px] tabular-nums leading-none tracking-wider",
                "bg-background/85 text-muted-foreground backdrop-blur-sm border border-border/70",
              )}
            >
              {pad(i + 2)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12 pb-28 sm:px-8 sm:py-16">
        {/* Top meta strip */}
        <div className="flex items-baseline justify-between gap-4">
          <span className={microLabel}>opus · index</span>
          <span className={cn(microLabel, "inline-flex items-center gap-2")}>
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            <span className="tabular-nums">
              <span className="hidden sm:inline">latest modified · </span>
              {modified ? (
                <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
              ) : (
                modifiedLabel
              )}
            </span>
          </span>
        </div>

        <hr className="my-6 border-border" />

        {/* Hero */}
        <header className="space-y-5">
          <div className="space-y-1.5">
            <p className={microLabel}>{hero.role}</p>
            <h1 className="text-[20px] font-medium tracking-[-0.025em] leading-[1.15] text-foreground">
              {hero.name}
            </h1>
          </div>

          <p className="max-w-md text-[13px] leading-relaxed text-foreground">
            {hero.intro}
          </p>

          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-muted-foreground">
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

        {/* Section: Index */}
        <section className="mt-12" aria-labelledby="opus-index">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-5">
            <h2 id="opus-index" className={microLabel}>
              selected work
            </h2>
            <span className={cn(microLabel, "tabular-nums")}>
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="space-y-10">
            {projects.map((project, i) => (
              <li key={project.title}>
                <article className="space-y-3">
                  {/* Header row: index · title · arrow / host */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground pt-[1px]">
                      {pad(i + 1)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-2 text-foreground transition-colors hover:text-accent"
                      >
                        <h3 className="text-[15px] font-medium tracking-[-0.01em] truncate">
                          {project.title}
                        </h3>
                        <IconArrow className="size-3 shrink-0 translate-y-[1px] opacity-60 transition-all group-hover:opacity-100 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                      </NextLink>
                    </div>
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        microLabel,
                        "shrink-0 hover:text-foreground transition-colors",
                      )}
                    >
                      {hostnameOf(project.href)}
                    </NextLink>
                  </div>

                  {/* Contact sheet */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="block ml-7 transition-opacity hover:opacity-95"
                  >
                    <ContactStrip images={project.deckImages} />
                  </NextLink>

                  {/* Description */}
                  <p className="ml-7 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Section: Connect */}
        <section className="mt-14" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4 pb-3">
            <h2 id="opus-connect" className={microLabel}>
              connect
            </h2>
            <span className={cn(microLabel, "tabular-nums")}>
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

        {/* Footer */}
        <div className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={microLabel}>stylessh.dev / opus</span>
          <span className={cn(microLabel, "tabular-nums")}>
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
