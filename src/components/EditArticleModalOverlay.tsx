import { ReactNode, useEffect } from "react";
import FilledButton from "./ui/Button/FilledButton";
import useViewport from "@/hooks/useViewport";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const EditArticleModalOverlay = ({ isOpen, onClose, children }: ModalProps) => {
  const { isMobile } = useViewport();
  const buttonSize = isMobile ? "small" : "medium";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={
          "flex justify-center items-center fixed top-0 left-0 right-0 bottom-0  bg-gray-500 bg-opacity-30 z-[100]"
        }
      >
        <div className="bg-background rounded-[10px] w-[1060px] max-h-[90%] overflow-y-auto relative z-20 Tablet:w-[800px] Mobile:w-[500px] no-scrollbar">
          <div className="absolute top-[46px] right-[170px] Tablet:right-[170px] Mobile:right-[125px]">
            <FilledButton onClick={onClose} size={buttonSize}>
              돌아가기
            </FilledButton>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default EditArticleModalOverlay;
