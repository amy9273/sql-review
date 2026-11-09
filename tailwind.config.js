/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0E0919',
        canvas: '#130C22',
        aubergine: {
          light: '#2E1F47',
          DEFAULT: '#231737',
          dark: '#1A112B',
        },
        surface: {
          card: '#1B132B',
          elevated: '#251A3B',
          border: '#3A2A5B',
          borderHover: '#5B428E',
          muted: '#9E8EB8',
        },
        royal: {
          violet: '#7041A6',
          glow: '#8C52CF',
        },
        electric: {
          lavender: '#A77BEB',
        },
        lilac: {
          pale: '#D8C5FF',
        },
        neon: {
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
