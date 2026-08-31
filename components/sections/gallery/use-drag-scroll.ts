"use client";

import { animate } from "motion/react";
import { type PointerEvent as ReactPointerEvent, useRef } from "react";

const DRAG_THRESHOLD = 4;
/** Seconds of travel projected ahead of the release velocity. */
const MOMENTUM_PROJECTION = 0.22;
const MIN_MOMENTUM_VELOCITY = 60;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const dragged = useRef(false);
  const momentum = useRef<ReturnType<typeof animate> | null>(null);

  const stopMomentum = () => {
    momentum.current?.stop();
    momentum.current = null;
  };

  const onPointerDown = (event: ReactPointerEvent<T>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    stopMomentum();
    pointerId.current = event.pointerId;
    startX.current = event.clientX;
    lastX.current = event.clientX;
    lastTime.current = performance.now();
    startScrollLeft.current = el.scrollLeft;
    velocity.current = 0;
    dragged.current = false;
  };

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    const el = ref.current;
    if (!el || pointerId.current !== event.pointerId) return;

    const delta = event.clientX - startX.current;
    if (!dragged.current) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      dragged.current = true;
      el.setPointerCapture(event.pointerId);
    }

    const now = performance.now();
    const elapsed = now - lastTime.current;
    if (elapsed > 0) {
      const sample = (-(event.clientX - lastX.current) / elapsed) * 1000;
      velocity.current = velocity.current * 0.7 + sample * 0.3;
      lastX.current = event.clientX;
      lastTime.current = now;
    }

    el.scrollLeft = startScrollLeft.current - delta;
  };

  const endDrag = (event: ReactPointerEvent<T>) => {
    const el = ref.current;
    if (!el || pointerId.current !== event.pointerId) return;
    pointerId.current = null;

    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }

    if (
      !dragged.current ||
      Math.abs(velocity.current) < MIN_MOMENTUM_VELOCITY
    ) {
      return;
    }

    const max = el.scrollWidth - el.clientWidth;
    const from = el.scrollLeft;
    const to = clamp(from + velocity.current * MOMENTUM_PROJECTION, 0, max);

    momentum.current = animate(from, to, {
      type: "spring",
      velocity: velocity.current,
      stiffness: 220,
      damping: 34,
      restDelta: 0.5,
      onUpdate: (value) => {
        el.scrollLeft = clamp(value, 0, max);
      },
      onComplete: () => {
        momentum.current = null;
      },
    });
  };

  const onClickCapture = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    if (!dragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragged.current = false;
  };

  return {
    ref,
    stopMomentum,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onWheel: stopMomentum,
    },
  };
}
