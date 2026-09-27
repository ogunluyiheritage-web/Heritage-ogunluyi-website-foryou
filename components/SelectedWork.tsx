"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { caseStudy, projects } from "@/lib/data";
import ProjectRow from "./ProjectRow";

// Aurelia already gets its own full-bleed featured section (CaseStudy) — it
// isn't repeated here, so the strongest visual doesn't compete with itself
// and the remaining work reads as clearly secondary in scale.
const supportingProjects = projects.filter((p) => p.id !== caseStudy.project.id);

export default function SelectedWork() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-heading", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-28 md:py-40">
      <div className="container-edge">
        <h2 className="work-heading font-display text-display-md">Further work.</h2>
      </div>

      <div className="mt-16 md:mt-20">
        {supportingProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
