import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — Portfolio Index",
  description: "A GPT-built portfolio variation for Alan Daniel.",
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
  "underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

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

function formatProjectCode(title: string, index: number) {
  return `${pad(index + 1)} / ${title.toLowerCase().replaceAll(" ", "-")}`;
}

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";
  const { hero, projects } = content;

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-12 lg:h-fit">
          <NextLink
            href="/"
            className={`${linkClass} inline-flex text-[12px] text-muted-foreground`}
          >
            Canonical /
          </NextLink>

          <header className="mt-12 space-y-8">
            <div className="space-y-3">
              <p className={labelClass}>GPT portfolio index</p>
              <div className="space-y-1">
                <h1 className="font-medium text-[28px] leading-none tracking-[-0.04em] sm:text-[34px]">
                  {hero.name}
                </h1>
                <p className="text-[13px] text-muted-foreground">{hero.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="max-w-sm text-[14px] leading-relaxed">
                {hero.intro}
              </p>
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                <span>{hero.employmentPrefix}</span>
                {hero.showSupabaseMark ? (
                  <span className="inline-flex size-[1lh] items-center rounded-md border border-border bg-foreground/[0.03] p-0.5">
                    <SupabaseMark className="size-full" />
                  </span>
                ) : null}
                <strong className="font-medium text-foreground">
                  {hero.orgName}
                </strong>
              </p>
            </div>
          </header>

          <dl className="mt-10 grid gap-4 border-border border-t pt-5 text-[12px]">
            <div className="grid gap-1.5">
              <dt className={labelClass}>Latest Modified</dt>
              <dd className="font-mono tabular-nums">
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
              <dt className={labelClass}>Entries</dt>
              <dd className="font-mono tabular-nums">{pad(projects.length)}</dd>
            </div>
            <div className="grid gap-1.5">
              <dt className={labelClass}>Theme</dt>
              <dd>System light / dark</dd>
            </div>
          </dl>

          <section className="mt-10 border-border border-t pt-5">
            <h2 className={labelClass}>Connect</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
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
                    className={`${linkClass} text-[12px] text-muted-foreground`}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="border-border border-t pt-5" aria-labelledby="work">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div className="space-y-2">
              <p className={labelClass}>Selected work</p>
              <h2
                id="work"
                className="max-w-lg font-medium text-[18px] leading-snug tracking-[-0.03em]"
              >
                Portfolio entries arranged as quiet records with attached visual
                evidence.
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
              shared data
            </span>
          </div>

          <ol className="divide-y divide-border border-border border-y">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2">
                        <p className={labelClass}>
                          {formatProjectCode(project.title, projectIndex)}
                        </p>
                        <h3 className="font-medium text-[22px] leading-none tracking-[-0.04em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-muted-foreground"
                          >
                            {project.title}
                          </NextLink>
                        </h3>
                      </div>
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkClass} shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground`}
                      >
                        Visit
                      </NextLink>
                    </div>

                    <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground">
                      <span className="font-mono tabular-nums">
                        {pad(project.deckImages.length)} images
                      </span>
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {hostName(project.href)}
                      </NextLink>
                    </div>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-2"
                  >
                    {project.deckImages.map((image, imageIndex) => (
                      <span
                        key={image}
                        className="relative block aspect-[4/5] overflow-hidden rounded-xl border border-border bg-foreground/[0.03]"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 6rem, 30vw"
                          className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                          draggable={false}
                        />
                        <span className="absolute top-2 left-2 rounded-full border border-border bg-background/85 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
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
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
