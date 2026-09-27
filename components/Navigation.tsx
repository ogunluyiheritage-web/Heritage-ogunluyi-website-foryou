"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled && !open ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-edge flex items-center justify-between h-20">
        <a
          href="#top"
          className="font-display text-lg tracking-wide uppercase relative z-[60]"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 hover:text-ink underline-hover pb-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden relative z-[60] flex flex-col gap-1.5 w-8 h-8 items-end justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px bg-ink transition-all duration-300 ${
              open ? "w-6 rotate-45 translate-y-[3px]" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-ink transition-all duration-300 ${
              open ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"
            }`}
          />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-paper transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="h-full flex flex-col items-start justify-center gap-2 container-edge"
          aria-label="Primary mobile"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl transition-all duration-500 ease-editorial"
              style={{
                transitionDelay: open ? `${i * 60 + 80}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
