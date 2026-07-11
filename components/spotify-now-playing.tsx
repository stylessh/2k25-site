"use client";

import { useEffect, useState } from "react";
import type { NowPlaying } from "@/lib/spotify";

const POLL_INTERVAL_MS = 30_000;

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchNowPlaying() {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });

        if (!active) {
          return;
        }

        if (response.status === 204) {
          setTrack(null);
          return;
        }

        if (!response.ok) {
          setTrack(null);
          return;
        }

        setTrack((await response.json()) as NowPlaying);
      } catch {
        if (active) {
          setTrack(null);
        }
      }
    }

    fetchNowPlaying();
    const interval = window.setInterval(fetchNowPlaying, POLL_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  if (!track) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group inline-flex max-w-[min(100%,28rem)] items-center gap-2 rounded-full border border-border/70 bg-background/85 px-4 py-2 text-[12px] text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-accent/60 hover:text-foreground"
        aria-label={`Now playing ${track.title} by ${track.artist} on Spotify`}
      >
        <span
          aria-hidden
          className="relative flex h-2 w-2 shrink-0 items-center justify-center"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="truncate">
          <span className="text-foreground/80 group-hover:text-foreground">
            {track.title}
          </span>
          <span className="mx-1.5 text-border">·</span>
          <span>{track.artist}</span>
        </span>
      </a>
    </div>
  );
}
