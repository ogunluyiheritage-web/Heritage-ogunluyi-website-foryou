"use client";

import { useRef } from "react";
import { projectImage, projectLabel, type Project } from "@/lib/data";
import ProjectImage from "./ProjectImage";

export default function ProjectRow({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  const tagRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tagRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className="project-row group relative border-t border-line py-10 md:py-16"
      onMouseMove={handleMove}
    >
      <div
        className={`container-edge grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center ${
          reversed ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className={`md:col-span-7 relative ${reversed ? "md:[direction:ltr]" : ""}`}>
          <div className="relative aspect-[16/10] overflow-hidden reveal-mask bg-ink">
            <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.06]">
              <ProjectImage
                src={projectImage(project, "main")}
                alt={`${project.name} — ${project.category}`}
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </div>
            <span className="absolute bottom-4 right-6 font-display text-[18vw] md:text-[9vw] leading-none text-paper/[0.08] select-none pointer-events-none">
              {project.index}
            </span>
          </div>

          <div
            ref={tagRef}
            className="pointer-events-none absolute hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-paper text-ink text-xs tracking-widest2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              left: "var(--x, 50%)",
              top: "var(--y, 50%)",
              transform: "translate(-50%, -50%)",
            }}
          >
            View
          </div>
        </div>

        <div className={`md:col-span-5 ${reversed ? "md:[direction:ltr]" : ""}`}>
          <p className="text-xs tracking-widest2 uppercase text-stone">
            {project.index} / {project.category}
          </p>
          <span className="mt-1 inline-block text-xs text-brass">{projectLabel(project.type)}</span>
          <h3 className="mt-3 font-display text-3xl md:text-5xl leading-[1.05] transition-transform duration-500 ease-editorial group-hover:translate-x-2">
            {project.name}
          </h3>
          <p className="mt-4 text-ink/70 leading-relaxed max-w-sm">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-stone">
            <span>{project.year}</span>
            <span>{project.services}</span>
            <span>{project.technology}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
