import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        modal: "rgb(30, 41, 54)",
        "azul": "#008cba",
      },
    },
  },
  plugins: [daisyui],
};
