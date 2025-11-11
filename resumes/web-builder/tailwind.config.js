/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cv-blue': '#2C5F7F',      // Deep professional blue (primary)
        'cv-coral': '#f77189',     // Coral (secondary - achievements)
        'cv-green': '#32b166',     // Green (secondary - success states)
        'cv-gray': '#4A4A4A',      // Dark gray (text)
        'cv-light': '#F5F5F5',     // Light background
        'cv-dark-gray': '#4D4D4D', // Slightly lighter gray for metadata
      }
    },
  },
  plugins: [],
}
