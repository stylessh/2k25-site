import { cn } from "@/lib/utils";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-[682px] mr-auto md:ml-16 px-6 py-16 flex flex-col gap-y-16",
        ""
      )}
    >
      {children}
    </div>
  );
}
