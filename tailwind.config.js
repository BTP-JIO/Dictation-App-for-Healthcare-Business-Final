/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default UI
        manrope: ["Manrope", "sans-serif"], // Light and elegant
        outfit: ["Outfit", "sans-serif"], // Sleek and modern
        urbanist: ["Urbanist", "sans-serif"], // Futuristic feel
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 4px rgba(225, 255, 0, 0.8)" },
          "50%": { boxShadow: "0 0 12px rgba(0, 128, 255, 1)" },
        },
      },
      animation: {
        glow: "glow 1s infinite",
      },
    },
  },
  plugins: [],
};
