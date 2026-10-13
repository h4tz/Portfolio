"use client";

import { useEffect, useRef } from "react";

/**
 * #web-canvas — the ambient interactive field behind all content.
 *
 * A loose constellation of nodes joined into a web. Nodes drift slowly on their
 * own (so it breathes with no input) and lean gently toward the pointer, so the
 * field feels aware of you without chasing you. Nearby strands warm from
 * --color-line toward --color-accent and brighten.
 *
 * Layered at z-index 0 (see globals.css) — painted after the body background,
 * under main/nav/footer. Purely decorative; pointer-events none; paused when the
 * tab is hidden. Respects reduced motion by drawing a single static frame.
 */
export function WebField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    // Narrow once to non-null consts so every nested closure sees a definite type.
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const el: HTMLCanvasElement = canvas;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // palette pulled from the design tokens so it always matches the theme
    const css = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      (css.getPropertyValue(name) || "").trim() || fallback;
    const C_LINE = read("--color-line", "#26262a");
    const C_LINE_STRONG = read("--color-line-strong", "#3a3a40");
    const C_ACCENT = read("--color-accent", "#d9a441");

    type Node = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      r: number;
      ph: number;
    };

    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

    const pointer = { x: -9999, y: -9999, on: false };
    const R = () => Math.min(w, h) * 0.32;

    function build() {
      const count = w < 640 ? 46 : w < 1100 ? 78 : 110;
      nodes = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        nodes.push({
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.3 + 0.6,
          ph: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw();
    }

    function step(t: number) {
      const rad = R();
      const rad2 = rad * rad;
      for (const n of nodes) {
        // slow autonomous drift around the origin — the "breathing"
        n.x += n.vx + Math.cos(t * 0.0004 + n.ph) * 0.05;
        n.y += n.vy + Math.sin(t * 0.0005 + n.ph) * 0.05;

        // gentle pull toward the pointer (never a hard chase)
        if (pointer.on) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < rad2 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / rad) * 0.06;
            n.x += (dx / d) * f * 6;
            n.y += (dy / d) * f * 6;
          }
        }
        // spring back to origin so the field never drifts away
        n.x += (n.ox - n.x) * 0.002;
        n.y += (n.oy - n.y) * 0.002;

        // keep on screen
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const rad = R();
      const rad2 = rad * rad;
      const link2 = (w < 640 ? 120 : 150) ** 2;

      // strands
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link2) continue;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          let heat = 0;
          if (pointer.on) {
            const pdx = pointer.x - mx;
            const pdy = pointer.y - my;
            const pd2 = pdx * pdx + pdy * pdy;
            if (pd2 < rad2) heat = 1 - Math.sqrt(pd2) / rad;
          }
          const base = 1 - Math.sqrt(d2) / Math.sqrt(link2);
          ctx.globalAlpha = (0.1 + base * 0.16) * (1 + heat * 1.6);
          ctx.strokeStyle = heat > 0.02 ? C_ACCENT : C_LINE;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        let heat = 0;
        if (pointer.on) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < rad2) heat = 1 - Math.sqrt(d2) / rad;
        }
        ctx.globalAlpha = 0.5 + heat * 0.5;
        ctx.fillStyle = heat > 0.05 ? C_ACCENT : C_LINE_STRONG;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + heat * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame(t: number) {
      step(t);
      draw();
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce.matches) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReduce = () => {
      if (reduce.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    resize();
    if (reduce.matches) draw();
    else start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener("change", onReduce);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return <canvas id="web-canvas" aria-hidden="true" />;
}
