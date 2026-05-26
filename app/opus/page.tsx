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
  { label: "GitHub", href: "https://github.com/stylessh", hint: "stylessh" },
  { label: "X", href: "https://x.com/stylesshDev", hint: "@stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com", hint: "adaaanniek@" },
] as const;

const mono = "font-mono tabular-nums";
const eyebrow = cn(
  mono,
  "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
);

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pad(n: number, w = 2) {
  return n.toString().padStart(w, "0");
}

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
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
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/** Three thumbnails laid out as a small filmstrip — distinct from
 * both the canonical hover-deck and the existing layered preview. */
function Filmstrip({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div
      className="grid w-full grid-cols-3 gap-[3px] overflow-hidden rounded-[5px] border border-border bg-border"
      aria-hidden
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
            sizes="(min-width: 640px) 64px, 30vw"
            className="object-cover"
            draggable={false}
          />
          <span
            className={cn(
              mono,
              "absolute bottom-1 left-1 rounded-[3px] bg-background/85 px-1 text-[9px] leading-[1.4] text-muted-foreground backdrop-blur-[2px]",
            )}
          >
            {pad(i + 1)}
          </span>
        </span>
      ))}
      <span className="sr-only">Frames for {title}</span>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "—";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 py-12 pb-28 sm:py-16">
        {/* Issue marker */}
        <div className="flex items-baseline justify-between gap-3 pb-10">
          <span className={eyebrow}>
            Opus <span className="text-border">/</span> Vol. 03
          </span>
          <span
            className={cn(eyebrow, "inline-flex items-baseline gap-1.5")}
            title="Latest Modified"
          >
            <span aria-hidden>MOD</span>
            <span aria-hidden className="text-border">
              ——
            </span>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
            ) : (
              <span>{modifiedLabel}</span>
            )}
          </span>
        </div>

        {/* Hero — display title with a thin underline rule. */}
        <header className="space-y-6">
          <div className="space-y-2.5">
            <p className={eyebrow}>
              {hero.role}
              <span aria-hidden className="px-1.5 text-border">
                ·
              </span>
              Independent
            </p>
            <h1 className="text-[26px] font-medium leading-[1.05] tracking-[-0.03em]">
              {hero.name}
            </h1>
            <div aria-hidden className="h-px w-10 bg-foreground/80" />
          </div>

          <div className="space-y-3 text-[13px] leading-relaxed">
            <p className="max-w-md text-foreground">{hero.intro}</p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
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
        </header>

        {/* Index */}
        <section className="mt-14" aria-labelledby="opus-index">
          <header className="flex items-baseline justify-between gap-4 pb-3">
            <h2 id="opus-index" className={eyebrow}>
              Index — Selected work
            </h2>
            <span className={cn(eyebrow, "text-muted-foreground/80")}>
              {pad(projects.length)} entries
            </span>
          </header>

          <ol className="border-t border-border">
            {projects.map((project, i) => (
              <li key={project.title} className="border-b border-border">
                <article className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 py-6 sm:grid-cols-[auto_1fr_8rem] sm:gap-x-6">
                  {/* Index column */}
                  <span
                    className={cn(
                      mono,
                      "self-start pt-[2px] text-[11px] text-muted-foreground",
                    )}
                  >
                    {pad(i + 1, 2)}
                  </span>

                  {/* Body column */}
                  <div className="min-w-0 space-y-2.5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-[15px] font-medium tracking-[-0.01em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline decoration-border/70 underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                      <span
                        className={cn(
                          mono,
                          "text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                        )}
                      >
                        {hostnameOf(project.href)}
                      </span>
                    </div>

                    <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        mono,
                        "group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground",
                      )}
                    >
                      <span>Visit</span>
                      <IconArrow className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  {/* Filmstrip column — wraps to its own row on small screens */}
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="col-span-2 transition-opacity hover:opacity-90 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:self-start sm:pt-1"
                  >
                    <Filmstrip
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* Connect */}
        <section className="mt-12" aria-labelledby="opus-connect">
          <header className="flex items-baseline justify-between gap-4 pb-3">
            <h2 id="opus-connect" className={eyebrow}>
              Connect
            </h2>
            <span className={cn(eyebrow, "text-muted-foreground/80")}>
              {pad(connectLinks.length)} channels
            </span>
          </header>

          <ul className="divide-y divide-border border-y border-border">
            {connectLinks.map((link) => (
              <li key={link.label}>
                <NextLink
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center justify-between gap-4 py-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        mono,
                        "text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80",
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="text-foreground/70 transition-colors group-hover:text-foreground">
                      {link.hint}
                    </span>
                  </span>
                  <IconArrow className="size-3 -rotate-45 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Colophon */}
        <footer className="mt-10 flex flex-wrap items-baseline justify-between gap-3">
          <span className={eyebrow}>stylessh.dev / opus</span>
          <span className={eyebrow}>
            Latest Modified{" "}
            <span aria-hidden className="px-1 text-border">
              ·
            </span>
            {modified ? (
              <time dateTime={modified.toISOString()}>{modifiedLabel}</time>
            ) : (
              <span>{modifiedLabel}</span>
            )}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
