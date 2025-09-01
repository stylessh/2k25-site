import { cn } from "@/lib/utils";

export function Blueprint({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full aspect-[4/3] grid place-items-center relative"
      style={{
        maskImage: "radial-gradient(circle, black 10%, transparent 90%)",
      }}
    >
      <div
        className={cn(
          "absolute w-px h-full border-l border-border border-dashed",
          "inset-y-0 left-[calc(50%-32px-4px)]"
        )}
      />

      <div
        className={cn(
          "absolute w-px h-full border-l border-border border-dashed",
          "inset-y-0 left-[calc(50%+32px+4px)]"
        )}
      />

      <div
        className={cn(
          "absolute h-px  border-t border-border border-dashed",
          "inset-x-0 top-[calc(50%-32px-4px)]"
        )}
      />

      <div
        className={cn(
          "absolute h-px  border-t border-border border-dashed",
          "inset-x-0 top-[calc(50%+32px+4px)]"
        )}
      />

      {children}
    </div>
  );
}
