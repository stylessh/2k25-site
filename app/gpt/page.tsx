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
const eyebrowClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const ruleClass = "border-border border-t";
const subtleLinkClass =
  "text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

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
      <path d="M4.75 11.25 11.25 4.75" />
      <path d="M5.75 4.75h5.5v5.5" />
    </svg>
  );
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

function ProjectThumbs({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-label={`${title} previews`}>
      {images.slice(0, 3).map((image, index) => (
        <span
          key={image}
          className="relative block aspect-[4/3] overflow-hidden rounded-[7px] border border-border bg-muted/40"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 96px, 28vw"
            className="object-cover grayscale transition duration-300 group-hover:scale-[1.02] group-hover:grayscale-0"
            draggable={false}
          />
          <span className="absolute right-1.5 bottom-1.5 rounded-sm border border-border/80 bg-background/85 px-1 py-0.5 font-mono text-[9px] text-muted-foreground tabular-nums backdrop-blur-sm">
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
      <div className="mx-auto w-full max-w-[46rem] px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-12 flex items-center justify-between gap-4 text-[13px]">
          <NextLink href="/" className={subtleLinkClass}>
            Main
          </NextLink>
          <span className={eyebrowClass}>/ gpt</span>
        </nav>

        <header className="space-y-9">
          <div
            className={`${ruleClass} grid gap-8 pt-6 sm:grid-cols-[1fr_14rem]`}
          >
            <div className="space-y-6">
              <div className="space-y-1.5">
                <p className={eyebrowClass}>{hero.role}</p>
                <h1 className="font-medium text-[25px] leading-[1.08] tracking-[-0.035em] sm:text-[32px]">
                  {hero.name}
                </h1>
              </div>

              <div className="max-w-md space-y-4 text-[13px] leading-relaxed sm:text-[14px]">
                <p>{hero.intro}</p>
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
            </div>

            <dl className="grid content-start gap-4 text-[13px]">
              <div className="grid gap-1">
                <dt className={eyebrowClass}>Latest Modified</dt>
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
              <div className="grid grid-cols-2 gap-3 border-border border-t pt-4 sm:grid-cols-1">
                <div className="grid gap-1">
                  <dt className={eyebrowClass}>Entries</dt>
                  <dd className="tabular-nums">{pad(projects.length)}</dd>
                </div>
                <div className="grid gap-1">
                  <dt className={eyebrowClass}>Theme</dt>
                  <dd>System</dd>
                </div>
              </div>
            </dl>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="gpt-projects">
          <div
            className={`${ruleClass} mb-2 flex items-center justify-between gap-4 pt-4`}
          >
            <h2 id="gpt-projects" className={eyebrowClass}>
              Portfolio
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              Shared source
            </span>
          </div>

          <ol className="divide-y divide-border">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="group grid gap-5 py-8 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-start">
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
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
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
                      className={`${subtleLinkClass} ml-7 inline-flex font-mono text-[10px] uppercase tracking-[0.16em]`}
                    >
                      {hostName(project.href)}
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="block sm:pt-1"
                  >
                    <ProjectThumbs
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
          <div
            className={`${ruleClass} mb-4 flex items-center justify-between gap-4 pt-4`}
          >
            <h2 id="gpt-connect" className={eyebrowClass}>
              Connect
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {pad(connectLinks.length)}
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {connectLinks.map((link, index) => (
              <li key={link.label} className="flex items-center">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="select-none px-2 text-[10px] text-border"
                  >
                    /
                  </span>
                ) : null}
                <NextLink
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`${subtleLinkClass} text-[13px]`}
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
