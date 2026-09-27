"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Placeholder tone when no real image is present yet at `src`. */
  tone?: "ink" | "warm";
};

const tones: Record<NonNullable<ProjectImageProps["tone"]>, string> = {
  ink: "linear-gradient(155deg, #1a1917 0%, #0d0d0c 55%, #211c18 100%)",
  warm: "linear-gradient(155deg, #2a2420 0%, #14110f 60%, #2f271f 100%)",
};

/**
 * Drop-in image for project/case-study/portrait visuals.
 * Renders next/image when `src` resolves; falls back to a tonal
 * placeholder (not a broken-image icon) if the file isn't there yet —
 * so the layout and reveal animations look intentional either way.
 */
export default function ProjectImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  tone = "ink",
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ background: tones[tone] }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
