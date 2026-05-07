"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { MODEL_VARIANT_NAV } from "@/lib/model-variants";
import { cn } from "@/lib/utils";

const itemClass =
  "px-2.5 py-1 rounded-md text-[12px] text-muted-foreground hover:text-foreground transition-colors";

const sepClass = "text-border select-none px-0.5 text-[10px] leading-none";

export function ModelVariantToolbar() {
  const pathname = usePathname() || "/";

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2"
      aria-label="Model variants"
    >
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-full px-1 py-1 backdrop-blur-xl",
          "border border-border/90 bg-background/[0.92]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_-4px_rgba(0,0,0,0.08)]",
          "dark:border-white/[0.09] dark:bg-background/[0.78]",
          "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_2px_4px_rgba(0,0,0,0.28),0_12px_36px_-8px_rgba(0,0,0,0.5)]",
        )}
      >
        {MODEL_VARIANT_NAV.map((item, i) => {
          const active = pathname === item.href;

          return (
            <Fragment key={item.href}>
              {i > 0 ? (
                <span className={sepClass} aria-hidden>
                  ·
                </span>
              ) : null}
              <NextLink
                href={item.href}
                className={cn(
                  itemClass,
                  active && "bg-muted/60 font-medium text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </NextLink>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
