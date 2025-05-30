module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: process.env.COLOR || '#000000', // Thay ?.
      },
    },
  },
  plugins: [],
};
