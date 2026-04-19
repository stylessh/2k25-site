"use client";

import type { DialConfig } from "dialkit";
import { useDialKit } from "dialkit";
import type { Transition } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ProjectDeckCard } from "@/components/sections/projects/deck-config";
import { PROJECT_DECK } from "@/components/sections/projects/deck-config";

const [back, mid, front] = PROJECT_DECK;

type DeckDialValues = {
  spacing: { horizontal: number; vertical: number };
  back: { leftRem: number; topRem: number; rotate: number; z: number };
  mid: { leftRem: number; topRem: number; rotate: number; z: number };
  front: { leftRem: number; topRem: number; rotate: number; z: number };
  motion: { type: "spring"; visualDuration?: number; bounce?: number };
  reset: { type: "action"; label?: string };
};

function dialConfig(): DialConfig {
  return {
    spacing: {
      horizontal: [4.1, 0, 8] as [number, number, number],
      vertical: [0.2, 0, 3] as [number, number, number],
    },
    back: {
      leftRem: [back.leftRem, -2, 14] as [number, number, number],
      topRem: [back.topRem, -2, 6] as [number, number, number],
      rotate: [back.rotate, -45, 45] as [number, number, number],
      z: [back.z, 1, 10, 1] as [number, number, number, number],
    },
    mid: {
      leftRem: [mid.leftRem, -2, 14] as [number, number, number],
      topRem: [mid.topRem, -2, 6] as [number, number, number],
      rotate: [mid.rotate, -45, 45] as [number, number, number],
      z: [mid.z, 1, 10, 1] as [number, number, number, number],
    },
    front: {
      leftRem: [front.leftRem, -2, 14] as [number, number, number],
      topRem: [front.topRem, -2, 6] as [number, number, number],
      rotate: [front.rotate, -45, 45] as [number, number, number],
      z: [front.z, 1, 10, 1] as [number, number, number, number],
    },
    motion: {
      type: "spring",
      visualDuration: 0.3,
      bounce: 0.6,
    },
    reset: { type: "action", label: "Reset to PROJECT_DECK" },
  };
}

export type ProjectDeckDialState = {
  cards: ProjectDeckCard[];
  springTransition: Transition;
};

const ProjectDeckDialContext = createContext<ProjectDeckDialState | null>(null);

export function useProjectDeckDial(): ProjectDeckDialState | null {
  return useContext(ProjectDeckDialContext);
}

export function ProjectDeckDialProvider({ children }: { children: ReactNode }) {
  const [resetKey, setResetKey] = useState(0);
  const panelName = `Project deck ${resetKey}`;
  const dialPanelConfig = useMemo(() => dialConfig(), []);

  const d = useDialKit(panelName, dialPanelConfig, {
    onAction: (path) => {
      if (path === "reset") {
        setResetKey((k) => k + 1);
      }
    },
  }) as DeckDialValues;

  const cards: ProjectDeckCard[] = useMemo(() => {
    const h = d.spacing.horizontal;
    const v = d.spacing.vertical;
    return [
      {
        id: "back",
        leftRem: d.back.leftRem,
        topRem: d.back.topRem,
        rotate: d.back.rotate,
        z: Math.round(d.back.z),
      },
      {
        id: "mid",
        leftRem: d.mid.leftRem + h * 1.5,
        topRem: d.mid.topRem + v * 1.5,
        rotate: d.mid.rotate,
        z: Math.round(d.mid.z),
      },
      {
        id: "front",
        leftRem: d.front.leftRem + h * 3,
        topRem: d.front.topRem + v * 3,
        rotate: d.front.rotate,
        z: Math.round(d.front.z),
      },
    ];
  }, [
    d.back.leftRem,
    d.back.topRem,
    d.back.rotate,
    d.back.z,
    d.mid.leftRem,
    d.mid.topRem,
    d.mid.rotate,
    d.mid.z,
    d.front.leftRem,
    d.front.topRem,
    d.front.rotate,
    d.front.z,
    d.spacing.horizontal,
    d.spacing.vertical,
  ]);

  const value = useMemo(
    (): ProjectDeckDialState => ({
      cards,
      springTransition: d.motion as Transition,
    }),
    [cards, d.motion],
  );

  return (
    <ProjectDeckDialContext.Provider value={value}>
      {children}
    </ProjectDeckDialContext.Provider>
  );
}
