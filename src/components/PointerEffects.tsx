"use client";

import { useEffect } from "react";

/**
 * One document-level pointer listener that drives two effects through CSS variables:
 *  - `.spot`        gets --mx/--my, the cursor position inside it (spotlight glow)
 *  - `[data-tilt]`  gets --rx/--ry, a 3D tilt towards the cursor; the attribute value is the
 *                   maximum angle in degrees
 * Delegating from the document means server-rendered cards need no client code of their own.
 * Renders nothing, and does nothing on touch screens or for reduced-motion users.
 */
export function PointerEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let tilted: HTMLElement | null = null;
    const flatten = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const spot = event.target.closest<HTMLElement>(".spot");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }

      const tilt = event.target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) {
        flatten(tilted);
        tilted = null;
      }
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const max = Number(tilt.dataset.tilt) || 6;
        // -1 … 1 from the centre of the element
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        tilt.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        tilted = tilt;
      }
    };

    const onLeave = () => {
      if (tilted) flatten(tilted);
      tilted = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
