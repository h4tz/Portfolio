"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive studio background + spider cursor.
 *
 * Two canvases, one animation loop:
 *  - webRef  : sits behind all content (`-z-10`, pointer-events none). Draws a
 *              corner-anchored orb web. Strands sag toward the spider and glow
 *              amber when it draws near, so the page reads as "the web notices
 *              you". Idle breathing keeps it alive without a cursor.
 *  - spiderRef : renders above every layer (top layer, pointer-events none).
 *              The spider springs toward the pointer, faces its direction of
 *              travel, walks with an alternating leg gait, and trails a silk
 *              thread from the top of the viewport.
 *
 * Graceful degradation:
 *  - reduced motion  -> static web, native cursor, no spider loop.
 *  - coarse pointer  -> web only, native cursor (no spider).
 *  - No JS           -> nothing renders; content is fully usable.
 */

const DPR_CAP = 2;

// palette (mirrors the design tokens in globals.css)
const BG = "10, 10, 11"; //      #0a0a0b
const LINE = "63, 63, 70"; //    between --color-line and -strong
const AMBER = "217, 164, 65"; // #d9a441
const ON_AMBER = "20, 18, 16"; // --color-on-accent

interface Node {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Point {
  a: number;
  b: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function SpiderScene() {
  const webRef = useRef<HTMLCanvasElement | null>(null);
  const spiderRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const webCanvas = webRef.current;
    const spiderCanvas = spiderRef.current;
    if (!webCanvas || !spiderCanvas) return;

    const maybeWebCtx = webCanvas.getContext("2d");
    const maybeSpiderCtx = spiderCanvas.getContext("2d");
    if (!maybeWebCtx || !maybeSpiderCtx) return;
    // Narrow once to non-null consts so every closure below sees a definite type.
    const webCtx: CanvasRenderingContext2D = maybeWebCtx;
    const spiderCtx: CanvasRenderingContext2D = maybeSpiderCtx;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // ---- state -------------------------------------------------------------
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes: Node[] = [];
    let edges: Point[] = [];
    let anchors: number[] = [];

    // pointer + spider spring
    const pointer = { x: -9999, y: -9999, active: false };
    const spider = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      angle: 0,
      targetAngle: 0,
      step: 0,
      visible: false,
    };

    let raf = 0;
    let last = 0;

    // ---- capability flags --------------------------------------------------
    const spiderEnabled = () =>
      finePointer.matches && !reduceMotion.matches;

    const applyCursorClass = () => {
      root.classList.toggle("spider-cursor", spiderEnabled());
    };

    // ---- geometry ----------------------------------------------------------
    function buildWeb() {
      nodes = [];
      edges = [];
      anchors = [];

      // Anchor the web to a point just beyond the top-right corner and let its
      // spokes fan across the viewport — like a real web spun into a doorway.
      const cx = width * 0.94;
      const cy = -height * 0.06;
      const maxR = Math.hypot(width, height) * 1.15;

      const spokeCount = width < 640 ? 14 : 20;
      const ringCount = width < 640 ? 5 : 8;

      const angleFrom = (118 * Math.PI) / 180;
      const angleTo = (232 * Math.PI) / 180;

      // spoke endpoints (extended past the far corner so threads run off-screen)
      const spokeAngles: number[] = [];
      for (let s = 0; s < spokeCount; s++) {
        spokeAngles.push(
          angleFrom + (angleTo - angleFrom) * (s / (spokeCount - 1)),
        );
      }

      // build rings from inner to outer; each ring is a list of node indices
      const rings: number[][] = [];
      for (let r = 0; r < ringCount; r++) {
        // radius grows outward with slight jitter for an organic feel
        const t = (r + 1) / ringCount;
        const radius = maxR * (0.05 + Math.pow(t, 1.35) * 0.95);
        const ring: number[] = [];
        for (let s = 0; s < spokeCount; s++) {
          const jitter = rand(-0.02, 0.02) * maxR;
          const rr = radius + jitter;
          const x = cx + Math.cos(spokeAngles[s]) * rr;
          const y = cy + Math.sin(spokeAngles[s]) * rr;
          ring.push(nodes.length);
          nodes.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, r: 1.6 });
        }
        rings.push(ring);
      }

