import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  mode?: "normal" | "empty" | "main" | "mainR";
  fullWidth?: boolean;
  editing?: boolean;
}

export default function Button({
  children,
  size = "medium",
  mode = "normal",
  fullWidth = false,
  editing = false,
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    small: "px-[20px] py-[11px]",
    medium: mode === "main" || mode === "mainR" ? "" : "px-[40px]  py-[13px]",
    large: "px-[175px] py-[13px]",
  };

  const modeClasses = {
    normal:
      "bg-green-200 text-gray-50 hover:bg-green-100 disabled:bg-gray-300                                        text-[14px] leading-[24px] rounded-[10px] font-semibold",
    empty:
      "bg-transparent text-green-200 border border-green-200 hover:border-green-100 hover:text-green-100        text-[14px] leading-[24px] rounded-[10px] font-semibold",

    main: "bg-gray-500 text-gray-50 hover:bg-gray-400                 rounded-[15px] px-[30px] py-[15px] font-bold text-[24px] leading-[28.64px]  font-pretendard",
    mainR:
      "bg-gray-50 text-gray-500 hover:bg-gray-100                     rounded-[15px] px-[30px] py-[15px] font-bold text-[24px] leading-[28.64px]  font-pretendard",
  };

  return (
    <>
      <button
        className={`${sizeClasses[size]} ${modeClasses[mode]} ${
          fullWidth ? "w-full" : ""
        }`}
        {...rest}
      >
        {editing ? "편집 중 ..." : children}
      </button>
    </>
  );
}
