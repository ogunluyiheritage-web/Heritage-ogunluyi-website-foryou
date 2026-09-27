"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { intro } from "@/lib/data";

export default function Intro() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="container-edge py-28 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        <p className="intro-reveal md:col-span-3 text-xs tracking-widest2 uppercase text-stone">
          {intro.label}
        </p>

        <div className="md:col-span-9">
          <h2 className="intro-reveal font-display text-display-md max-w-3xl">
            {intro.heading}
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="intro-reveal text-lg leading-relaxed">{intro.lead}</p>
            <p className="intro-reveal text-lg leading-relaxed text-ink/75">{intro.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
