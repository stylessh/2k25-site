"use client";

import Link from "next/link";
import { useState } from "react";
import { Blueprint } from "@/components/ui/blueprint";
import { Card } from "@/components/ui/card";
import { RedaktLogo, VidssLogo } from "@/components/ui/logos";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function VidssCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Blueprint hovered={hovered}>
        <VidssLogo className="rounded-sm size-full" />
      </Blueprint>

      <div className="flex flex-col gap-y-2">
        <Text className="text-foreground-primary" as="h2">
          Vidss
        </Text>
        <Text>
          Create wonderful videos with three clicks, export to all formats.
        </Text>
      </div>

      <Link
        href="https://vidss.app"
        className="absolute inset-0 z-10"
        aria-label="Go to Vidss website"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Card>
  );
}

export function RedaktCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <Card
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Blueprint hovered={hovered}>
        <RedaktLogo className="rounded-sm size-full" />
      </Blueprint>

      <div className="flex flex-col gap-y-2">
        <Text className="text-foreground-primary" as="h2">
          Redakt
        </Text>
        <Text>Your AI companion for writing and editing documents.</Text>
      </div>

      <Link
        href="https://redakt.app"
        className="absolute inset-0 z-10"
        aria-label="Go to Redakt website"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Card>
  );
}

export function InteractionsCard() {
  const [hovered, setHovered] = useState(false);

  const transitionClass = cn(
    "transition-[border-color,translate,background-color,scale] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
  );

  return (
    <Card
      className="relative col-span-2 items-center flex-row gap-x-8 pb-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn("w-28 aspect-[4/2] grid place-items-center")}>
        <div
          className={cn(
            transitionClass,
            "w-32 border-2 flex items-center border-dashed border-border rounded-full p-2 gap-2",
            hovered && "border-foreground-primary"
          )}
        >
          <div
            className={cn(
              transitionClass,
              "size-7 bg-border rounded-full shrink-0 transform",
              hovered && "bg-foreground-primary translate-x-20"
            )}
          />
          <div
            className={cn(
              transitionClass,
              "h-0.5 rounded-xs w-24 bg-border",
              hovered && "bg-foreground-primary origin-center scale-y-150"
            )}
          />
          <div className="size-7 bg-transparent border-2 border-border rounded-full shrink-0" />
        </div>
      </div>

      <div className="flex-grow w-full flex flex-col items-end gap-y-2 text-right">
        <Text className="text-foreground-primary" as="h2">
          Interactions
        </Text>
        <Text className="text-balance">
          Delightful User Interfaces and interactions, and how to create them.
        </Text>
      </div>

      <Link
        href="https://interactions-matter.vercel.app"
        className="absolute inset-0 z-10"
        aria-label="Go to Interactions website"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Card>
  );
}
