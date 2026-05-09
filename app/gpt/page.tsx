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
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <NextLink
            href="/"
            className={`${linkClass} text-[13px] text-muted-foreground`}
          >
            Original
          </NextLink>
          <span className={labelClass}>GPT portfolio</span>
        </nav>

        <header className="grid gap-8 border-border border-t pt-6 sm:grid-cols-[1fr_15rem]">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[24px] leading-tight tracking-[-0.03em] sm:text-[30px]">
                {hero.name}
              </h1>
            </div>

            <div className="max-w-md space-y-4">
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

          <dl className="grid content-start gap-3 border-border border-t pt-5 text-[13px] sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
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
              <dt className={labelClass}>Entries</dt>
              <dd className="tabular-nums">{pad(projects.length)}</dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Theme</dt>
              <dd>System</dd>
            </div>
          </dl>
        </header>

        <section className="mt-14" aria-labelledby="gpt-projects">
          <div className="mb-5 flex items-baseline justify-between gap-4 border-border border-t pt-5">
            <h2 id="gpt-projects" className={labelClass}>
              Portfolio entries
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground">
              shared data
            </p>
          </div>

          <ol className="divide-y divide-border border-border border-y">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="grid gap-6 py-7 sm:grid-cols-[1fr_16rem] sm:items-start">
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(projectIndex + 1)}
                      </span>
                      <h3 className="font-medium text-[17px] tracking-[-0.02em]">
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

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-1.5"
                  >
                    {project.deckImages.map((image, imageIndex) => (
                      <span
                        key={image}
                        className="relative block aspect-[3/4] overflow-hidden rounded-md border border-border bg-muted/40"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 5rem, 30vw"
                          className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                          draggable={false}
                        />
                        <span className="absolute bottom-1.5 left-1.5 rounded-sm border border-border/80 bg-background/85 px-1 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
                          {pad(imageIndex + 1)}
                        </span>
                      </span>
                    ))}
                  </NextLink>
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
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
