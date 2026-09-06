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
        navy: {
          DEFAULT: "#0A1628",
          mid: "#0F2040",
        },
        steel: {
          DEFAULT: "#1A3A6B",
          light: "#2A5298",
        },
        gold: {
          DEFAULT: "#C8962A",
          light: "#E8B84B",
        },
        lightBg: "#F4F6FA",
        brandGray: {
          100: "#F8F9FC",
          200: "#EAECF3",
          400: "#9AA3B8",
          600: "#5A637A",
          800: "#2D3448",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
      boxShadow: {
        "brand-sm": "0 2px 12px rgba(10,22,40,.08)",
        "brand-md": "0 6px 30px rgba(10,22,40,.12)",
        "brand-lg": "0 16px 60px rgba(10,22,40,.18)",
      },
    },
  },
  plugins: [],
};

export default config;

