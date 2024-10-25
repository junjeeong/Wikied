import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  editing?: boolean;
}

const FilledButton = ({
  children,
  size = "medium",
  fullWidth = false,
  editing = false,
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
        className={`bg-green-200 rounded-[10px] text-gray-50 text-[14px] font-semibold leading-[24px] hover:bg-green-100 disabled:bg-gray-300${
          sizeClasses[size]
        }  ${fullWidth ? "w-full" : ""}`}
        {...rest}
      >
        {editing ? "편집 중 ..." : children}
      </button>
    </> 
  );
};

export default FilledButton;
