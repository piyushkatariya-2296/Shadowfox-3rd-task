/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          400: '#C46D4E',
          500: '#A04A2C',
          600: '#8C3B1E',
          700: '#6E2C14',
        },
        espresso: {
          900: '#1F1A17',
          800: '#2C221E',
          700: '#4A3B34',
          500: '#7A6A61',
        },
        cream: {
          bg: '#FAF8F5',
          surface: '#F2ECE4',
          card: '#FFFFFF',
          border: '#E8E0D5',
        },
        sage: {
          500: '#68745E',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
