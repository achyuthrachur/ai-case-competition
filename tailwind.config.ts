import type { Config } from 'tailwindcss';

const config: Config = {
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        crowe: {
          amber: {
            bright: '#FFD231',
            DEFAULT: '#F5A800',
            dark: '#D7761D',
          },
          indigo: {
            bright: '#003F9F',
            DEFAULT: '#002E62',
            dark: '#011E41',
          },
          teal: {
            bright: '#16D9BC',
            DEFAULT: '#05AB8C',
            dark: '#0C7876',
          },
          cyan: {
            light: '#8FE1FF',
            DEFAULT: '#54C0E8',
            dark: '#007DA3',
          },
          blue: {
            light: '#32A8FD',
            DEFAULT: '#0075C9',
            dark: '#0050AD',
          },
          violet: {
            bright: '#EA80FF',
            DEFAULT: '#B14FC5',
            dark: '#612080',
          },
          coral: {
            bright: '#FF526F',
            DEFAULT: '#E5376B',
            dark: '#992A5C',
          },
        },
        tint: {
          950: '#1a1d2b',
          900: '#2d3142',
          700: '#545968',
          500: '#8b90a0',
          300: '#c8cbd6',
          200: '#dfe1e8',
          100: '#eef0f4',
          50: '#f6f7fa',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        display: ['Helvetica Now Display', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        body: ['Helvetica Now Text', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'crowe-sm': '0 1px 3px rgba(1,30,65,0.06), 0 1px 2px rgba(1,30,65,0.04)',
        'crowe-md': '0 4px 8px -2px rgba(1,30,65,0.06), 0 2px 4px -1px rgba(1,30,65,0.04)',
        'crowe-lg': '0 6px 16px -4px rgba(1,30,65,0.07), 0 4px 6px -2px rgba(1,30,65,0.04)',
        'crowe-xl': '0 12px 32px -8px rgba(1,30,65,0.08), 0 8px 16px -4px rgba(1,30,65,0.03)',
        'crowe-hover': '0 8px 24px -4px rgba(1,30,65,0.10), 0 4px 8px -2px rgba(1,30,65,0.04)',
        'crowe-card':
          '0 1px 3px rgba(1,30,65,0.04), 0 6px 16px rgba(1,30,65,0.04), 0 12px 32px rgba(1,30,65,0.02)',
        'amber-glow': '0 4px 16px rgba(245,168,0,0.20)',
      },
      backgroundColor: {
        page: '#f8f9fc',
        section: '#f6f7fa',
        'section-warm': '#f0f2f8',
        'section-amber': '#fff8eb',
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
};

export default config;
