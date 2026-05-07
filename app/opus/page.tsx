import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/portfolio-layout";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — Opus variant",
  description:
    "Alternate portfolio build (Opus). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

export default function OpusVariantPage() {
  return <PortfolioLayout />;
}
