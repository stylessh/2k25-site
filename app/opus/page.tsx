import { execSync } from "node:child_process";
import type { Metadata } from "next";
import NextLink from "next/link";
import type { SVGProps } from "react";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { SupabaseMark } from "@/components/supabase-mark";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — Opus variant",
  description:
    "Alternate portfolio build (Opus). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

/** Resolved at build time; falls back to "now" if git history is unavailable. */
function getLatestCommitDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  } catch {
    /* fall through */
  }
  return new Date();
}

const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const versionStamp = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}

function IconArrowOut(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const monoLabel =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

const ruleClass = "h-px w-full bg-border";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLong = longDate.format(modified);
  const versionParts = versionStamp.format(modified).split("/"); // mm/dd/yyyy
  const version =
    versionParts.length === 3
      ? `${versionParts[2]}.${versionParts[0]}.${versionParts[1]}`
      : modified.toISOString().slice(0, 10);

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground pb-28">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 py-12 sm:py-16">
        {/* Manifest strip */}
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <span className={monoLabel}>Manifest · Opus</span>
          <span className={cn(monoLabel, "text-right")}>v{version}</span>
        </div>

        {/* Hero */}
        <header className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-x-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="sm:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] leading-[1.05]">
              {hero.name}
            </h1>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              {hero.role}
            </p>
            <p className="text-[15px] leading-relaxed text-foreground max-w-md">
              {hero.intro}
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-normal text-muted-foreground">
              <span>{hero.employmentPrefix}</span>
              {hero.showSupabaseMark ? (
                <span className="inline-flex items-center rounded-md border border-border bg-muted/40 size-[1lh] p-0.5">
                  <span className="inline-flex shrink-0 w-full h-full items-center justify-center">
                    <SupabaseMark className="h-full w-full" />
                  </span>
                </span>
              ) : null}
              <strong className="text-highlight">{hero.orgName}</strong>
            </p>
          </div>

          {/* Spec sheet */}
          <aside className="sm:col-span-5">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 sm:border-l sm:border-border sm:pl-8">
              <dt className={monoLabel}>Author</dt>
              <dd className="text-normal text-foreground">{hero.name}</dd>
              <dt className={monoLabel}>Role</dt>
              <dd className="text-normal text-foreground">{hero.role}</dd>
              <dt className={monoLabel}>Status</dt>
              <dd className="text-normal text-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Active · {hero.orgName}
                </span>
              </dd>
              <dt className={monoLabel}>Entries</dt>
              <dd className="text-normal text-foreground">
                {pad(projects.length)}
              </dd>
              <dt className={monoLabel}>Latest Modified</dt>
              <dd className="text-normal text-foreground">
                <time dateTime={modified.toISOString()}>{modifiedLong}</time>
              </dd>
            </dl>
          </aside>
        </header>

        {/* Index header */}
        <div className="flex items-baseline justify-between gap-4 pb-5">
          <span className={monoLabel}>Index · Selected Work</span>
          <span className={monoLabel}>{pad(projects.length)} entries</span>
        </div>
        <div className={ruleClass} />

        {/* Project entries */}
        <ol className="divide-y divide-border">
          {projects.map((project, i) => (
            <li key={project.title} className="py-8 sm:py-10">
              <article className="grid grid-cols-1 sm:grid-cols-12 gap-y-5 sm:gap-x-8">
                <div className="sm:col-span-7 space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.015em]">
                      <NextLink
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-2 hover:text-accent transition-colors"
                      >
                        <span className="underline underline-offset-[6px] decoration-border/60 group-hover:decoration-accent transition-all">
                          {project.title}
                        </span>
                        <IconArrowOut className="size-4 translate-y-0.5 text-muted-foreground group-hover:text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </NextLink>
                    </h2>
                  </div>
                  <p className="text-normal text-muted-foreground max-w-md">
                    {project.description}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {hostnameOf(project.href)}
                  </p>
                </div>

                <div className="sm:col-span-5">
                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {project.deckImages.map((src, idx) => (
                        <div
                          key={src}
                          className={cn(
                            "relative overflow-hidden rounded-md border border-border/70 bg-muted/40 aspect-[4/3]",
                            "transition-transform duration-300 ease-out",
                            idx === 0 && "group-hover:-translate-y-0.5",
                            idx === 1 && "group-hover:-translate-y-1",
                            idx === 2 && "group-hover:-translate-y-0.5",
                          )}
                        >
                          <img
                            src={src}
                            alt=""
                            className="absolute inset-0 size-full object-cover transition-[filter,transform] duration-300 ease-out group-hover:scale-[1.02]"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  </NextLink>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Connect */}
        <div className="pt-12">
          <div className="flex items-baseline justify-between gap-4 pb-5">
            <span className={monoLabel}>Connect</span>
            <span className={monoLabel}>
              {pad(connectLinks.length)} channels
            </span>
          </div>
          <div className={ruleClass} />
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 pt-6">
            {connectLinks.map((link, i) => (
              <li key={link.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="px-2 text-border select-none text-[10px]"
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
                  className="group inline-flex items-center gap-1.5 text-normal text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-border/60 group-hover:decoration-foreground transition-all">
                    {link.label}
                  </span>
                  <IconArrowOut className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer signature */}
        <div className="mt-16 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={monoLabel}>End of manifest</span>
          <span className={monoLabel}>
            <time dateTime={modified.toISOString()}>{modifiedLong}</time>
          </span>
        </div>
      </div>

      <ModelVariantToolbar />
    </div>
  );
}
