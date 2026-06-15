export type PortfolioHero = {
  name: string;
  role: string;
  intro: string;
  employmentPrefix: string;
  orgName: string;
  showOrgMark: boolean;
};

export type PortfolioProject = {
  title: string;
  href: string;
  description: string;
  deckImages: readonly string[];
};

export type PortfolioContent = {
  hero: PortfolioHero;
  projects: readonly PortfolioProject[];
};

/** Canonical copy and project list — single source of truth for this deployment. */
export const CANONICAL_PORTFOLIO: PortfolioContent = {
  hero: {
    name: "Alan Daniel",
    role: "Design Engineer",
    intro:
      "Designing and Engineering fresh, functional, accessible and great-looking user interfaces and experiences.",
    employmentPrefix: "Currently working at",
    orgName: "Tembo",
    showOrgMark: true,
  },
  projects: [
    {
      title: "DiffKit",
      href: "https://diff-kit.com",
      description:
        "A fast, design-first GitHub dashboard for developers who want to stay on top of their pull requests, issues, and code reviews — without the noise.",
      deckImages: [
        "/projects/diffkit/1.png",
        "/projects/diffkit/2.png",
        "/projects/diffkit/3.png",
      ],
    },
    {
      title: "Peel",
      href: "https://peel.studio",
      description: "Extract design tokens from any website, image or video.",
      deckImages: [
        "/projects/peel/1.png",
        "/projects/peel/2.png",
        "/projects/peel/3.png",
      ],
    },
    {
      title: "Interactions",
      href: "https://interactions-matter.vercel.app/",
      description:
        "Delightful User Interfaces and interactions, and how to create them.",
      deckImages: [
        "/projects/interactions/1.png",
        "/projects/interactions/2.png",
        "/projects/interactions/3.png",
      ],
    },
  ],
};
