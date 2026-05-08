import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProjectDeckDialProvider } from "@/components/project-deck-dial";
import { ProjectDeckHoverProvider } from "@/components/project-deck-hover-context";
import { ThemeScript } from "@/components/theme-script";
import "dialkit/styles.css";
import "./globals.css";

/** Intentional type error to fail CI/build — delete this line when workflow testing is done. */
const _intentionalBuildFailure: string = 1;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Designing and Engineering fresh, functional, accessible and great-looking user interfaces and experiences.";

export const metadata: Metadata = {
  metadataBase: new URL("https://stylessh.dev"),
  title: "Alan Daniel — Design Engineer",
  description,

  openGraph: {
    images: ["/og.png"],
    title: "Alan Daniel — Design Engineer",
    description,
    url: "https://stylessh.dev",
    siteName: "Alan Daniel",
    type: "website",
  },

  twitter: {
    images: ["/og.png"],
    title: "Alan Daniel — Design Engineer",
    description,
    card: "summary_large_image",
    creator: "@stylesshDev",
  },

  alternates: {
    canonical: "https://stylessh.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-dvh overflow-x-hidden font-sans antialiased bg-background text-foreground`}
      >
        <ThemeScript />
        <ProjectDeckDialProvider>
          <ProjectDeckHoverProvider>{children}</ProjectDeckHoverProvider>
        </ProjectDeckDialProvider>

        <Analytics />
      </body>
    </html>
  );
}
