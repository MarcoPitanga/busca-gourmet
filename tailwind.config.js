/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fce5cd",
        primary: "#dd1033",
      },
    },
  },
  plugins: [],
};
