module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#EFEDE6",
        ink: "#0B0B0B",
        muted: "#6B6B6B",
        line: "#E5E5E5",
        background: "#EFEDE6",
        secondary: "#E5E5E5",
        dark: "#0B0B0B",
        accent: "#E10600",
        "primary-dark": "#0B0B0B",
        "secondary-bg": "#E5E5E5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
}
