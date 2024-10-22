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
    medium: "px-[40px] py-[13px]",
    large: "px-[175px] py-[13px]",
  };

  const modeClasses = {
    normal:
      "bg-green-200 rounded-[10px] text-gray-50 text-[14px] font-semibold leading-[24px] hover:bg-green-100 disabled:bg-gray-300",
    empty:
      "bg-transparent border border-green-200 rounded-[10px] text-green-200 text-[14px] font-semibold leading-[24px] hover:border-green-100 hover:text-green-100",
    main: "bg-gray-500 rounded-[15px] py-[15px] px-[30px] text-gray-50 text-[24px] font-bold leading-[28.64px] hover:bg-gray-400",
    mainR:
      "bg-gray-50 rounded-[15px] py-[15px] px-[30px] text-gray-500 text-[24px] font-bold leading-[28.64px] hover:bg-gray-100",
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
