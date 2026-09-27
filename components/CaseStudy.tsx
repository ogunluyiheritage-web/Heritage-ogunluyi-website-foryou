"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/gsap";
import { caseStudy, projectImage, projectLabel } from "@/lib/data";
import ProjectImage from "./ProjectImage";

const details = [
  { label: "Role", value: caseStudy.role },
  { label: "Services", value: caseStudy.services },
  { label: "Technology", value: caseStudy.technology },
];

export default function CaseStudy() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-visual-main", {
        scale: 1.12,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".case-visual-detail", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
      if (!prefersReducedMotion()) {
        gsap.to(".case-visual-main", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      gsap.from(".case-text", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="bg-ink text-paper py-28 md:py-40">
      <div className="container-edge">
        <div className="relative">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden reveal-mask">
            <div className="case-visual-main absolute inset-0 -top-[6%] h-[112%]">
              <ProjectImage
                src={projectImage(caseStudy.project, "main")}
                alt={`${caseStudy.title} — main visual`}
                priority
                sizes="100vw"
                tone="warm"
              />
            </div>
          </div>

          <div className="case-visual-detail hidden md:block absolute -bottom-12 left-10 w-[26%] aspect-[4/5] overflow-hidden reveal-mask ring-1 ring-paper/10">
            <ProjectImage
              src={projectImage(caseStudy.project, "detail")}
              alt={`${caseStudy.title} — detail`}
              sizes="26vw"
              tone="warm"
            />
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="case-text text-xs tracking-widest2 uppercase text-brass">
              Featured project
            </p>
            <p className="case-text mt-2 text-sm text-paper/50">
              {caseStudy.subtitle} — {projectLabel(caseStudy.project.type)}
            </p>
            <h2 className="case-text mt-4 font-display text-display-md">{caseStudy.title}</h2>
            <p className="case-text mt-6 text-paper/70 leading-relaxed max-w-lg text-lg">
              {caseStudy.description}
            </p>
            <a
              href="#contact"
              className="case-text mt-10 inline-flex items-center gap-3 text-sm tracking-widest2 uppercase border-b border-paper/40 pb-1 hover:border-paper transition-colors"
            >
              {caseStudy.cta}
            </a>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-8">
            {details.map((d) => (
              <div key={d.label} className="case-text border-t border-paper/15 pt-4">
                <p className="text-xs tracking-widest2 uppercase text-paper/50">{d.label}</p>
                <p className="mt-2 text-paper/90">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
