/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio'),
  ],

  daisyui: {
    themes: ["light", "dark"]
  },
};
