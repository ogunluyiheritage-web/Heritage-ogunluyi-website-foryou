# Image reference

Every image in this site lives under `public/images/`. Drop a correctly
named file into a folder below and it appears on the site automatically —
no code changes needed. Until a file exists, that slot renders a tasteful
tonal placeholder instead of a broken image.

Formats: JPG or WEBP, sRGB color profile. Keep files reasonably compressed
(quality ~75–85 for JPG) — `next/image` will still serve responsive sizes,
but it can't fix an unnecessarily heavy source file.

```
public/images/
├── profile/
│   └── portrait.jpg              1200 x 1500px min (4:5)
│
└── projects/
    ├── aurelia/                  ← the featured project (largest, highest-impact visual)
    │   ├── aurelia-main.jpg      2400 x 1500px min (16:10)
    │   └── aurelia-detail.jpg    1600 x 2000px min (4:5)
    │
    ├── architecture/
    │   ├── architecture-main.jpg     2400 x 1500px min (16:10)
    │   └── architecture-detail.jpg   1600 x 2000px min (4:5)
    │
    ├── product/
    │   ├── product-main.jpg          2400 x 1500px min (16:10)
    │   └── product-detail.jpg        1600 x 2000px min (4:5)
    │
    └── hospitality/
        ├── hospitality-main.jpg      2400 x 1500px min (16:10)
        └── hospitality-detail.jpg    1600 x 2000px min (4:5)
```

## Naming rule

Every project's images are named `<folder>-main.jpg` and `<folder>-detail.jpg`
— the folder name repeated in the filename. This is deliberate: it's the one
naming pattern to remember for any current or future project folder.

## Where each one is used

- `aurelia-main.jpg` / `aurelia-detail.jpg` — the full-bleed featured case
  study directly under the intro. This is the strongest visual on the site;
  use your best, highest-resolution shot here.
- `architecture-main.jpg`, `product-main.jpg`, `hospitality-main.jpg` — each
  shown once, in its row under "Further work." Their `-detail.jpg` files are
  reserved for a future per-project detail view and aren't required yet.
- `portrait.jpg` — the About section photo.

## Code reference

`lib/data.ts` exports a `projectImage(project, "main" | "detail")` helper
that builds the path for a given project — every component reads image paths
through this one function, so renaming a folder only ever means updating it
in one place.

No external image URLs are used anywhere in this project — everything is
served from these local files.
