/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
