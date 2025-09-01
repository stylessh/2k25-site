import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Text } from "./text";

export function Link({
  children,
  href,
  target,
  rel,
  className,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  return (
    <Text variant="link">
      <NextLink
        href={href}
        className={cn(
          "relative text-foreground-primary duration-200 ease-in-out",
          "after:content-[''] after:transform after:absolute after:-bottom-1 after:inset-x-0 after:origin-center after:w-full after:h-px after:bg-[var(--current-color)] after:rounded-xs after:transition-[width,height,background-color,bottom,scale] duration-200 ease-in-out",
          "hover:after:scale-y-150 hover:after:-bottom-1.5 hover:after:scale-x-90",
          className
        )}
        target={target}
        rel={rel}
      >
        {children}
      </NextLink>
    </Text>
  );
}
