"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { contact } from "@/lib/data";

const actions = [
  { label: "Email", value: contact.email, href: contact.emailHref, external: false },
  { label: "WhatsApp", value: contact.whatsapp, href: contact.whatsappHref, external: true },
];

export default function Contact() {
  useGsap();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="container-edge py-28 md:py-48">
      <h2 className="contact-reveal font-display text-display-lg max-w-4xl">{contact.heading}</h2>
      <p className="contact-reveal mt-4 font-display italic text-display-md text-stone">
        {contact.subheading}
      </p>
      <p className="contact-reveal mt-6 max-w-md text-ink/70 leading-relaxed">{contact.supporting}</p>

      <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-10 md:gap-20">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="contact-reveal group block"
          >
            <p className="text-xs tracking-widest2 uppercase text-stone">{action.label} me</p>
            <span className="mt-3 inline-flex items-center gap-4 font-display text-2xl md:text-4xl">
              <span className="border-b border-ink/20 pb-1 transition-colors duration-300 group-hover:border-ink">
                {action.value}
              </span>
              <span className="inline-block transition-transform duration-400 ease-editorial group-hover:translate-x-2">
                →
              </span>
            </span>
          </a>
        ))}
      </div>

      <a
        href={contact.phoneHref}
        className="contact-reveal underline-hover mt-14 md:mt-16 inline-block text-sm text-stone pb-0.5"
      >
        {contact.phone}
      </a>
    </section>
  );
}
