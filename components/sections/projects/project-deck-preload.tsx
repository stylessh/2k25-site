"use client";

import { useEffect } from "react";
import { DESKTOP_DECK_MQ } from "./project-deck-media";

type ProjectDeckPreloadProps = {
  urls: readonly string[];
};

/** Injects `<link rel="preload" as="image">` in document head when the desktop deck media query matches. */
export function ProjectDeckPreload({ urls }: ProjectDeckPreloadProps) {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_DECK_MQ);
    const linkEls: HTMLLinkElement[] = [];

    const add = () => {
      if (!mq.matches) {
        return;
      }
      for (const href of urls) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        document.head.appendChild(link);
        linkEls.push(link);
      }
    };

    const remove = () => {
      for (const el of linkEls) {
        el.remove();
      }
      linkEls.length = 0;
    };

    const sync = () => {
      remove();
      add();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      remove();
    };
  }, [urls]);

  return null;
}
