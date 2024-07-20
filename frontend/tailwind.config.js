/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bt-grey": " #3b4149",
        yellow: "#febd69",
        blue: "#232f3e",
        brown: "#bf4800",
        grey: "#f5f5f7",
      },
      borderColor: {
        grey: " #3b4149",
      },
      width: {
        "sm-b": "49%",
      },
      boxShadow: {
        "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
