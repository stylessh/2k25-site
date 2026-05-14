import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel - GPT portfolio",
  description: "A compact alternate portfolio index for Alan Daniel.",
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
  "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground";
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

function getHostName(href: string) {
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
    <div className="grid grid-cols-[1fr_4.5rem] gap-2 sm:grid-cols-[1fr_5rem]">
      <span className="relative block aspect-[16/11] overflow-hidden rounded-lg border border-border bg-muted/40">
        <Image
          src={images[0]}
          alt=""
          fill
          sizes="(min-width: 640px) 240px, 70vw"
          className="object-cover"
          draggable={false}
        />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.03]" />
      </span>

      <span className="grid grid-rows-2 gap-2" aria-hidden>
        {images.slice(1, 3).map((image, imageIndex) => (
          <span
            key={image}
            className="relative block overflow-hidden rounded-md border border-border bg-muted/40"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              draggable={false}
            />
            <span className="absolute left-1.5 top-1.5 rounded-sm border border-border/80 bg-background/85 px-1 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
              {pad(imageIndex + 2)}
            </span>
          </span>
        ))}
      </span>

      <span className="sr-only">Preview images for {title}</span>
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
      <div className="mx-auto w-full max-w-[46rem] px-6 py-12 sm:px-8 sm:py-16">
        <nav className="flex items-center justify-between gap-4 border-border border-b pb-4">
          <span className={labelClass}>/gpt</span>
          <NextLink
            href="/"
            className={`${linkClass} text-[12px] text-muted-foreground`}
          >
            Main reference
          </NextLink>
        </nav>

        <header className="grid gap-8 py-10 sm:grid-cols-[1fr_14rem] sm:py-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[23px] leading-none tracking-[-0.03em] sm:text-[28px]">
                {hero.name}
              </h1>
            </div>

            <div className="max-w-md space-y-4">
              <p className="text-[14px] leading-relaxed text-foreground">
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
          </div>

          <dl className="grid content-start gap-3 border-border border-t pt-5 text-[12px] sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
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

        <section aria-labelledby="gpt-work">
          <div className="flex items-end justify-between gap-4 border-border border-y py-3">
            <h2 id="gpt-work" className={labelClass}>
              Portfolio index
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              shared data
            </span>
          </div>

          <ol className="divide-y divide-border">
            {projects.map((project, index) => (
              <li key={project.title}>
                <article className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_17rem] sm:items-start">
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(index + 1)}
                      </span>
                      <h3 className="truncate font-medium text-[16px] tracking-[-0.02em]">
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

                    <p className="max-w-md pl-7 text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} ml-7 inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground`}
                    >
                      {getHostName(project.href)}
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block rounded-lg transition-opacity hover:opacity-95"
                  >
                    <ProjectPreview
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-8 grid gap-5 border-border border-t pt-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <section aria-labelledby="gpt-connect" className="space-y-3">
            <h2 id="gpt-connect" className={labelClass}>
              Connect
            </h2>
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

          <p className={`${labelClass} sm:text-right`}>
            {latestModified ? (
              <time dateTime={latestModified.toISOString()}>
                {latestModifiedText}
              </time>
            ) : (
              latestModifiedText
            )}
          </p>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
