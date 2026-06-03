/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#3b82f6',
        surface: '#0f172a',
        card: '#1e293b',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
