"use client";

import { motion, type Transition } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { ProjectDeckCard } from "./deck-config";

const defaultSpring: Transition = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.6,
};

const opacityEaseIn = { duration: 0.2, ease: "easeIn" as const };
const opacityEaseOut = { duration: 0.32, ease: "easeOut" as const };

/** Matches `width` on cards (first arg to min()) for bbox math. */
const CARD_W_REM = 20;

/** ms after fade-out before re-arming enter pose (y/scale) while still invisible */
const REARM_MS = 260;

function buildVariants(spring: Transition, rearm: boolean) {
  /** Exit: fade only at current transform. Re-arm uses instant jump while opacity stays 0. */
  const restPose = rearm
    ? { opacity: 0, y: 18, scale: 0.92 }
    : { opacity: 0, y: 0, scale: 1 };

  const restTransition = rearm
    ? { opacity: { duration: 0 }, y: { duration: 0 }, scale: { duration: 0 } }
    : { opacity: opacityEaseIn, y: { duration: 0 }, scale: { duration: 0 } };

  const deckVariants = {
    rest: {
      ...restPose,
      transition: restTransition,
    },
    hover: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: opacityEaseOut,
        y: spring,
        scale: spring,
        staggerChildren: 0.055,
        delayChildren: 0.02,
      },
    },
  };

  const cardVariants = {
    rest: {
      opacity: 0,
      transition: { opacity: opacityEaseIn },
    },
    hover: {
      opacity: 1,
      transition: { opacity: opacityEaseOut },
    },
  };

  return { deckVariants, cardVariants };
}

export type DeckStackProps = {
  cards: readonly ProjectDeckCard[];
  className?: string;
  /** Spring for y/scale on hover enter; opacity stays tweened. */
  springTransition?: Transition;
  /** When false, deck runs exit fade (opacity only) then re-arms enter pose. */
  hovered: boolean;
};

export function DeckStack({
  cards,
  className,
  springTransition,
  hovered,
}: DeckStackProps) {
  const spring = springTransition ?? defaultSpring;
  const [rearm, setRearm] = useState(true);

  useEffect(() => {
    if (hovered) {
      return;
    }
    setRearm(false);
    const t = window.setTimeout(() => setRearm(true), REARM_MS);
    return () => window.clearTimeout(t);
  }, [hovered]);

  const { deckVariants, cardVariants } = useMemo(
    () => buildVariants(spring, rearm),
    [spring, rearm],
  );

  const { minLeftRem, fanWidthRem, outerWidth } = useMemo(() => {
    const lefts = cards.map((c) => c.leftRem);
    const minL = Math.min(...lefts);
    const maxL = Math.max(...lefts);
    const fanW = maxL - minL + CARD_W_REM;
    const outer = Math.max(40, fanW + 2);
    return {
      minLeftRem: minL,
      fanWidthRem: fanW,
      outerWidth: outer,
    };
  }, [cards]);

  return (
    <motion.span
      className={
        className ??
        "pointer-events-none absolute left-1/2 bottom-full z-[100] mb-1.5 -translate-x-1/2 overflow-visible"
      }
      style={{
        transformOrigin: "50% 100%",
        width: `min(${outerWidth}rem, 98vw)`,
        height: "min(15rem, 52vw)",
      }}
      variants={deckVariants}
    >
      <span className="relative block size-full">
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{ width: `${fanWidthRem}rem` }}
        >
          {cards.map((t) => (
            <motion.span
              key={t.id}
              className="absolute origin-center"
              variants={cardVariants}
              style={{
                left: `${t.leftRem - minLeftRem}rem`,
                top: `${t.topRem}rem`,
                zIndex: t.z,
                width: "min(20rem, 54vw)",
                aspectRatio: "16 / 9",
              }}
            >
              <span
                className="relative block size-full overflow-hidden rounded-2xl border border-border/50 bg-neutral-300 shadow-md dark:bg-neutral-600"
                style={{
                  transform: `rotate(${t.rotate}deg)`,
                }}
              >
                {t.imageSrc ? (
                  <img
                    src={t.imageSrc}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    draggable={false}
                  />
                ) : null}
              </span>
            </motion.span>
          ))}
        </span>
      </span>
    </motion.span>
  );
}

/** Empty variants so `whileHover` / `animate` on an ancestor drives nested `DeckStack` + cards. */
export const deckLinkWrapperVariants = {
  rest: {},
  hover: {},
} as const;
