/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        saphire: {
          100: '#E9EFFD',
          200: '#BDD0FB',
          300: '#91B3FA',
          400: '#7D97F4',
          500: '#6467fa',
          600: '#4548ED',
          700: '#1A0F90',
          800: '#0B0161',
          900: '#060130',
        }
      },     
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

