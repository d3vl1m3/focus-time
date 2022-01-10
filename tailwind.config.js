module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}', './styles/index.css' ],
  theme: {
    extend: {
      fontFamily: {
        counter: [ 'Verdana', 'Geneva', 'Tahoma', 'sans-serif' ],
      },
      screens: {
        'xsm': '500px',
      },
    },
  },
  plugins: [],
};
