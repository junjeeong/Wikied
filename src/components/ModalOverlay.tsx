import { ReactNode } from "react";
import CloseBtn from "/public/icons/ic_close.svg";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {

useEffect(() => {
  if (isOpen) {
    // 모달이 열렸을 때 스크롤 막기
    document.body.style.overflow = "hidden";
  } else {
    // 모달이 닫히면 스크롤 복원
    document.body.style.overflow = "";
  }
  // cleanup 함수: 컴포넌트가 언마운트될 때 스크롤 복원
  return () => {
    document.body.style.overflow = "";
  };
}, [isOpen]);

if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-30 z-50 inset-0"
        }
      >
        <div className="bg-background rounded-[10px] px-5 py-5 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 bg-cover w-5 h-5"
          >
            <CloseBtn className="text-gray-400" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalOverlay;
