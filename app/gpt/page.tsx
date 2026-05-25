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

const content = CANONICAL_PORTFOLIO;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour12: false,
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

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";

const fieldClass =
  "grid gap-1 border-t border-border pt-3 sm:border-t-0 sm:pt-0";

const quietLinkClass =
  "text-muted-foreground underline decoration-border/70 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground";

function LatestModifiedField({ date }: { date: Date | null }) {
  const label = date ? dateFormatter.format(date) : "Unavailable";

  return (
    <div className={fieldClass}>
      <dt className={labelClass}>Latest Modified</dt>
      <dd className="text-[12px] text-foreground tabular-nums">
        {date ? <time dateTime={date.toISOString()}>{label}</time> : label}
      </dd>
    </div>
  );
}

function ProjectImageRail({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-hidden>
      {images.slice(0, 3).map((image, imageIndex) => (
        <span
          key={image}
          className={cn(
            "relative block aspect-[4/5] overflow-hidden rounded-lg border border-border bg-foreground/[0.03]",
            imageIndex === 1 && "translate-y-2",
            imageIndex === 2 && "translate-y-4",
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 88px, 28vw"
            className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
            draggable={false}
          />
          <span className="absolute inset-0 ring-1 ring-inset ring-foreground/[0.04]" />
        </span>
      ))}
      <span className="sr-only">Preview images for {title}</span>
    </div>
  );
}

export default function GptVariantPage() {
  const latestModified = getLatestCommitDate();
  const { hero, projects } = content;

  return (
    <main className="min-h-dvh bg-background pb-28 text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-[720px] px-6 py-12 sm:px-8 sm:py-16">
        <nav className="mb-12 flex items-center justify-between gap-4 text-[12px]">
          <span className={labelClass}>/ gpt</span>
          <NextLink href="/" className={quietLinkClass}>
            Main reference
          </NextLink>
        </nav>

        <header className="space-y-8">
          <div className="grid gap-6 border-y border-border py-6 sm:grid-cols-[1fr_13rem]">
            <div className="max-w-md space-y-5">
              <div className="space-y-1">
                <p className={labelClass}>{hero.role}</p>
                <h1 className="text-[26px] font-medium leading-none tracking-[-0.04em] sm:text-[34px]">
                  {hero.name}
                </h1>
              </div>

              <div className="space-y-3 text-[13px] leading-relaxed">
                <p>{hero.intro}</p>
                <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
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
            </div>

            <dl className="grid content-start gap-4 text-[12px] sm:justify-end sm:text-right">
              <LatestModifiedField date={latestModified} />
              <div className={fieldClass}>
                <dt className={labelClass}>Entries</dt>
                <dd className="text-foreground tabular-nums">
                  {pad(projects.length)}
                </dd>
              </div>
              <div className={fieldClass}>
                <dt className={labelClass}>Theme</dt>
                <dd className="text-foreground">System</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="mt-12" aria-labelledby="gpt-projects">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="gpt-projects" className={labelClass}>
              Selected work
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {pad(projects.length)} records
            </span>
          </div>

          <ol className="divide-y divide-border border-y border-border">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="grid gap-6 py-8 sm:grid-cols-[minmax(0,1fr)_17rem] sm:items-start">
                  <div className="min-w-0 space-y-4">
                    <header className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="pt-1 font-mono text-[10px] text-muted-foreground tabular-nums">
                        {pad(projectIndex + 1)}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-[16px] font-medium tracking-[-0.02em]">
                          <NextLink
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-border/70 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {project.title}
                          </NextLink>
                        </h3>
                        <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </header>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        quietLinkClass,
                        "ml-11 inline-flex font-mono text-[10px] uppercase tracking-[0.16em]",
                      )}
                    >
                      {hostName(project.href)}
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block"
                  >
                    <ProjectImageRail
                      images={project.deckImages}
                      title={project.title}
                    />
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-10 border-t border-border pt-5"
          aria-labelledby="gpt-connect"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="gpt-connect" className={labelClass}>
              Connect
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
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
                  className={cn(quietLinkClass, "text-[13px]")}
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
