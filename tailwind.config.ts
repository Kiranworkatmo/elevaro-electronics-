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
        gold: {
          50: "#fdfbf7",
          100: "#fbf6ec",
          200: "#f5eacc",
          300: "#ebd7a1",
          400: "#dfbd6e",
          500: "#cda043", // signature antique gold
          600: "#b58434",
          700: "#916429",
          800: "#765027",
          900: "#624324",
        },
        crimson: {
          700: "#9b1b28",
          800: "#801823",
          900: "#68131B",
          950: "#420A10",
        },
        emerald: {
          800: "#134e3f",
          850: "#0f3e32",
          900: "#0c3027",
          950: "#061a15",
        },
        pearl: "#FDFBF7",
        parchment: "#F6F1EA",
        charcoal: "#161514",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
