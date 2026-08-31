import NextLink from "next/link";
import type { SVGProps } from "react";

function IconTrylle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 959 957"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M382.494 0C525.062 0 649.411 78.0002 715.196 193.653C714.684 193.7 714.174 193.745 713.665 193.793C439.475 219.712 222.382 436.804 196.464 710.994C196.292 712.807 196.133 714.644 195.984 716.511C79.0499 651.076 0.000167799 526.017 0 382.494C0 171.249 171.249 0.000115514 382.494 0Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M836.504 191.247C848.682 191.247 854.772 191.246 859.902 191.731C912.129 196.668 953.48 238.019 958.417 290.246C958.902 295.377 958.902 301.466 958.902 313.645V781.38C958.902 842.585 958.901 873.187 946.99 896.564C936.513 917.127 919.794 933.846 899.231 944.323C875.854 956.234 845.252 956.234 784.048 956.234H316.312C304.134 956.234 298.045 956.234 292.914 955.749C240.687 950.812 199.336 909.462 194.399 857.235C193.914 852.105 193.914 846.015 193.914 833.837C193.914 774.205 193.915 742.381 195.98 716.512C251.157 747.387 314.769 764.987 382.491 764.987C593.736 764.987 764.984 593.739 764.984 382.494C764.984 313.816 746.883 249.366 715.192 193.653C741.817 191.249 773.774 191.247 836.504 191.247Z"
      />
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
      className="w-4 h-4"
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
    label: "Trylle",
    href: "https://trylle.com/stylessh",
    Icon: IconTrylle,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/stylesshDev",
    Icon: IconX,
  },
  { label: "Mail", href: "mailto:adaaanniek@gmail.com", Icon: IconMail },
] as const;

export function Links() {
  return (
    <nav aria-label="Connect" className="flex items-center gap-5">
      {connectLinks.map(({ label, href, Icon }) => (
        <NextLink
          key={label}
          href={href}
          aria-label={label}
          title={label}
          className="text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon />
        </NextLink>
      ))}
    </nav>
  );
}
