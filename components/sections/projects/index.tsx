import NextLink from "next/link";

const works = [
  {
    title: "DiffKit",
    href: "https://diff-kit.com",
    description:
      "A fast, design-first GitHub dashboard for developers who want to stay on top of their pull requests, issues, and code reviews — without the noise.",
  },
  {
    title: "Peel",
    href: "https://peel.studio",
    description: "Extract design tokens from any website, image or video.",
  },
  {
    title: "Interactions",
    href: "https://interactions-matter.vercel.app/",
    description:
      "Delightful User Interfaces and interactions, and how to create them.",
  },
] as const;

const titleLinkClass =
  "text-foreground underline underline-offset-4 decoration-border/60 hover:decoration-foreground transition-all";

export function Projects() {
  return (
    <section className="py-12 first:pt-0">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-10">
        Projects
      </h2>

      <div className="space-y-16">
        {works.map((work) => (
          <div key={work.title} className="group space-y-2">
            <h3 className="text-sm font-medium">
              <NextLink
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className={titleLinkClass}
              >
                {work.title}
              </NextLink>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
