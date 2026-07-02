import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cool graphite / obsidian base — technical, near-black with a blue undertone.
        ink: {
          950: "#05060a",
          900: "#090b11",
          800: "#0e1119",
          700: "#151a25",
          600: "#1d2331",
        },
        // "Signal" aurora accents laid across a green → teal → azure spectrum, so any
        // combination reads as one cohesive electric gradient. Pink is repurposed as
        // the coral error/critical tone (warm contrast against the cool palette).
        brand: {
          blue: "#3d9bff", // electric azure
          indigo: "#26e0a8", // spring green (primary)
          purple: "#10cbd6", // teal-cyan (replaces violet)
          cyan: "#2fb6f7", // sky / azure-cyan
          teal: "#12d9c0", // teal
          emerald: "#2feba0", // mint — success / "pass"
          pink: "#ff5d7a", // coral — error / critical
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "9xl": ["8rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
      },
      // Slightly tighter radii for a crisper, more technical surface language.
      borderRadius: {
        "2xl": "0.75rem",
        "3xl": "1.125rem",
        "4xl": "1.375rem",
        "5xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 34px -8px rgba(38, 224, 168, 0.42)",
        "glow-lg": "0 0 72px -16px rgba(38, 224, 168, 0.5)",
        "glow-cyan": "0 0 34px -8px rgba(61, 155, 255, 0.42)",
        card: "inset 0 1px 0 0 rgba(255,255,255,0.07), 0 24px 60px -28px rgba(0,0,0,0.85)",
        "ring-glow": "0 0 0 1px rgba(38,224,168,0.22), 0 0 30px -8px rgba(38,224,168,0.4)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "grid-fade":
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.1)" },
          "66%": { transform: "translate(-4%, 4%) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "beam-move": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(300%) skewX(-12deg)" },
        },
      },
      animation: {
        "aurora-shift": "aurora-shift 18s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "beam-move": "beam-move 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
