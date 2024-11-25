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
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
        },
      },
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
          DEFAULT: '#1B1613', // Dark brown
          foreground: '#F8F4EB', // Light beige for good contrast
        },
        secondary: {
          DEFAULT: '#eaeff2', // Light grayish blue
          foreground: '#121212', // Almost black for strong contrast
        },
        tripsBlue: {
          DEFAULT: '#2962FF', // Bright blue
          foreground: '#F1F4FF', // Very light blue for contrast
        },
        tripsYellow: {
          DEFAULT: '#FFC528', // Bright yellow
          foreground: '#3A2B00', // Dark brown for readability on yellow
        },
        destructive: {
          DEFAULT: '#E60000', // Bright red
          foreground: '#FFFFFF', // White for high contrast on red
        },
        muted: {
          DEFAULT: '#F6F3E4', // Very light beige
          foreground: '#2B2A27', // Dark gray for contrast on light background
        },
        accent: {
          DEFAULT: '#F6F3E4', // Very light beige
          foreground: '#2B2A27', // Dark gray for contrast, similar to muted
        },
        popover: {
          DEFAULT: '#FFFFFF', // Pure white
          foreground: '#1C1B1A', // Very dark gray for clear contrast on white
        },
        card: {
          DEFAULT: '#FFFFFF', // Pure white
          foreground: '#1C1B1A', // Dark gray, similar to popover
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
