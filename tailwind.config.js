/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      primary: "#5c6ac4",
      secondary: "#ecc94b",
    },
  },
  darkMode: "media",
  plugins: [require("flowbite/plugin")],
};
