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
const microLabel =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground";
const quietLink =
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

function ImageRegister({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-hidden>
      {images.slice(0, 3).map((image, index) => (
        <span
          key={image}
          className="relative block aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted/40"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 92px, 28vw"
            className="object-cover opacity-90 transition duration-300 group-hover:scale-[1.025] group-hover:opacity-100"
            draggable={false}
          />
          <span className="absolute right-1 bottom-1 rounded-[3px] bg-background/80 px-1 font-mono text-[9px] text-muted-foreground backdrop-blur-sm">
            {pad(index + 1)}
          </span>
        </span>
      ))}
      <span className="sr-only">Preview images for {title}</span>
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
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto grid w-full max-w-4xl gap-12 px-6 py-12 pb-28 sm:px-8 sm:py-16 md:grid-cols-[10rem_1fr] md:gap-16">
        <aside className="space-y-8 md:sticky md:top-16 md:self-start">
          <NextLink href="/" className={`${quietLink} text-[12px]`}>
            Original page
          </NextLink>

          <dl className="grid gap-4 border-border border-t pt-5 text-[12px] leading-relaxed">
            <div className="space-y-1">
              <dt className={microLabel}>Latest Modified</dt>
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
            <div className="space-y-1">
              <dt className={microLabel}>Entries</dt>
              <dd className="tabular-nums">{pad(projects.length)}</dd>
            </div>
            <div className="space-y-1">
              <dt className={microLabel}>Theme</dt>
              <dd>System</dd>
            </div>
          </dl>
        </aside>

        <div>
          <header className="space-y-7">
            <div className="flex items-center justify-between gap-4">
              <p className={microLabel}>GPT portfolio index</p>
              <p className="font-mono text-[10px] text-muted-foreground">
                /gpt
              </p>
            </div>

            <div className="border-border border-t pt-7">
              <p className={microLabel}>{hero.role}</p>
              <h1 className="mt-2 font-medium text-[26px] leading-none tracking-[-0.035em] sm:text-[34px]">
                {hero.name}
              </h1>

              <p className="mt-6 max-w-[32rem] text-[14px] leading-relaxed text-foreground">
                {hero.intro}
              </p>

              <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-relaxed text-muted-foreground">
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

          <section className="mt-14" aria-labelledby="gpt-projects">
            <div className="flex items-baseline justify-between gap-4 border-border border-t pt-4 pb-2">
              <h2 id="gpt-projects" className={microLabel}>
                Portfolio entries
              </h2>
              <span className={`${microLabel} tabular-nums`}>
                {pad(projects.length)} records
              </span>
            </div>

            <ol className="divide-y divide-border">
              {projects.map((project, projectIndex) => (
                <li key={project.title}>
                  <article className="grid gap-5 py-8 sm:grid-cols-[1fr_18rem] sm:items-start">
                    <div className="min-w-0 space-y-3">
                      <div className="grid gap-2 sm:grid-cols-[2.5rem_1fr]">
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                          {pad(projectIndex + 1)}
                        </span>
                        <div className="space-y-2">
                          <h3 className="font-medium text-[17px] leading-tight tracking-[-0.02em]">
                            <NextLink
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-accent"
                            >
                              {project.title}
                            </NextLink>
                          </h3>
                          <p className="max-w-[29rem] text-[13px] leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${quietLink} ml-0 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] sm:ml-10`}
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
                      <ImageRegister
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
            className="mt-12 border-border border-t pt-4"
            aria-labelledby="gpt-connect"
          >
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="gpt-connect" className={microLabel}>
                Connect
              </h2>
              <span className={`${microLabel} tabular-nums`}>
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
                    className={`${quietLink} text-[13px]`}
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
