const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./index.html"],

  theme: {
    extend: {
      colors: {
        "light-gray": "hsl(212, 45%, 89%)",
        "dark-blue": "hsl(218, 44%, 22%)",
        "grayish-blue": "hsl(220, 15%, 55%)",
      },
      fontFamily: {
        sans: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        base: "15px",
      },
      screens: {
        xs: "375px",
      },
      // content: {
      //   value: "attr(value)",
      // },
    },
  },

  plugins: [],
};

module.exports = config;
