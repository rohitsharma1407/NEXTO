/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0095f6',
        'dark-bg': '#000',
        'light-bg': '#fafafa',
        'border-gray': '#dbdbdb',
      },
    },
  },
  plugins: [],
}
