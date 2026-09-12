import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        foreground: "#ededed",
        obsidian: {
          950: "#030304",
          900: "#070709",
          850: "#0b0c0e",
          800: "#101114",
          700: "#18191e",
          600: "#22242a",
        },
        chrome: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          accent: "#e4e4e7",
          shine: "#ffffff",
          liquid: "#a1a1aa",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "var(--font-cormorant)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-anuphan)", "system-ui", "sans-serif"],
        thai: ["var(--font-anuphan)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-spotlight": "radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        "chrome-gradient": "linear-gradient(135deg, #ffffff 0%, #a1a1aa 35%, #ffffff 50%, #71717a 75%, #ffffff 100%)",
        "liquid-chrome": "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(0, 0, 0, 0.6) 100%)",
        "glass-panel": "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "chrome-glow": "0 0 30px -5px rgba(255, 255, 255, 0.15)",
        "chrome-glow-lg": "0 0 60px -10px rgba(255, 255, 255, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "metallic-inset": "inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
