/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f6fbff",
          100: "#d6e8f3",
          200: "#9cc4e4",
          400: "#4eaaec",
          600: "#2f86c7",
          800: "#423d8c",
        },
      },
      boxShadow: { soft: "0 12px 30px rgba(16, 24, 40, 0.10)" },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};