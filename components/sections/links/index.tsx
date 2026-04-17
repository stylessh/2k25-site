import NextLink from "next/link";
import type { SVGProps } from "react";

function IconGitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
      aria-hidden
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      viewBox="0 0 1200 1227"
      fill="currentColor"
      className="h-3.5 w-auto shrink-0"
      aria-hidden
      {...props}
    >
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
    </svg>
  );
}

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
      aria-hidden
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const connectLinks = [
  {
    label: "GitHub",
    href: "https://github.com/stylessh",
    Icon: IconGitHub,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/stylesshDev",
    Icon: IconX,
  },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com", Icon: IconMail },
] as const;

const rowClass =
  "inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group w-fit";

const labelClass =
  "underline underline-offset-4 decoration-border/60 hover:decoration-foreground transition-all";

export function Links() {
  return (
    <section className="py-12 first:pt-0">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-10">
        Connect
      </h2>

      <div className="flex flex-col gap-3">
        {connectLinks.map(({ label, href, Icon }) => (
          <NextLink
            key={label}
            href={href}
            className={rowClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">
              <Icon />
            </span>
            <span className={labelClass}>{label}</span>
          </NextLink>
        ))}
      </div>
    </section>
  );
}
