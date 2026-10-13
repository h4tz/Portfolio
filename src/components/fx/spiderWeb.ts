/**
 * spiderWeb.ts — an orb spider-web rendered with Canvas 2D.
 *
 * Geometry (see build()):
 *   - One hub, off toward the upper-right so the dense centre sits in negative
 *     space rather than behind the hero copy.
 *   - N radial strands ("spokes") fan out from the hub to anchor points placed
 *     just beyond the farthest viewport corner, so the web reads as suspended
 *     in darkness with threads running off-screen.
 *   - K concentric rings connect the radials. Each ring segment sags gently
 *     toward the hub through a free midpoint, giving the scalloped capture-spiral
 *     look of a real orb web instead of a mathematically perfect icon.
 *
 * Physics: every non-pinned node is a small mass in a spring network.
 *   - A weak "shape memory" spring pulls each node back to its rest pose, so the
 *     web is perfectly still when idle.
 *   - Springs along every strand transmit tension between neighbours, so a push
 *     in one place ripples outward like silk under load and settles smoothly.
 *   - The pointer applies a local repulsive push (plus a drag along its velocity)
 *     to nearby nodes; clicking injects an outward impulse that travels as a ripple.
 *
 * Node/strand counts are bounded (~250 nodes, ~400 strands on desktop), so the
 * per-frame O(strands) update and draw are cheap. This module is pure rendering
 * logic — it knows nothing about React or layout.
 */

export type WebPalette = { thread: string; accent: string };

type WNode = {
  x: number;
  y: number;
  rx: number; // rest x
  ry: number; // rest y
  vx: number;
  vy: number;
  pin: boolean;
  glow: number; // 0..1 proximity highlight, decays
};

