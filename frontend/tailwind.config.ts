import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F4",
        surface: "#FFFFFF",
        ink: "#1C1917",
        muted: "#78716C",
        border: "#EAE5DC",
        accent: {
          DEFAULT: "#C2410C",
          dark: "#9A3412",
          light: "#FDE6D8",
        },
        success: "#166534",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.625rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(28 25 23 / 0.04), 0 1px 1px 0 rgb(28 25 23 / 0.03)",
        cardHover: "0 4px 12px -2px rgb(28 25 23 / 0.08), 0 2px 4px -1px rgb(28 25 23 / 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
