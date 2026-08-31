"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { type Ref, useCallback, useEffect, useRef, useState } from "react";
import { useDragScroll } from "./use-drag-scroll";

export type GalleryItem = {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
};

type Rect = { top: number; left: number; width: number; height: number };

const SPRING = { type: "spring", visualDuration: 0.3, bounce: 0.12 } as const;
const EXPANDED_MAX_WIDTH = 1100;

/** Centered 16:9 box that always fits the viewport. */
function getExpandedRect(): Rect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(vw * 0.92, EXPANDED_MAX_WIDTH, (vh * 0.82 * 16) / 9);
  const height = (width * 9) / 16;
  return { width, height, left: (vw - width) / 2, top: (vh - height) / 2 };
}

/** Hands playback position between the gallery and expanded copies of a video. */
function syncPlayback(from: HTMLVideoElement, to: HTMLVideoElement) {
  const apply = () => {
    to.currentTime = from.currentTime;
    void to.play().catch(() => {});
  };

  if (to.readyState >= 1) apply();
  else to.addEventListener("loadedmetadata", apply, { once: true });
}

function Media({
  item,
  videoRef,
  eager = false,
}: {
  item: GalleryItem;
  videoRef?: Ref<HTMLVideoElement>;
  eager?: boolean;
}) {
  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        autoPlay={eager}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      draggable={false}
      sizes="(min-width: 1024px) 1100px, 92vw"
      className="select-none object-cover"
    />
  );
}

export function GalleryScroller({ items }: { items: readonly GalleryItem[] }) {
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const [expandedRect, setExpandedRect] = useState<Rect | null>(null);
  const [originRect, setOriginRect] = useState<Rect | null>(null);
  const [hiddenSrc, setHiddenSrc] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const cardVideos = useRef(new Map<string, HTMLVideoElement>());
  const expandedVideo = useRef<HTMLVideoElement>(null);
  const { ref, handlers, stopMomentum } = useDragScroll<HTMLDivElement>();

  const open = (item: GalleryItem) => {
    const card = cardRefs.current.get(item.src);
    if (!card) return;
    stopMomentum();
    setOriginRect(card.getBoundingClientRect());
    setExpandedRect(getExpandedRect());
    setHiddenSrc(item.src);
    setOpenItem(item);
  };

  const close = useCallback(() => {
    if (!openItem) return;
    const card = cardRefs.current.get(openItem.src);
    if (card) setOriginRect(card.getBoundingClientRect());

    const source = expandedVideo.current;
    const target = cardVideos.current.get(openItem.src);
    if (source && target) syncPlayback(source, target);

    setOpenItem(null);
  }, [openItem]);

  useEffect(() => {
    if (!openItem) return;

    const source = cardVideos.current.get(openItem.src);
    const target = expandedVideo.current;
    if (source && target) syncPlayback(source, target);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openItem, close]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: observe current card nodes after they mount
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const src = (entry.target as HTMLElement).dataset.mediaSrc;
          if (!src) continue;
          const video = cardVideos.current.get(src);
          if (!video) continue;
          if (entry.isIntersecting) {
            video.preload = "auto";
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { root, rootMargin: "80%", threshold: 0.01 },
    );

    for (const [src, el] of cardRefs.current) {
      el.dataset.mediaSrc = src;
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <AnimatePresence
        custom={originRect}
        onExitComplete={() => setHiddenSrc(null)}
      >
        {openItem && expandedRect && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/90"
          />
        )}

        {openItem && expandedRect && (
          <motion.button
            key="expanded"
            type="button"
            custom={originRect}
            variants={{
              collapsed: (origin: Rect | null) =>
                origin
                  ? {
                      x: origin.left - expandedRect.left,
                      y: origin.top - expandedRect.top,
                      scale: origin.width / expandedRect.width,
                    }
                  : { opacity: 0 },
              expanded: { x: 0, y: 0, scale: 1 },
            }}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={SPRING}
            onClick={close}
            aria-label={`Close ${openItem.alt}`}
            style={{
              top: expandedRect.top,
              left: expandedRect.left,
              width: expandedRect.width,
              height: expandedRect.height,
              transformOrigin: "top left",
            }}
            className="fixed z-50 block overflow-hidden border border-border bg-background"
          >
            <Media item={openItem} videoRef={expandedVideo} eager />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        ref={ref}
        {...handlers}
        className="no-scrollbar flex h-full w-full cursor-grab items-end gap-1 overflow-x-auto overscroll-x-contain px-[max(2rem,calc((100vw-42rem)/2+2rem))] active:cursor-grabbing"
      >
        {items.map((item) => (
          <div
            key={item.src}
            ref={(node) => {
              if (node) cardRefs.current.set(item.src, node);
              else cardRefs.current.delete(item.src);
            }}
            className="relative aspect-video h-full shrink-0"
          >
            <button
              type="button"
              onClick={() => open(item)}
              aria-label={`Expand ${item.alt}`}
              style={{
                visibility: hiddenSrc === item.src ? "hidden" : "visible",
              }}
              className="absolute inset-0 block overflow-hidden border border-border bg-background"
            >
              <Media
                item={item}
                videoRef={(node) => {
                  if (node) cardVideos.current.set(item.src, node);
                  else cardVideos.current.delete(item.src);
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
