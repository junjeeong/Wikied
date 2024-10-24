import ConectLostModal from "@/components/ui/Modal/ConnectLostModal";
import ImageAddModal from "@/components/ui/Modal/ImageAddModal";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import QuizModal from "@/components/ui/Modal/QuizModal";
import LoginForm from "@/containers/LoginForm";
import { useState } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <>
      <LoginForm />
      <button
        type="button"
        className="absolute top-10 left-10"
        onClick={openModal}
      >
        열기
      </button>
      <ModalOverlay isOpen={isOpen} onClose={closeModal}>
        {/* <QuizModal/> */}
        {/* <ConectLostModal/> */}
        <ImageAddModal />
      </ModalOverlay>
    </>
  );
};

export default Login;
