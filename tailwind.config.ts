import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020617",
          900: "#06101f",
          850: "#081526",
          800: "#0b1c33",
          700: "#122844",
        },
        ice: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.28)",
        "glow-lg": "0 10px 50px rgba(34, 211, 238, 0.35)",
        glass: "0 8px 32px rgba(2, 6, 23, 0.45)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.18), transparent 55%)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(0,-1.5%,0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        countglow: {
          "0%, 100%": { textShadow: "0 0 12px rgba(34,211,238,0.25)" },
          "50%": { textShadow: "0 0 22px rgba(34,211,238,0.55)" },
        },
      },
      animation: {
        kenburns: "kenburns 28s ease-out forwards",
        pulseRing: "pulseRing 2.2s ease-out infinite",
        ticker: "ticker 42s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
        shimmer: "shimmer 3.2s linear infinite",
        countglow: "countglow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
