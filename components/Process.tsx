"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/gsap";
import { process } from "@/lib/data";

export default function Process() {
  useGsap();
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!track.current || !section.current || prefersReducedMotion()) return;
        const distance = track.current.scrollWidth - window.innerWidth;

        const tween = gsap.to(track.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-ink text-paper overflow-hidden">
      <div className="container-edge pt-20 md:pt-24 pb-10 md:pb-0">
        <p className="text-xs tracking-widest2 uppercase text-paper/50">Process</p>
        <h2 className="mt-4 font-display text-display-md">From brief to launch.</h2>
      </div>

      <div
        ref={track}
        className="flex md:flex-nowrap flex-col md:flex-row gap-8 md:gap-0 px-[clamp(1.5rem,5vw,4rem)] md:px-[8vw] pb-20 md:pb-32 md:pt-16 md:h-[60vh] md:items-center"
      >
        {process.map((step) => (
          <div
            key={step.index}
            className="md:min-w-[min(70vw,26rem)] md:mr-16 border-t border-paper/20 pt-6 md:pt-8"
          >
            <span className="font-display text-5xl md:text-6xl text-paper/40">{step.index}</span>
            <h3 className="mt-6 font-display text-3xl md:text-4xl">{step.title}</h3>
            <p className="mt-4 text-paper/65 leading-relaxed max-w-xs">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
