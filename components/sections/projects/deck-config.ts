export type ProjectDeckCard = {
  id: "back" | "mid" | "front";
  rotate: number;
  /** Horizontal offset from fan container left, in `rem`. */
  leftRem: number;
  /** Vertical offset from fan container top, in `rem`. */
  topRem: number;
  z: number;
  /** Optional cover image (`public/` path, e.g. `/projects/foo/1.png`). */
  imageSrc?: string;
};

/** Default fan layout for project hover decks. */
export const PROJECT_DECK: ProjectDeckCard[] = [
  { id: "back", rotate: -18, leftRem: 0, topRem: 0.5, z: 1 },
  { id: "mid", rotate: 6.5, leftRem: 3.25, topRem: 0, z: 2 },
  { id: "front", rotate: -13, leftRem: 6.5, topRem: 0.35, z: 3 },
];
