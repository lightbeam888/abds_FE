import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#50D0A1",
        secondary_dark: "#B4ADAD",
        secondary_light: "#645F5F",
        border: "#EBE8E8",
        dark_text: "#242424"
      },
    },
  },
  plugins: [],
} satisfies Config;
