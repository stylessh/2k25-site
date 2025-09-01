"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 64;
const HOVER_SIZE = 72;

export function Blueprint({
  children,
  hovered,
}: {
  children: React.ReactNode;
  hovered?: boolean;
}) {
  const size = useMemo(() => (hovered ? HOVER_SIZE : DEFAULT_SIZE), [hovered]);

  const transitionClass = cn(
    "transition-[width,height,left,top,border-color] duration-200 ease-[cubic-bezier(0.6,0.040.98,0.335)]"
  );

  const hoveredBorderClass = cn("border-foreground-secondary");

  return (
    <div
      className="w-full aspect-[4/3] grid place-items-center relative group"
      style={{
        maskImage: "radial-gradient(circle, black 10%, transparent 90%)",
      }}
    >
      <div
        className={cn(
          transitionClass,
          "absolute w-px h-full border-l border-border border-dashed inset-y-0",
          hovered && hoveredBorderClass
        )}
        style={{
          left: `calc(50% - ${size / 2}px - 4px)`,
        }}
      />

      <div
        className={cn(
          transitionClass,
          "absolute w-px h-full border-l border-border border-dashed inset-y-0",
          hovered && hoveredBorderClass
        )}
        style={{
          left: `calc(50% + ${size / 2}px + 4px)`,
        }}
      />

      <div
        className={cn(
          transitionClass,
          "absolute h-px border-t border-border border-dashed inset-x-0",
          hovered && hoveredBorderClass
        )}
        style={{
          top: `calc(50% - ${size / 2}px - 4px)`,
        }}
      />

      <div
        className={cn(
          transitionClass,
          "absolute h-px border-t border-border border-dashed inset-x-0",
          hovered && hoveredBorderClass
        )}
        style={{
          top: `calc(50% + ${size / 2}px + 4px)`,
        }}
      />

      <div
        style={{ width: size, height: size }}
        className={cn(transitionClass)}
      >
        {children}
      </div>
    </div>
  );
}
