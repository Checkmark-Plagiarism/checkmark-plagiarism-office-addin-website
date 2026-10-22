/* src/lib/sky/cloud-shape.ts (copied from the public website, src/sections/redesign/cloud-shape.ts)
   Cloud shape generator. A cloud is a flat-bottomed cluster of 6-8 rounded
   boxes of similar area in two rows: a base row of 4-5 boxes and a crown of
   2-3 boxes on top of it.

   1. Plan, fixed for every retry of one cloud: base count, typical box height
      hb (small to big-boxed), how tightly the base overlaps, and a silhouette:
        dome   - the hump near the middle, both sides falling away
        lean   - the hump near one end, the other side trailing low
        twin   - two humps of different heights with a saddle between
        sprawl - five wide, flat base boxes under a modest crown
   2. Base row: boxes of about equal area (taller = narrower, w/h 1.12-1.56)
      on the base line, overlapping by 14-36% of the narrower one. Each
      neighbour steps up or down by >= 15% and >= 12px, any three span >= 20%
      (no rows of look-alike boxes), never three steps the same way (no
      staircases), at most one end stands above its neighbour, and a lower end
      keeps >= 80% of its neighbour's area (no small tail).
   3. Crown: one box straddling each of a run of consecutive base seams, so
      the crown sits half a box off the base (never a grid) and covers the
      tops of those seams. The peak box is seated first; the others step down
      from it or dip and rise again (twin), and where two neighbouring tops
      end up < 20px apart their heights differ by >= 18%. Each crown box sinks
      10px to ~30% of its height into the base under it: no holes, no hanging
      bits.
   4. Every attempt is rounded to 0.1px and checked by validate(); retries are
      bounded and the best attempt (or a fixed cloud) is returned. W <= MAX_W
      on every path, so a cloud scaled 1.63 stays under the 900px drift start.

   Deterministic for a given rand(): only + - * /, sqrt, min/max/abs/floor/round,
   so a seeded rand gives the same cloud on the server and in every browser. */

export type Puff = { x: number; y: number; w: number; h: number };
export type CloudSpec = { w: number; h: number; puffs: Puff[] };

type Rand = () => number;
type Arch = "dome" | "lean" | "twin" | "sprawl";
type Plan = { nb: number; arch: Arch; side: number; t: number; tight: boolean; lowBase: boolean; puffy: boolean };
/** A box during construction: x to the right, b = bottom above the base line, T = target top. */
type Box = { x: number; b: number; w: number; h: number; T?: number };
type Ctx = { cover: Float32Array; hb: number; A: number; hLo: number; hHi: number; aLo: number; aHi: number };

const MIN_PUFFS = 6;
const MAX_PUFFS = 11;
const MAX_W = 540;
const ATTEMPTS = 40;

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const round1 = (v: number) => Math.round(v * 10) / 10;
const top = (p: Box) => p.b + p.h;
const area = (p: { w: number; h: number }) => p.w * p.h;
const between = (rand: Rand) => (a: number, b: number) => a + (b - a) * rand();

/* ---------- plan ---------- */

function pickPlan(rand: Rand): Plan {
  const nb = rand() < 0.38 ? 4 : 5;
  const k = rand();
  let arch: Arch;
  if (nb === 4) arch = k < 0.42 ? "dome" : k < 0.72 ? "lean" : "twin";
  else arch = k < 0.3 ? "dome" : k < 0.52 ? "lean" : k < 0.78 ? "twin" : "sprawl";
  // t: typical box height (4-box clouds run from small to big-boxed);
  // tight: deeper base overlaps; lowBase: shorter base boxes; puffy: squarer crown boxes
  return { nb, arch, side: rand() < 0.5 ? -1 : 1, t: rand(), tight: rand() < 0.4, lowBase: rand() < 0.35, puffy: rand() < 0.5 };
}

/* ---------- coverage: highest top (above the base line) per 1px column ---------- */

function stamp(cover: Float32Array, p: Box) {
  const a = Math.max(0, Math.floor(p.x));
  const z = Math.min(cover.length - 1, Math.ceil(p.x + p.w) - 1);
  for (let i = a; i <= z; i++) if (top(p) > cover[i]) cover[i] = top(p);
}

