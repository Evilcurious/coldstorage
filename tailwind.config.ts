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
        frost: {
          50: "#f7fbff",
          100: "#eff7ff",
          200: "#e0efff",
          300: "#cbe5fa",
          400: "#a9d4f4",
          500: "#7fbeeb",
        },
        ice: {
          300: "#8ed2f8",
          400: "#57b7ef",
          500: "#2e9be6",
          600: "#1b7cc4",
          700: "#155f98",
        },
        ink: {
          900: "#0a2540",
          800: "#123252",
          700: "#1c4667",
          600: "#2f5b7d",
          500: "#4a6b87",
          400: "#6e8aa3",
          300: "#9bb2c6",
          200: "#c2d3e1",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,37,64,0.04), 0 8px 24px -12px rgba(10,37,64,0.14)",
        lift: "0 2px 4px rgba(10,37,64,0.05), 0 24px 48px -20px rgba(10,37,64,0.25)",
        frost: "0 0 0 1px rgba(255,255,255,0.7) inset, 0 20px 60px -30px rgba(46,155,230,0.55)",
        glow: "0 18px 40px -18px rgba(46,155,230,0.65)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.9)",
      },
      backgroundImage: {
        "ice-fade":
          "linear-gradient(180deg, #ffffff 0%, #f7fbff 38%, #eaf4ff 100%)",
        "ice-sheen":
          "linear-gradient(110deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 80%)",
        "ice-grid":
          "linear-gradient(to right, rgba(46,155,230,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,155,230,0.09) 1px, transparent 1px)",
        "brand-grad":
          "linear-gradient(135deg, #57b7ef 0%, #2e9be6 45%, #1b7cc4 100%)",
        "frost-grad":
          "radial-gradient(120% 90% at 12% 0%, rgba(87,183,239,0.20), transparent 55%), radial-gradient(90% 80% at 92% 8%, rgba(169,212,244,0.35), transparent 60%)",
      },
      backgroundSize: {
        grid: "42px 42px",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1.5deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drift: {
          "0%": { transform: "translate3d(-4%, 0, 0) scale(1.05)" },
          "50%": { transform: "translate3d(4%, -2%, 0) scale(1.12)" },
          "100%": { transform: "translate3d(-4%, 0, 0) scale(1.05)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "100%": { transform: "scale(1.65)", opacity: "0" },
        },
        frostBreathe: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-14deg)" },
          "100%": { transform: "translateX(220%) skewX(-14deg)" },
        },
        lineFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        riseFall: {
          "0%, 100%": { transform: "translateY(6px)", opacity: "0.35" },
          "50%": { transform: "translateY(-6px)", opacity: "0.9" },
        },
        scan: {
          "0%": { transform: "translateY(-6%)", opacity: "0" },
          "35%": { opacity: "0.9" },
          "100%": { transform: "translateY(320%)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        needle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        shimmerText: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
      },
      animation: {
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-fast": "floatFast 4.5s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        "spin-slow": "spinSlow 26s linear infinite",
        "pulse-ring": "pulseRing 2.6s ease-out infinite",
        "frost-breathe": "frostBreathe 9s ease-in-out infinite",
        sheen: "sheen 3.4s ease-in-out infinite",
        lineflow: "lineFlow 2.6s linear infinite",
        "rise-fall": "riseFall 3.6s ease-in-out infinite",
        scan: "scan 4.2s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        needle: "needle 3.2s ease-in-out infinite",
        "shimmer-text": "shimmerText 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
