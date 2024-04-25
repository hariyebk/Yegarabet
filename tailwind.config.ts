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
        background: "#1e1e20",
        primary: "#dfdfd7",
        secondary: "#9999a0",
        main: "#e36002",
        card: "#252529",
        ctaButton: "#ff9c24",
        normalButton: "#32363f",
        regular: "#dbdbd2"
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'Roboto', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['Courier New', 'monospace'],
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