function coverRange(cover: Float32Array, a: number, z: number) {
  let lo = 1e9;
  let hi = 0;
  const i0 = Math.max(0, Math.floor(a));
  const i1 = Math.min(cover.length - 1, Math.ceil(z));
  for (let i = i0; i <= i1; i++) {
    if (cover[i] < lo) lo = cover[i];
    if (cover[i] > hi) hi = cover[i];
  }
  return { lo, hi };
}

/* ---------- base row ---------- */

const S_LO = 0.76;
const S_HI = 1.12;
const S_LOW_BASE = 0.06; // a lowBase cloud shifts the range down by this

/* Which way each base box steps from the one before (true = taller).
   Mostly alternating; never three the same way; at most one end stands above
   its neighbour. `strict` = pure alternation, the fallback when hb is small and
   12px steps leave room for only two levels. */
function stepDirections(rand: Rand, nb: number, strict: boolean): boolean[] | null {
  const d = [false];
  if (strict) {
    const first = nb === 5 || rand() < 0.5;
    for (let i = 1; i < nb; i++) d.push(i === 1 ? first : !d[i - 1]);
    return d;
  }
  const r = rand();
  const tallEnd = r < 0.3 ? 0 : r < 0.6 ? nb - 1 : -1;
  for (let i = 1; i < nb; i++) {
    if (i === 1) d.push(tallEnd !== 0);
    else if (i === nb - 1) d.push(tallEnd === nb - 1);
    else d.push(rand() < 0.7 ? !d[i - 1] : d[i - 1]);
  }
  for (let i = 3; i < nb; i++) if (d[i] === d[i - 1] && d[i - 1] === d[i - 2]) return null;
  return d;
}

/* Base heights (relative to hb) following directions d: each step >= 15% and
   >= 12px, any three span >= 20%, a lower end >= 76% of its neighbour.
   Bounded rejection sampling; null if nothing fits. */
function sampleHeights(rand: Rand, nb: number, hb: number, d: boolean[], sLo: number, sHi: number): number[] | null {
  for (let att = 0; att < 12; att++) {
    const s = [sLo + (sHi - sLo) * rand()];
    for (let i = 1; i < nb; i++) {
      const a = s[i - 1];
      let lo = sLo;
      let hi = sHi;
      if (d[i]) {
        lo = Math.max(a * 1.15, a + 12 / hb);
        if (i === 1) hi = Math.min(hi, a / 0.76);
      } else {
        hi = Math.min(a / 1.15, a - 12 / hb);
        if (i === nb - 1) lo = Math.max(lo, 0.76 * a);
      }
      if (hi < lo) break;
      const c = lo + (hi - lo) * rand();
      if (i >= 2 && Math.max(c, a, s[i - 2]) / Math.min(c, a, s[i - 2]) < 1.2) break;
      s.push(c);
    }
    if (s.length === nb) return s;
  }
  return null;
}

function baseHeights(rand: Rand, nb: number, hb: number, sLo: number, sHi: number): number[] | null {
  const d = stepDirections(rand, nb, false);
  return (d && sampleHeights(rand, nb, hb, d, sLo, sHi)) || sampleHeights(rand, nb, hb, stepDirections(rand, nb, true)!, sLo, sHi);
}

/* Base boxes of about equal area A (taller = narrower), laid left to right
   with overlaps of 14-30% (loose) or 20-36% (tight) of the narrower box;
   end overlaps are shallower. */
