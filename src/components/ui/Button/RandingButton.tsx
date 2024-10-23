import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  mode?: "Top" | "Bottom";
}

const RandingButton = ({ children, mode = "Top", ...rest }: ButtonProps) => {
  const modeClasses = {
    Top: " bg-gray-500 text-gray-50 ",
    Bottom: " bg-gray-50 text-gray-500 ",
  };

  return (
    <>
      <button
        className={`rounded-[15px] py-[15px] px-[30px]  text-[24px] font-bold leading-[28.64px] Mobile:text-[20px] Mobile:leading-[23.87px] hover:bg-gray-400 ${modeClasses[mode]} `}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default RandingButton;
