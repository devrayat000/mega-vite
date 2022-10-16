const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          "soft-red": "hsl(10, 79%, 65%)",
          cyan: "hsl(186, 34%, 60%)",
        },
        neutral: {
          "dark-brown": "hsl(25, 47%, 15%)",
          "mid-brown": "hsl(28, 10%, 53%)",
          cream: "hsl(27, 66%, 92%)",
          "pale-orange": "hsl(33, 100%, 98%)",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
