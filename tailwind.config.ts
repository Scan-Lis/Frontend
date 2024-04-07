import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#75C1C0",
        "dark-blue": "#0E7774",
        "ultra-dark-blue": "#00413F",
        "light-gray": "#686868",
        "dark-gray": "#2C2C2C",
        alert: "#FFB800",
        failed: "#FF3D00",
        success: "#039300",
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(153deg, rgba(117,193,192,1) 0%, rgba(14,119,116,1) 100%)",
        "gradient-profile":
          "linear-gradient(190deg, rgba(14,119,116,1) 0%, rgba(117,193,192,1) 100%)",
      },
    },
  },
};

export default config;
