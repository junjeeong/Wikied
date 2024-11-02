import { ReactNode } from "react";
import CloseBtn from "/public/icons/ic_close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const EditArticleModalOverlay = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-30 z-[100]"
        }
      >
        <div className="bg-background rounded-[10px] w-[1200px] Tablet:w-[800px] Mobile:w-[500px] px-5 py-5 relative z-20">
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

export default EditArticleModalOverlay;
