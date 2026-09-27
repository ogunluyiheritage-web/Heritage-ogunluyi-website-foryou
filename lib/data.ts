// Centralized content. Edit copy, project info, and links here —
// components pull from this file rather than hard-coding text.
//
// IMAGES: paths below point into public/images/... — see the README in
// each folder for the exact filenames ProjectImage expects. Until you drop
// real files in, ProjectImage renders a tonal placeholder automatically.

export const site = {
  name: "Heritage",
  role: "Creative Developer",
  tagline: "Digital Experience Designer",
  year: new Date().getFullYear(),
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Creative Developer / Digital Experience Designer",
  statement: "I build digital experiences that make brands impossible to ignore.",
  // Shown small, under the statement — answers "who do you work with" in the first viewport.
  industries: "Luxury Real Estate / Hospitality / Architecture / Premium Brands",
};

export const intro = {
  label: "What I do",
  heading: "Design meets technology.",
  lead: "I design and build high-end digital experiences for brands that care about how they are perceived.",
  body:
    "I work with luxury real estate, hospitality, architecture, and ambitious brands that need their digital presence to match the quality of what they've built — combining UX/UI, creative development, motion, 3D, responsive engineering, and performance into one craft rather than separate deliverables.",
};

export type ProjectType = "client" | "concept";

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string; // Industry
  description: string;
  year: string;
  type: ProjectType;
  services: string;
  technology: string;
  imageFolder: string; // public/images/projects/<imageFolder>/ — see IMAGE FILENAMES below
};

// IMAGE FILENAMES
// Each project folder takes exactly two files, named after the folder itself:
//   public/images/projects/<imageFolder>/<imageFolder>-main.jpg
//   public/images/projects/<imageFolder>/<imageFolder>-detail.jpg
// e.g. public/images/projects/aurelia/aurelia-main.jpg
// See the README.txt in each folder for exact dimensions and format.
export function projectImage(project: Pick<Project, "imageFolder">, variant: "main" | "detail") {
  return `/images/projects/${project.imageFolder}/${project.imageFolder}-${variant}.jpg`;
}

// Label shown on every project — never implies concept work was commissioned.
export function projectLabel(type: ProjectType) {
  return type === "client" ? "Client Project" : "Independent Concept";
}

export const projects: Project[] = [
  {
    id: "aurelia-estates",
    index: "01",
    name: "Aurelia Estates",
    category: "Luxury Real Estate",
    description: "An immersive digital experience built around architecture, atmosphere and movement.",
    year: "2026",
    type: "concept",
    services: "UX / UI / Creative Development / Motion / 3D",
    technology: "Next.js / GSAP / React Three Fiber",
    imageFolder: "aurelia",
  },
  {
    id: "maison-noire",
    index: "02",
    name: "Maison Noire",
    category: "Architecture / Interior",
    description: "An interior studio's portfolio rendered as a slow, tactile walkthrough of material and light.",
    year: "2025",
    type: "concept",
    services: "Web Design / Creative Development / Motion",
    technology: "Next.js / GSAP",
    imageFolder: "architecture",
  },
  {
    id: "halo",
    index: "03",
    name: "Halo",
    category: "Product / Technology",
    description: "A concept product launch built around a single object and a confident, editorial pace.",
    year: "2025",
    type: "concept",
    services: "Art Direction / Web Design / Development",
    technology: "Next.js / Framer Motion",
    imageFolder: "product",
  },
  {
    id: "solene",
    index: "04",
    name: "Solene",
    category: "Luxury Hospitality",
    description: "A resort brand experience where the booking flow feels like part of the story, not a form.",
    year: "2024",
    type: "concept",
    services: "UX / UI / Creative Development",
    technology: "Next.js / GSAP",
    imageFolder: "hospitality",
  },
];

export const caseStudy = {
  project: projects[0],
  title: "Aurelia Estates",
  subtitle: "Luxury Real Estate",
  description: "An immersive digital experience built around architecture, atmosphere and movement.",
  role: "Creative Direction / UI / Development",
  services: projects[0].services,
  technology: projects[0].technology,
  cta: "View project",
};

export type Capability = {
  index: string;
  title: string;
  detail: string;
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Digital Art Direction",
    detail: "Setting the visual language a brand lives in online — tone, pace, and the moments that carry it.",
  },
  {
    index: "02",
    title: "Web Design",
    detail: "Interfaces built around typography, whitespace, and hierarchy, not templates or component kits.",
  },
  {
    index: "03",
    title: "Creative Development",
    detail: "Turning a design system into production code without losing the intent behind it.",
  },
  {
    index: "04",
    title: "Motion & Interaction",
    detail: "Scroll, hover, and transition behavior that explains the interface instead of decorating it.",
  },
  {
    index: "05",
    title: "3D Experiences",
    detail: "Restrained, purposeful 3D — used where it adds presence, never as spectacle.",
  },
  {
    index: "06",
    title: "Performance & Responsive Development",
    detail: "Fast, accessible builds that hold their quality from a 4K display down to a phone on mobile data.",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  detail: string;
};

export const process: ProcessStep[] = [
  { index: "01", title: "Discover", detail: "Understand the brand, audience and business objective." },
  { index: "02", title: "Direct", detail: "Define the visual direction and experience." },
  { index: "03", title: "Design", detail: "Create the interface and interaction system." },
  { index: "04", title: "Build", detail: "Turn the design into a fast production website." },
  { index: "05", title: "Refine", detail: "Polish animation, responsiveness and performance." },
  { index: "06", title: "Launch", detail: "Deploy and monitor the finished experience." },
];

export const about = {
  statement: "I care about the space between design and technology.",
  bio:
    "I'm a creative developer working with luxury real estate, hospitality, architecture, and ambitious brands that need their digital presence to match the quality of what they've built. My background spans visual design and front-end engineering, which means the interfaces I design are made with an understanding of how they'll actually be built — and the ones I build are held to a design standard, not just a functional one.",
};

// Every real contact detail lives here, once. Components read from this
// object rather than hardcoding an address/number — change a number here
// and it updates everywhere (Contact section, Footer) automatically.
export const contact = {
  heading: "Have something worth building?",
  subheading: "Let's make it exceptional.",
  supporting: "For luxury real estate, hospitality, architecture and ambitious brands.",

  email: "ogunluyiheritage@gmail.com",
  emailHref: buildMailto(
    "ogunluyiheritage@gmail.com",
    "Project Inquiry — Heritage",
    "Hi Heritage,\n\nI'd like to discuss a project with you.\n\nProject:\nCompany:\nTimeline:\nBudget:\n\nThanks."
  ),

  phone: "+234 813 787 0095",
  phoneHref: "tel:+2348137870095",

  whatsapp: "+234 906 135 7004",
  whatsappHref: buildWhatsapp(
    "2349061357004",
    "Hi Heritage, I found your portfolio and would like to discuss a project."
  ),
};

function buildMailto(address: string, subject: string, body: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildWhatsapp(digitsOnlyNumber: string, message: string) {
  return `https://wa.me/${digitsOnlyNumber}?text=${encodeURIComponent(message)}`;
}
