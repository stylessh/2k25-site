import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl mx-auto px-8 py-16 sm:py-20", className)}>
      {children}
    </div>
  );
}
