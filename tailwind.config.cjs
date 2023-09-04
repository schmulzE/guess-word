/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      red: "#do312d",
      white: "#ffffff",
      blue: "#0f7dff",
      ochre: "#cc7722",
      walnut: "#5d432c",
      "old-whiskey": "#ddaa55",
    },
    extend: {
      fontFamily: {
        'kumbh-sans': ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        neutral: {
          100: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
};
