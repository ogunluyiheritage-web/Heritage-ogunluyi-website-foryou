"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { about } from "@/lib/data";
import ProjectImage from "./ProjectImage";

export default function About() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="container-edge py-28 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="md:col-span-4">
          <div className="about-reveal relative aspect-[4/5] overflow-hidden reveal-mask bg-ink/90">
            <ProjectImage
              src="/images/profile/portrait.jpg"
              alt="Portrait"
              sizes="(min-width: 768px) 30vw, 90vw"
              tone="warm"
            />
          </div>
        </div>

        <div className="md:col-span-8">
          <h2 className="about-reveal font-display text-display-md max-w-2xl">
            {about.statement}
          </h2>
          <p className="about-reveal mt-8 text-lg leading-relaxed max-w-xl text-ink/75">
            {about.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
