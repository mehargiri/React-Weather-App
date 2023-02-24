/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xsm: { max: "350px" },
      sm: "600px",
      "sm-max": { max: "600px" },
      "lg-screen": "1100px",
    },
  },
  plugins: [],
};
