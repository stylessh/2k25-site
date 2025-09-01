import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alan Daniel - Design Engineer",
  description:
    "Designing and Engineering fresh, functional, accesible and great-looking user interfaces and experiences.",

  openGraph: {
    images: ["/og.png"],
    title: "Alan Daniel - Design Engineer",
    description:
      "Designing and Engineering fresh, functional, accesible and great-looking user interfaces and experiences.",
    url: "https://stylessh.dev",
    siteName: "Alan Daniel",
    type: "website",
  },

  twitter: {
    images: ["/og.png"],
    title: "Alan Daniel - Design Engineer",
    description:
      "Designing and Engineering fresh, functional, accesible and great-looking user interfaces and experiences.",
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
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-surface-page`}>
        {children}
      </body>
      
      <Analytics />
    </html>
  );
}
