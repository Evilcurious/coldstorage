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
        /* deep navy — sampled from the logo wordmark */
        ink: {
          950: "#0A1B33",
          900: "#1B3A63",
          800: "#22456F",
          700: "#2B537F",
          600: "#35618F",
        },
        /* rust accent — sampled from the logo slats and ridge */
        ember: {
          300: "#E0A98A",
          400: "#C4683F",
          500: "#B25227",
          600: "#A8481E",
          700: "#8A3413",
        },
        /* primary accent: restrained corporate blue */
        ice: {
          50: "#F3F8FD",
          100: "#E5F1FA",
          200: "#C7E2F5",
          300: "#94C9EC",
          400: "#57A8DE",
          500: "#2A89C8",
          600: "#1470AC",
          700: "#0E5C8F",
          800: "#0C4A73",
          900: "#0A3A5A",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,51,0.04), 0 1px 3px rgba(11,31,51,0.06)",
        "card-hover":
          "0 4px 8px -2px rgba(11,31,51,0.08), 0 16px 32px -16px rgba(11,31,51,0.18)",
        panel: "0 24px 48px -32px rgba(11,31,51,0.35)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "air-fade":
          "linear-gradient(180deg, #ffffff 0%, #f8fbfe 45%, #f1f7fc 100%)",
        "ice-line":
          "linear-gradient(90deg, rgba(20,112,172,0) 0%, rgba(20,112,172,0.35) 50%, rgba(20,112,172,0) 100%)",
        "grid-faint":
          "linear-gradient(to right, rgba(11,31,51,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,51,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "scale(1.04) translate3d(-1%, 0, 0)" },
          "50%": { transform: "scale(1.07) translate3d(1%, -1%, 0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        flow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        needle: {
          "0%, 100%": { transform: "rotate(-2.5deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
      },
      animation: {
        drift: "drift 34s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        lineflow: "flow 3.2s linear infinite",
        marquee: "marquee 46s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        needle: "needle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
