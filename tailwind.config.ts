import type { Config } from "tailwindcss";

/* eslint @typescript-eslint/no-var-requires: "off" */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mexico: {
          primary: "#13322b", // Mexico green (alternative #0b231e).
          secondary: "#9d2449", // Mexico red.
          accent: "#b38e5d", // Mexico gold.
          neutral: "#934f00",
          "base-100": "#f5f5f5", // Whitesmoke.
          info: "#93c5fd",
          success: "#bef264",
          warning: "#fde047",
          error: "#fca5a5",
        },
      },
      {
        issste: {
          primary: "#9d2449", // Mexico red.
          secondary: "#13322b", // Mexico green (alternative #0b231e).
          accent: "#b38e5d", // Mexico gold.
          neutral: "#934f00",
          "base-100": "#f5f5f5", // Whitesmoke.
          info: "#93c5fd",
          success: "#bef264",
          warning: "#fde047",
          error: "#fca5a5",
        },
      },
      "night",
      "pastel",
      "synthwave",
      "coffee",
      {
        mytheme: {
          primary: "#fef9c3",
          secondary: "#1d4ed8",
          accent: "#94b1e0",
          neutral: "#332636",
          "base-100": "#212f45",
          info: "#8bb9f9",
          success: "#14574b",
          warning: "#f8c149",
          error: "#e23659",
        },
      },
      {
        sonora: {
          primary: "#9c3739", // Shade of reddish-brown.
          secondary: "#bb4444", // Pastel-type red.
          accent: "#683235", // #940c53", // Shade of purple.
          neutral: "#940c53", // Shade of deep brown.
          "base-100": "#eabd99", // "#dd955b", // Shade of orange.
          info: "#0284c7", // Tailwind Sky 600.
          success: "#16a34a", // Tailwind Green 600.
          warning: "#ea580c", // Tailwind Orange 600.
          error: "#dc2626", // Tailwind Red 600.
        },
      },
    ],
  },
} satisfies Config;
