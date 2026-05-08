/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 theme: {
  extend: {
    colors: {
      "primary": "#006565",
      "primary-container": "#008080",
      "on-primary-container": "#e3fffe",
      "secondary-container": "#6bfe9c",
      "on-secondary-container": "#00743a",
      "surface": "#f8fafa",
      "on-surface": "#191c1d",
      "on-surface-variant": "#3e4949",
      "background": "#f8fafa",
      "on-background": "#191c1d",
      // ... puedes añadir el resto si los necesitas
    },
    fontFamily: {
      display: ["Montserrat", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
},
  plugins: [],
}