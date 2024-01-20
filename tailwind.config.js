/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      helvetica: ["HelveticaNeueLTGEO"],
    },
    colors: {
      green: "#04AA6D",
      lightGreen: "#D9EEE1",
      lightYellow: "#FFF4A3",
      bgPlaceBorder: "#ACACAC",
      darkBlue: "#282A35",
      lightBlue: "#484A58",
      footerText: "#8C8C8C",
      footerBorder: "#E4E4E4",
    },
  },
  plugins: [],
};
