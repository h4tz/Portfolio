"use client";

import { useEffect, useRef } from "react";
import { SpiderWeb } from "./spiderWeb";
import { SpiderCursor } from "./spider";

/**
 * SpiderExperience — one coherent interactive system.
 *
 * Renders two stacked canvases (see globals.css for the layer order):
 *   #web-canvas     z 0   — the orb web, behind all content
 *   #follower-canvas z 70 — the spider, in front, trailing the pointer
 *
 * A SINGLE requestAnimationFrame loop updates and draws both, and a single set
 * of pointer listeners feeds them, so the spider and the web always agree about
 * where the pointer is (they read one shared state object). No React state is
 * touched per frame — everything hot lives in refs/instances.
 *
 * Accessibility & fallbacks:
 *   - prefers-reduced-motion → web draws one static frame; no loop; no spider.
 *   - coarse pointers / touch / no fine pointer → no spider (native cursor stays).
 *   - Save-Data or `?still` in the URL → no spider.
 *   - Hovering a text field → spider fades out so the native caret stays usable.
 *   - The native cursor is never hidden; both canvases are pointer-events:none.
 *   - Loop pauses when the tab is hidden.
 */
export function SpiderExperience() {
  const webRef = useRef<HTMLCanvasElement | null>(null);
  const folRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const webCanvas = webRef.current;
    const folCanvas = folRef.current;
    if (!webCanvas || !folCanvas) return;
    const wctx = webCanvas.getContext("2d");
    const sctx = folCanvas.getContext("2d");
    if (!wctx || !sctx) return;
    // Narrow once to non-null consts so every nested closure sees a definite type.
    const W: CanvasRenderingContext2D = wctx;
    const S: CanvasRenderingContext2D = sctx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    );
    const still = /[?&]still(=1)?(&|$)/.test(window.location.search);

    const css = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      (css.getPropertyValue(name) || "").trim() || fallback;
    const accent = read("--color-accent", "#d9a441");
    const text = read("--color-text", "#ecebe8");
    const bg = read("--color-bg", "#0a0a0b");
    const thread = "#8b8b95"; // fine silver — the web threads
    const webPal = { thread, accent };
    const spiderPal = { thread, accent, text, bg };

    const web = new SpiderWeb();
    const spider = new SpiderCursor();

    let w = 0;
    let h = 0;
    let dpr = 1;

    // shared pointer state — the single source of truth for both effects
    const ptr = {
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      on: false,
      down: false,
      hover: false,
      text: false,
    };
    let lastTx = ptr.tx;
    let lastTy = ptr.ty;

    const spiderEnabled = () =>
      fine.matches && !reduce.matches && !saveData && !still;

    function sizeCanvas(
      c: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      sizeCanvas(webCanvas!, W);
      sizeCanvas(folCanvas!, S);
      web.build(w, h);
      if (reduce.matches) web.draw(W, webPal); // static frame for reduced motion
    }

    function apply() {
      const on = spiderEnabled();
      document.documentElement.classList.toggle("hb-follower", on);
      if (!on) {
        spider.alpha = 0;
        S.clearRect(0, 0, w, h);
      }
      if (reduce.matches) web.draw(W, webPal);
    }

    // ---- single animation loop ----
    let raf = 0;
    let last = 0;
    let running = false;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 16.6667, 2) || 1;
      last = now;

      // pointer velocity in px/frame (clamped so fast flicks don't explode the sim)
      const pvx = Math.max(-60, Math.min(60, ptr.tx - lastTx));
      const pvy = Math.max(-60, Math.min(60, ptr.ty - lastTy));
      lastTx = ptr.tx;
      lastTy = ptr.ty;

      web.update(dt, ptr.tx, ptr.ty, pvx, pvy, ptr.on);
      web.draw(W, webPal);

      if (spiderEnabled()) {
        const active = !ptr.text;
        spider.update(dt, ptr.tx, ptr.ty, active);
        spider.draw(S, spiderPal, { hover: ptr.hover, down: ptr.down }, w, h);
      }
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    // ---- pointer listeners ----
    const INTERACTIVE =
      'a,button,[role="button"],[role="link"],label,summary,[tabindex]:not([tabindex="-1"])';
    const TEXT =
      'input,textarea,select,[contenteditable="true"],[contenteditable=""]';

    function onMove(e: PointerEvent) {
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      ptr.on = true;
      const t = e.target;
      if (t instanceof Element) {
        ptr.text = Boolean(t.closest(TEXT));
        ptr.hover = !ptr.text && Boolean(t.closest(INTERACTIVE));
      }
    }
    function onDown(e: PointerEvent) {
      ptr.down = true;
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      ptr.on = true;
      web.impulse(e.clientX, e.clientY, 1); // silk ripple on click/tap
    }
    function onUp() {
      ptr.down = false;
    }
    function onLeave() {
      ptr.on = false;
      ptr.hover = false;
      ptr.text = false;
    }
    function onVis() {
      if (document.hidden) stop();
      else if (!reduce.matches) start();
    }
    function onMedia() {
      apply();
      if (!reduce.matches) start();
    }

    resize();
    apply();
    if (!reduce.matches) start();
    else web.draw(W, webPal);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener("change", onMedia);
    fine.addEventListener("change", onMedia);

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener("change", onMedia);
      fine.removeEventListener("change", onMedia);
      document.documentElement.classList.remove("hb-follower");
      W.clearRect(0, 0, w, h);
      S.clearRect(0, 0, w, h);
    };
  }, []);

  return (
    <>
      <canvas id="web-canvas" ref={webRef} aria-hidden="true" />
      <canvas id="follower-canvas" ref={folRef} aria-hidden="true" />
    </>
  );
}
