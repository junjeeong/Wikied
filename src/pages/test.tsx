import ModalOverlay from "@/components/ui/Modal/ModalOverlay"
import { useState } from "react";
import NotificatonModal from "@/containers/NotificationModal"

const Test = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={handleModalOpen} className="absolute left-5 top-5">
        열기
      </button>
      <ModalOverlay
        isOpen={isOpen}
        onClose={onClose}
        bgColor="bg-notice-bg"
        closeButtonSize="w-6 h-6"
        closeButtonColor="text-notice-text"
      >
        <NotificatonModal />
      </ModalOverlay>
    </>
  );
}

export default Test;