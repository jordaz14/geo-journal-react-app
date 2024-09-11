/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "primary-red": "#FF6163",
        "secondary-red": "#FFF2F2",
        "primary-gray": "#737373",
        "secondary-gray": "#D4D4D4",
        "tertiary-gray": "#FCFCFC",
      },
    },
  },
  plugins: [],
};
