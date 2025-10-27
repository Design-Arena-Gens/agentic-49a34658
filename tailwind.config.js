/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f2f8fb',
          100: '#e0f0f6',
          200: '#b9ddec',
          300: '#84c3de',
          400: '#4b9ecc',
          500: '#267fb8',
          600: '#1b66a0',
          700: '#175282',
          800: '#16456b',
          900: '#123653'
        },
        meadow: {
          50: '#f0f9f4',
          100: '#daf0e4',
          200: '#b4e1ca',
          300: '#80cba6',
          400: '#4db782',
          500: '#27a066',
          600: '#1c8252',
          700: '#186843',
          800: '#155337',
          900: '#12432d'
        },
        slate: {
          50: '#f7f9fc',
          100: '#eff2f9',
          200: '#dce2ef',
          300: '#c1cbe0',
          400: '#96a7c6',
          500: '#6f87ae',
          600: '#4f668b',
          700: '#404f70',
          800: '#343f5a',
          900: '#2c344b'
        }
      }
    }
  },
  plugins: []
};
