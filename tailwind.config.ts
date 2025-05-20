import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text: "hsl(var(--text))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        sans: [
          "var(--theme-font-sans)",
          "var(--font-geist-sans)",
          ...fontFamily.sans,
        ],
      },
      height: {
        "safe-area": "calc(100vh - 60px)",
      },

      minHeight: {
        "safe-area": "calc(100vh - 60px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
