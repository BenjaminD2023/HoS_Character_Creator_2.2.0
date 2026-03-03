/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-950': '#030712',
        'gray-900': '#111827',
        'gray-800': '#1f2937',
        'gray-700': '#374151',
        'gray-600': '#4b5563',
        'gray-500': '#6b7280',
        'gray-400': '#9ca3af',
      },
    },
  },
  plugins: [],
}
