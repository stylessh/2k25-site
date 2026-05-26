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

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";
const linkClass =
  "text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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

function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
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

function hostLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function ProjectPreview({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div
      className="grid grid-cols-3 gap-1.5 sm:w-[168px]"
      aria-label={`${title} visual preview`}
    >
      {images.slice(0, 3).map((image, index) => (
        <span
          key={image}
          className={cn(
            "relative block aspect-[3/4] overflow-hidden rounded-[6px]",
            "border border-border bg-muted/40",
            index === 0 && "sm:-translate-y-1",
            index === 2 && "sm:translate-y-1",
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 56px, 28vw"
            className="object-cover saturate-[0.85] transition duration-300 group-hover:saturate-100"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
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
  const { hero, projects } = CANONICAL_PORTFOLIO;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-10 sm:px-8 sm:py-16 lg:grid-cols-[17rem_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-16 lg:self-start">
          <nav className="mb-10 flex items-center justify-between gap-4 lg:block lg:space-y-2">
            <NextLink href="/" className={cn(linkClass, "text-[13px]")}>
              Original
            </NextLink>
            <p className={labelClass}>/ gpt</p>
          </nav>

          <header className="space-y-7 border-border border-t pt-6">
            <div className="space-y-1.5">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[25px] leading-[1.05] tracking-[-0.035em]">
                {hero.name}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="max-w-sm text-[14px] leading-relaxed">
                {hero.intro}
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-relaxed text-muted-foreground">
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

          <dl className="mt-8 grid gap-4 border-border border-t pt-5 text-[13px]">
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
              <dt className={labelClass}>Source</dt>
              <dd>Shared portfolio data</dd>
            </div>
            <div className="grid gap-1">
              <dt className={labelClass}>Theme</dt>
              <dd>System</dd>
            </div>
          </dl>
        </aside>

        <div className="min-w-0">
          <section aria-labelledby="gpt-entries">
            <div className="mb-4 flex items-end justify-between gap-4 border-border border-t pt-4">
              <h2 id="gpt-entries" className={labelClass}>
                Portfolio entries
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {pad(projects.length)}
              </span>
            </div>

            <ol className="divide-y divide-border border-border border-y">
              {projects.map((project, projectIndex) => (
                <li key={project.title}>
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-5 py-7 outline-none transition-colors hover:bg-foreground/[0.015] focus-visible:bg-foreground/[0.025] sm:grid-cols-[1fr_auto] sm:items-center sm:px-3 sm:-mx-3"
                  >
                    <article className="min-w-0 space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                          {pad(projectIndex + 1)}
                        </span>
                        <h3 className="flex min-w-0 items-center gap-1.5 font-medium text-[16px] tracking-[-0.02em]">
                          <span className="truncate">{project.title}</span>
                          <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </h3>
                      </div>

                      <p className="max-w-xl pl-7 text-[13px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <p className="pl-7 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {hostLabel(project.href)}
                      </p>
                    </article>

                    <ProjectPreview
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10" aria-labelledby="gpt-connect">
            <div className="mb-4 flex items-end justify-between gap-4 border-border border-t pt-4">
              <h2 id="gpt-connect" className={labelClass}>
                Connect
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {pad(connectLinks.length)}
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
                      "inline-flex items-center gap-1 text-[13px]",
                    )}
                  >
                    {link.label}
                    {link.href.startsWith("http") ? (
                      <ArrowUpRight className="size-3" />
                    ) : null}
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
