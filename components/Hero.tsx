"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { hero } from "@/lib/data";
import HeroFallback from "./HeroFallback";
import SceneBoundary from "./SceneBoundary";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Hero() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);
  // Whether we should even attempt the WebGL scene: wide viewport, motion
  // allowed, and a working WebGL context. Everything else gets the CSS
  // fallback composition permanently — that's the "simplified on mobile"
  // and "beautiful if offline/unsupported" path in one.
  const [capable, setCapable] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCapable(mql.matches && !reduced && hasWebGL());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(root.current, { visibility: "visible" })
        .from(
          ".hero-line",
          { yPercent: 110, duration: 1, stagger: 0.07 },
          0
        )
        .from(".hero-role", { y: 16, opacity: 0, duration: 0.8 }, "-=0.55")
        .from(".hero-statement", { y: 24, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-industries", { opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-meta", { opacity: 0, duration: 0.6 }, "-=0.4")
        .call(() => setSceneReady(true), [], "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      style={{ visibility: "hidden" }}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[82vw] h-[82vw] md:w-[44vw] md:h-[44vw] max-w-[680px] max-h-[680px]">
          {/* CSS composition — the permanent visual on mobile/reduced-motion/
              no-WebGL, and the instant-paint layer under the WebGL scene. */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: capable && sceneReady ? 0 : 1 }}
          >
            <HeroFallback />
          </div>

          {capable && (
            <div
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
              style={{ opacity: sceneReady ? 1 : 0 }}
            >
              <SceneBoundary fallback={<HeroFallback />}>
                <HeroScene />
              </SceneBoundary>
            </div>
          )}

          {/* Softens the composition's edges into the page rather than
              leaving a hard rectangular WebGL/CSS boundary visible. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(closest-side, rgba(243,242,238,0) 58%, rgba(243,242,238,0.95) 100%)",
            }}
          />
        </div>
      </div>

      <div className="container-edge pt-32 md:pt-40 relative">
        <h1 className="font-display font-semibold text-display-xl">
          {"HERITAGE".split("").map((ch, i) => (
            <span key={i} className="reveal-mask inline-block align-top">
              <span className="hero-line inline-block">{ch}</span>
            </span>
          ))}
        </h1>

        <div className="mt-6 md:mt-8 flex items-center gap-4">
          <span className="hero-role w-10 h-px bg-brass shrink-0" aria-hidden />
          <p className="hero-role font-sans text-base md:text-xl tracking-wide text-ink/70 max-w-md">
            {hero.eyebrow}
          </p>
        </div>
      </div>

      <div className="container-edge pb-16 md:pb-24 relative flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div className="max-w-prose">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-2 md:-left-5 -top-6 md:-top-8 font-display text-6xl md:text-8xl text-brass/25 select-none"
            >
              &ldquo;
            </span>
            <p className="hero-statement font-display text-2xl md:text-3xl leading-snug pl-5 md:pl-7">
              {hero.statement}&rdquo;
            </p>
          </div>
          <p className="hero-industries mt-5 pl-5 md:pl-7 text-sm text-stone">{hero.industries}</p>
        </div>

        <div className="hero-meta flex items-center gap-3 text-xs tracking-widest2 uppercase text-stone">
          <span className="w-8 rule" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
