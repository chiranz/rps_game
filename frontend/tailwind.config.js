module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        "3m": "auto 1fr auto",
        "2m": "auto 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
