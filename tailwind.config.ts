import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0C",
        paper: "#F3F2EE",
        stone: "#8A867E",
        line: "#D9D6CD",
        brass: "#A47551",
        "brass-dim": "#8A6343",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-grotesk)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.1rem, 13vw, 10.5rem)", { lineHeight: "0.88", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4.2vw, 3.4rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        prose: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
