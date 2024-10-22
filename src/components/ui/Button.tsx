import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  mode?: "normal" | "empty" | "main" | "mainR";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  size = "medium",
  mode = "normal",
  fullWidth = false,
  loading = false,
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    small: "px-[20px] py-[11px]",
    medium: "px-[40px] py-[13px]",
    large: "px-[175px] py-[13px]",
  };

  const modeClasses = {
    normal:
      "bg-green200 rounded-[10px] text-gray50 text-[14px] font-semibold leading-[24px] hover:bg-green100 disabled:bg-gray300",
    empty:
      "bg-transparent border border-green200 rounded-[10px] text-green200 text-[14px] font-semibold leading-[24px] hover:border-green100 hover:text-green100",
    main: "bg-gray500 rounded-[15px] py-[15px] px-[30px] text-gray50 text-[24px] font-bold leading-[28.64px] hover:bg-gray400",
    mainR:
      "bg-gray50 rounded-[15px] py-[15px] px-[30px] text-gray500 text-[24px] font-bold leading-[28.64px] hover:bg-gray100",
  };

  return (
    <>
      <button
        className={`${sizeClasses[size]} ${modeClasses[mode]} ${
          fullWidth ? "w-full" : ""
        }`}
        {...rest}
      >
        {loading ? "편집 중 ..." : children}
      </button>
    </>
  );
}
