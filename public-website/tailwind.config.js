// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Adjust if you have other file extensions or paths
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        'primary-dark': 'var(--primary-blue, #6D7F9F)',
        secondary: 'var(--secondary-green, #8FDCB8)',
        'secondary-dark': 'var(--secondary-yellow, #F0D16D)',
        'tech-icon': '#4865a1',
        'suitability': {
          'text': '#111827',
          'paragraph': '#6B7280',
          'link': '#2563eb',
          'link-hover': '#1D4ED8',
          'bubble': '#4f6a8f',
          'score': '#10b981',
        },
        'hero-bg': '#1a1a1a',
        'hero-text': '#f5f7fd',
        'hero-subtext': '#bec4cc',
        // Extracted from your global.css and other CSS files
        'primary-blue': 'var(--primary-blue, #6D7F9F)',
        'primary-light-blue': 'var(--primary-light-blue, #A8C6E8)',
        'accent-dark-gray': 'var(--accent-dark-gray, #2E2E2E)',
        'accent-white': 'var(--accent-white, #FFFFFF)',
        'secondary-yellow': 'var(--secondary-yellow, #F0D16D)',
        'secondary-green': 'var(--secondary-green, #8FDCB8)',
        'text-dark': 'var(--text-dark, #2D2D2D)',    // Used as text-primary in global.css
        'text-light': 'var(--text-light, #D1D9E6)',
        'border-light': 'var(--border-light, #D9D9D9)', // Used as border-color in global.css
        
        // From modern UI theme section in global.css (some are re-aliases)
        'background-primary': 'var(--background-primary, #FFFFFF)',
        'background-secondary': 'var(--background-secondary, #F8F9FC)', // also --app-bg
        'card-background': 'var(--card-background, #FFFFFF)',          // also --card-bg
        'surface-light': 'var(--surface-light, #F8F9FC)',
        'divider-color': 'var(--divider-color, rgba(45, 45, 45, 0.08))',
        'tag-bg': 'var(--tag-bg, rgba(176, 163, 212, 0.15))',
        'tag-text': 'var(--tag-text, #6D7F9F)',
        'feature-icon-bg': 'var(--feature-icon-bg, #B0A3D4)',
        'feature-icon-color': 'var(--feature-icon-color, #FFFFFF)',

        // Specific colors from component CSS (examples)
        // SummaryReports.css
        'excellent-green': '#32CD32',
        'good-green': '#4CAF50',
        'moderate-yellow': '#FFEB3B', // different from secondary-yellow
        'poor-orange': '#FF9800',
        'unsuitable-red': '#F44336',
        'optimal-turquoise': '#00A67E', // Also used as 'roi-green' implicitly
        'mpu-blue': '#4361ee', // PaybackData color
        'irr-blue-light': '#5DADE2', // financialSummaryData color

      

        // ResultsDisplay.css & AssApp.css
        'highlight-blue-strong': '#4f46e5',   // --highlight-blue from AssApp
        'highlight-green-strong': '#4ade80', // --highlight-green from AssApp
        'button-action-blue': '#5270a8', // results-action-btn, btn
        
        
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        yekan: ['Yekan Bakh', 'sans-serif'],
      },
      borderRadius: {
        // Common border-radius values observed
        'sm': '4px',   // e.g., .color-box, .map-scale
        'md': '8px',   // e.g., .btn, .input-field, .nav-button, .metric-card
        'lg': '10px',  // e.g., .results-panel.full-width-results (outer), .report-section (inner)
        'xl': '12px',  // e.g., .results-panel.full-width-results, .map-box (SummaryReports)
        '2xl': '16px', // e.g., .card, .map-analysis-container, .score-card
        '3xl': '24px', // e.g., site-selection-results
        '4xl': '30px', // e.g., .map-header in SummaryReports
        '5xl': '50px', // e.g., .suitability-rating
        'full': '9999px',
      },
      spacing: {
        // Based on common padding/margin values (px to rem/tailwind scale)
        // Example: 8px -> 2, 10px -> 2.5, 12px -> 3, 16px -> 4, 20px -> 5, 24px -> 6, 32px -> 8
        '1.5': '0.375rem', // 6px
        '2.5': '0.625rem', // 10px
        '3.5': '0.875rem', // 14px
        '4.5': '1.125rem', // 18px
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px
        '80': '20rem',     // 320px
        '100': '25rem',    // 400px
        '120': '30rem',    // 480px
        '150': '37.5rem',  // 600px
      },
      width: {
        'suitability-container': '1200px',
        'suitability-box': '1040px',
        'suitability-inner': '500px',
        'suitability-content': '420px',
      },
      fontSize: {
        'suitability-header': ['47px', '51px'],
        'suitability-subheader': ['20px', '20px'],
        'suitability-paragraph': ['18px', '22px'],
      },
      boxShadow: {
        'custom-lg': '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)', 
        'card': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)', // Your existing card shadow
        'demo-video': '0 8px 32px 0 rgba(30, 32, 37, 0.18), 0 1.5px 4px 0 rgba(30, 32, 37, 0.08)',
        'hero-video': '0 8px 32px 0 rgba(30, 32, 37, 0.18), 0 1.5px 4px 0 rgba(30, 32, 37, 0.08)',
        'window-control': '0 1px 2px rgba(30,32,37,0.10)',
        // Extracted from your CSS variables and common uses
        'card': 'var(--card-shadow, 0 8px 30px rgba(0, 0, 0, 0.05))',
        'surface': 'var(--surface-shadow, 0 4px 12px rgba(176, 163, 212, 0.15))',
        'md': 'var(--shadow, 0 4px 20px rgba(0, 0, 0, 0.08))', // Renamed from --shadow
        'action-btn': '0 6px 15px rgba(15, 23, 42, 0.15)',
        'action-btn-hover': '0 10px 20px rgba(15, 23, 42, 0.2)',
        'map-viz': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'map-legend': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'map-marker': '0 2px 5px rgba(0, 0, 0, 0.2)',
        'param-nav-active': '0 4px 12px rgba(82, 112, 168, 0.2)',
        // Additional shadows for summary components
        'summary-card': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'summary-card-hover': '0 4px 8px rgba(0, 0, 0, 0.1)',
        // Technical component shadows
        'tech-card': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'tech-card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'tech-icon': '0 2px 5px rgba(0, 119, 204, 0.2)',
        'tech-loss-icon': '0 2px 5px rgba(243, 156, 18, 0.2)',
      },
      gradientColorStops: {
        // Technical map gradient
        'tech-header-start': '#f8f9fa',
        'tech-header-end': '#ffffff',
        'tech-map-start': '#e6f7ff',
        'tech-map-end': '#f0f9ff',
        // Example from .ghi-map
        'ghi-map-start': '#f7c948',
        'ghi-map-mid1': '#f59e0b',
        'ghi-map-mid2': '#f97316',
        'ghi-map-end': '#ef4444',
      },
      animation: {
        'gradientShift': 'gradientShift 15s ease infinite', // from SiteSelectionR.css
        'pulse': 'pulse 2s infinite', // from map.css & SiteSelectionR.css
        'scroll-slow': 'scroll 80s linear infinite',
        'scroll-normal': 'scroll 50s linear infinite',
        'scroll-fast': 'scroll 30s linear infinite',
        'gradient-animation': 'gradient-animation 8s ease-in-out infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-animation': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        },
        pulse: { // Using the one from map.css as it's more generic
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(255, 255, 255, 0.4)' },
          '70%': { 'box-shadow': '0 0 0 10px rgba(255, 255, 255, 0)' },
        }
      }
    },
  },
  plugins: [
    // You can add Tailwind plugins here if needed, e.g., @tailwindcss/forms, @tailwindcss/typography
    // require('@tailwindcss/forms'),
  ],
}