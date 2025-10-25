import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#41A853',
          amber: '#F2A73B',
        },
        ink: {
          900: '#111315',
          700: '#393E46',
          500: '#6B7280',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F2F4F7',
          900: '#0B0F14',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0px 8px 16px -4px rgba(17, 19, 21, 0.08)',
        focus: '0 0 0 4px rgba(65, 168, 83, 0.2)',
      },
      maxWidth: {
        page: '72rem',
      },
      transitionTimingFunction: {
        'gentle-out': 'cubic-bezier(0.17, 0.67, 0.34, 1)',
      },
    },
  },
  plugins: [forms({ strategy: 'class' })],
};
