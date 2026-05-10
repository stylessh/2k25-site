import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "Alan Daniel - GPT variant",
  description: "A GPT-built alternate portfolio for Alan Daniel.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://stylessh.dev" },
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
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  month: "short",
  timeZone: "UTC",
  timeZoneName: "short",
  year: "numeric",
});

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

const eyebrowClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const bodyClass = "text-[13px] leading-relaxed";
const quietLinkClass =
  "text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function hostName(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export default function GptVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <nav
          aria-label="Portfolio variant"
          className="mb-12 flex items-center justify-between gap-4"
        >
          <NextLink href="/" className={`${bodyClass} ${quietLinkClass}`}>
            Main
          </NextLink>
          <span className={eyebrowClass}>GPT alternate</span>
        </nav>

        <header className="grid gap-8 border-border border-t pt-6 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-7">
            <div className="space-y-2">
              <p className={eyebrowClass}>{hero.role}</p>
              <h1 className="font-medium text-[30px] leading-[0.95] tracking-[-0.045em] sm:text-[40px]">
                {hero.name}
              </h1>
            </div>

            <div className="max-w-md space-y-4">
              <p className={`${bodyClass} text-foreground`}>{hero.intro}</p>
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
            </div>
          </div>

          <dl className="grid content-start grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-border border-t pt-5 sm:border-t-0 sm:pt-0">
            <dt className={eyebrowClass}>Latest Modified</dt>
            <dd className={`${bodyClass} text-right tabular-nums`}>
              {latestModified ? (
                <time dateTime={latestModified.toISOString()}>
                  {latestModifiedText}
                </time>
              ) : (
                latestModifiedText
              )}
            </dd>
            <dt className={eyebrowClass}>Entries</dt>
            <dd className={`${bodyClass} text-right tabular-nums`}>
              {pad(projects.length)}
            </dd>
            <dt className={eyebrowClass}>Theme</dt>
            <dd className={`${bodyClass} text-right`}>System</dd>
          </dl>
        </header>

        <section
          aria-labelledby="gpt-projects"
          className="mt-14 border-border border-t"
        >
          <div className="flex items-baseline justify-between gap-4 py-5">
            <h2 id="gpt-projects" className={eyebrowClass}>
              Projects
            </h2>
            <span className={eyebrowClass}>Selected work</span>
          </div>

          <ol className="divide-y divide-border border-border border-t">
            {projects.map((project, index) => (
              <li key={project.title}>
                <article className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_260px] sm:gap-8">
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(index + 1)}
                      </span>
                      <div className="min-w-0 space-y-2">
                        <h3 className="font-medium text-[17px] leading-snug tracking-[-0.02em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {project.title}
                          </NextLink>
                        </h3>
                        <p
                          className={`${bodyClass} max-w-lg text-muted-foreground`}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${eyebrowClass} ml-7 inline-flex underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground`}
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
                          sizes="(min-width: 640px) 85px, 30vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                          draggable={false}
                        />
                        <span className="absolute left-1.5 top-1.5 rounded-full border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
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
          aria-labelledby="gpt-connect"
          className="mt-8 border-border border-t pt-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="gpt-connect" className={eyebrowClass}>
              Connect
            </h2>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
                    className={`${bodyClass} ${quietLinkClass}`}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
