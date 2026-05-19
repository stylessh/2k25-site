import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel - GPT variant",
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
const eyebrowClass =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";
const fineLinkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
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

function hostnameOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function LatestModified({
  value,
  label,
}: {
  value: Date | null;
  label: string;
}) {
  return value ? <time dateTime={value.toISOString()}>{label}</time> : label;
}

function ProjectPreview({ images }: { images: readonly string[] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-hidden>
      {images.slice(0, 3).map((image, index) => (
        <span
          key={image}
          className="relative block aspect-[4/5] overflow-hidden rounded-md border border-border bg-muted/40"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 112px, 28vw"
            className="object-cover opacity-85 grayscale transition duration-300 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0"
            draggable={false}
          />
          <span className="absolute top-1.5 left-1.5 rounded-[3px] border border-border/80 bg-background/85 px-1 font-mono text-[9px] text-muted-foreground tabular-nums backdrop-blur-sm">
            {pad(index + 1)}
          </span>
        </span>
      ))}
    </div>
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
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[12rem_1fr] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="flex items-start justify-between gap-4 border-border border-t pt-4 lg:grid lg:gap-8">
            <NextLink
              href="/"
              className={`${fineLinkClass} text-[13px] text-muted-foreground`}
            >
              Original
            </NextLink>
            <dl className="grid gap-4 text-right text-[12px] lg:text-left">
              <div className="grid gap-1">
                <dt className={eyebrowClass}>Variant</dt>
                <dd>GPT</dd>
              </div>
              <div className="grid gap-1">
                <dt className={eyebrowClass}>Latest Modified</dt>
                <dd className="tabular-nums">
                  <LatestModified
                    value={latestModified}
                    label={latestModifiedText}
                  />
                </dd>
              </div>
              <div className="hidden gap-1 lg:grid">
                <dt className={eyebrowClass}>Entries</dt>
                <dd className="tabular-nums">{pad(projects.length)}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div>
          <header className="grid gap-8 border-border border-t pt-6 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end">
            <div className="max-w-xl space-y-7">
              <div className="space-y-1.5">
                <p className={eyebrowClass}>{hero.role}</p>
                <h1 className="font-medium text-[26px] leading-none tracking-[-0.035em] sm:text-[34px]">
                  {hero.name}
                </h1>
              </div>

              <div className="max-w-md space-y-4">
                <p className="text-[14px] leading-relaxed text-foreground">
                  {hero.intro}
                </p>
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
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
              {projects.map((project, index) => (
                <NextLink
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="group grid grid-cols-[2.75rem_1fr] items-center gap-2 rounded-md border border-border bg-background p-1.5 text-[11px] transition-colors hover:border-foreground/40"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-[4px] bg-muted/40">
                    <Image
                      src={project.deckImages[0]}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                      draggable={false}
                    />
                  </span>
                  <span className="hidden min-w-0 text-muted-foreground md:block">
                    <span className="block font-mono text-[9px] tabular-nums">
                      {pad(index + 1)}
                    </span>
                    <span className="block truncate text-foreground">
                      {project.title}
                    </span>
                  </span>
                </NextLink>
              ))}
            </div>
          </header>

          <section className="mt-14" aria-labelledby="gpt-projects">
            <div className="mb-4 flex items-baseline justify-between gap-4 border-border border-t pt-4">
              <h2 id="gpt-projects" className={eyebrowClass}>
                Portfolios
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {pad(projects.length)} entries
              </span>
            </div>

            <ol className="divide-y divide-border border-border border-y">
              {projects.map((project, projectIndex) => (
                <li key={project.title}>
                  <article className="group grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_21rem] md:items-start md:gap-10">
                    <div className="grid gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                          {pad(projectIndex + 1)}
                        </span>
                        <h3 className="font-medium text-[18px] leading-tight tracking-[-0.025em]">
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
                        className={`${fineLinkClass} w-fit font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground`}
                      >
                        {hostnameOf(project.href)}
                      </NextLink>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="group/preview block"
                    >
                      <ProjectPreview images={project.deckImages} />
                    </NextLink>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="mt-12 border-border border-t pt-4"
            aria-labelledby="gpt-connect"
          >
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="gpt-connect" className={eyebrowClass}>
                Connect
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                System theme
              </span>
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-2">
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
                    className={`${fineLinkClass} text-[13px] text-muted-foreground`}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-border border-t pt-4 text-[12px] text-muted-foreground">
            <span className={eyebrowClass}>stylessh.dev/gpt</span>
            <span>
              Latest Modified:{" "}
              <LatestModified
                value={latestModified}
                label={latestModifiedText}
              />
            </span>
          </footer>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
