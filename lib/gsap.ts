"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useGsap() {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
  }, []);
}

/**
 * Scroll-scrubbed / pinned motion (parallax, horizontal pin sections) is the
 * kind of animation that can cause real discomfort for people who've asked
 * for reduced motion. Simple entrance fades are left alone — this only
 * gates the sustained, camera-like motion.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
