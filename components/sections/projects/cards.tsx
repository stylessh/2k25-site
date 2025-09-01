import Link from "next/link";
import { Blueprint } from "@/components/ui/blueprint";
import { Card } from "@/components/ui/card";
import { RedaktLogo, VidssLogo } from "@/components/ui/logos";
import { Text } from "@/components/ui/text";

export function VidssCard() {
  return (
    <Card className="relative">
      <Blueprint>
        <VidssLogo className="rounded-sm" />
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
  return (
    <Card className="relative">
      <Blueprint>
        <RedaktLogo className="rounded-sm" />
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
  return (
    <Card className="relative col-span-2 items-center flex-row gap-x-8 pb-3">
      <div className="w-28 aspect-[4/2] grid place-items-center">
        <div className="w-32 border-2 flex items-center border-dashed border-border rounded-full p-2 gap-2">
          <div className="size-7 bg-accent rounded-full shrink-0" />
          <div className="h-0.5 rounded-sm w-24 bg-border" />
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
    </Card>
  );
}
