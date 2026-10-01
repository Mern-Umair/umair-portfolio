"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import portrait from "../../public/umair-tahir.png";
import { profile } from "@/data/site";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Tech labels that float in front of the portrait, each at its own depth. */
const chips = [
  { label: "React", className: "-left-3 top-[12%] sm:-left-6", z: 70, delay: "0s" },
  { label: "Next.js", className: "-right-3 top-[30%] sm:-right-7", z: 95, delay: "-1.5s" },
  { label: "Node.js", className: "-left-4 bottom-[30%] sm:-left-8", z: 85, delay: "-3s" },
  { label: "MongoDB", className: "-right-2 bottom-[14%] sm:-right-5", z: 60, delay: "-4.5s" },
];

/**
 * The hero portrait turns to face the cursor, wherever it is on the page.
 * The card rotates in 3D, the photo slides slightly inside its frame, a highlight follows the
 * cursor, and the frame, name plate and tech chips sit at different depths so they separate
 * as the card turns.
 */
export function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const render = () => {
      // Ease towards the target so the head turn feels weighted instead of snapping.
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 13).toFixed(2)}deg`);
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      frame =
        Math.abs(targetX - x) > 0.002 || Math.abs(targetY - y) > 0.002 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Distance from the centre of the portrait, measured in half-viewports.
      targetX = clamp((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2), -1, 1);
      targetY = clamp((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2), -1, 1);
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="portrait relative">
      <div className="portrait-stage relative">
        <div
          className="absolute -inset-3 rounded-[2rem] border border-dashed border-line"
          style={{ transform: "translateZ(-50px)" }}
          aria-hidden
        />

        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/40">
          <Image
            src={portrait}
            alt="Portrait of Umair Tahir"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 384px, 90vw"
            className="aspect-[4/5] w-full object-cover object-top"
            style={{
              transform: "translate(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 9px)) scale(1.09)",
            }}
          />
          {/* Highlight that slides across the photo with the cursor. */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(60% 50% at calc(50% + var(--px, 0) * 45%) calc(35% + var(--py, 0) * 40%), rgb(255 255 255 / 0.5), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16">
            <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
            <p className="font-mono text-xs text-white/75">{profile.stackLine}</p>
          </div>
        </div>

        <ul aria-hidden>
          {chips.map((chip) => (
            <li
              key={chip.label}
              className={`absolute ${chip.className}`}
              style={{ transform: `translateZ(${chip.z}px)` }}
            >
              <span
                className="portrait-chip block rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-xs text-fg shadow-lg shadow-black/30 backdrop-blur"
                style={{ animationDelay: chip.delay }}
              >
                {chip.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
