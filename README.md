# Heritage — Creative Developer Portfolio

A premium, editorial one-page portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, and React Three Fiber.

## Before you start: read this

This project was written in a sandboxed environment **without internet access**, so the dependencies have never actually been installed or built here. The code follows current, stable APIs for every library listed below, but you should run it locally first to confirm it builds cleanly before you deploy.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. If anything doesn't compile, check the "Troubleshooting" section at the bottom — it covers the handful of things most likely to need a version bump.

## What's here

```
app/
  layout.tsx       Root layout, fonts (Fraunces + Space Grotesk), metadata, OG tags
  page.tsx          Assembles all sections
  globals.css       Base styles, reduced-motion support, focus states
  sitemap.ts        /sitemap.xml
  robots.ts         /robots.txt
components/
  Navigation.tsx    Fixed nav, mobile menu
  Hero.tsx          Full-screen opening, load-sequence animation
  HeroScene.tsx     The 3D sculptural object (React Three Fiber, client-only)
  Intro.tsx         "What I do" editorial section
  SelectedWork.tsx  Section 3 — large project rows (the centerpiece)
  ProjectRow.tsx    One project's presentation (reused per project)
  CaseStudy.tsx     Aurelia Estates deep-dive
  Capabilities.tsx  Expandable editorial list of services
  Process.tsx       Horizontal scroll-driven 6-step process
  About.tsx         Minimal bio section
  Contact.tsx       Closing CTA
  Footer.tsx
lib/
  data.ts           ALL editable copy, project info, links — start here to customize
  gsap.ts           Registers ScrollTrigger once, client-side
```

## Project labeling

Every project shows either "Client Project" or "Independent Concept" next to its title, driven by the `type` field on each entry in `lib/data.ts`. All four demo projects (Aurelia Estates, Maison Noire, Halo, Solene) ship as `"concept"` since they're placeholder case studies for this template — change a project's `type` to `"client"` only once it's real, commissioned work; don't relabel a concept project as a client project just to make the portfolio look busier.

## Favicon and social preview

`app/layout.tsx` references `app/favicon.ico` and `public/og.png` (1200×630) for the browser tab icon and social share preview — neither is included, since this environment can't generate binary image assets. Add both before you deploy.

## Editing content

Everything you'll want to change on day one — your name, email, social links, project names/descriptions, capability copy, process steps, bio — lives in **`lib/data.ts`**. Nothing else needs to change to update the words on the page.

## Adding real imagery

Images now go through a proper pipeline instead of gradients. Each project has its own folder under `public/images/projects/`:

```
public/images/projects/
  aurelia/        cover.jpg, detail.jpg   (Aurelia Estates)
  architecture/   cover.jpg               (Maison Noire)
  product/        cover.jpg               (Halo)
  hospitality/    cover.jpg               (Solene)
public/images/profile/
  portrait.jpg                            (About section)
```

Drop files in using those exact names and they appear automatically — nothing else to wire up. Until you do, every slot renders a tonal placeholder (not a broken-image icon) via the shared `components/ProjectImage.tsx`, so the layout, reveal animations, and hover states all look and behave correctly either way. Each folder has its own `README.txt` with the same naming reference.

To add a fifth project or rename folders, update the matching entry in `lib/data.ts` (`imageFolder` field) — components read paths from there, nothing is hard-coded.

If you use a remote image host instead of `public/`, add its domain to `images.remotePatterns` in `next.config.mjs` (Unsplash is pre-configured as an example).

## The 3D hero object

`components/HeroScene.tsx` renders an abstract architectural composition — three offset slabs (a matte "concrete" base, a glass-like mid slab with transmission, and a brass-metal top slab) rather than a generic spinning primitive. It:

- Tilts gently toward the pointer and drifts on scroll — no autonomous spinning.
- Uses `@react-three/drei`'s `Environment` (`preset="city"`) for realistic reflections on the glass and brass materials. This fetches a small HDRI from a CDN at runtime — that requires the browser to have internet access (any real deployment, including Vercel, does; my build sandbox does not, so I couldn't render-test this scene myself — check it locally before you ship).
- Only mounts on screens ≥768px and only if the visitor hasn't requested reduced motion (see `Hero.tsx`).
- Is loaded via `next/dynamic` with `ssr: false` and code-split from the main bundle, fading in only once the hero's text animation has mostly played — a deliberate, subtle load-in rather than a pop-in.

To swap the composition for something more specific to your work, adjust the `RoundedBox` dimensions/positions in `ArchitecturalForm`, or replace a slab with a `.glb` model via `@react-three/drei`'s `useGLTF`.

## Motion notes

- The hero plays one orchestrated GSAP timeline on load — headline letters mask-reveal, statement fades up, the 3D canvas settles in. This is the one "big moment"; everything after it is scroll-triggered, not autoplaying.
- Section reveals use `ScrollTrigger` with `start: "top 75-85%"` so content animates in just before it's in view, not on a delay after.
- The Process section pins and scrolls horizontally on desktop (`gsap.matchMedia`) and reverts to a normal vertical stack on mobile.
- `prefers-reduced-motion: reduce` is respected globally in `globals.css` (animations collapse to near-instant) and explicitly checked before mounting the 3D scene.

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel: **New Project → Import** that repo. Framework preset auto-detects as Next.js — no config needed.
3. Build command `next build`, output is handled automatically. No environment variables are required for the base site.
4. Deploy. Update `metadataBase`/`url` in `app/layout.tsx` and `app/sitemap.ts` to your real domain once you have one.

Or, from the CLI:

```bash
npm i -g vercel
vercel
```

## Troubleshooting

- **Peer dependency warnings for `@react-three/fiber` / `@react-three/drei` against React 18**: these are pinned to versions that support React 18; if npm still warns, `npm install --legacy-peer-deps` resolves it without changing behavior.
- **GSAP `matchMedia` type errors**: requires `gsap@^3.11`; this project pins `3.12.5`.
- **Tailwind arbitrary property classes (e.g. `[direction:rtl]`) not applying**: requires Tailwind ≥3.1, pinned here at `3.4.13`. If you upgrade Tailwind, this still works.
- **Fonts not loading in dev**: `next/font/google` fetches font files at build time and needs network access once — this only matters in this environment's sandbox, not in a real dev machine or on Vercel.
