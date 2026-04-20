"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type ProjectDeckHoverContextValue = {
  activeProjectTitle: string | null;
  setActiveProjectTitle: Dispatch<SetStateAction<string | null>>;
};

const ProjectDeckHoverContext =
  createContext<ProjectDeckHoverContextValue | null>(null);

export function ProjectDeckHoverProvider({
  children,
}: {
  children: ReactNode;
}) {
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
