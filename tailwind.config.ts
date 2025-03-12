import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  prefix: 'tw-',
  theme: {
    colors: {
      black: '#050505',
      gray: '#B3C1D1',
      blue: '#4361EE',
      whitesmoke: '#F6F8FC',
      white: '#FFFFFF',
      red: '#D80027',
      'light-gray': '#E6EEF5',
    },
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
    },
    extend: {
      screens: {
        sm: '640px', // sm: — 640px и выше
        md: '768px', // md: — 768px и выше
        lg: '1024px', // lg: — 1024px и выше
        xl: '1280px', // xl: — 1280px и выше
      },
    },
  },
  plugins: [],
} satisfies Config
