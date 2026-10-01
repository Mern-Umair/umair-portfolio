"use client";

import { useEffect, useRef } from "react";

const GAP = 30; // distance between dots
const RADIUS = 190; // how far the cursor's pull reaches
const PUSH = 16; // how far a dot is pushed away at the centre of the pull

/**
 * Hero background: a field of dots that parts around the cursor like iron filings around a
 * magnet. Dots near the cursor are pushed outwards, grow and take the accent colour.
 * It only redraws while the cursor is moving, and draws a plain static grid on touch screens
 * and for reduced-motion users.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const interactive =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dotColor = "";
    let accentColor = "";
    // Cursor position in canvas coordinates; far off-screen means "no cursor".
    const target = { x: -9999, y: -9999 };
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dotColor = styles.getPropertyValue("--dot").trim();
      accentColor = styles.getPropertyValue("--accent").trim();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let gy = GAP / 2; gy < height; gy += GAP) {
        for (let gx = GAP / 2; gx < width; gx += GAP) {
          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const distance = Math.hypot(dx, dy);
          const pull = distance < RADIUS ? 1 - distance / RADIUS : 0;
          // Ease the falloff so the edge of the pull is soft.
          const strength = pull * pull;
          const x = gx + (distance ? (dx / distance) * strength * PUSH : 0);
          const y = gy + (distance ? (dy / distance) * strength * PUSH : 0);
          context.beginPath();
          context.arc(x, y, 1 + strength * 1.9, 0, Math.PI * 2);
          if (strength > 0.02) {
            context.globalAlpha = 0.35 + strength * 0.65;
            context.fillStyle = accentColor;
          } else {
            context.globalAlpha = 1;
            context.fillStyle = dotColor;
          }
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const tick = () => {
      pointer.x += (target.x - pointer.x) * 0.18;
      pointer.y += (target.y - pointer.y) * 0.18;
      draw();
      const settled = Math.abs(target.x - pointer.x) < 0.5 && Math.abs(target.y - pointer.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside = event.clientY >= rect.top - RADIUS && event.clientY <= rect.bottom + RADIUS;
      if (inside) {
        // Jump straight to the cursor when it first arrives, instead of gliding in from off-screen.
        if (pointer.x < -9000) {
          pointer.x = event.clientX - rect.left;
          pointer.y = event.clientY - rect.top;
        }
        target.x = event.clientX - rect.left;
        target.y = event.clientY - rect.top;
      } else {
        target.x = pointer.x = -9999;
        target.y = pointer.y = -9999;
      }
      schedule();
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Redraw in the new colours when the theme toggle flips data-theme.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_85%_80%_at_50%_15%,#000_35%,transparent_100%)]"
    />
  );
}
