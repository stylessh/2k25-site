import type { Metadata } from "next";
import { PortfolioLayout } from "@/components/portfolio-layout";

const canonical = "https://stylessh.dev";

export const metadata: Metadata = {
  title: "Alan Daniel — GPT variant",
  description: "Alternate portfolio build (GPT). Canonical site: stylessh.dev.",
  robots: { index: false, follow: true },
  alternates: { canonical },
};

export default function GptVariantPage() {
  return <PortfolioLayout />;
}
