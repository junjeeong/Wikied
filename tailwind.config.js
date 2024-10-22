/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind CSS 클래스를 사용할 파일 경로
  ],
  theme: {
    screens: {
      PC: { min: "1200px" },
      Tablet: { min: "768px", max: "1199px" },
      Mobile: { min: "375px", max: "767px" },
    },
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"], // 기본 글꼴
        nexon: ["NEXON", "sans-serif"],
      },
      colors: {
        "bg-light": "#f1f4fd",
        "bg-bold": "#ecf0fa",

        gray50: "#ffffff",
        gray100: "#f7f7fa",
        gray200: "#e4e5f0",
        gray300: "#c6cada",
        gray400: "#8f95b2",
        gray500: "#474d66",
        gray600: "#3b415b",

        green50: "#EEF9F6",
        green100: "#6cd9bf",
        green200: "#4CBFA4",
        green300: "#32A68A",

        red100: "#fbeded",
        red200: "#d14343",

        purple100: "#8e66ff",

        yellow100: "#fdd181",

        "notice-bg": "#ced8d5",
        "notice-text": "#1b1b1b",
        "notice-gray-1": "#a1a1a1",
        "notice-gray-2": "#a4a1aa",
        "notice-blue": "#0085ff",
        "notice-red": "#ff472e",
      },
      fontSize: {
        "5xl": ["48px", { lineHeight: "46px" }],
        "4xl": ["40px", { lineHeight: "42px" }],
        "3xl": ["32px", { lineHeight: "42px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2lg": ["18px", { lineHeight: "26px" }],
        lg: ["16px", { lineHeight: "26px" }],
        md: ["14px", { lineHeight: "24px" }],
        sm: ["13px", { lineHeight: "22px" }],
        xs: ["12px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
};