function baseRow(rand: Rand, nb: number, hb: number, A: number, ovLo: number, lowBase: boolean): Box[] | null {
  const R = between(rand);
  const dl = lowBase ? S_LOW_BASE : 0;
  const s = baseHeights(rand, nb, hb, S_LO - dl, S_HI - dl);
  if (!s) return null;
  const row: Box[] = [];
  for (let i = 0; i < nb; i++) {
    const h = hb * s[i];
    row.push({ x: 0, b: 0, w: clamp((A * R(0.9, 1.1)) / h, h * 1.12, h * 1.56), h });
  }
  for (const [e, n] of [
    [0, 1],
    [nb - 1, nb - 2],
  ]) {
    // A lower end keeps >= 80% of its neighbour's area: widen the end, and if
    // that is not enough, narrow the neighbour (both within aspect limits).
    row[e].w = clamp((0.8 * area(row[n])) / row[e].h, row[e].w, row[e].h * 1.56);
    row[n].w = clamp(area(row[e]) / (0.8 * row[n].h), row[n].h * 1.12, row[n].w);
    // and may float a few px up: a rounded end, not a step
    const room = row[n].h - row[e].h - 14;
    if (room > 3 && rand() < 0.3) row[e].b = Math.min(R(3, 7), room);
  }
  let x = 0;
  for (let i = 0; i < nb; i++) {
    row[i].x = x;
    const end = i === 0 || i === nb - 2;
    if (i < nb - 1) x += row[i].w - R(ovLo, ovLo + (end ? 0.12 : 0.16)) * Math.min(row[i].w, row[i + 1].w);
  }
  return row;
}

/* ---------- crown ---------- */

/* A crown box centred at cx with its top as near T as it can get: a height in
   [hLo, hHi]*hb that lets the top reach T with the bottom 10px to maxSink*h
   below the lowest cover under its middle; with `avoidH`, stay >= 18% (of the
   larger) away from that height. The width follows from the area A. */
function crownAt(rand: Rand, cx: number, T: number | null, ctx: Ctx, maxSink: number, avoidH: number): Box {
  const { cover, hb, A } = ctx;
  let a = ctx.hLo * hb;
  let z = ctx.hHi * hb;
  if (T !== null) {
    // top = lo - sink + h with 10 <= sink <= maxSink*h
    const w0 = Math.sqrt(A * 1.3);
    const lo0 = coverRange(cover, cx - 0.35 * w0, cx + 0.35 * w0).lo;
    const a1 = Math.max(a, T - lo0 + 10);
    const z1 = Math.min(z, (T - lo0) / (1 - maxSink));
    if (a1 <= z1) {
      a = a1;
      z = z1;
    } else if (a1 > z) a = z; // needs a taller box than allowed: the tallest
    else z = a; // needs a shorter box than allowed: the shortest
  }
  let h = a + (z - a) * rand();
  if (avoidH && h > avoidH / 1.22 && h < avoidH * 1.22) {
    const dn = avoidH / 1.22;
    const up = avoidH * 1.22;
    if (dn >= a) h = a + (dn - a) * rand();
    else if (up <= z) h = up + (z - up) * rand();
    else h = clamp(rand() < 0.5 ? dn : up, ctx.hLo * hb, ctx.hHi * hb);
  }
  const w = clamp((A * (0.92 + 0.16 * rand())) / h, h * ctx.aLo, h * ctx.aHi);
  return { x: cx - w / 2, b: 0, w, h, T: T ?? undefined };
}

/* Seat p: bottom 10px to maxSink*h below the lowest cover under its middle 70%
   (nothing hangs), top as near p.T as that allows, and >= minRise above
   everything under it (it has to show). */
function seat(p: Box, cover: Float32Array, minRise: number, maxSink: number): boolean {
  const { lo } = coverRange(cover, p.x + 0.15 * p.w, p.x + 0.85 * p.w);
  const { hi } = coverRange(cover, p.x, p.x + p.w);
  p.b = clamp(p.T! - p.h, lo - maxSink * p.h, lo - 10);
  return top(p) >= hi + minRise;
}

/* Crown run: how many boxes, which seams, which box is the peak, and how far
   each top sits under the peak's (drop). With similar box sizes and bounded
   sinks a crown top can land only ~30px under the peak's, so the shapes come
   from a few patterns (P peak, s shoulder, S saddle, Q lower second hump),
   mirrored at random:
     dome  [s P s']  one side falls 26-32px, the other 16-22px
     2-box [P s]     dome on a small 4-box base, or lean (the peak at the
                     run's outer end, the run at one end of the base)
     twin  [P S Q]   the saddle 24-30px under P, Q 12-18px out of it */
