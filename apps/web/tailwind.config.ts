import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#010102',
        surface: {
          0: '#0f1011',
          1: '#141516',
          2: '#18191a',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          default: 'rgba(255, 255, 255, 0.1)',
        },
        text: {
          primary: '#f7f8f8',
          secondary: '#8a8f98',
          muted: '#62666d',
        },
        brand: {
          DEFAULT: '#5e6ad2',
          subtle: 'rgba(94, 106, 210, 0.1)',
          glow: 'rgba(94, 106, 210, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        label: '0.08em',
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '56px 56px',
      },
    },
  },
  plugins: [],
};
export default config;
