const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./index.html"],

  theme: {
    extend: {
      colors: {
        "light-gray": "hsl(217, 12%, 63%)",
        "medium-gray": "hsl(216, 12%, 54%)",
        "dark-blue": "hsl(213, 19%, 18%)",
        "very-dark-blue": "hsl(216, 12%, 8%)",
        primary: "hsl(25, 97%, 53%)",
      },
      fontFamily: {
        sans: ["Overpass", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        base: "15px",
      },
      screens: {
        xs: "375px",
      },
      content: {
        value: "attr(value)",
      },
    },
  },

  plugins: [],
};

module.exports = config;
