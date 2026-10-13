/**
 * spider.ts — the custom spider cursor, drawn with Canvas 2D.
 *
 * Design rules:
 *   - The native cursor is NEVER hidden. This is a small creature that trails the
 *     real pointer with a slight, smooth interpolation (a loose spring), rotating
 *     toward its direction of travel. Clicks stay pixel-precise.
 *   - Recognisable anatomy: a two-part body (abdomen + cephalothorax), eight
 *     two-segment articulated legs whose ripple amplitude tracks travel speed, and
 *     two eye pinpricks for a "face"/direction.
 *   - Restrained states: legs splay a little over interactive elements, the body
 *     compresses on mouse-down, and it fades out entirely over text fields so the
 *     native caret/selection stays intuitive.
 *
 * Pure rendering logic — no React, no DOM reads. Driven by SpiderExperience.
 */

export type SpiderPalette = {
  thread: string;
  accent: string;
  text: string;
  bg: string;
};
export type SpiderState = { hover: boolean; down: boolean };

export class SpiderCursor {
  x = -9999;
  y = -9999;
  vx = 0;
  vy = 0;
  angle = 0;
  scale = 0;
  crawl = 0;
  speed = 0;
  alpha = 0;

  /** active=false fades it out (e.g. over a text field) without teleporting it. */
  update(
    dt: number,
    tx: number,
    ty: number,
    active: boolean,
  ) {
    if (active) {
      if (this.x < -999) {
        // first appearance: start slightly offset so it walks into place
        this.x = tx + 22;
        this.y = ty + 22;
      }
      // slight, smooth interpolation toward the pointer — never welded, never lost
      const k = 0.17;
      const damp = 0.78;
      this.vx = (this.vx + (tx - this.x) * k) * damp;
      this.vy = (this.vy + (ty - this.y) * k) * damp;
      this.x += this.vx;
      this.y += this.vy;

      this.speed = Math.hypot(this.vx, this.vy);
      if (this.speed > 0.2) {
        const target = Math.atan2(this.vy, this.vx);
        let diff = target - this.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        this.angle += diff * 0.14;
      }
      // legs crawl more the faster it travels
      this.crawl += this.speed * 0.5 + 0.06 * Math.min(dt, 2);
      this.scale += (1 - this.scale) * 0.12;
      this.alpha += (1 - this.alpha) * 0.15;
    } else {
      this.alpha += (0 - this.alpha) * 0.2;
      this.speed *= 0.9;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    pal: SpiderPalette,
    state: SpiderState,
    vw: number,
    vh: number,
  ) {
    ctx.clearRect(0, 0, vw, vh);
    if (this.alpha < 0.02) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    const s = this.scale * this.alpha * 1.35;
    ctx.scale(s, s);
    ctx.globalAlpha = Math.min(1, this.alpha);
    ctx.lineCap = "round";

    const speedN = Math.min(1, this.speed * 0.05);
    const amp = 2.5 + speedN * 5;
    const splay = state.hover ? 1.16 : 1;
    const comp = state.down ? 0.82 : 1;

    // --- legs: 8 two-segment limbs with a per-leg phase so they ripple ---
    ctx.strokeStyle = pal.accent;
    ctx.lineWidth = 1.3;
    const legs: [number, number, number][] = [
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
      const ripple = Math.sin(this.crawl + ph) * amp;
      const side = ly < 0 ? -1 : 1;
      const ax = lx * splay;
      const ay = ly * splay;
      const kneeX = ax + 1.5;
      const kneeY = ay + side * 5 * comp + ripple * 0.4;
      const footX = ax + 5 * splay + ripple;
      const footY = ay + side * 11 * comp + ripple;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(footX, footY);
      ctx.stroke();
    }

    // --- body: two-part silhouette so it reads as a spider, not a dot ---
    ctx.fillStyle = pal.bg;
    ctx.strokeStyle = pal.accent;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(-5, 0, 6, 5, 0, 0, Math.PI * 2); // abdomen
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(4, 0, 4.5, 3.8, 0, 0, Math.PI * 2); // cephalothorax
    ctx.fill();
    ctx.stroke();

    // --- eyes: two pinpricks for a face and a sense of direction ---
    ctx.fillStyle = pal.text;
    ctx.beginPath();
    ctx.arc(6.5, -1.8, 1, 0, Math.PI * 2);
    ctx.arc(6.5, 1.8, 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.globalAlpha = 1;
  }
}
