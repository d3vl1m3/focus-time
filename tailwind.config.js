module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './styles/global.css'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        counter: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
