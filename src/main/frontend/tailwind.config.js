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
        "brand-dark": "#00155c",
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
        ".1-overlay": {
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          zIndex: "999",
        },
        ".modal-wrapper-top": {
          position: "fixed",
          top: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "49.3125rem",
          borderRadius: theme("borderRadius.default"),
          backgroundColor: "transparent",
          overflow: "auto",
          outline: "0",
          zIndex: "1000",
        },
        ".modal-wrapper-middle": {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
          backgroundColor: "transparent",
          borderRadius: theme("borderRadius.default"),
        },
        ".modal-content": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
          height: "100%",
          padding: "28px 48px 22px 48px",
          backgroundColor: theme("colors.white"),
        },
      };

      addComponents(global);
    }),
  ],
};
