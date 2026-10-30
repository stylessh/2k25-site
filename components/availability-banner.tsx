"use client";

import { track } from "@vercel/analytics";
import NextLink from "next/link";
import { SketchSparkle } from "@/components/sketch-sparkle";

const PROJECT_URL = "https://alanisavailable.com";

function referrerHost() {
  try {
    return document.referrer ? new URL(document.referrer).host : "direct";
  } catch {
    return "direct";
  }
}

export function AvailabilityBanner() {
  return (
    <NextLink
      href={PROJECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("Availability Banner Click", {
          location: "hero",
          destination: "alanisavailable",
          path: window.location.pathname,
          referrer: referrerHost(),
          locale: navigator.language,
        });
      }}
      className="relative flex items-center gap-3 rounded-3xl bg-raised py-3 pr-5 pl-3.5 outline-none transition-colors after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-(--raised-ring) hover:bg-raised-hover focus-visible:ring-2 focus-visible:ring-accent"
    >
      <SketchSparkle className="size-9 shrink-0" />

      <span className="min-w-0">
        <span className="block text-highlight">
          Alan is available for new roles
        </span>
        <span className="mt-0.5 block text-pretty text-[13px] leading-snug text-muted-foreground">
          Rebuilding and improving favorite products and apps in public.
        </span>
      </span>
    </NextLink>
  );
}
