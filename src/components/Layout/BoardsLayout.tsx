import { ReactNode } from "react";

const BoardsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1060px] Tablet:max-w-[624px] Mobile:max-w-[335px] mx-auto px-[20px]">
      {children}
    </div>
  );
};

export default BoardsLayout;
