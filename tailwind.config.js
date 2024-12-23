/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark Blue
        secondary: '#6B7280', // Gray
      },
      backgroundImage: {
        'bg-banner': "url('/src/assets/images/banner.jpg')",
        'bg-hero': "url('/src/assets/images/istockphoto-1658039887-1024x1024.jpg')"
      },
      animation: {
        'animation_left': 'animate__fadeInLeftBig  infinite',
        'animation_right': 'animate__fadeInRightBig'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

