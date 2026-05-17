import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Image from "next/image";
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

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pad(n: number, w = 2) {
  return n.toString().padStart(w, "0");
}

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
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

const label =
  "text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono";
const mono = "font-mono tabular-nums";

const connectLinks = [
  { label: "GitHub", href: "https://github.com/stylessh" },
  { label: "X", href: "https://x.com/stylesshDev" },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com" },
] as const;

function MetaCell({
  k,
  v,
  align = "left",
}: {
  k: string;
  v: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
      )}
    >
      <span className={label}>{k}</span>
      <span className="text-[12px] text-foreground">{v}</span>
    </div>
  );
}

export default function OpusVariantPage() {
  const { hero, projects } = CANONICAL_PORTFOLIO;
  const modified = getLatestCommitDate();
  const modifiedLabel = modified ? dateFmt.format(modified) : "Unavailable";
  const year = (modified ?? new Date()).getUTCFullYear();

  return (
    <main className="min-h-dvh bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <div className="mx-auto w-full max-w-xl px-6 pt-10 pb-28 sm:px-8 sm:pt-14">
        <header className="grid grid-cols-3 items-end gap-4 border-b border-border pb-3">
          <MetaCell k="Edition" v={`Opus · ${year}`} />
          <MetaCell
            k="Modified"
            align="center"
            v={
              modified ? (
                <time
                  dateTime={modified.toISOString()}
                  className={cn(mono, "text-[12px]")}
                >
                  {modifiedLabel}
                </time>
              ) : (
                modifiedLabel
              )
            }
          />
          <MetaCell k="Theme" v="Auto" align="right" />
        </header>

        <section className="pt-12 pb-14">
          <p className={label}>{hero.role}</p>
          <h1 className="mt-2 text-[22px] font-medium leading-[1.1] tracking-[-0.025em]">
            {hero.name}
          </h1>

          <div className="mt-6 max-w-md space-y-3">
            <p className="text-[13px] leading-[1.65] text-foreground">
              {hero.intro}
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
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
        </section>

        <section aria-labelledby="opus-projects">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3 pb-2">
            <h2 id="opus-projects" className={label}>
              <span className="text-foreground">Index</span> · Projects
            </h2>
            <span className={cn(mono, "text-[11px] text-muted-foreground")}>
              {pad(projects.length)}
            </span>
          </div>

          <ol>
            {projects.map((project, i) => (
              <li
                key={project.title}
                className="border-b border-border last:border-b-0 py-7 first:pt-6"
              >
                <article className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span
                        className={cn(
                          mono,
                          "shrink-0 text-[10px] text-muted-foreground",
                        )}
                      >
                        {pad(i + 1)}
                      </span>
                      <h3 className="truncate text-[15px] font-medium tracking-[-0.01em]">
                        <NextLink
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground transition-colors hover:text-accent"
                        >
                          {project.title}
                        </NextLink>
                      </h3>
                    </div>

                    <NextLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group inline-flex shrink-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
                        label,
                      )}
                    >
                      <span className="hidden sm:inline">
                        {hostnameOf(project.href)}
                      </span>
                      <IconArrow className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </NextLink>
                  </div>

                  <p className="pl-7 max-w-md text-[13px] leading-[1.65] text-muted-foreground">
                    {project.description}
                  </p>

                  <NextLink
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group ml-7 grid grid-cols-3 gap-1.5"
                  >
                    {project.deckImages.map((src, idx) => (
                      <span
                        key={src}
                        className="relative block aspect-[4/3] overflow-hidden rounded-[4px] border border-border bg-muted/40"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 9rem, 28vw"
                          className="object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                          draggable={false}
                        />
                        <span
                          className={cn(
                            mono,
                            "absolute bottom-1 left-1 rounded-sm border border-border/80 bg-background/85 px-1 py-px text-[9px] text-muted-foreground backdrop-blur-sm",
                          )}
                        >
                          {pad(i + 1)}.{pad(idx + 1)}
                        </span>
                      </span>
                    ))}
                  </NextLink>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="pt-10" aria-labelledby="opus-connect">
          <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3 pb-4">
            <h2 id="opus-connect" className={label}>
              <span className="text-foreground">Index</span> · Connect
            </h2>
            <span className={cn(mono, "text-[11px] text-muted-foreground")}>
              {pad(connectLinks.length)}
            </span>
          </div>

          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {connectLinks.map((link, i) => (
              <li key={link.label}>
                <NextLink
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group inline-flex items-baseline gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span
                    className={cn(
                      mono,
                      "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground",
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="underline decoration-border/60 underline-offset-4 transition-all group-hover:decoration-foreground">
                    {link.label}
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-14 flex items-baseline justify-between gap-4 border-t border-border pt-3">
          <span className={label}>© Alan Daniel</span>
          <span className={cn(mono, "text-[10px] text-muted-foreground")}>
            /opus · {modifiedLabel}
          </span>
        </footer>
      </div>

      <ModelVariantToolbar />
    </main>
  );
}
