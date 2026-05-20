import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import type { SVGProps } from "react";
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
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const linkClass =
  "underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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

function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      aria-hidden
      {...props}
    >
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </svg>
  );
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";
  const { hero, projects } = content;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-[46rem] px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-12 flex items-center justify-between gap-4 text-[13px]">
          <NextLink href="/" className={`${linkClass} text-muted-foreground`}>
            Original
          </NextLink>
          <span className={labelClass}>/ gpt</span>
        </nav>

        <header className="border-border border-t pt-6">
          <div className="grid gap-8 sm:grid-cols-[1fr_13rem] sm:items-start">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <p className={labelClass}>{hero.role}</p>
                <h1 className="font-medium text-[24px] leading-tight tracking-[-0.03em] sm:text-[31px]">
                  {hero.name}
                </h1>
              </div>

              <div className="max-w-[30rem] space-y-4">
                <p className="text-[14px] leading-relaxed">{hero.intro}</p>
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

            <dl className="grid gap-3 border-border border-t pt-5 text-[13px] sm:border-t-0 sm:pt-0">
              <div className="grid gap-1">
                <dt className={labelClass}>Latest Modified</dt>
                <dd className="tabular-nums">
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
                <dt className={labelClass}>Portfolios</dt>
                <dd className="tabular-nums">{pad(projects.length)}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="gpt-portfolios">
          <div className="mb-5 flex items-baseline justify-between gap-4 border-border border-t pt-5">
            <h2 id="gpt-portfolios" className={labelClass}>
              Portfolio index
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Shared data
            </p>
          </div>

          <ol className="divide-y divide-border border-border border-y">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="group grid gap-5 py-7 sm:grid-cols-[8.5rem_1fr] sm:items-start">
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="grid grid-cols-3 gap-1.5 sm:grid-cols-none"
                  >
                    {project.deckImages.map((image) => (
                      <span
                        key={image}
                        className="relative block aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/40 sm:aspect-[2.8/1]"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 136px, 30vw"
                          className="object-cover opacity-90 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
                          draggable={false}
                        />
                      </span>
                    ))}
                  </NextLink>

                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(projectIndex + 1)}
                      </span>
                      <h3 className="font-medium text-[17px] tracking-[-0.02em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </NextLink>
                      </h3>
                    </div>

                    <p className="max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground`}
                    >
                      {hostName(project.href)}
                    </NextLink>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-10 border-border border-t pt-5"
          aria-labelledby="gpt-connect"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="gpt-connect" className={labelClass}>
              Connect
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
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

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-border border-t pt-5 text-[13px] text-muted-foreground">
          <span className={labelClass}>stylessh.dev / gpt</span>
          <span className="tabular-nums">
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
