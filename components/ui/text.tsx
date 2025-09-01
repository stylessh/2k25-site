import { cn } from "@/lib/utils";

interface Textprops {
  variant?: "copy" | "heading" | "link" | "highlight";
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Text({
  children,
  variant = "copy",
  className,
  as = "p",
}: Textprops) {
  const baseClass = cn("text-foreground-secondary font-sans");

  const variantClass = cn({
    "text-base tracking-[-0.01em] leading-[20px] font-normal":
      variant === "copy",
    "text-foreground-primary text-base tracking-[-0.01em] leading-[20px] font-medium":
      variant === "heading",
    "link text-foreground-secondary text-base tracking-[-0.01em] leading-[20px] font-normal":
      variant === "link",

    "text-foreground-primary text-base tracking-[-0.01em] leading-[20px] font-medium bg-border p-0.5":
      variant === "highlight",
  });

  const Component = as;

  return (
    <Component className={cn(baseClass, variantClass, className)}>
      {children}
    </Component>
  );
}
