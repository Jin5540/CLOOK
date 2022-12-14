/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        white: "#FCFDFF",
        brand: "#1E3A8A",
        "sub-brand": "#DBEAFE",
        "blue-200": "#BFDBFE",
        "blue-600": "#2563EB",
        "blue-900": "#1E3A8A",
        red: "#DC2626",
        green: "#16A34A",
        yellow: "#CA8A04",
        black: "#111827",
      },
      fontSize: {
        "3xl": "1.75rem",
        "4xl": "2.5rem",
      },
      borderRadius: {
        default: "0.625rem",
      },
      boxShadow: {
        main: "0px 0px 16px 3px rgba(219, 234, 254, 0.75)",
      },
      keyframes: {
        "little-bounce": {
          "0%": {
            top: "0px",
          },
          "100%": {
            top: "-20px",
          },
        },
      },
      animation: {
        "slow-bounce": "little-bounce 0.7s ease-out Infinite Alternate",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const global = {
        ".global-shadow": {
          boxShadow: theme("boxShadow.main"),
          "-webkit-box-shadow": theme("boxShadow.main"),
          "-moz-box-shadow": theme("boxShadow.main"),
        },
        ".text-shadow-4": {
          textShadow: "0px 4px 4px rgba(0, 51, 99, 0.2)",
        },
        ".text-shadow-10": {
          textShadow: "0px 4px 10px rgba(0, 51, 99, 0.2)",
        },
        ".modal-shadow": {
          boxShadow: "0px 0px 7px 2px rgb(219 234 254 / 75%)",
          "-webkit-box-shadow": "0px 0px 7px 2px rgb(219 234 254 / 75%)",
          "-moz-box-shadow": "0px 0px 7px 2px rgb(219 234 254 / 75%)",
        },
        ".modal-overlay": {
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          zIndex: "999",
        },
        ".modal-wrapper": {
          position: "fixed",
          top: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "auto",
          maxWidth: "49.3125rem",
          borderRadius: theme("borderRadius.default"),
          backgroundColor: "transparent",
          overflow: "auto",
          outline: "0",
          zIndex: "1000",
        },
        ".modal-inner": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.default"),
          padding: "28px 48px",
        },
        ".modal-content": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
          height: "100%",
        },
      };

      addComponents(global);
    }),
  ],
};
