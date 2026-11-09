/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        folego: {
          50: "#ecfdf3",
          100: "#d1fae0",
          500: "#19b36b",
          600: "#0f9d58",
          700: "#0b7a45",
          900: "#0b3d2e",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
