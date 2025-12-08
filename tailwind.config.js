/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js}', 
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}', 
    './plugins/**/*.{js}', 
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Usando a Lato como fonte principal
      },
    },
  },
  plugins: [],
}
