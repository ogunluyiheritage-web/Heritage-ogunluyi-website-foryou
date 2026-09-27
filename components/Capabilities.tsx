"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { capabilities } from "@/lib/data";

export default function Capabilities() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cap-heading", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".cap-item", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cap-list", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={root} className="container-edge py-28 md:py-40">
      <h2 className="cap-heading font-display text-display-md max-w-2xl">
        What I bring to the screen.
      </h2>

      <div className="cap-list mt-16 border-t border-line">
        {capabilities.map((cap) => {
          const isOpen = open === cap.index;
          return (
            <div key={cap.index} className="cap-item border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cap.index)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-6 md:gap-10 py-7 md:py-9 text-left group"
              >
                <span className="text-sm text-stone w-8 shrink-0">{cap.index}</span>
                <span className="font-display text-2xl md:text-4xl flex-1 transition-transform duration-500 ease-editorial group-hover:translate-x-2">
                  {cap.title}
                </span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-lg transition-transform duration-400 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-editorial"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-7 md:pb-9 md:pl-[3.5rem] max-w-xl text-ink/70 leading-relaxed">
                    {cap.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
