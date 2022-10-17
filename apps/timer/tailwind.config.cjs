const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          "grayish-blue": "hsl(237, 18%, 59%)",
          "soft-red": "hsl(345, 95%, 68%)",
        },
        blue: {
          desaturated: "hsl(236, 21%, 26%)",
          dark: "hsl(235, 16%, 14%)",
          black: "hsl(234, 17%, 12%)",
        },
      },
      fontFamily: {
        sans: ["'Red Hat Text'", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        stars: "url('./src/assets/images/bg-stars.svg')",
        hills: "url('./src/assets/images/pattern-hills.svg')",
        "hills-stars":
          "url('./src/assets/images/pattern-hills.svg'), url('./src/assets/images/bg-stars.svg')",
      },
      maxWidth: {
        screen: "100vw",
      },
      minWidth: {
        time: "2ch",
      },
    },
  },
  plugins: [],
};
