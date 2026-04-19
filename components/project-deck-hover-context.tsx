"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

/** Same timing as `ProjectTitleLink` overlay: `transition={{ duration: 0.28, ease: "easeOut" }}`. */
export const PROJECT_PEER_BLUR_TRANSITION =
  "transition-[filter] duration-[280ms] ease-out";

type ProjectDeckHoverContextValue = {
  activeProjectTitle: string | null;
  setActiveProjectTitle: Dispatch<SetStateAction<string | null>>;
};

const ProjectDeckHoverContext =
  createContext<ProjectDeckHoverContextValue | null>(null);

export function ProjectDeckHoverProvider({ children }: { children: ReactNode }) {
  const [activeProjectTitle, setActiveProjectTitle] = useState<string | null>(
    null,
  );
  const value = useMemo(
    () => ({ activeProjectTitle, setActiveProjectTitle }),
    [activeProjectTitle],
  );
  return (
    <ProjectDeckHoverContext.Provider value={value}>
      {children}
    </ProjectDeckHoverContext.Provider>
  );
}

export function useProjectDeckHover() {
  const ctx = useContext(ProjectDeckHoverContext);
  if (!ctx) {
    return {
      activeProjectTitle: null as string | null,
      setActiveProjectTitle: (() => {}) as Dispatch<
        SetStateAction<string | null>
      >,
    };
  }
  return ctx;
}
