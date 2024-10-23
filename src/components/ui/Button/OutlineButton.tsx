import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const OutlineButton = ({
  children,
  size = "medium",
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  const sizeClasses = {
    small: " px-[20px] py-[11px] ",
    medium: " px-[40px] py-[13px] ",
    large: " px-[175px] py-[13px] ",
  };

  return (
    <>
      <button
        className={`bg-transparent border border-green-200 rounded-[10px] text-green-200 text-[14px] font-semibold leading-[24px] hover:border-green-100 hover:text-green-100${
          sizeClasses[size]
        }} ${fullWidth ? "w-full" : ""}`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default OutlineButton;
