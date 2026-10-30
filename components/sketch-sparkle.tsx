"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

const DRAW_EASE = [0.65, 0, 0.35, 1] as const;

const SPARKLE =
  "M20.2 6.5C21 14.2 22.6 17.6 32.8 19.4C23.4 21.1 21.2 23.8 20 33.6C18.9 24.4 16.6 21.6 7.4 20.3C16.4 18.8 19.1 15.6 20.7 8.6";

const ACCENT_LINES = [
  "M29.6 8.4C30.5 7.2 31.5 6.1 32.6 5",
  "M33.2 12.4C34.6 12.1 35.9 11.9 37.2 11.9",
  "M8.6 31.6C7.8 32.5 7 33.3 6.1 34.2",
];

function accentLoop(index: number) {
  return {
    duration: 1.8,
    ease: "easeOut",
    delay: 1.2 + index * 0.12,
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay: 2.2,
  } as const;
}

// A hand-drawn sparkle over a loose watercolor wash.
export function SketchSparkle({ className }: { className?: string }) {
  const id = useId();
  const pencil = `${id}-pencil`;
  const paint = `${id}-paint`;
  const reduceMotion = useReducedMotion();

  return (
    <svg
      role="presentation"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <filter id={pencil} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="2"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="0.9" />
        </filter>

        <filter id={paint} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="3"
            seed="8"
          />
          <feDisplacementMap in="SourceGraphic" scale="4" />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      <motion.path
        d="M13 12.5C17.5 8.6 25.8 9.4 29.4 14.2C32.8 18.8 30.6 26.8 24.6 29.4C18.6 32 11.4 29.6 9.6 23.8C8.4 19.8 9.8 15.3 13 12.5Z"
        className="fill-accent"
        filter={`url(#${paint})`}
        style={{ transformOrigin: "20px 21px", transformBox: "view-box" }}
        initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      <g
        filter={`url(#${pencil})`}
        className="stroke-foreground"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d={SPARKLE}
          style={{ transformOrigin: "20px 20px", transformBox: "view-box" }}
          initial={
            reduceMotion ? false : { pathLength: 0, opacity: 0, rotate: 0 }
          }
          animate={{
            pathLength: 1,
            opacity: 1,
            rotate: reduceMotion ? 0 : [0, -5, 4, 0],
          }}
          transition={{
            pathLength: { duration: 1, ease: DRAW_EASE, delay: 0.35 },
            // Round caps render a dot at zero length, so stay hidden until the stroke starts.
            opacity: { duration: 0.12, delay: 0.38 },
            rotate: {
              duration: 5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: 1.4,
            },
          }}
        />

        {ACCENT_LINES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={
              reduceMotion
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: [0, 1, 1], opacity: [0, 1, 1, 0] }
            }
            transition={{
              pathLength: { ...accentLoop(i), times: [0, 0.25, 1] },
              opacity: { ...accentLoop(i), times: [0, 0.04, 0.25, 1] },
            }}
          />
        ))}
      </g>
    </svg>
  );
}
