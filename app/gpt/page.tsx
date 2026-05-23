import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — GPT variant",
  description: "Alternate portfolio build (GPT). Canonical site: stylessh.dev.",
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

const content = CANONICAL_PORTFOLIO;
const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";
const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
  timeZoneName: "short",
});

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

function hostName(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function DeckPreview({ images }: { images: readonly string[] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
      {images.map((image, imageIndex) => (
        <span
          key={image}
          className="relative block aspect-[4/5] overflow-hidden rounded-[6px] border border-border bg-muted/40"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 6rem, 28vw"
            className="object-cover opacity-90 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            draggable={false}
          />
          <span className="absolute right-1.5 bottom-1.5 rounded-[3px] border border-border bg-background/85 px-1 font-mono text-[9px] text-muted-foreground tabular-nums backdrop-blur-sm">
            {pad(imageIndex + 1)}
          </span>
        </span>
      ))}
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      role="presentation"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden="true"
    >
      <path d="M3.25 8.75 8.75 3.25" />
      <path d="M4.25 3.25h4.5v4.5" />
    </svg>
  );
}

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";
  const { hero, projects } = content;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <nav className="mb-10 flex items-center justify-between gap-4">
          <span className={labelClass}>/ gpt / portfolios</span>
          <NextLink
            href="/"
            className={`${linkClass} text-[12px] text-muted-foreground`}
          >
            Original
          </NextLink>
        </nav>

        <header className="grid gap-8 border-border border-y py-8 md:grid-cols-[minmax(0,1fr)_18rem] md:py-10">
          <div className="max-w-xl space-y-6">
            <div className="space-y-2">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[26px] leading-none tracking-[-0.04em] sm:text-[34px]">
                {hero.name}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-[14px] leading-relaxed text-foreground sm:text-[15px]">
                {hero.intro}
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
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
          </div>

          <dl className="grid content-start gap-4 border-border border-t pt-5 text-[13px] md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div className="grid gap-1">
              <dt className={labelClass}>Latest Modified</dt>
              <dd className="tabular-nums text-foreground">
                {latestModified ? (
                  <time dateTime={latestModified.toISOString()}>
                    {latestModifiedText}
                  </time>
                ) : (
                  latestModifiedText
                )}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Entries</dt>
              <dd className="tabular-nums text-foreground">
                {pad(projects.length)}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Mode</dt>
              <dd className="text-foreground">System theme</dd>
            </div>
          </dl>
        </header>

        <section className="mt-12" aria-labelledby="gpt-projects">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 id="gpt-projects" className={labelClass}>
              Portfolio index
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {pad(projects.length)} records
            </p>
          </div>

          <ol>
            {projects.map((project, projectIndex) => (
              <li key={project.title} className="border-border border-t">
                <article className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_19rem] md:items-start md:py-8">
                  <div className="grid gap-4 md:grid-cols-[4.25rem_minmax(0,1fr)]">
                    <div className="flex items-baseline justify-between gap-4 md:block">
                      <span className="font-mono text-[12px] text-muted-foreground tabular-nums">
                        {pad(projectIndex + 1)}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:mt-2 md:block">
                        Entry
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-medium text-[17px] tracking-[-0.025em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {project.title}
                          </NextLink>
                        </h3>
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span>{hostName(project.href)}</span>
                          <ArrowUpRight />
                        </NextLink>
                      </div>

                      <p className="max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block"
                  >
                    <DeckPreview images={project.deckImages} />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-10 border-border border-y py-5"
          aria-labelledby="gpt-connect"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="gpt-connect" className={labelClass}>
              Connect
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {pad(connectLinks.length)} links
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-2">
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
                  className={`${linkClass} text-[13px] text-muted-foreground`}
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span className={labelClass}>stylessh.dev/gpt</span>
          <span className="tabular-nums">
            Latest Modified:{" "}
            {latestModified ? (
              <time dateTime={latestModified.toISOString()}>
                {latestModifiedText}
              </time>
            ) : (
              latestModifiedText
            )}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
