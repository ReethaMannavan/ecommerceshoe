/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",              // Vite entry point
    "./src/**/*.{js,jsx,ts,tsx}" // All React component files
  ],
  theme: {
    extend: { 
    
   fontFamily: {
        libre: ['"Libre Baskerville"', "serif"],
      },
      colors: {
        darkslate: "#2F4F4F",
        palered: "#FFA0A0",
      },
},
  },
  plugins: [
  ],
}

