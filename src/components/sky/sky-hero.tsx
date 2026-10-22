// src/components/sky/sky-hero.tsx (copied from the public website)
// The homepage's sky, held still, for inner-page heroes: a night gradient with
// a star field, deepening to blue, with a bank of the homepage's squircle
// clouds along the bottom edge. Server-rendered and static (no twinkle, no
// drift) so info pages stay calm. Stars and clouds come from a seeded random
// source, so a page renders the same sky every time, and each page (by seed)
// gets its own cloud pattern.
import { randomCloudSpec, mirrorCloudSpec, layoutCloud, type CloudSpec } from "@/lib/sky/cloud-puffs";

/** Small deterministic PRNG (mulberry32). */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Same recipe as the homepage atmosphere's two star layers. */
function starField(rand: () => number, n: number, w: number, h: number, rMin: number, rMax: number, color: string) {
  const p: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = (rand() * w).toFixed(0);
    const y = (rand() * h).toFixed(0);
    const r = (rMin + rand() * (rMax - rMin)).toFixed(2);
    p.push(`radial-gradient(${r}px ${r}px at ${x}px ${y}px, ${color}, transparent)`);
  }
  return p.join(",");
}

const STAR_RAND = seeded(7);
const STARS_SMALL = starField(STAR_RAND, 64, 400, 520, 0.8, 1.7, "rgba(255,255,255,0.92)");
const STARS_LARGE = starField(STAR_RAND, 24, 520, 640, 1.4, 2.5, "rgba(206,228,255,0.95)");

/** Night at the top, the homepage's dawn blue at the bottom. */
const SKY_GRADIENT =
  "linear-gradient(180deg, hsl(234 64% 6%) 0%, hsl(230 60% 9%) 28%, hsl(222 66% 14%) 55%, hsl(215 70% 27%) 78%, hsl(210 78% 42%) 100%)";

type BankCloud = { spec: CloudSpec; left: number; bottom: number; scale: number; blur: number; opacity: number };

function cloudBank(seed: number): BankCloud[] {
  const rand = seeded(seed);
  const clouds: BankCloud[] = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const depth = rand();
    const spec = randomCloudSpec(rand);
    const left = -6 + (i / (n - 1)) * 100 + (rand() * 8 - 4);
    // Cumulus crowns rise above the base row, so the bank sits low enough that
    // the tallest clouds stay clear of the hero's last line of text.
    const bottom = -64 - depth * 28;
    const scale = 0.55 + depth * 0.75;
    // Mirror half the clouds by flipping the puff geometry. A negative scaleX on a
    // blurred element is a known source of rendering artifacts.
    const flip = rand() < 0.5;
    clouds.push({
      spec: flip ? mirrorCloudSpec(spec) : spec,
      left,
      bottom,
      scale,
      blur: 1 + (1 - depth) * 4,
      opacity: 0.35 + depth * 0.5,
    });
  }
  // Paint far (small, faint) clouds first.
  return clouds.sort((a, b) => a.scale - b.scale);
}

/** Laid out at its on-screen size with room for the blur (layoutCloud), not CSS-scaled,
    so no browser clips the blur halo. The wrapper sits `pad` lower so the puffs' base
    lands where the scaled cloud's did. */
function Cloud({ c }: { c: BankCloud }) {
  const l = layoutCloud(c.spec, c.scale, c.blur);
  return (
    <div
      className="absolute"
      style={{ left: `${c.left.toFixed(2)}%`, bottom: Number((c.bottom - l.pad).toFixed(1)), transform: "translateX(-50%)" }}
    >
      <div
        className="relative"
        style={{
          width: Number(l.w.toFixed(1)),
          height: Number(l.h.toFixed(1)),
          filter: `blur(${l.blur.toFixed(2)}px)`,
          opacity: Number(c.opacity.toFixed(2)),
        }}
      >
        {l.puffs.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: Number(p.x.toFixed(1)),
              top: Number(p.y.toFixed(1)),
              width: Number(p.w.toFixed(1)),
              height: Number(p.h.toFixed(1)),
              borderRadius: Math.round(Math.min(p.w, p.h) * 0.28),
              background: "rgba(255,255,255,0.88)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The sky backdrop. Drop-in for the old `bg-brand-900` hero sections: pass the
 * layout classes (padding, alignment) and the content. `as="div"` with a
 * rounded className makes a sky panel (the service-page CTA); panels skip the
 * fade into the page background.
 */
export function SkySection({
  as: Tag = "section",
  className = "",
  seed = "checkmark",
  children,
}: {
  as?: "section" | "div";
  className?: string;
  /** Any string; picks this hero's cloud pattern. */
  seed?: string;
  children: React.ReactNode;
}) {
  const clouds = cloudBank(hashSeed(seed));
  return (
    <Tag
      className={`relative overflow-hidden isolate text-white ${className}`}
      style={{ backgroundImage: SKY_GRADIENT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[75%]"
        style={{
          backgroundImage: `${STARS_SMALL},${STARS_LARGE}`,
          backgroundSize: "400px 520px, 520px 640px",
          maskImage: "linear-gradient(180deg, #000 55%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000 55%, transparent)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {clouds.map((c, i) => (
          <Cloud key={i} c={c} />
        ))}
      </div>
      {/* Let the cloud bank dissolve into the page instead of ending on a hard edge. */}
      {Tag === "section" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{ backgroundImage: "linear-gradient(180deg, transparent, hsl(var(--background)))" }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

/**
 * Standard inner-page hero: optional eyebrow pill, title (wrap a word in <em>
 * for the homepage's cyan accent), subtitle, and actions.
 */
export function SkyHero({
  above,
  eyebrow,
  title,
  subtitle,
  children,
  seed,
  className = "",
}: {
  /** Rendered above everything else, e.g. a breadcrumb. */
  above?: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  seed?: string;
  className?: string;
}) {
  return (
    <SkySection seed={seed ?? (typeof title === "string" ? title : eyebrow)} className={`text-center pt-36 pb-28 md:pb-32 ${className}`}>
      <div className="container mx-auto px-4">
        {above}
        {eyebrow && (
          <div className="mb-6 inline-flex items-center rounded-full border border-[hsl(195_100%_70%/0.45)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[hsl(195_100%_70%)]">
            {eyebrow}
          </div>
        )}
        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white text-balance [&_em]:not-italic [&_em]:text-[hsl(195_100%_70%)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-white/80 text-pretty">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </SkySection>
  );
}
