import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
  timeZoneName: "short",
});

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X (Twitter)", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

const linkClass =
  "underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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

function ProjectStrip({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5 border-border border-t pt-3 sm:border-t-0 sm:pt-0">
      {images.slice(0, 3).map((image, index) => (
        <span
          key={image}
          className="relative block aspect-[4/5] overflow-hidden rounded-[6px] border border-border bg-muted/30"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 76px, 28vw"
            className="object-cover grayscale transition duration-300 hover:grayscale-0"
            draggable={false}
          />
          <span className="absolute top-1.5 left-1.5 rounded-[3px] border border-border/70 bg-background/85 px-1 font-mono text-[9px] text-muted-foreground tabular-nums backdrop-blur-sm">
            {pad(index + 1)}
          </span>
        </span>
      ))}
      <span className="sr-only">{title} visual previews</span>
    </div>
  );
}

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";
  const { hero, projects } = CANONICAL_PORTFOLIO;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-4xl gap-10 px-6 py-12 sm:px-8 sm:py-16 md:grid-cols-[14rem_1fr]">
        <aside className="space-y-8 md:sticky md:top-16 md:self-start">
          <nav className="flex items-center justify-between gap-4 md:block md:space-y-1.5">
            <NextLink
              href="/"
              className={cn(linkClass, "text-[13px] text-muted-foreground")}
            >
              Original
            </NextLink>
            <p className={labelClass}>/gpt</p>
          </nav>

          <dl className="grid gap-4 border-border border-t pt-5 text-[13px] md:gap-5">
            <div className="grid gap-1">
              <dt className={labelClass}>Latest Modified</dt>
              <dd className="leading-relaxed tabular-nums">
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
        </aside>

        <div className="min-w-0">
          <header className="border-border border-t pt-6">
            <p className={labelClass}>{hero.role}</p>
            <div className="mt-5 max-w-xl space-y-5">
              <h1 className="font-medium text-[24px] leading-[1.05] tracking-[-0.035em] sm:text-[32px]">
                {hero.name}
              </h1>
              <p className="max-w-md text-[14px] leading-relaxed">
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
          </header>

          <section className="mt-14" aria-labelledby="gpt-work">
            <div className="flex items-center justify-between gap-4 border-border border-t pt-4 pb-3">
              <h2 id="gpt-work" className={labelClass}>
                Portfolio
              </h2>
              <span className={cn(labelClass, "tabular-nums")}>
                {pad(projects.length)} records
              </span>
            </div>

            <ol className="divide-y divide-border border-border border-y">
              {projects.map((project, projectIndex) => (
                <li key={project.title}>
                  <article className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-start">
                    <div className="min-w-0 space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                          {pad(projectIndex + 1)}
                        </span>
                        <h3 className="truncate font-medium text-[16px] tracking-[-0.02em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
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
                          linkClass,
                          "ml-7 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                        )}
                      >
                        {hostnameOf(project.href)}
                      </NextLink>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="block"
                    >
                      <ProjectStrip
                        images={project.deckImages}
                        title={project.title}
                      />
                    </NextLink>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10" aria-labelledby="gpt-connect">
            <div className="flex items-center justify-between gap-4 border-border border-t pt-4 pb-3">
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
                      linkClass,
                      "text-[13px] text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
