/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          50: " #fdf5eb",
          100: "#fbe4c2",
          200: "#f5cc8c",
          300: "#efb556",
          400: "#ea9e20",
          500: "#eaa636", // main color
          600: "#d6932f",
          700: "#b37526",
          800: "#8f5b1c",
          900: "#6a4314",
        },
        secondary: {
          100: "#e6e2df",
          200: "#cfc9c5",
          300: "#b8afa9",
          400: "#a1968e",
          500: "#1e1916", // main secondary color
          600: "#1b1613",
          700: "#181311",
          800: "#15100e",
          900: "#120d0b",
        },
      },
    },
  },
  plugins: [],
};
