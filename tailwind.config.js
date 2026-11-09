/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#fcfbf9',
        surface: '#ffffff',
        ink: '#17150f',
        muted: '#716e63',
        line: '#e6e4dc',
        brand: {
          50: '#f0f4ff',
          100: '#e0eaff',
          400: '#6085ff',
          500: '#3b63f5',
          600: '#254adb',
          700: '#1d3ab5',
          800: '#193094',
        },
        accent: {
          50: '#fff4f0',
          200: '#ffc5b3',
          300: '#ff9c7d',
          600: '#e64819',
          800: '#b8340d',
        }
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
}