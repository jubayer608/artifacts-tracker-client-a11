// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: {
          50: '#fdf6e3',
          100: '#f9e6b3',
          200: '#f5d680',
          300: '#f1c64d',
          400: '#edb61a',
          500: '#d4a017',
          600: '#b88514',
          700: '#9c6a11',
          800: '#804f0e',
          900: '#5d4634',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#5d4634",
          "secondary": "#fdf6e3",
          "accent": "#4b3727",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        dark: {
          "primary": "#d4a017",
          "secondary": "#1a1a1a",
          "accent": "#f5d680",
          "neutral": "#2a2a2a",
          "base-100": "#0d1117",
          "base-200": "#161b22",
          "base-300": "#21262d",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        }
      }
    ],
  },
};
