/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--primary-blue, #6D7F9F)',
        'secondary': 'var(--secondary-green, #8FDCB8)',
        'secondary-dark': 'var(--secondary-yellow, #F0D16D)',
        'primary-blue': 'var(--primary-blue, #6D7F9F)',
        'primary-light-blue': 'var(--primary-light-blue, #A8C6E8)',
        'accent-dark-gray': 'var(--accent-dark-gray, #2E2E2E)',
        'accent-white': 'var(--accent-white, #FFFFFF)',
        'secondary-yellow': 'var(--secondary-yellow, #F0D16D)',
        'secondary-green': 'var(--secondary-green, #8FDCB8)',
        'text-dark': 'var(--text-dark, #2D2D2D)',
        'text-light': 'var(--text-light, #D1D9E6)',
        'border-light': 'var(--border-light, #D9D9D9)',
        'background-primary': 'var(--background-primary, #FFFFFF)',
        'background-secondary': 'var(--background-secondary, #F8F9FC)',
        'background-main': '#F8F9FC',
        'card-background': 'var(--card-background, #FFFFFF)',
        'surface-light': 'var(--surface-light, #F8F9FC)',
        'divider-color': 'var(--divider-color, rgba(45, 45, 45, 0.08))',
        'button-action-blue': '#5270a8',
        'highlight-blue-strong': '#4f46e5',
        'tech-icon-bg': '#0077cc',
        'tech-card-bg': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        display: ['Poppins', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '30px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'card': 'var(--card-shadow, 0 8px 30px rgba(0, 0, 0, 0.05))',
        'surface': 'var(--surface-shadow, 0 4px 12px rgba(176, 163, 212, 0.15))',
        'md': 'var(--shadow, 0 4px 20px rgba(0, 0, 0, 0.08))',
        'action-btn': '0 6px 15px rgba(15, 23, 42, 0.15)',
        'action-btn-hover': '0 10px 20px rgba(15, 23, 42, 0.2)',
        'tech-card': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'tech-card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'bounce-in': 'bounce-in 0.4s ease-out forwards',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(255, 255, 255, 0.4)' },
          '70%': { 'box-shadow': '0 0 0 10px rgba(255, 255, 255, 0)' },
        },
      }
    },
  },
  plugins: [],
};