      // radial edges between consecutive rings
      for (let r = 0; r < rings.length - 1; r++) {
        for (let s = 0; s < spokeCount; s++) {
          edges.push({ a: rings[r][s], b: rings[r + 1][s] });
        }
      }
      // spiral/cross edges within each ring
      for (let r = 0; r < rings.length; r++) {
        for (let s = 0; s < spokeCount - 1; s++) {
          edges.push({ a: rings[r][s], b: rings[r][s + 1] });
        }
      }

      // hub (a single node near the corner) tying the innermost ring together
      const hubIndex = nodes.length;
      nodes.push({ ox: cx, oy: cy, x: cx, y: cy, vx: 0, vy: 0, r: 2.4 });
      for (let s = 0; s < spokeCount; s++) {
        edges.push({ a: hubIndex, b: rings[0][s] });
      }
      anchors.push(hubIndex);

      // a few outer spokes anchored off-screen so the web feels attached
      for (let s = 0; s < spokeCount; s += 3) {
        anchors.push(rings[rings.length - 1][s]);
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

      for (const c of [webCanvas, spiderCanvas]) {
        if (!c) continue;
        c.width = Math.floor(width * dpr);
        c.height = Math.floor(height * dpr);
        c.style.width = `${width}px`;
        c.style.height = `${height}px`;
      }
      webCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spiderCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildWeb();

      // place spider under the pointer on first layout if we have one
      if (pointer.active && !spider.visible) {
        spider.x = pointer.x;
        spider.y = pointer.y;
        spider.visible = true;
      }
    }

    // ---- simulation --------------------------------------------------------
    function simulate(dt: number) {
      const R = Math.min(width, height) * 0.28;
      const R2 = R * R;
      const pull = 26;
      const stiffness = 0.02;
      const damping = 0.86;

      for (const n of nodes) {
        let fx = (n.ox - n.x) * stiffness;
        let fy = (n.oy - n.y) * stiffness;

        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const falloff = 1 - d / R;
            const f = falloff * falloff * pull;
            fx += (dx / d) * f;
            fy += (dy / d) * f;
          }
        }

