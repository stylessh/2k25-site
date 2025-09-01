import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ComponentProps<"div"> {}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-page border rounded-sm px-3 py-3 pb-4 flex flex-col gap-y-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
