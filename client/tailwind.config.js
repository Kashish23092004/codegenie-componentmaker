/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mywhite: {
          "primary": "#000000",
          "secondary": "#1a1a1a",
          "accent": "#333333",
          "neutral": "#ffffff",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
          "text-base": "#000000",
        },
      },
      "dark"
    ],
  },
}
