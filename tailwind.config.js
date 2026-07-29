/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#131424',
        secondary: '#1e1e3f',
        accent: '#F13024',
        cyan: '#00f7ff',
        dark: '#080808',
        darker: '#101010',
      },
      animation: {
        'prominent-pulse': 'prominent-pulse 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        'prominent-pulse': {
          '0%, 100%': { boxShadow: '0 0 30px #00f7ff' },
          '50%': { boxShadow: '0 0 60px #00f7ff, 0 0 80px #00f7ff' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}