import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          100: "#FBF9FE",
          200: "#F5F2FD",
          300: "#E3DBF9",
          400: "#D1C2F9",
          500: "#B7A3F0",
          600: "#967DDD",
        },
        alerts: {
          green: {
            light: "#6AB557",
            DEFAULT: "#EDF6EB",
          },
          red: {
            light: "#FDEBE7",
            DEFAULT: "#EB5339",
          },
          yellow: {
            light: "#FFF8E9",
            DEFAULT: "#FAB424",
          },
          blue: {
            light: "#E7F5FF",
            DEFAULT: "#0C99FF",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
