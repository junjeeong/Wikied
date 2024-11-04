import { ReactNode, useEffect } from "react";
import CloseBtn from "/public/icons/ic_close.svg";
import { useRef } from "react";

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
  
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e:MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      onClose()
  }

  useEffect(()=> {
    document.addEventListener("mousedown",handleClickOutside);
    return ()=> {
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[])
  
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
