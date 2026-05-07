import { execSync } from "node:child_process";
import type { Metadata } from "next";
import Link from "next/link";
import { ModelVariantToolbar } from "@/components/model-variant-toolbar";
import { CANONICAL_PORTFOLIO } from "@/lib/portfolio-content";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — GPT variant",
  description: "Alternate portfolio build (GPT). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

function getLatestModified() {
  try {
    const commitDate = execSync("git log -1 --format=%cI", {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
      timeZoneName: "short",
    }).format(new Date(commitDate));
  } catch {
    return "Commit date unavailable";
  }
}

const content = CANONICAL_PORTFOLIO;
const latestModified = getLatestModified();

export default function GptVariantPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <section className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,177,98,0.28),transparent_32rem)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,177,98,0.18),transparent_32rem)]"
          aria-hidden
        />

        <header className="flex flex-wrap items-center justify-between gap-4 border-border border-b pb-5">
          <Link
            href="/"
            className="text-[12px] text-muted-foreground uppercase tracking-[0.18em] transition-colors hover:text-foreground"
          >
            Reference /
          </Link>
          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
            <div className="flex items-center gap-2">
              <dt className="text-muted-foreground">Latest Modified</dt>
              <dd className="font-medium text-foreground">{latestModified}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-muted-foreground">Mode</dt>
              <dd className="font-medium text-foreground">System theme</dd>
            </div>
          </dl>
        </header>

        <div className="grid flex-1 gap-12 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center lg:py-20">
          <div className="max-w-xl space-y-8">
            <div className="space-y-4">
              <p className="text-[12px] text-muted-foreground uppercase tracking-[0.18em]">
                Portfolio signal map
              </p>
              <h1 className="text-balance font-medium text-5xl tracking-[-0.08em] sm:text-7xl">
                {content.hero.name}
              </h1>
              <p className="max-w-md text-muted-foreground text-xl leading-relaxed tracking-[-0.03em]">
                {content.hero.role} crafting sharp product surfaces at{" "}
                <span className="text-foreground">{content.hero.orgName}</span>.
              </p>
            </div>

            <p className="max-w-lg text-foreground/90 text-normal">
              {content.hero.intro}
            </p>

            <div className="grid max-w-lg grid-cols-3 overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] dark:bg-white/[0.03]">
              <div className="border-border border-r p-4">
                <p className="text-muted-foreground text-xs">Projects</p>
                <p className="mt-2 font-medium text-2xl">
                  {content.projects.length}
                </p>
              </div>
              <div className="border-border border-r p-4">
                <p className="text-muted-foreground text-xs">Focus</p>
                <p className="mt-2 font-medium text-sm">UI / UX</p>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground text-xs">Current</p>
                <p className="mt-2 font-medium text-sm">
                  {content.hero.orgName}
                </p>
              </div>
            </div>
          </div>

          <section aria-labelledby="gpt-projects" className="space-y-4">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[12px] text-muted-foreground uppercase tracking-[0.18em]">
                  Selected work
                </p>
                <h2 id="gpt-projects" className="mt-2 text-highlight">
                  Three concise case studies
                </h2>
              </div>
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </div>

            <div className="grid gap-4">
              {content.projects.map((project, index) => (
                <Link
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-[2rem] border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.65)] dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-3">
                      <p className="font-mono text-muted-foreground text-xs">
                        0{index + 1}
                      </p>
                      <div>
                        <h3 className="font-medium text-2xl tracking-[-0.04em]">
                          {project.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-muted-foreground text-normal">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                      Visit
                    </span>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-2">
                    {project.deckImages.map((image, imageIndex) => (
                      <div
                        key={image}
                        className="min-h-20 rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(255,177,98,0.2),transparent_45%),radial-gradient(circle_at_top_right,rgba(23,23,23,0.09),transparent_45%)] p-3 dark:bg-[linear-gradient(135deg,rgba(255,177,98,0.16),transparent_45%),radial-gradient(circle_at_top_right,rgba(250,250,250,0.08),transparent_45%)]"
                      >
                        <span className="font-mono text-muted-foreground text-[10px]">
                          Frame {imageIndex + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
      <ModelVariantToolbar />
    </main>
  );
}
