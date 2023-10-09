/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white': '#ffffff', // Defina a cor branca
      },
      textColor: {
        'black': '#000000', // Defina a cor preta
      },
      darkMode: 'false', // Desativa o darkMode
    },
  },
  plugins: [],
};
