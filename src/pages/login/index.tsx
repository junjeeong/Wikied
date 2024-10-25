// import LoginForm from "@/containers/LoginForm";

// const Login = () => {
//   return (
//     <>
//       <LoginForm />
//     </>
//   );
// };

// export default Login;

import ConnectLostModal from "@/components/ui/Modal/ConnectLostModal";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import LoginForm from "@/containers/LoginForm";
// import QuizModalContainer from "@/containers/QuizModalContainer";
import { useState } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LoginForm />
      <button onClick={handleModalOpen} className="absolute left-5 top-5">
        열기
      </button>
      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <ConnectLostModal/>
      </ModalOverlay>
    </>
  );
};

export default Login;
