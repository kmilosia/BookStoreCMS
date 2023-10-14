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
          100: '#FFFFFF', //big text h1's
          200: '#FEFEFE', //smaller text h3's
          300: '#E4E2E9', //grayed text p's ex. navbar
          400: '#B3AFC0', //more grayed text ex.extra elements
          500: '#565167', //the grayest text ex.extra info
          600: '#2B2833', //border
          700: '#1D1B22', //modules bg
          800: '#18171D', //elements bg
          900: '#0E0D11', //main bg
        },
        midnight: {
          50: '#F6F6F9',
          100: '#EAEAEF',
          150: '#E4E4E7',
          200: '#DCDCE4',
          300: '#C0C0CF',
          400: '#9D9DB2',
          500: '#8F8EA9',
          600: '#6F6F8E',
          650: '#666687', //border
          700: '#4A4A6A',
          800: '#33324D',
          900: '#212134', //medium background
          950: '#181826', //darkest background
        },
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

