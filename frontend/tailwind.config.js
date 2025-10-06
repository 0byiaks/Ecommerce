/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazonBlue: '#131921',
        amazonYellow: '#FFD700',
        amazonOrange: '#FF9900',
      },
    },
  },
  plugins: [],
}
