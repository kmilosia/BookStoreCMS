/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        dracula: {
          100: '#ffffff',
          150: '#f7f7f7',
          200: '#efeef2',
          300: '#E4E2E9',
          400: '#B3AFC0',
          450: '#84818e',
          500: '#565167',
          600: '#2B2833',
          700: '#1D1B22', 
          800: '#18171D',
          900: '#0E0D11',
        },
      },     
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('flowbite/plugin'),
  ],
}

