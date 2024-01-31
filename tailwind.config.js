/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
  variants: {},
}
