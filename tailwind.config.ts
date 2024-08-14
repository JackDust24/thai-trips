import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#E6E6E6',
        input: '#E6E6E6',
        ring: '#0C0A08',
        background: '#FFFFFF',
        foreground: '#0C0A08',
        hero: {
          DEFAULT: '#bcf5ff',
          foreground: '#FCF8E9',
        },
        primary: {
          DEFAULT: '#1B1613',
          foreground: '#FCF8E9',
        },
        secondary: {
          DEFAULT: '#eaeff2',
          foreground: '#1B1613',
        },
        tripsBlue: {
          DEFAULT: '#2962FF',
          foreground: '#FCF8E9',
        },
        destructive: {
          DEFAULT: '#E60000',
          foreground: '#FCF8E9',
        },
        muted: {
          DEFAULT: '#F6F3E4',
          foreground: '#706C63',
        },
        accent: {
          DEFAULT: '#F6F3E4',
          foreground: '#1B1613',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#0C0A08',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0C0A08',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
