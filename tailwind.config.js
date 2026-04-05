/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink))",
        muted: "rgb(var(--muted))",
        paper: "rgb(var(--paper))",
        surface: "rgb(var(--surface))",
        panel: "rgb(var(--panel))",
        stroke: "rgb(var(--stroke))",
        accent: "rgb(var(--accent))",
        "accent-2": "rgb(var(--accent-2))",
        "accent-3": "rgb(var(--accent-3))",
      },
      boxShadow: {
        card: "0 24px 50px -32px rgba(15, 23, 42, 0.45)",
        soft: "0 12px 30px -18px rgba(15, 23, 42, 0.35)",
      },
      borderRadius: {
        xl: "1.1rem",
        "2xl": "1.6rem",
        "3xl": "2rem",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};