function crownPlan(rand: Rand, plan: Plan, nb: number) {
  const R = between(rand);
  const { arch, side, t } = plan;
  let k1 = 3;
  if (arch === "lean" || (arch === "dome" && nb === 4 && rand() < (t < 0.25 ? 0.5 : 0.25))) k1 = 2;
  const free = nb - 1 - k1;
  // lean sits toward one end; the rest anywhere along the base
  let s0 = Math.floor(rand() * (free + 1));
  if (arch === "lean") s0 = side < 0 ? 0 : free;
  const sag = R(24, 30);
  let seq: number[];
  if (k1 === 2) seq = [0, R(18, 30)];
  else if (arch === "twin") seq = [0, sag, sag - R(12, Math.min(18, sag - 12))];
  else seq = [R(26, 32), 0, R(16, 22)];
  // lean: the peak at the run's outer end; otherwise either way round
  if (arch === "lean" ? side > 0 : rand() < 0.5) seq.reverse();
  return { k1, s0, peak: seq.indexOf(0), drop: seq };
}

/* ---------- one construction attempt ---------- */

function build(rand: Rand, plan: Plan): Box[] | null {
  const R = between(rand);
  const { nb, arch, t, tight } = plan;
  let hb = nb === 4 ? 58 + 28 * t : 66 + 18 * t;
  let wide = R(1.34, 1.52);
  if (arch === "sprawl") {
    hb = 68 + 8 * t;
    wide = R(1.56, 1.66);
  }
  const A = hb * hb * wide;
  const base = baseRow(rand, nb, hb, A, arch === "sprawl" || !tight ? 0.14 : 0.2, plan.lowBase);
  if (!base) return null;
  const last = base[nb - 1];
  const W = last.x + last.w;
  if (W > MAX_W - 20) return null;
  const cover = new Float32Array(Math.ceil(W) + 2);
  for (const p of base) stamp(cover, p);
  // crown boxes: puffy (squarer) or broad, per cloud
  const ctx: Ctx = { cover, hb, A, hLo: 0.86, hHi: 1.2, aLo: 1.12, aHi: plan.puffy ? 1.32 : 1.5 };

  const { k1, s0, peak, drop } = crownPlan(rand, plan, nb);
  const seam: number[] = [];
  for (let j = 0; j < k1; j++) {
    const i = s0 + j;
    seam.push((base[i + 1].x + base[i].x + base[i].w) / 2);
  }
  // crown inset: never closer than 24% of an end box to the cloud's ends
  const lim0 = 0.24 * base[0].w;
  const lim1 = W - 0.24 * last.w;

  // the peak: tall, with a shallow sink
  const crown: Box[] = new Array(k1);
  const proud = rand() < 0.6;
  const pk = crownAt(rand, seam[peak] + R(-0.15, 0.15) * hb, null, { ...ctx, hLo: proud ? 1.1 : 1.0, hHi: proud ? 1.2 : 1.1 }, 0.3, 0);
  pk.x = clamp(pk.x, lim0, lim1 - pk.w);
  pk.T = coverRange(cover, pk.x + 0.15 * pk.w, pk.x + 0.85 * pk.w).lo - R(10, 14) + pk.h;
  if (!seat(pk, cover, 30, 0.3)) return null;
  crown[peak] = pk;
  const pTop = top(pk);

  // then outward from the peak, each box chained to the one before it
  const order: [number, number][] = [];
  for (let i = peak - 1; i >= 0; i--) order.push([i, i + 1]);
  for (let i = peak + 1; i < k1; i++) order.push([i, i - 1]);
  for (const [i, prev] of order) {
    const q = crown[prev];
    const T = pTop - drop[i];
    const near = Math.abs(T - top(q)) < 20;
    const p = crownAt(rand, seam[i] + R(-0.22, 0.22) * q.w, T, ctx, 0.28, near ? q.h : 0);
    // overlap the previous crown box by 12-32% of the narrower one
    const m = Math.min(p.w, q.w);
    if (i < prev) p.x = clamp(p.x, q.x - p.w + 0.12 * m, q.x - p.w + 0.32 * m);
    else p.x = clamp(p.x, q.x + q.w - 0.32 * m, q.x + q.w - 0.12 * m);
    if (p.x < lim0 - 0.5 || p.x + p.w > lim1 + 0.5) return null;
    if (!seat(p, cover, 14, 0.28)) return null;
    crown[i] = p;
  }
  return [...base, ...crown].map(({ x, b, w, h }) => ({ x, b, w, h }));
}

