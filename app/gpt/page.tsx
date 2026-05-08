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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const content = CANONICAL_PORTFOLIO;
const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const microClass = "font-mono text-[11px] text-muted-foreground";
const bodyClass = "text-[13px] leading-relaxed";

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

function numberLabel(value: number) {
  return value.toString().padStart(2, "0");
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden
      className="size-3"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function GptVariantPage() {
  const { hero, projects } = content;
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16">
        <aside className="space-y-10 lg:sticky lg:top-10 lg:h-fit">
          <nav
            aria-label="Portfolio variant"
            className="flex items-center justify-between gap-4"
          >
            <span className={labelClass}>GPT portfolio</span>
            <NextLink
              href="/"
              className="text-[12px] text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              Original
            </NextLink>
          </nav>

          <header className="space-y-6">
            <div className="space-y-2">
              <p className={labelClass}>{hero.role}</p>
              <h1 className="font-medium text-[30px] leading-none tracking-[-0.045em] sm:text-[38px]">
                {hero.name}
              </h1>
            </div>

            <p className={`${bodyClass} max-w-sm text-foreground`}>
              {hero.intro}
            </p>

            <p
              className={`${bodyClass} flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground`}
            >
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
          </header>

          <dl className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-3 border-y border-border py-5">
            <dt className={labelClass}>Latest Modified</dt>
            <dd className="text-[13px] tabular-nums">
              {latestModified ? (
                <time dateTime={latestModified.toISOString()}>
                  {latestModifiedText}
                </time>
              ) : (
                latestModifiedText
              )}
            </dd>

            <dt className={labelClass}>Projects</dt>
            <dd className="text-[13px] tabular-nums">
              {numberLabel(projects.length)}
            </dd>

            <dt className={labelClass}>Theme</dt>
            <dd className="text-[13px]">System</dd>
          </dl>

          <section aria-labelledby="gpt-connect" className="space-y-4">
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
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    {link.label}
                    {link.href.startsWith("http") ? <ArrowUpRight /> : null}
                  </NextLink>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section aria-labelledby="gpt-work" className="space-y-4">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
            <h2 id="gpt-work" className={labelClass}>
              Selected work
            </h2>
            <span className={microClass}>shared data</span>
          </div>

          <ol className="space-y-3">
            {projects.map((project, index) => (
              <li key={project.title}>
                <article className="group rounded-xl border border-border bg-background p-3 transition-colors hover:border-muted-foreground/35">
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_13rem]">
                    <div className="flex min-h-44 flex-col justify-between gap-8 p-2">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className={`${microClass} tabular-nums`}>
                            {numberLabel(index + 1)}
                          </span>
                          <span className={`${microClass} truncate`}>
                            {hostName(project.href)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium text-[18px] leading-tight tracking-[-0.025em]">
                            <NextLink
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 underline decoration-border/70 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                            >
                              {project.title}
                              <ArrowUpRight />
                            </NextLink>
                          </h3>
                          <p
                            className={`${bodyClass} max-w-md text-muted-foreground`}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <span className={labelClass}>Portfolio entry</span>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="grid grid-cols-3 gap-1.5 sm:grid-cols-1"
                    >
                      {project.deckImages.map((image, imageIndex) => (
                        <span
                          key={image}
                          className="relative block aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/40"
                        >
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 13rem, (min-width: 640px) 28vw, 30vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            draggable={false}
                          />
                          <span className="absolute left-2 top-2 rounded-full border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
                            {numberLabel(imageIndex + 1)}
                          </span>
                        </span>
                      ))}
                    </NextLink>
                  </div>
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
