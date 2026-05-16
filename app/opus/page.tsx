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

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

const meta =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground";

function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}

function hostnameOf(url: string) {
  try {
    const u = new URL(url);
    if (u.protocol === "mailto:") return u.pathname;
    return u.hostname.replace(/^www\./, "");
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

/** A horizontal filmstrip — the project's deck flattened into a single row of
 * frames, captioned beneath like a contact sheet. */
function Filmstrip({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="space-y-1.5" aria-hidden>
      <div className="grid grid-cols-3 gap-[3px] overflow-hidden rounded-sm border border-border bg-border/60">
        {images.map((src, i) => (
          <span
            key={src}
            className="relative block aspect-[4/3] overflow-hidden bg-background"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 180px, 33vw"
              className="object-cover"
              draggable={false}
            />
            <span className="absolute left-1 top-1 rounded-[2px] bg-background/80 px-1 py-[1px] font-mono text-[8px] tabular-nums text-muted-foreground backdrop-blur-sm">
              {pad(i + 1)}
            </span>
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>contact sheet · {title}</span>
        <span className="tabular-nums">{pad(images.length)} fr</span>
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
        {/* Header bar */}
        <header className="flex items-center justify-between gap-4">
          <span className={meta}>Alan Daniel · Opus</span>
          <span className={cn(meta, "inline-flex items-center gap-1.5")}>
            <span aria-hidden className="size-[5px] rounded-[1px] bg-accent" />
            <span className="hidden sm:inline">Latest Modified</span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            {modified ? (
              <time
                dateTime={modified.toISOString()}
                className="tabular-nums normal-case tracking-[0.06em]"
              >
                {modifiedLabel}
              </time>
            ) : (
              <span>{modifiedLabel}</span>
            )}
          </span>
        </header>

        {/* Hero block */}
        <section className="mt-10 border-t border-border pt-6">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <span className={cn(meta, "pt-[3px]")}>00</span>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className={meta}>{hero.role}</p>
                <h1 className="text-[20px] font-medium leading-[1.1] tracking-[-0.025em]">
                  {hero.name}
                </h1>
              </div>

              <p className="max-w-md text-[12.5px] leading-relaxed text-foreground">
                {hero.intro}
              </p>

              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-muted-foreground">
                <span>{hero.employmentPrefix}</span>
                {hero.showSupabaseMark ? (
                  <span className="inline-flex size-[1lh] items-center rounded-[3px] border border-border bg-muted/40 p-0.5">
                    <SupabaseMark className="size-full" />
                  </span>
                ) : null}
                <strong className="font-medium text-foreground">
                  {hero.orgName}
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* Work index */}
        <section className="mt-12" aria-labelledby="opus-work">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3 pb-6">
            <h2 id="opus-work" className={meta}>
              Selected Work
            </h2>
            <span className={cn(meta, "tabular-nums")}>
              {pad(1)} — {pad(projects.length)}
            </span>
          </div>

          <ol className="space-y-12">
            {projects.map((project, i) => (
              <li
                key={project.title}
                className="grid grid-cols-[auto_1fr] gap-x-4"
              >
                <span className={cn(meta, "pt-[3px] tabular-nums normal-case")}>
                  {pad(i + 1)}
                </span>

                <article className="space-y-4">
                  <Filmstrip
                    images={project.deckImages}
                    title={project.title}
                  />

                  <div className="space-y-2">
                    <h3 className="text-[14px] font-medium tracking-[-0.01em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground underline decoration-border underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {project.title}
                      </NextLink>
                    </h3>

                    <p className="max-w-md text-[12.5px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{hostnameOf(project.href)}</span>
                      <IconArrow className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-14" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3 pb-4">
            <h2 id="opus-connect" className={meta}>
              Connect
            </h2>
            <span className={cn(meta, "tabular-nums")}>
              {pad(connectLinks.length)} ch
            </span>
          </div>

          <ul className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className={cn(meta, "pt-[3px]")}>—</span>
            <li className="contents">
              {connectLinks.map((link, i) => (
                <span
                  key={link.label}
                  className={cn(
                    "col-start-2 flex items-center justify-between gap-4 py-2 text-[12.5px]",
                    i > 0 && "border-t border-border/70",
                  )}
                >
                  <NextLink
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="underline decoration-border underline-offset-[5px] transition-colors group-hover:decoration-foreground">
                      {link.label}
                    </span>
                    <IconArrow className="size-3 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </NextLink>
                  <span className={cn(meta, "tabular-nums normal-case")}>
                    {hostnameOf(link.href)}
                  </span>
                </span>
              ))}
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-3">
          <span className={meta}>stylessh.dev / opus</span>
          <span className={cn(meta, "tabular-nums normal-case")}>
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
