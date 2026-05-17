import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import {
  CANONICAL_PORTFOLIO,
  type PortfolioProject,
} from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel - GPT portfolio",
  description: "Alternate portfolio build (GPT). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

function getLatestCommitDate(): Date | null {
  try {
    const iso = execSync(
      "git log -1 --format=%cI -- app/gpt/page.tsx lib/portfolio-content.ts",
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

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

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const textLinkClass =
  "underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

function formatDate(date: Date | null) {
  return date ? dateFormatter.format(date) : "Unavailable";
}

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

function ProjectContactSheet({ project }: { project: PortfolioProject }) {
  const images = project.deckImages.slice(0, 3);

  return (
    <NextLink
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className="group grid grid-cols-3 gap-1.5 rounded-lg border border-border bg-muted/20 p-1.5 transition-colors hover:border-foreground/30 hover:bg-muted/40"
    >
      {images.map((image, index) => (
        <span
          key={image}
          className="relative block aspect-[4/3] overflow-hidden rounded-[5px] bg-muted/40"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 72px, 28vw"
            className="object-cover opacity-85 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
            draggable={false}
          />
          <span className="absolute right-1 bottom-1 rounded-sm border border-border/80 bg-background/85 px-1 font-mono text-[8px] text-muted-foreground leading-4 backdrop-blur-sm">
            {pad(index + 1)}
          </span>
        </span>
      ))}
    </NextLink>
  );
}

function LatestModified({ date }: { date: Date | null }) {
  const label = formatDate(date);

  return date ? <time dateTime={date.toISOString()}>{label}</time> : label;
}

export default function GptVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const latestModified = getLatestCommitDate();

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <NextLink
            href="/"
            className={cn(textLinkClass, "text-[13px] text-muted-foreground")}
          >
            Original
          </NextLink>
          <span className={labelClass}>/gpt</span>
        </nav>

        <header className="border-border border-t pt-7">
          <div className="grid gap-8 sm:grid-cols-[1fr_13rem] sm:items-start">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <p className={labelClass}>{hero.role}</p>
                <h1 className="font-medium text-[24px] leading-[1.08] tracking-[-0.03em] sm:text-[28px]">
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
                    <span className="inline-flex size-[1lh] items-center justify-center rounded-md border border-border bg-muted/40 p-0.5">
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
                  <LatestModified date={latestModified} />
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
          </div>
        </header>

        <section className="mt-14" aria-labelledby="gpt-work">
          <div className="mb-2 flex items-baseline justify-between gap-4 border-border border-t pt-4">
            <h2 id="gpt-work" className={labelClass}>
              Portfolio
            </h2>
            <span className={cn(labelClass, "tabular-nums")}>
              {pad(projects.length)} items
            </span>
          </div>

          <ol className="divide-y divide-border">
            {projects.map((project, index) => (
              <li key={project.title}>
                <article className="grid gap-5 py-8 sm:grid-cols-[1fr_14rem] sm:items-start">
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(index + 1)}
                      </span>
                      <h3 className="font-medium text-[16px] tracking-[-0.02em]">
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

                    <p className="max-w-lg pl-7 text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        textLinkClass,
                        "ml-7 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                      )}
                    >
                      {hostName(project.href)}
                    </NextLink>
                  </div>

                  <ProjectContactSheet project={project} />
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-10 border-border border-t pt-4"
          aria-labelledby="gpt-connect"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="gpt-connect" className={labelClass}>
              Connect
            </h2>
            <span className={cn(labelClass, "tabular-nums")}>
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
                  className={cn(
                    textLinkClass,
                    "text-[13px] text-muted-foreground",
                  )}
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 flex items-baseline justify-between gap-4 border-border border-t pt-4">
          <span className={labelClass}>stylessh.dev/gpt</span>
          <span className={cn(labelClass, "tabular-nums")}>
            <LatestModified date={latestModified} />
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
