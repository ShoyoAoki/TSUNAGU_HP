import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... (existing colors)
        // Colorful Gamification Palette
        pixel: {
          cyan: "#06b6d4",    // Primary Brand
          magenta: "#d946ef", // Accent 1
          yellow: "#eab308",  // Accent 2
          lime: "#84cc16",    // Accent 3
          blue: "#3b82f6",    // Accent 4
          orange: "#f97316",  // Accent 5
          dark: "#111827",    // Text Main
          light: "#F9FAFB",   // Background
        }
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        serif: ["var(--font-noto-serif-jp)", "serif"],
        // Pixel font could be added here later if needed
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "pixel-pattern": "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;

