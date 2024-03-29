const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#EBD96B",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        hero: "url('./src/assets/hero-bg.svg')",
        gradient:
          "url('https://res.cloudinary.com/braydoncoyer/image/upload/v1642953750/glowing_gradient_background_tailwind_banner.jpg')",
      },
      maxWidth: {
        title: "8ch",
      },
      height: {
        mark: "1.33em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
