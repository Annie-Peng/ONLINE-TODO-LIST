/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#FFD370",
      secondary: "#333333",
      tertiary: "#9F9A91",
      warning: "#D87355",
      white: "#FFFFFF",
      line: "#E5E5E5",
    },
    fontFamily: {
      sans: ["Noto Sans TC"],
    },
  },
  plugins: [],
};
