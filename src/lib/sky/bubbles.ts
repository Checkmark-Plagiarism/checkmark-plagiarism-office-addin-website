// Faint rising bubbles under the footer, copied from the public website
// (src/sections/redesign/bubbles.ts). Styles: .ck-bubbles / .ck-bubble in
// globals.css.

const MAX_BUBBLES = 48;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Releases bubble clusters into `layer` until the returned stop() is called. A cluster
    is 3-6 faint rings in a near-vertical line, let go one after another; each rises with
    a slight wobble (ck-bubble-rise / ck-bubble-wobble) and has faded out by `reach` of
    the way up the layer (0.96: just below its top; 0.5: halfway). Runs only while the
    layer is on screen and the tab is visible, and never for reduced motion. */
export function startBubbles(layer: HTMLElement, { reach = 0.96 }: { reach?: number } = {}): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let onScreen = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const cluster = () => {
    const h = layer.clientHeight;
    const w = layer.clientWidth;
    if (h < 120 || layer.childElementCount >= MAX_BUBBLES) return;
    const x = rand(0.04, 0.96) * w;
    const count = Math.floor(rand(3, 7));
    const base = rand(4, 9);
    // Start low in the layer and fade out by `reach` of the way up.
    const top = h * reach;
    const startUp = rand(0, Math.min(0.3, reach * 0.4)) * h;
    const rise = (top - startUp) * rand(0.82, 1);
    const speed = rand(38, 60); // px per second
    const drift = rand(-24, 24);
    let delay = 0;
    for (let i = 0; i < count; i++) {
      const size = base * rand(0.55, 1.15);
      const b = document.createElement("div");
      b.className = "ck-bubble";
      b.style.left = (x + rand(-3, 3)).toFixed(1) + "px";
      b.style.bottom = startUp.toFixed(0) + "px";
      b.style.setProperty("--rise", rise.toFixed(0) + "px");
      b.style.setProperty("--dx", drift.toFixed(0) + "px");
      b.style.setProperty("--op", rand(0.28, 0.5).toFixed(2));
      b.style.animationDuration = (rise / speed).toFixed(2) + "s";
      b.style.animationDelay = delay.toFixed(0) + "ms";
      const ring = document.createElement("span");
      ring.style.width = ring.style.height = size.toFixed(1) + "px";
      ring.style.animationDuration = rand(1.6, 2.6).toFixed(2) + "s";
      b.appendChild(ring);
      b.addEventListener("animationend", (e) => {
        if (e.target === b) b.remove();
      });
      layer.appendChild(b);
      delay += rand(160, 340);
    }
  };

  const loop = () => {
    if (!onScreen || document.hidden) return;
    cluster();
    timer = setTimeout(loop, rand(900, 2200));
  };
  const resume = () => {
    clearTimeout(timer);
    if (onScreen && !document.hidden) timer = setTimeout(loop, rand(200, 900));
  };

  const io = new IntersectionObserver((entries) => {
    onScreen = entries.some((e) => e.isIntersecting);
    resume();
  });
  io.observe(layer);
  document.addEventListener("visibilitychange", resume);
  return () => {
    clearTimeout(timer);
    io.disconnect();
    document.removeEventListener("visibilitychange", resume);
    layer.textContent = "";
  };
}