/* ---------- output: normalise (y grows down), round to 0.1px, hard-cap the width ---------- */

function finish(P: Box[]): CloudSpec {
  let x0 = 1e9;
  let yTop = -1e9;
  for (const p of P) {
    x0 = Math.min(x0, p.x);
    yTop = Math.max(yTop, top(p));
  }
  let W = 0;
  for (const p of P) W = Math.max(W, p.x - x0 + p.w);
  // never taken (build() keeps W <= MAX_W - 20); a hard guarantee all the same
  const k = W > MAX_W ? (MAX_W - 0.2) / W : 1;
  const puffs = P.map((p) => ({
    x: round1((p.x - x0) * k),
    y: round1(yTop - top(p)),
    w: Math.floor(p.w * k * 10) / 10,
    h: round1(p.h),
  }));
  let w = 0;
  let h = 0;
  for (const p of puffs) {
    w = Math.max(w, p.x + p.w);
    h = Math.max(h, p.y + p.h);
  }
  return { w: Math.min(MAX_W, round1(w)), h: round1(h), puffs };
}

/* ---------- validation on the rounded output ---------- */

function adjacent(a: Puff, b: Puff, gap = 24) {
  return Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) >= -gap;
}

function overlapXY(a: Puff, b: Puff): [number, number] {
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return [ox, oy];
}

function connected(P: Puff[]) {
  const par = P.map((_, i) => i);
  const f = (i: number): number => (par[i] === i ? i : (par[i] = f(par[i])));
  for (let i = 0; i < P.length; i++)
    for (let j = i + 1; j < P.length; j++) {
      const [ox, oy] = overlapXY(P[i], P[j]);
      if (ox >= 10 && oy >= 10) par[f(i)] = f(j);
    }
  let roots = 0;
  for (let i = 0; i < P.length; i++) if (f(i) === i) roots++;
  return roots === 1;
}

/* Valleys in the top silhouette (rounded corners included): a slot (narrow and
   deep) or a canyon (very deep) reads as a notch, not a billow. */
function notchPenalty(spec: CloudSpec) {
  const { w: W, h: H, puffs } = spec;
  const n = Math.ceil(W / 2) + 1;
  const prof = new Float32Array(n);
  for (const p of puffs) {
    const T = H - p.y;
    const r = Math.min(p.w, p.h) * 0.28;
    const a = Math.max(0, Math.ceil(p.x / 2));
    const z = Math.min(n - 1, Math.floor((p.x + p.w) / 2));
    for (let i = a; i <= z; i++) {
      const xx = i * 2;
      const dx = Math.min(xx - p.x, p.x + p.w - xx);
      const drop = dx < r ? r - Math.sqrt(Math.max(0, r * r - (r - dx) * (r - dx))) : 0;
      if (T - drop > prof[i]) prof[i] = T - drop;
    }
  }
  const L = new Float32Array(n);
  const Rt = new Float32Array(n);
  for (let i = 0; i < n; i++) L[i] = Math.max(prof[i], i ? L[i - 1] : 0);
  for (let i = n - 1; i >= 0; i--) Rt[i] = Math.max(prof[i], i < n - 1 ? Rt[i + 1] : 0);
  let pen = 0;
  let runW = 0;
  let runD = 0;
  for (let i = 0; i <= n; i++) {
    const d = i < n ? Math.min(L[i], Rt[i]) - prof[i] : 0;
    if (d > 15) {
      runW++;
      runD = Math.max(runD, d);
    } else if (runD > 0) {
      if (runD > 40 || (runD > 22 && runW * 2 < 38)) pen += 4;
      runW = 0;
      runD = 0;
    }
  }
  return pen;
}

// a sizeable spot covered by 4+ boxes (a bright knot of seams)
function hasQuadOverlap(P: Puff[]) {
  const n = P.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      for (let k = j + 1; k < n; k++)
        for (let l = k + 1; l < n; l++) {
          const [a, b, c, d] = [P[i], P[j], P[k], P[l]];
          const tx = Math.min(a.x + a.w, b.x + b.w, c.x + c.w, d.x + d.w) - Math.max(a.x, b.x, c.x, d.x);
          const ty = Math.min(a.y + a.h, b.y + b.h, c.y + c.h, d.y + d.h) - Math.max(a.y, b.y, c.y, d.y);
          if (tx > 0 && ty > 0 && tx * ty > 120) return true;
        }
  return false;
}

