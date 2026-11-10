/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Identidade visual Rota do Fôlego
        folego: {
          50: "#eef6f3",
          100: "#d6ebe4",
          500: "#86A985", // sálvia
          600: "#0F5B4F", // verde urbano (primária)
          700: "#0b463c",
          900: "#0e4a40",
        },
        salvia: "#86A985",
        areia: "#E8D7B5",
        terracota: {
          DEFAULT: "#C76A4A",
          dark: "#b35c3e",
        },
        offwhite: "#FAF7EF",
        grafite: "#3B3B3B",
      },
      fontFamily: {
        sans: ["Nunito", "Segoe UI", "system-ui", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
