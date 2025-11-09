/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nasa-dark-blue': '#0b3d91',
        'nasa-blue': '#105bd8',
        'nasa-red': '#fc3d21',
        'nasa-light-gray': '#a7a9ac',
        'nasa-white': '#ffffff',
        'space-dark': '#0d1117',
        'space-light': '#161b22',
      },
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
