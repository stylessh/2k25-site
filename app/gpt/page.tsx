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
  description:
    "A minimal alternate portfolio index for Alan Daniel, generated from the shared site data.",
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <dt className={labelClass}>{label}</dt>
      <dd className="text-[12px] leading-relaxed text-foreground">
        {children}
      </dd>
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
      <div className="mx-auto w-full max-w-2xl px-6 py-14 pb-28 sm:px-8 sm:py-20">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <NextLink
            href="/"
            className={`${linkClass} text-[12px] text-muted-foreground`}
          >
            Original portfolio
          </NextLink>
          <span className={labelClass}>/gpt</span>
        </nav>

        <header className="grid gap-8 border-border border-t pt-7 sm:grid-cols-[1fr_11rem]">
          <div className="space-y-7">
            <div className="space-y-2">
              <p className={labelClass}>Portfolio index</p>
              <h1 className="font-medium text-[22px] leading-none tracking-[-0.03em]">
                {hero.name}
              </h1>
            </div>

            <div className="max-w-md space-y-3">
              <p className="text-[14px] leading-relaxed text-foreground">
                {hero.intro}
              </p>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                <span>{hero.employmentPrefix}</span>
                {hero.showSupabaseMark ? (
                  <span className="inline-flex size-[1lh] items-center rounded-md border border-border bg-background p-0.5">
                    <span className="inline-flex size-full items-center justify-center">
                      <SupabaseMark className="size-full" />
                    </span>
                  </span>
                ) : null}
                <strong className="font-medium text-foreground">
                  {hero.orgName}
                </strong>
              </div>
            </div>
          </div>

          <dl className="grid content-start gap-4 border-border border-t pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
            <Field label="Role">{hero.role}</Field>
            <Field label="Latest Modified">
              <span className="tabular-nums">
                {latestModified ? (
                  <time dateTime={latestModified.toISOString()}>
                    {latestModifiedText}
                  </time>
                ) : (
                  latestModifiedText
                )}
              </span>
            </Field>
            <Field label="Entries">
              <span className="tabular-nums">{pad(projects.length)}</span>
            </Field>
          </dl>
        </header>

        <section className="mt-14" aria-labelledby="gpt-projects">
          <div className="mb-4 flex items-baseline justify-between gap-4 border-border border-t pt-5">
            <h2 id="gpt-projects" className={labelClass}>
              Selected work
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              Shared data
            </span>
          </div>

          <ol className="divide-y divide-border border-border border-y">
            {projects.map((project, projectIndex) => (
              <li key={project.title}>
                <article className="grid gap-5 py-7 sm:grid-cols-[1fr_12rem] sm:items-start">
                  <div className="space-y-3.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {pad(projectIndex + 1)}
                      </span>
                      <h3 className="font-medium text-[15px] tracking-[-0.015em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
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
                      className="ml-7 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {hostName(project.href)}
                    </NextLink>
                  </div>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group grid grid-cols-3 gap-1.5 sm:pt-1"
                  >
                    {project.deckImages.map((image, imageIndex) => (
                      <span
                        key={image}
                        className="relative block aspect-[4/5] overflow-hidden rounded-md border border-border bg-background"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 4rem, 30vw"
                          className="object-cover opacity-85 grayscale transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                          draggable={false}
                        />
                        <span className="absolute right-1 bottom-1 rounded-sm border border-border bg-background/90 px-1 font-mono text-[9px] text-muted-foreground leading-4 backdrop-blur-sm">
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

        <footer className="mt-12 flex items-baseline justify-between gap-4 border-border border-t pt-4">
          <span className={labelClass}>stylessh.dev</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Theme: system
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
