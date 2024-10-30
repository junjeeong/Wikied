import { ReactNode } from "react";
import CloseBtn from "/public/icons/ic_close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bgColor?: string;
  closeButtonSize?: string;
  closeButtonColor?: string;
}

const NotificationModalOverlay = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center absolute top-16 right-20 z-50"
        }
      >
        <div className="bg-notice-bg rounded-[10px] px-5 py-5 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 bg-cover w-6 h-6"
          >
            <CloseBtn className="text-notice-text"/>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default NotificationModalOverlay;
