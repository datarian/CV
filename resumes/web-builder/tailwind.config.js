/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cv-blue': '#2C5F7F',
        'cv-gray': '#4A4A4A',
        'cv-light': '#F5F5F5',
      }
    },
  },
  plugins: [],
}
