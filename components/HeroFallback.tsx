/**
 * A still, CSS-only rendering of the same three-slab composition as
 * HeroScene — concrete base, glass mid-slab, brass accent. It exists so the
 * hero never has an empty right-hand side: on mobile (where the 3D scene is
 * intentionally not mounted), for prefers-reduced-motion, on devices without
 * WebGL, and for the first paint before the real scene is ready.
 *
 * No canvas, no JS animation loop — just layered gradients and shadows, so
 * it's effectively free.
 */
export default function HeroFallback() {
  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: "1400px" }}
      role="img"
      aria-label="An abstract architectural composition of stacked concrete, glass and brass forms"
    >
      <div
        className="absolute left-1/2 top-1/2 w-[78%] aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-28deg)" }}
      >
        {/* Grounding shadow */}
        <div
          className="absolute left-1/2 bottom-[6%] w-[86%] h-[14%] -translate-x-1/2 rounded-[50%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(13,13,12,0.38) 0%, rgba(13,13,12,0.16) 55%, rgba(13,13,12,0) 78%)",
            filter: "blur(6px)",
          }}
        />

        {/* Concrete base slab */}
        <div
          className="absolute left-1/2 bottom-[22%] w-[78%] h-[16%] -translate-x-1/2"
          style={{
            background: "linear-gradient(155deg, #1b1a18 0%, #101010 55%, #232019 100%)",
            boxShadow: "0 18px 40px -12px rgba(0,0,0,0.55)",
          }}
        />

        {/* Glass mid slab */}
        <div
          className="absolute left-[30%] bottom-[38%] w-[62%] h-[20%]"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.42) 0%, rgba(238,242,239,0.16) 45%, rgba(219,230,225,0.08) 100%)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 14px 30px -14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)",
            backdropFilter: "blur(1px)",
          }}
        />

        {/* Brass accent slab */}
        <div
          className="absolute left-[8%] bottom-[58%] w-[42%] h-[14%]"
          style={{
            background: "linear-gradient(150deg, #d3a879 0%, #a47551 50%, #8a6343 100%)",
            boxShadow: "0 12px 24px -10px rgba(139,99,67,0.55)",
          }}
        />
      </div>
    </div>
  );
}
