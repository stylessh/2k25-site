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
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";
const linkClass =
  "underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X / Twitter", href: "https://x.com/stylesshDev" },
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

function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M4.75 11.25 11.25 4.75M6.25 4.75h5v5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <div className="mx-auto w-full max-w-2xl px-8 py-16 sm:py-20">
        <div className="mb-12 flex items-center justify-between gap-4">
          <NextLink href="/" className={`${linkClass} text-[12px]`}>
            Original
          </NextLink>
          <p className={labelClass}>/ gpt</p>
        </div>

        <header className="space-y-8">
          <div className="grid gap-8 border-border border-t pt-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="space-y-1">
              <h1 className="font-medium text-[18px] leading-snug tracking-[-0.02em]">
                {hero.name}
              </h1>
              <p className="text-[13px] text-muted-foreground">{hero.role}</p>
            </div>

            <dl className="grid gap-2 text-right text-[12px] sm:min-w-36">
              <div>
                <dt className={labelClass}>Latest Modified</dt>
                <dd className="mt-1 tabular-nums">
                  {latestModified ? (
                    <time dateTime={latestModified.toISOString()}>
                      {latestModifiedText}
                    </time>
                  ) : (
                    latestModifiedText
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-[14px] leading-relaxed">{hero.intro}</p>
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
          </div>
        </header>

        <section className="mt-14" aria-labelledby="gpt-projects">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 id="gpt-projects" className={labelClass}>
              Portfolios
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {pad(projects.length)} entries
            </span>
          </div>

          <ol className="border-border border-y">
            {projects.map((project, projectIndex) => (
              <li
                key={project.title}
                className="border-border border-b last:border-b-0"
              >
                <article className="grid gap-5 py-7 sm:grid-cols-[5.5rem_1fr]">
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-1 self-start sm:grid-cols-1"
                  >
                    {project.deckImages.map((image, imageIndex) => (
                      <span
                        key={image}
                        className="relative block aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/40 sm:aspect-[16/10]"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 88px, 30vw"
                          className="object-cover opacity-85 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                          draggable={false}
                        />
                        <span className="absolute top-1 left-1 rounded-sm bg-background/80 px-1 font-mono text-[9px] text-muted-foreground tabular-nums backdrop-blur-sm">
                          {pad(imageIndex + 1)}
                        </span>
                      </span>
                    ))}
                  </NextLink>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                          {pad(projectIndex + 1)}
                        </span>
                        <h3 className="font-medium text-[15px] tracking-[-0.01em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {project.title}
                          </NextLink>
                        </h3>
                      </div>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
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

        <footer className="mt-10 grid gap-6 border-border border-t pt-5 sm:grid-cols-[1fr_auto]">
          <div>
            <h2 className={labelClass}>Connect</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
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
          </div>

          <p className={`${labelClass} sm:text-right`}>
            Shared data / system theme
          </p>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
