"use client";

import { useEffect, useRef } from "react";

/**
 * #follower-canvas — a small spider that trails the pointer.
 *
 * Design rule (learned the hard way): the NATIVE CURSOR IS NEVER HIDDEN.
 * This is a decorative creature that flies *near* your pointer with a soft lag
 * and a little independent sway — like something walking across the glass in
 * front of your cursor, not replacing it. Clicks stay pixel-precise.
 *
 * Only activates on fine-pointer, motion-friendly devices without Save-Data,
 * and only when the URL isn't `?still`. It toggles `html.hb-follower` so CSS
 * reveals the canvas (see globals.css). On phones/coarse pointers it stays off.
 *
 * The spider sits at z-index 70 — above content and the grain, so it reads as
 * being "on the glass" in front of the page.
 */
export function SpiderFollower() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    // Narrow once to non-null consts so every nested closure sees a definite type.
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const el: HTMLCanvasElement = canvas;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    );
    const still = /[?&]still(=|&|$)/.test(window.location.search);

    // Never show under reduced motion, Save-Data, `?still`, or coarse pointers.
    const enabled = () => fine.matches && !reduce.matches && !saveData && !still;

    const css = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      (css.getPropertyValue(name) || "").trim() || fallback;
    const C_ACCENT = read("--color-accent", "#d9a441");
    const C_BG = read("--color-bg", "#0a0a0b");
    const C_TEXT = read("--color-text", "#ecebe8");

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

    const pointer = { x: -9999, y: -9999, on: false };
    // the follower trails with a spring; it never sits exactly on the pointer
    const p = { x: -9999, y: -9999, vx: 0, vy: 0, angle: 0, scale: 0 };
    let t = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawSpider(x: number, y: number, angle: number, s: number, time: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(s, s);

      const stroke = C_ACCENT;

      // legs — 8, drawn as two-segment limbs with a per-leg phase so they
      // ripple as it moves (the ripple amplitude tracks speed below)
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      const speed = Math.min(1, Math.hypot(p.vx, p.vy) * 0.06);
      const amp = 3 + speed * 5;
      const legs: [number, number, number][] = [
        // [attachX, attachY, phaseOffset]
        [5, -4, 0],
        [5, 4, Math.PI],
        [1.5, -5.5, 0.8],
        [1.5, 5.5, Math.PI + 0.8],
        [-2.5, -5, 1.6],
        [-2.5, 5, Math.PI + 1.6],
        [-6, -3.5, 2.4],
        [-6, 3.5, Math.PI + 2.4],
      ];
      for (const [lx, ly, ph] of legs) {
        const ripple = Math.sin(time * 0.012 + ph) * amp;
        const side = Math.sign(ly) || 1;
        const kneeX = lx + 1.5;
        const kneeY = ly + side * 5 + ripple * 0.4;
        const footX = lx + 5 + ripple;
        const footY = ly + side * 11 + ripple;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.stroke();
      }

      // body — a soft two-part silhouette so it reads as a spider, not a dot
      ctx.fillStyle = C_BG;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.6;
      // abdomen
      ctx.beginPath();
      ctx.ellipse(-4, 0, 5.5, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // cephalothorax
      ctx.beginPath();
      ctx.ellipse(3.5, 0, 4, 3.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // eyes — two amber pinpricks so it has a "face" and direction
      ctx.fillStyle = C_TEXT;
      ctx.beginPath();
      ctx.arc(5.5, -1.6, 0.9, 0, Math.PI * 2);
      ctx.arc(5.5, 1.6, 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function frame() {
      if (running) raf = requestAnimationFrame(frame);
      t += 1;
      ctx.clearRect(0, 0, w, h);
      if (!pointer.on || p.x < -999) return;

      // spring toward the pointer — deliberately loose so it trails
      const k = 0.06;
      const damp = 0.82;
      p.vx = (p.vx + (pointer.x - p.x) * k) * damp;
      p.vy = (p.vy + (pointer.y - p.y) * k) * damp;
      // a touch of independent drift so it never looks welded to the cursor
      p.vx += Math.cos(t * 0.03) * 0.05;
      p.vy += Math.sin(t * 0.037) * 0.05;
      p.x += p.vx;
      p.y += p.vy;

      // face travel direction, smoothly
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 0.15) {
        const target = Math.atan2(p.vy, p.vx);
        let diff = target - p.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        p.angle += diff * 0.12;
      }

      // ease scale in so it doesn't pop
      p.scale += (1 - p.scale) * 0.1;

      drawSpider(p.x, p.y, p.angle, p.scale, t);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function apply() {
      const on = enabled();
      document.documentElement.classList.toggle("hb-follower", on);
      if (on) start();
      else {
        stop();
        ctx.clearRect(0, 0, w, h);
      }
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
      if (p.x < -999) {
        // first appearance: start slightly offset so it walks into place
        p.x = e.clientX + 24;
        p.y = e.clientY + 24;
      }
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onVis = () => {
      if (document.hidden) stop();
      else if (enabled()) start();
    };

    resize();
    apply();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    fine.addEventListener("change", apply);
    reduce.addEventListener("change", apply);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      fine.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
      document.documentElement.classList.remove("hb-follower");
    };
  }, []);

  return <canvas id="follower-canvas" aria-hidden="true" />;
}