        n.vx = (n.vx + fx) * damping;
        n.vy = (n.vy + fy) * damping;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
      }

      // spider spring toward pointer
      if (spider.visible && pointer.active) {
        const k = 0.16;
        const dampingS = 0.78;
        spider.vx = (spider.vx + (pointer.x - spider.x) * k) * dampingS;
        spider.vy = (spider.vy + (pointer.y - spider.y) * k) * dampingS;
        spider.x += spider.vx * dt;
        spider.y += spider.vy * dt;

        const speed = Math.hypot(spider.vx, spider.vy);
        if (speed > 0.15) {
          spider.targetAngle = Math.atan2(spider.vy, spider.vx);
        }
        // shortest-arc angle lerp
        let diff = spider.targetAngle - spider.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        spider.angle += diff * 0.12;
        spider.step += speed * 0.35;
      }
    }

    // ---- render: web -------------------------------------------------------
    function renderWeb() {
      webCtx.clearRect(0, 0, width, height);
      const R = Math.min(width, height) * 0.28;

      // faint guide glow around the spider on the web plane
      if (pointer.active) {
        const g = webCtx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          R,
        );
        g.addColorStop(0, `rgba(${AMBER}, 0.05)`);
        g.addColorStop(1, `rgba(${AMBER}, 0)`);
        webCtx.fillStyle = g;
        webCtx.fillRect(0, 0, width, height);
      }

      webCtx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        let alpha = 0.16;
        if (pointer.active) {
          const d = Math.hypot(pointer.x - mx, pointer.y - my);
          const near = Math.max(0, 1 - d / R);
          alpha += near * near * 0.55;
          const warm = Math.min(1, near * 1.4);
          webCtx.strokeStyle = `rgba(${
            warm > 0.05 ? AMBER : LINE
          }, ${alpha})`;
        } else {
          webCtx.strokeStyle = `rgba(${LINE}, ${alpha})`;
        }
        webCtx.beginPath();
        webCtx.moveTo(a.x, a.y);
        webCtx.lineTo(b.x, b.y);
        webCtx.stroke();
      }

      // junction nodes
      for (const n of nodes) {
        webCtx.fillStyle = `rgba(${LINE}, 0.22)`;
        webCtx.beginPath();
        webCtx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        webCtx.fill();
      }
    }

    // ---- render: spider ----------------------------------------------------
    function leg(
      ctx: CanvasRenderingContext2D,
      ox: number,
      oy: number,
      fx: number,
      fy: number,
      phase: number,
    ) {
      const lift = Math.max(0, Math.sin(phase)) * 3.2;
      const mx = (ox + fx) / 2;
      const my = (oy + fy) / 2 - lift;
      ctx.moveTo(ox, oy);
      ctx.quadraticCurveTo(mx, my, fx, fy);
    }

    function renderSpider() {
      spiderCtx.clearRect(0, 0, width, height);
      if (!spider.visible) return;

      const s = spider;

      // silk thread up to the top of the viewport (behind the body)
      spiderCtx.strokeStyle = `rgba(${AMBER}, 0.22)`;
      spiderCtx.lineWidth = 1;
      spiderCtx.beginPath();
      spiderCtx.moveTo(s.x, s.y);
      const sway = Math.sin(s.step * 0.02) * 10;
      spiderCtx.quadraticCurveTo(s.x + sway, s.y - 60, s.x + sway * 0.4, -4);
      spiderCtx.stroke();

      spiderCtx.save();
      spiderCtx.translate(s.x, s.y);
      spiderCtx.rotate(s.angle);

      // legs (drawn first, behind body)
      spiderCtx.strokeStyle = `rgba(${AMBER}, 0.85)`;
      spiderCtx.lineWidth = 1.25;
      spiderCtx.lineCap = "round";
      const legs: [number, number][] = [
        [10, 4],
        [7, 9],
        [-2, 10],
        [-9, 7],
      ];
      for (const [lx, ly] of legs) {
        spiderCtx.beginPath();
        // near side (+y)
        leg(spiderCtx, lx * 0.5, ly * 0.4, lx * 1.7, ly * 1.8, s.step + lx);
        spiderCtx.stroke();
        spiderCtx.beginPath();
        // far side (-y)
        leg(spiderCtx, lx * 0.5, -ly * 0.4, lx * 1.7, -ly * 1.8, s.step + lx + 1);
        spiderCtx.stroke();
      }

      // abdomen (rear) + cephalothorax (front)
      spiderCtx.fillStyle = `rgba(${BG}, 0.95)`;
      spiderCtx.strokeStyle = `rgba(${AMBER}, 0.9)`;
      spiderCtx.lineWidth = 1.25;

      spiderCtx.beginPath();
      spiderCtx.ellipse(-5, 0, 6, 4.6, 0, 0, Math.PI * 2);
      spiderCtx.fill();
      spiderCtx.stroke();

      spiderCtx.beginPath();
      spiderCtx.ellipse(4, 0, 4.2, 3.6, 0, 0, Math.PI * 2);
      spiderCtx.fill();
      spiderCtx.stroke();

      // eyes
      spiderCtx.fillStyle = `rgba(${AMBER}, 1)`;
      spiderCtx.beginPath();
      spiderCtx.arc(6.4, -1.4, 0.9, 0, Math.PI * 2);
      spiderCtx.arc(6.4, 1.4, 0.9, 0, Math.PI * 2);
      spiderCtx.fill();

      // faint anchor dot so the true click point is unambiguous
      spiderCtx.fillStyle = `rgba(${ON_AMBER}, 0)`;
      spiderCtx.restore();
    }

    // ---- loop --------------------------------------------------------------
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(2, (now - last) / 16.6667 || 1);
      last = now;

      simulate(dt);
      renderWeb();
      if (spiderEnabled()) renderSpider();
    }

    function start() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    // ---- events ------------------------------------------------------------
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (spiderEnabled() && !spider.visible) {
        spider.x = e.clientX;
        spider.y = e.clientY;
        spider.visible = true;
      }
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMediaChange = () => {
      applyCursorClass();
      if (!spiderEnabled()) {
        spider.visible = false;
        spiderCtx.clearRect(0, 0, width, height);
      }
    };

    // ---- boot --------------------------------------------------------------
    applyCursorClass();
    resize();
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMediaChange);
    finePointer.addEventListener("change", onMediaChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMediaChange);
      finePointer.removeEventListener("change", onMediaChange);
      root.classList.remove("spider-cursor");
    };
  }, []);

  return (
    <>
      {/* web — behind content */}
      <canvas
        ref={webRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {/* spider — above every layer */}
      <canvas
        ref={spiderRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80]"
      />
    </>
  );
}
