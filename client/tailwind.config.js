/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#ffbf00",
        "primary-200": "#ffc929",
        "secondary-100": "#00b050",
        "secondary-200": "#0b1a78",
      },
      backgroundImage: {
        "register-bgimage": "url('./src/assets/login_bg.jpeg')",
      },
    },
  },
  plugins: [],
}

