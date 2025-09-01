import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-surface-page border rounded-sm px-3 py-3 pb-4 flex flex-col gap-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
