"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { SVGProps } from "react";
import type { NowPlaying } from "@/lib/spotify";

const POLL_INTERVAL_MS = 30_000;

const SPOTIFY_GREEN_BRIGHT = "#1ED760";
const SPOTIFY_GREEN_MID = "#18A34D";
const SPOTIFY_GREEN_DARK = "#0F7A38";

const WAVE_WIDTH_PX = 72;
const WAVE_MAX_HEIGHT_PX = 16;
const WAVE_BAR_COUNT = 16;
const BAR_WIDTH_PX = 2;
const BAR_GAP_PX = 2;
const WAVE_GROUP_WIDTH_PX =
  WAVE_BAR_COUNT * BAR_WIDTH_PX + (WAVE_BAR_COUNT - 1) * BAR_GAP_PX;
const WAVE_GROUP_OFFSET_PX = (WAVE_WIDTH_PX - WAVE_GROUP_WIDTH_PX) / 2;

const GREEN_SHADES = [
  SPOTIFY_GREEN_BRIGHT,
  SPOTIFY_GREEN_MID,
  SPOTIFY_GREEN_DARK,
] as const;

const FREQUENCY_BANDS = [
  { bars: [0, 1, 2, 3], emphasisPhase: 0 },
  { bars: [4, 5, 6, 7], emphasisPhase: 1.6 },
  { bars: [8, 9, 10, 11], emphasisPhase: 3.1 },
  { bars: [12, 13, 14, 15], emphasisPhase: 4.7 },
] as const;

function getBandEnergy(bandIndex: number, phase: number): number {
  const band = FREQUENCY_BANDS[bandIndex];
  if (!band) {
    return 0.5;
  }

  const slowPulse = Math.sin(phase * 0.34 + band.emphasisPhase) * 0.5 + 0.5;
  const midPulse = Math.sin(phase * 0.72 + band.emphasisPhase * 0.8) * 0.5 + 0.5;
  const accentPulse = Math.sin(phase * 1.35 + band.emphasisPhase * 1.2) * 0.5 + 0.5;

  return 0.34 + slowPulse * 0.34 + midPulse * 0.2 + accentPulse * 0.12;
}

function getFocusBoost(column: number, phase: number): number {
  const focusCenter = ((Math.sin(phase * 0.22 + 0.8) + 1) / 2) * (WAVE_BAR_COUNT - 1);
  const focusWidth = 2.2 + Math.sin(phase * 0.17) * 0.8;
  const distance = column - focusCenter;

  return Math.exp(-(distance * distance) / (2 * focusWidth * focusWidth));
}

function getEdgeDecay(column: number): number {
  const center = (WAVE_BAR_COUNT - 1) / 2;
  const distanceFromCenter = Math.abs(column - center) / center;
  const edgeFalloff = 1 - distanceFromCenter ** 1.35;

  return 0.3 + edgeFalloff * 0.7;
}

function getBarHeight(column: number, phase: number): number {
  const bandIndex = Math.min(
    FREQUENCY_BANDS.length - 1,
    Math.floor(column / (WAVE_BAR_COUNT / FREQUENCY_BANDS.length)),
  );
  const positionInBand = column % (WAVE_BAR_COUNT / FREQUENCY_BANDS.length);

  const bandEnergy = getBandEnergy(bandIndex, phase);
  const focusBoost = getFocusBoost(column, phase);
  const edgeDecay = getEdgeDecay(column);
  const barRipple =
    0.9 + 0.1 * Math.sin(phase * 2.8 + column * 0.95 + positionInBand * 0.4);
  const kick =
    bandIndex === 0 && Math.sin(phase * 1.75 + 0.3) > 0.9 ? 1.12 : 1;

  const amplitude =
    (0.42 + bandEnergy * 0.46 + focusBoost * 0.28) *
    edgeDecay *
    barRipple *
    kick;

  return Math.max(3, Math.round(amplitude * WAVE_MAX_HEIGHT_PX));
}

function getBarColor(column: number): string {
  return GREEN_SHADES[column % GREEN_SHADES.length] ?? SPOTIFY_GREEN_MID;
}

function IconSpotify(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="presentation"
      viewBox="0 0 256 256"
      preserveAspectRatio="xMidYMid"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden
      {...props}
    >
      <path
        d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
        fill={SPOTIFY_GREEN_BRIGHT}
      />
    </svg>
  );
}

function SpotifyWaveBars() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let frame = 0;
    let raf = 0;

    const tick = () => {
      frame += 1;
      setPhase(frame * 0.018);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, column) => {
    const height = getBarHeight(column, reduceMotion ? 0 : phase);

    return {
      key: column,
      x: WAVE_GROUP_OFFSET_PX + column * (BAR_WIDTH_PX + BAR_GAP_PX),
      y: WAVE_MAX_HEIGHT_PX - height,
      height,
      fill: getBarColor(column),
    };
  });

  return (
    <svg
      aria-hidden
      width={WAVE_WIDTH_PX}
      height={WAVE_MAX_HEIGHT_PX}
      viewBox={`0 0 ${WAVE_WIDTH_PX} ${WAVE_MAX_HEIGHT_PX}`}
      className="pointer-events-none z-40 opacity-70"
    >
      {bars.map((bar) => (
        <rect
          key={bar.key}
          x={bar.x}
          y={bar.y}
          width={BAR_WIDTH_PX}
          height={bar.height}
          fill={bar.fill}
        />
      ))}
    </svg>
  );
}

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
    <div className="spotify-playing-appear pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center">
      <div className="mb-6 flex justify-center px-4">
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group flex max-w-[min(100%,28rem)] flex-col items-center gap-1 text-center transition-colors"
          aria-label={`Currently listening to ${track.title} by ${track.artist} on Spotify`}
        >
          <span className="text-normal lowercase text-muted-foreground">
            currently listening
          </span>
          <span className="inline-flex max-w-full items-center gap-2 text-normal text-muted-foreground group-hover:text-foreground">
            <IconSpotify />
            <span className="truncate">
              <span className="text-foreground/80 group-hover:text-foreground">
                {track.title}
              </span>
              <span className="mx-1.5 text-border">·</span>
              <span>{track.artist}</span>
            </span>
          </span>
        </a>
      </div>

      <SpotifyWaveBars />
    </div>
  );
}
