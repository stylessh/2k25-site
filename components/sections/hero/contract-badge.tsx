"use client";

import { track } from "@vercel/analytics";
import NextLink from "next/link";

const BOOKING_URL = "https://cal.com/alan-daniel/30min";

function referrerHost() {
  try {
    return document.referrer ? new URL(document.referrer).host : "direct";
  } catch {
    return "direct";
  }
}

export function ContractBadge() {
  return (
    <NextLink
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("Contract Work Click", {
          location: "hero",
          destination: "cal",
          path: window.location.pathname,
          referrer: referrerHost(),
          locale: navigator.language,
        });
      }}
      className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1 text-[12px] text-muted-foreground outline-none transition-colors hover:text-foreground"
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </span>
      Open for contract work
    </NextLink>
  );
}
