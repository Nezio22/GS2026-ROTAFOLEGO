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
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 91, 79, 0.18)",
        card: "0 4px 20px -8px rgba(15, 91, 79, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
