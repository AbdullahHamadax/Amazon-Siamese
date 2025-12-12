/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep space background similar to your screenshot
        void: {
          900: "#05050A", // Almost black
          800: "#0B0C15", // Deep purple-ish gray
          700: "#151621", // Panel background
          600: "#1E1F2E", // Lighter panel
        },
        // The "Yellowish Orange" you requested, but neon
        neon: {
          DEFAULT: "#FFAE00",
          glow: "#FFD050",
          dim: "#995A00",
        },
        // Accent for AI/Tech feel
        cyber: {
          blue: "#3B82F6",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"], // Crucial for that "Dev" feel
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1E1F2E 1px, transparent 1px), linear-gradient(to bottom, #1E1F2E 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
