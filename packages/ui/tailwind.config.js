const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx,json}"],
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};
