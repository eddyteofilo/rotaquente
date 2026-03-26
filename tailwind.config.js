/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        primary: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#999999',
        },
        accent: {
          DEFAULT: '#f97316', // Orange accent for food/appetite
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#262626',
          foreground: '#737373',
        },
      },
      borderRadius: {
        none: '0',
        sm: '1px',
        DEFAULT: '2px', // Sharp premium edges
        md: '2px',
        lg: '4px',
      },
    },
  },
  plugins: [],
}