function tripleOverlapArea(P: Puff[]) {
  let s = 0;
  for (let i = 0; i < P.length; i++)
    for (let j = i + 1; j < P.length; j++) {
      const a = P[i];
      const b = P[j];
      const [ox, oy] = overlapXY(a, b);
      if (ox <= 0 || oy <= 0) continue;
      for (let k = j + 1; k < P.length; k++) {
        const c = P[k];
        const tx = Math.min(a.x + a.w, b.x + b.w, c.x + c.w) - Math.max(a.x, b.x, c.x);
        const ty = Math.min(a.y + a.h, b.y + b.h, c.y + c.h) - Math.max(a.y, b.y, c.y);
        if (tx > 0 && ty > 0) s += tx * ty;
      }
    }
  return s;
}

// two boxes that read as "the same box again, one after another"
const lookAlike = (a: Puff, b: Puff, dTop: number, dH: number) =>
  Math.abs(a.y - b.y) < dTop && Math.abs(a.h - b.h) / Math.max(a.h, b.h) < dH;

/** 0 = every rule met; otherwise a weighted count of what the cloud breaks. */
function validate(spec: CloudSpec): number {
  const { w: W, h: H, puffs: P } = spec;
  const n = P.length;
  let s = 0;
  if (n < MIN_PUFFS || n > MAX_PUFFS) s += 10;
  if (W > MAX_W) s += 50;
  const asp = W / H;
  if (asp < 2.05 || asp > 3.55) s += 4;
  if (H < 92 || H > 190) s += 4;

  // similar sizes: no big centre next to a small tail
  let aMin = 1e9;
  let aMax = 0;
  let hMin = 1e9;
  let hMax = 0;
  let total = 0;
  for (const p of P) {
    aMin = Math.min(aMin, area(p));
    aMax = Math.max(aMax, area(p));
    hMin = Math.min(hMin, p.h);
    hMax = Math.max(hMax, p.h);
    total += area(p);
  }
  if (aMax / aMin > 2.0) s += 3;
  if (hMax / hMin > 1.65) s += 3;

  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      if (!adjacent(P[i], P[j])) continue;
      if (lookAlike(P[i], P[j], 10, 0.12)) s += 5;
      else if (Math.abs(P[i].y - P[j].y) < 6) s += 2;
    }

  // base row: bottom within 12px of the cloud bottom
  const base = P.filter((p) => H - (p.y + p.h) <= 12).sort((a, b) => a.x - b.x);
  const crown = P.filter((p) => H - (p.y + p.h) > 12).sort((a, b) => a.x + a.w / 2 - (b.x + b.w / 2));
  const nb = base.length;
  if (nb < 3 || nb > 5) return s + 6;
  let baseTop = 0;
  let baseW = 0;
  for (const p of base) {
    const r = p.w / p.h;
    if (r < 1.1 || r > 1.6) s += 2;
    baseTop += (H - p.y) / nb;
    baseW += p.w / nb;
  }
  for (const p of base) if (p.w < 0.76 * baseW || p.w > 1.29 * baseW) s += 2;
  for (let i = 0; i + 1 < nb; i++) {
    const ox = base[i].x + base[i].w - base[i + 1].x;
    if (ox > 0.4 * Math.min(base[i].w, base[i + 1].w)) s += 2;
    if (Math.abs(base[i].y - base[i + 1].y) < 11) s += 2;
  }
  // no row of three look-alike base boxes, no staircase at either end
  for (let i = 0; i + 2 < nb; i++) {
    const t = base.slice(i, i + 3);
    const ys = t.map((p) => p.y);
    const hs = t.map((p) => p.h);
    if (Math.max(...ys) - Math.min(...ys) <= 16 && Math.max(...hs) / Math.min(...hs) <= 1.17) s += 4;
  }
  if (nb >= 4)
    for (const q of [base, [...base].reverse()])
      if (q[1].y - q[0].y < -5 && q[2].y - q[1].y < -5 && q[3].y - q[2].y < -5) s += 4;
  // ends: never a small tail, and at most one end bigger than its neighbour
  const big = (e: Puff, nbr: Puff) => e.y < nbr.y - 3 || area(e) > area(nbr) * 1.2;
  if (big(base[0], base[1]) && big(base[nb - 1], base[nb - 2])) s += 3;
  for (const [e, nbr] of [
    [base[0], base[1]],
    [base[nb - 1], base[nb - 2]],
  ])
    if (area(e) < 0.71 * area(nbr) || area(e) < 0.6 * aMax) s += 3;

  // crown: no two neighbours alike, no three in a near-level row
  for (let i = 0; i + 1 < crown.length; i++)
    for (let j = i + 1; j < crown.length; j++)
      if (adjacent(crown[i], crown[j]) && lookAlike(crown[i], crown[j], 16, 0.17)) s += 4;
  for (let i = 0; i + 2 < crown.length; i++) {
    const t = crown.slice(i, i + 3);
    const ys = t.map((p) => p.y);
    const hs = t.map((p) => p.h);
    if (Math.max(...ys) - Math.min(...ys) <= 25 && Math.max(...hs) / Math.min(...hs) <= 1.28) s += 4;
  }
  // crown: a real share of the cloud, a real hump, two base-sized boxes, inset ends
  const baseAreas = base.map(area).sort((u, v) => u - v);
  const baseArea = baseAreas[(nb - 1) >> 1];
  let crownArea = 0;
  let similar = 0;
  let cL = 1e9;
  let cR = -1e9;
  for (const p of crown) {
    crownArea += area(p);
    if (area(p) > 0.68 * baseArea && area(p) < 1.45 * baseArea) similar++;
    cL = Math.min(cL, p.x);
    cR = Math.max(cR, p.x + p.w);
    if (p.x < 0.2 * base[0].w || p.x + p.w > W - 0.2 * base[nb - 1].w) s += 3;
  }
  const share = crownArea / total;
  if (share < 0.27 || share > 0.6) s += 4;
  if (H - baseTop < 0.4 * H) s += 4;
  if (similar < 2) s += 3;
  if (cR - cL < 0.4 * W) s += 4;

  if (!connected(P)) s += 20;
  s += notchPenalty(spec);
  if (tripleOverlapArea(P) > 0.05 * total) s += 1;
  if (hasQuadOverlap(P)) s += 1;
  return s;
}

