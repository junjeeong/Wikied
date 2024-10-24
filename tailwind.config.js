/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", // 페이지 파일들
    "./src/components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 파일들
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 안의 모든 파일들 (컴포넌트, 페이지 등 포함)
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
        "landing-light": "#f1f4fd",
        "landing-bold": "#ecf0fa",
        background: "#ffffff",
        "gray-100": "#f7f7fa",
        "gray-200": "#e4e5f0",
        "gray-300": "#c6cada",
        "gray-400": "#8f95b2",
        "gray-500": "#474d66",
        "gray-600": "#3b415b",
        "green-50": "#EEF9F6",
        "green-100": "#6cd9bf",
        "green-200": "#4CBFA4",
        "green-300": "#32A68A",
        "red-100": "#fbeded",
        "red-200": "#d14343",
        "purple-100": "#8e66ff",
        "yellow-100": "#fdd181",
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
        xs: ["12px", { lineHeight: "18px" }],
      },
      boxShadow: {
        custom: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
