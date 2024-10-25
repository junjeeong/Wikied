import { ReactNode } from "react";
import CloseBtn from "../../../../public/icons/ic_close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bgColor?: string;
  closeButtonSize?: string;
  closeButtonColor?: string;
}

const ModalOverlay = ({
  isOpen,
  onClose,
  children,
  bgColor = "bg-background",
  closeButtonSize = "w-5 h-5",
  closeButtonColor = "text-gray-400",
}: ModalProps) => {
  
  if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-30"
        }
      >
        <div className={`${bgColor} rounded-[10px] px-5 py-5 relative z-10`}>
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-5 right-5 bg-cover ${closeButtonSize}`}
          >
            <CloseBtn className={`${closeButtonColor}`} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalOverlay;
