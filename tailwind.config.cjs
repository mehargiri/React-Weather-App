/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: { "sm": "600px", "lg-screen": "1100px" },
	},
	plugins: [],
};
