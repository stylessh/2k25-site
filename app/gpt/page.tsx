import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — GPT portfolio",
  description:
    "Alternate portfolio interpretation (GPT). Canonical site: stylessh.dev.",
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
  "text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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
  { label: "github", href: "https://github.com/stylessh" },
  { label: "x", href: "https://x.com/stylesshDev" },
  { label: "mail", href: "mailto:adaaanniek@gmail.com" },
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

function ProjectImages({ images }: { images: readonly string[] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:max-w-[11rem]" aria-hidden>
      {images.map((image, imageIndex) => (
        <span
          key={image}
          className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-border bg-muted-foreground/5"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 56px, 28vw"
            className="object-cover opacity-90 grayscale transition duration-300 hover:grayscale-0 dark:opacity-80"
            draggable={false}
          />
          <span className="absolute right-1 bottom-1 rounded-sm border border-border bg-background/85 px-1 font-mono text-[9px] text-muted-foreground tabular-nums">
            {pad(imageIndex + 1)}
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
  const { hero, projects } = CANONICAL_PORTFOLIO;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-14 flex items-center justify-between gap-4">
          <NextLink href="/" className={`${linkClass} text-[12px]`}>
            original
          </NextLink>
          <span className={labelClass}>/gpt alternate</span>
        </nav>

        <header className="grid gap-10 border-border border-t pt-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="max-w-xl space-y-7">
            <p className={labelClass}>{hero.role}</p>
            <h1 className="font-medium text-[28px] leading-none tracking-[-0.04em] sm:text-[38px]">
              {hero.name}
            </h1>

            <p className="max-w-md text-[14px] leading-relaxed text-foreground">
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

          <dl className="grid content-start gap-4 border-border border-t pt-5 text-[13px] lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <div className="grid gap-1.5">
              <dt className={labelClass}>Latest Modified</dt>
              <dd className="font-mono text-[11px] text-foreground tabular-nums">
                {latestModified ? (
                  <time dateTime={latestModified.toISOString()}>
                    {latestModifiedText}
                  </time>
                ) : (
                  latestModifiedText
                )}
              </dd>
            </div>
            <div className="grid gap-1.5">
              <dt className={labelClass}>Portfolio entries</dt>
              <dd className="font-mono text-[11px] tabular-nums">
                {pad(projects.length)}
              </dd>
            </div>
            <div className="grid gap-1.5">
              <dt className={labelClass}>Mode</dt>
              <dd className="text-muted-foreground">system theme</dd>
            </div>
          </dl>
        </header>

        <section className="mt-16" aria-labelledby="gpt-projects">
          <div className="grid gap-2 border-border border-t pt-5 sm:grid-cols-[9rem_1fr]">
            <h2 id="gpt-projects" className={labelClass}>
              Selected work
            </h2>
            <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
              A compact index of public projects, using the same shared source
              data and visual decks as the main portfolio.
            </p>
          </div>

          <ol className="mt-7 divide-y divide-border border-border border-y">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="grid gap-5 py-7 sm:grid-cols-[9rem_minmax(0,1fr)_11rem] sm:items-start">
                  <div className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {pad(projectIndex + 1)}
                  </div>

                  <div className="min-w-0 space-y-3">
                    <h3 className="font-medium text-[16px] tracking-[-0.02em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {project.title}
                      </NextLink>
                    </h3>
                    <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} inline-flex font-mono text-[10px] uppercase tracking-[0.16em]`}
                    >
                      {getHostName(project.href)}
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="block transition-opacity hover:opacity-90"
                  >
                    <ProjectImages images={project.deckImages} />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-10 grid gap-5 border-border border-t pt-5 sm:grid-cols-[9rem_1fr]"
          aria-labelledby="gpt-connect"
        >
          <h2 id="gpt-connect" className={labelClass}>
            Connect
          </h2>
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
                  className={`${linkClass} text-[13px]`}
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
