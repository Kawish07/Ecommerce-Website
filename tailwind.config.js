module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        'brand-black': '#121212',
        'brand-gray': '#1f1f1f',
        'brand-red': '#6b3a3a',
        'brand-dark-red': '#582e2e',
      }
    },
  },
  plugins: [],
};