/** A fixed cloud that passes validate(); only returned if no attempt built at all. */
function fallbackCloud(): CloudSpec {
  return {
    w: 417.7,
    h: 144,
    puffs: [
      { x: 0, y: 73.1, w: 110.4, h: 70.8 },
      { x: 85.6, y: 59.3, w: 101.2, h: 84.6 },
      { x: 160.5, y: 76.5, w: 105.1, h: 67.4 },
      { x: 240.2, y: 59.9, w: 95.2, h: 84.1 },
      { x: 315.6, y: 73.9, w: 102.1, h: 65.5 },
      { x: 107.5, y: 19.7, w: 105.4, h: 70.3 },
      { x: 201, y: 0, w: 99.6, h: 89 },
      { x: 288.9, y: 26.7, w: 98.2, h: 65.5 },
    ],
  };
}

/** A new random cloud. Pass a seeded rand to get the same cloud every time. */
export function randomCloudSpec(rand: Rand = Math.random): CloudSpec {
  const plan = pickPlan(rand);
  // the last retries fall back to the most forgiving plan
  const easy: Plan = { nb: 4, arch: "dome", side: plan.side, t: 0.5, tight: true, lowBase: false, puffy: false };
  let best: CloudSpec | null = null;
  let bestScore = Infinity;
  for (let i = 0; i < ATTEMPTS; i++) {
    const P = build(rand, i < ATTEMPTS - 10 ? plan : easy);
    if (!P) continue;
    const spec = finish(P);
    const sc = validate(spec);
    if (sc === 0) return spec;
    if (sc < bestScore) {
      bestScore = sc;
      best = spec;
    }
  }
  return best || fallbackCloud();
}
