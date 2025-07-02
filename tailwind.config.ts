// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './app.vue',
    './layouts/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      container: { center: true, padding: '2rem' },
      colors: {
        bg: '#141414',
        card: '#1f1f1f',
        primary: '#e50914',
      },
    },
  },
  plugins: [],
};
