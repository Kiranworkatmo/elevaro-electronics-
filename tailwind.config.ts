import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elevaro: {
          black: "#080808",
          dark: "#0F0F0F",
          charcoal: "#171717",
          surface: "#1E1E1E",
          card: "#141414",
          border: "#262626",
          muted: "#888888",
          light: "#F5F5F7",
        },
        gold: {
          50: "#FDFBF7",
          100: "#F8F3E8",
          200: "#EFE3C8",
          300: "#E3CFA2",
          400: "#D7BC7E",
          500: "#C9A96E", // Signature Champagne Gold
          600: "#B69352",
          700: "#92743C",
          800: "#6F572C",
          900: "#4D3B1C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(201, 169, 110, 0.15)',
        'gold-glow': '0 0 30px rgba(201, 169, 110, 0.25)',
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;