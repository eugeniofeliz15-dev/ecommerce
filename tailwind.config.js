/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 40px -24px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 72% 45%, rgba(59,130,246,0.22), transparent 30%), linear-gradient(135deg, #0f172a 0%, #111c36 52%, #182b52 100%)',
      },
    },
  },
  plugins: [],
}
