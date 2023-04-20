/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'green': '#6ee3b4',
      'red': '#ec5288',
      'black': '#000000',
      'gray': '#A9A9A9',
      "profileScreen": '#B3EADF',
      'white': '#FFFFFF',
      'pink': '#FFC0CB',
      'purple': '#E6E6FA',
      'lightgray': '#BFBFBF',
      'ligtblue': '#ADD8E6',
    }
  },
  plugins: [],
}
