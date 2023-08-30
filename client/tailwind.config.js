const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'semimd': '950px',
        'md800': '800px'
      }
    },
    colors: {
      'primary': {
        light: "#00EBEB",
        DEFAULT: '#009D9E',
        semidark: "#008080",
        dark: "#1B2E45"
      },
      'secondary': {
        DEFAULT: '#162638',
        dark: "#132130"
      },
      'tertiary': {
        light: "#0988B5",
        light_hover: "#08749C",
        DEFAULT: '#0955AB',
        dark: '#074185'
      },
      'white': "#FFFFFF",
      "highlight": "#16DEDE",
      gray: colors.gray,
      red: colors.red
    }
  },
  plugins: [],
}