type WStrand = {
  a: number;
  b: number;
  rest: number; // rest length
  alpha: number; // base opacity
  w: number; // base line width
  ring: boolean;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const dist = (ax: number, ay: number, bx: number, by: number) =>
  Math.hypot(bx - ax, by - ay);

export class SpiderWeb {
  private nodes: WNode[] = [];
  private strands: WStrand[] = [];
  private fxa: Float32Array = new Float32Array(0);
  private fya: Float32Array = new Float32Array(0);
  private px = -9999;
  private py = -9999;
  private pvx = 0;
  private pvy = 0;
  private on = false;

  w = 0;
  h = 0;

  // Interaction tuning — deliberately restrained.
  private Rp = 180; // pointer influence radius (px)
  private push = 0.5; // repulsion strength
  private drag = 0.085; // how much pointer velocity drags nearby nodes
  private kShape = 0.03; // return-to-rest stiffness
  private kSpring = 0.12; // strand tension stiffness
  private damping = 0.86; // velocity damping

  build(w: number, h: number) {
    this.w = w;
    this.h = h;
    const nodes: WNode[] = [];
    const strands: WStrand[] = [];

    // Primary orb — upper-right, large, in the open negative space.
    const hx1 = w * (w < 640 ? 0.68 : 0.74);
    const hy1 = h * 0.24;
    const R1 = w < 640 ? 11 : w < 1100 ? 14 : 16;
    this.addOrb(
      nodes,
      strands,
      hx1,
      hy1,
      this.cornerLen(hx1, hy1, w, h) * 1.18,
      R1,
      10,
    );

    // Secondary orb — bottom-left, smaller, peeking in from the corner so the
    // effect reads as intentional across the page, not a single hero prop.
    if (w >= 640) {
      const hx2 = w * 0.12;
      const hy2 = h * 0.84;
      this.addOrb(
        nodes,
        strands,
        hx2,
        hy2,
        this.cornerLen(hx2, hy2, w, h) * 0.62,
        10,
        8,
      );
    }

    this.nodes = nodes;
    this.strands = strands;
    this.fxa = new Float32Array(nodes.length);
    this.fya = new Float32Array(nodes.length);
  }

  private cornerLen(hx: number, hy: number, w: number, h: number) {
    let maxLen = 0;
    for (const [cx, cy] of [
      [0, 0],
      [w, 0],
      [0, h],
      [w, h],
    ]) {
      const d = dist(hx, hy, cx, cy);
      if (d > maxLen) maxLen = d;
    }
    return maxLen;
  }

  private addOrb(
    nodes: WNode[],
    strands: WStrand[],
    hx: number,
    hy: number,
    baseLen: number,
    R: number,
    S: number,
  ) {
    const K = S - 1; // rings (one per interior level)

    const add = (x: number, y: number, pin: boolean) => {
      nodes.push({ x, y, rx: x, ry: y, vx: 0, vy: 0, pin, glow: 0 });
      return nodes.length - 1;
    };
    const hub = add(hx, hy, true);

    const angleJitter = (Math.random() - 0.5) * 0.18;

    // Radials
    const rows: number[][] = [];
    for (let i = 0; i < R; i++) {
      const ang =
        (i / R) * Math.PI * 2 + angleJitter + (Math.random() - 0.5) * 0.12;
      const dx = Math.cos(ang);
      const dy = Math.sin(ang);
      const len = baseLen * (0.9 + Math.random() * 0.2);
      const anchor = add(hx + dx * len, hy + dy * len, true);

      const row: number[] = [hub];
      for (let s = 1; s < S; s++) {
        const f = s / S;
        const jx = (Math.random() - 0.5) * 7;
        const jy = (Math.random() - 0.5) * 7;
        const idx = add(hx + dx * len * f + jx, hy + dy * len * f + jy, false);
        row.push(idx);
        const depth = s / S;
        const pa = nodes[row[s - 1]];
        const pb = nodes[idx];
        strands.push({
          a: row[s - 1],
          b: idx,
          rest: dist(pa.x, pa.y, pb.x, pb.y),
          alpha: lerp(0.46, 0.3, depth) + (Math.random() - 0.5) * 0.06,
          w: lerp(1.1, 0.8, depth),
          ring: false,
        });
      }
      const last = nodes[row[S - 1]];
      const anc = nodes[anchor];
      strands.push({
        a: row[S - 1],
        b: anchor,
        rest: dist(last.x, last.y, anc.x, anc.y),
        alpha: 0.3 + (Math.random() - 0.5) * 0.05,
        w: 0.8,
        ring: false,
      });
      rows.push(row);
    }

    // Rings — each segment sags toward the hub through a free midpoint.
    for (let k = 1; k <= K; k++) {
      const depth = k / K;
      const ringAlpha = lerp(0.34, 0.24, depth) + (Math.random() - 0.5) * 0.05;
      for (let i = 0; i < R; i++) {
        const i2 = (i + 1) % R;
        const A = rows[i][k];
        const B = rows[i2][k];
        const na = nodes[A];
        const nb = nodes[B];
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2;
        let tox = mx - hx;
        let toy = my - hy;
        const tl = Math.hypot(tox, toy) || 1;
        tox /= tl;
        toy /= tl;
        const seg = dist(na.x, na.y, nb.x, nb.y);
        const sag = seg * 0.12;
        const M = add(mx - tox * sag, my - toy * sag, false);
        const nm = nodes[M];
        strands.push({
          a: A,
          b: M,
          rest: dist(na.x, na.y, nm.x, nm.y),
          alpha: ringAlpha,
          w: 0.9,
          ring: true,
        });
        strands.push({
          a: M,
          b: B,
          rest: dist(nm.x, nm.y, nb.x, nb.y),
          alpha: ringAlpha,
          w: 0.9,
          ring: true,
        });
      }
    }
  }

  /** Advance the spring simulation one step. dt is normalized (~1 at 60fps). */
  update(
    dt: number,
    px: number,
    py: number,
    pvx: number,
    pvy: number,
    on: boolean,
  ) {
    this.px = px;
    this.py = py;
    this.pvx = pvx;
    this.pvy = pvy;
    this.on = on;
    const nodes = this.nodes;
    const strands = this.strands;
    if (nodes.length === 0) return;
    const fxa = this.fxa;
    const fya = this.fya;
    fxa.fill(0);
    fya.fill(0);
    const Rp2 = this.Rp * this.Rp;
    const step = Math.min(Math.max(dt, 0.5), 2);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.glow *= 0.9;
      if (n.pin) continue;
      // shape memory toward rest pose
      fxa[i] += (n.rx - n.x) * this.kShape;
      fya[i] += (n.ry - n.y) * this.kShape;
      if (on) {
        const dx = n.x - px;
        const dy = n.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < Rp2) {
          const d = Math.sqrt(d2) || 1;
          const fall = 1 - d / this.Rp;
          const p = fall * fall * this.push;
          fxa[i] += (dx / d) * p + this.pvx * fall * this.drag;
          fya[i] += (dy / d) * p + this.pvy * fall * this.drag;
          if (fall > n.glow) n.glow = fall;
        }
      }
    }

    // strand tension — pulls each pair toward its rest length
    for (let s = 0; s < strands.length; s++) {
      const st = strands[s];
      const A = nodes[st.a];
      const B = nodes[st.b];
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const d = Math.hypot(dx, dy);
      if (d < 1e-4) continue;
      const H = ((d - st.rest) / d) * this.kSpring;
      const hx2 = dx * H;
      const hy2 = dy * H;
      fxa[st.a] += hx2;
      fya[st.a] += hy2;
      fxa[st.b] -= hx2;
      fya[st.b] -= hy2;
    }

    // integrate free nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.pin) continue;
      n.vx = (n.vx + fxa[i] * step) * this.damping;
      n.vy = (n.vy + fya[i] * step) * this.damping;
      const v2 = n.vx * n.vx + n.vy * n.vy;
      if (v2 > 144) {
        const f = 12 / Math.sqrt(v2);
        n.vx *= f;
        n.vy *= f;
      }
      n.x += n.vx * step;
      n.y += n.vy * step;
    }
  }

  /** Inject an outward impulse — the "silk ripple" from a click/tap. */
  impulse(x: number, y: number, strength = 1) {
    const R = 210;
    const R2 = R * R;
    for (const n of this.nodes) {
      if (n.pin) continue;
      const dx = n.x - x;
      const dy = n.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2) {
        const d = Math.sqrt(d2) || 1;
        const fall = 1 - d / R;
        const s = fall * strength * 7;
        n.vx += (dx / d) * s;
        n.vy += (dy / d) * s;
        if (fall > n.glow) n.glow = fall;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, pal: WebPalette) {
    ctx.clearRect(0, 0, this.w, this.h);
    const nodes = this.nodes;
    if (nodes.length === 0) return;
    ctx.lineCap = "round";

    for (let s = 0; s < this.strands.length; s++) {
      const st = this.strands[s];
      const A = nodes[st.a];
      const B = nodes[st.b];
      const heat = (A.glow + B.glow) * 0.5;
      ctx.globalAlpha = Math.min(0.85, st.alpha + heat * 0.45);
      ctx.strokeStyle = heat > 0.08 ? pal.accent : pal.thread;
      ctx.lineWidth = st.w + heat * 0.4;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    }

    // subtle anchor/intersection dots — the hub on-screen, anchors off-screen
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.pin) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = pal.thread;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (n.glow > 0.14) {
        ctx.globalAlpha = Math.min(0.9, n.glow);
        ctx.fillStyle = pal.accent;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.1 + n.glow, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
}
