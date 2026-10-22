"use client";

import { useEffect, useRef } from "react";
import { startBubbles } from "@/lib/sky/bubbles";

/** Faint bubbles rising from the bottom of the footer, gone by halfway up.
    Sits behind the footer's content (the footer is position: relative). */
export default function FooterBubbles() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? startBubbles(ref.current, { reach: 0.5 }) : undefined), []);
  return <div ref={ref} aria-hidden="true" className="ck-bubbles absolute inset-0" />;
}
