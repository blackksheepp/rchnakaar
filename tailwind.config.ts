import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        f1: "clamp(1.5rem, calc(0.4286rem + 5.3571vw), 3rem)",
        f2: "clamp(1.8rem, calc(0.4071rem + 6.9643vw), 3.75rem)",
        f3: "clamp(2.16rem, calc(0.3546rem + 9.0268vw), 4.6875rem)",
        flg1: "clamp(1.5rem, calc(0.9375rem + 1.1719vw), 1.875rem)",
        flg2: "clamp(1.875rem, calc(1.3125rem + 1.1719vw), 2.25rem)",
        flg3: "clamp(2.25rem, calc(1.125rem + 2.3438vw), 3rem)",
        fe: "clamp(0.875rem, calc(0.4286rem + 2.2321vw), 1.5rem);",
        felg: "clamp(1.125rem, calc(0.5625rem + 1.1719vw), 1.5rem)",
        fh: "clamp(0.625rem, calc(0rem + 3.125vw), 1.5rem)",
        fhlg: "clamp(1.25rem, calc(0.875rem + 0.7813vw), 1.5rem);",
      },
      spacing: {
        s1: "clamp(2rem, calc(-0.1429rem + 10.7143vw), 5rem)",
        s2: "clamp(1.25rem, calc(-0.7143rem + 9.8214vw), 4rem);",
        bh: "clamp(2.5rem, calc(2.3958rem + 0.5208vw), 2.8125rem)",
        bw: "clamp(6.25rem, calc(5.8333rem + 2.0833vw), 7.5rem)",
      },
      colors: {
        background: "#1C1C1C",
        accent: "#e4e4e4",
      },
    },
    fontFamily: {
      retro: "Retro Gaming",
      indie: "Indie Flower",
    },
  },
  plugins: [],
};

export default config;
