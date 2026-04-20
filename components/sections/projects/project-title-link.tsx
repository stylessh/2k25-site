"use client";

import { motion } from "motion/react";
import NextLink from "next/link";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useProjectDeckDial } from "@/components/project-deck-dial";
import { useProjectDeckHover } from "@/components/project-deck-hover-context";
import { cn } from "@/lib/utils";
import { PROJECT_DECK } from "./deck-config";
import { DeckStack, deckLinkWrapperVariants } from "./deck-stack";
import { DESKTOP_DECK_MQ } from "./project-deck-media";

const VEIL_TIMING_CLASS = "duration-[280ms] ease-out";
/** Slightly longer than the veil — small text reads as faster at equal ms. */
const PEER_BLUR_TIMING_CLASS = "duration-[360ms] ease-out";

const titleLinkClass =
  "text-foreground underline underline-offset-4 decoration-border/60 hover:decoration-foreground transition-all";

type ProjectTitleLinkProps = {
  href: string;
  title: string;
  /** One image per card (back → front), aligned with `PROJECT_DECK` order. */
  deckImages?: readonly string[];
};

function useDesktopDeckInteraction() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_DECK_MQ);
    const update = () => setEnabled(mq.matches);
    update();
    setReady(true);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return { ready, enabled };
}

export function ProjectTitleLink({
  href,
  title,
  deckImages,
}: ProjectTitleLinkProps) {
  const { ready, enabled: desktopDeck } = useDesktopDeckInteraction();
  const dial = useProjectDeckDial();
  const { activeProjectTitle, setActiveProjectTitle } = useProjectDeckHover();
  const baseCards = dial?.cards ?? PROJECT_DECK;
  const cards = useMemo(() => {
    if (!deckImages?.length) {
      return baseCards;
    }
    return baseCards.map((c, i) => ({
      ...c,
      imageSrc: deckImages[i],
    }));
  }, [baseCards, deckImages]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!desktopDeck) {
      setHovered(false);
      setActiveProjectTitle((prev) => (prev === title ? null : prev));
      return;
    }
    if (!hovered) {
      return;
    }
    setActiveProjectTitle(title);
    return () => {
      setActiveProjectTitle((prev) => (prev === title ? null : prev));
    };
  }, [hovered, title, setActiveProjectTitle, desktopDeck]);

  const peerBlur =
    desktopDeck && activeProjectTitle != null && activeProjectTitle !== title;

  const simpleLink = (
    <NextLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={titleLinkClass}
    >
      {title}
    </NextLink>
  );

  if (!ready || !desktopDeck) {
    return simpleLink;
  }

  return (
    <motion.span
      className="relative inline-block"
      variants={deckLinkWrapperVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[90] bg-background/5 backdrop-blur-sm transition-opacity dark:bg-background/10",
          VEIL_TIMING_CLASS,
          hovered ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      <span
        className={cn(
          "relative z-[100] inline transition-[filter]",
          PEER_BLUR_TIMING_CLASS,
          peerBlur ? "blur-xs" : "blur-none",
        )}
      >
        <NextLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={titleLinkClass}
        >
          {title}
        </NextLink>
      </span>

      <DeckStack
        cards={cards}
        hovered={hovered}
        springTransition={dial?.springTransition}
      />
    </motion.span>
  );
}
