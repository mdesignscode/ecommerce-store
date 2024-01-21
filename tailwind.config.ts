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
        light: "#fffcf2",
        dark: "#252422",
        primary: "#eb5e28",
        secondary: "#ccc5b9",
        "secondary-dark": "#403d39"
      }
    },
  },
  plugins: [],
};
export default config;
