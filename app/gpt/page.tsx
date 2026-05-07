import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
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
const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground";
const ruleClass = "border-border border-t";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
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

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const latestModifiedText = latestModified
    ? dateFormatter.format(latestModified)
    : "Unavailable";

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 pb-28 sm:px-10 sm:py-16">
        <nav
          className="flex items-center justify-between gap-4 pb-5"
          aria-label="Portfolio variant"
        >
          <NextLink
            href="/"
            className="text-muted-foreground text-normal underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            Original
          </NextLink>
          <span className={labelClass}>GPT interpretation</span>
        </nav>

        <header className={`${ruleClass} grid gap-10 py-10 sm:grid-cols-12`}>
          <div className="space-y-6 sm:col-span-7">
            <div className="space-y-2">
              <p className={labelClass}>{content.hero.role}</p>
              <h1 className="font-medium text-[28px] leading-none tracking-[-0.04em] sm:text-[36px]">
                {content.hero.name}
              </h1>
            </div>

            <p className="max-w-md text-[15px] text-foreground leading-relaxed">
              {content.hero.intro}
            </p>

            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground text-normal">
              <span>{content.hero.employmentPrefix}</span>
              {content.hero.showSupabaseMark ? (
                <span className="inline-flex size-[1lh] items-center rounded-md border border-border bg-muted/40 p-0.5">
                  <SupabaseMark className="size-full" />
                </span>
              ) : null}
              <strong className="font-medium text-foreground">
                {content.hero.orgName}
              </strong>
            </p>
          </div>

          <dl className="grid content-start grid-cols-[auto_1fr] gap-x-6 gap-y-3 sm:col-span-5 sm:border-border sm:border-l sm:pl-8">
            <dt className={labelClass}>Latest Modified</dt>
            <dd className="text-normal">
              {latestModified ? (
                <time dateTime={latestModified.toISOString()}>
                  {latestModifiedText}
                </time>
              ) : (
                latestModifiedText
              )}
            </dd>
            <dt className={labelClass}>Projects</dt>
            <dd className="text-normal tabular-nums">
              {content.projects.length.toString().padStart(2, "0")}
            </dd>
            <dt className={labelClass}>Theme</dt>
            <dd className="text-normal">System</dd>
          </dl>
        </header>

        <section className={ruleClass} aria-labelledby="gpt-work">
          <div className="flex items-end justify-between gap-4 py-5">
            <h2 id="gpt-work" className={labelClass}>
              Selected work
            </h2>
            <span className="text-muted-foreground text-[12px]">
              Entries from shared data
            </span>
          </div>

          <ol className="divide-y divide-border border-border border-t">
            {content.projects.map((project, index) => (
              <li key={project.title}>
                <article className="grid gap-5 py-8 sm:grid-cols-12 sm:gap-8">
                  <div className="space-y-3 sm:col-span-5">
                    <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium text-[20px] tracking-[-0.025em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-border/70 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                      <p className="max-w-md text-muted-foreground text-normal">
                        {project.description}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {hostName(project.href)}
                    </p>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-2 sm:col-span-7"
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
                          sizes="(min-width: 640px) 18vw, 30vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                          draggable={false}
                        />
                        <span className="absolute left-2 top-2 rounded-full border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
                          {imageIndex + 1}
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
          className={`${ruleClass} mt-10 py-6`}
          aria-labelledby="gpt-connect"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
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
                    className="text-muted-foreground text-normal underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
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
