export type PortfolioHero = {
  name: string;
  role: string;
  intro: string;
};

export type PortfolioMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type PortfolioProject = {
  title: string;
  href: string;
  media: readonly PortfolioMedia[];
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
  },
  projects: [
    {
      title: "Trylle",
      href: "https://trylle.com",
      media: [
        { type: "video", src: "/projects/trylle/1.mp4" },
        { type: "video", src: "/projects/trylle/2.mp4" },
        { type: "video", src: "/projects/trylle/3.mp4" },
        { type: "image", src: "/projects/trylle/4.png" },
        { type: "image", src: "/projects/trylle/5.png" },
      ],
    },
    {
      title: "Supabase",
      href: "https://supabase.com",
      media: [
        { type: "video", src: "/projects/supabase/sp.mp4" },
        { type: "image", src: "/projects/supabase/2.png" },
        { type: "image", src: "/projects/supabase/3.png" },
        { type: "image", src: "/projects/supabase/4.png" },
      ],
    },
    {
      title: "Tembo",
      href: "https://tembo.io",
      media: [
        { type: "video", src: "/projects/tembo/1.mp4" },
        { type: "video", src: "/projects/tembo/2.mp4" },
      ],
    },
    {
      title: "Peel",
      href: "https://peel.studio",
      media: [
        { type: "image", src: "/projects/peel/1.png" },
        { type: "image", src: "/projects/peel/2.png" },
        { type: "image", src: "/projects/peel/3.png" },
      ],
    },
  ],
};
