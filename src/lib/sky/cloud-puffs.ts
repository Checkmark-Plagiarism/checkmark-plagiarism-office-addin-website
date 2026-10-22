/* The static parts of the public website's src/sections/redesign/cloud-puffs.ts: enough
   to lay out the seeded cloud bank under a SkySection. The drifting homepage clouds
   are not used on this site. */

import { randomCloudSpec, type CloudSpec, type Puff } from "./cloud-shape";

export { randomCloudSpec };
export type { Puff, CloudSpec } from "./cloud-shape";

/** A cloud laid out at its on-screen size: puffs scaled by `scale` and inset by `pad`,
    the room the blur halo needs, so the blurred element's own box holds the whole halo. */
export type CloudLayout = { w: number; h: number; pad: number; blur: number; puffs: Puff[] };

/** Padding layoutCloud() gives a cloud: the halo of a CSS blur reaches about 3x its radius. */
export function cloudPad(scale: number, blur: number): number {
  return Math.ceil(blur * scale * 3) + 2;
}

export function layoutCloud(spec: CloudSpec, scale: number, blur: number): CloudLayout {
  const b = blur * scale;
  const pad = cloudPad(scale, blur);
  return {
    w: spec.w * scale + 2 * pad,
    h: spec.h * scale + 2 * pad,
    pad,
    blur: b,
    puffs: spec.puffs.map((p) => ({ x: p.x * scale + pad, y: p.y * scale + pad, w: p.w * scale, h: p.h * scale })),
  };
}

export function mirrorCloudSpec(spec: CloudSpec): CloudSpec {
  return { w: spec.w, h: spec.h, puffs: spec.puffs.map((p) => ({ x: spec.w - p.x - p.w, y: p.y, w: p.w, h: p.h })) };
}
