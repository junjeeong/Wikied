import QuizModalContainer from "@/containers/QuizModalContainer.tsx";
import LoginForm from "@/containers/LoginForm";
import { useState } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LoginForm />
      <button className="absolute left-10 top-10" onClick={handleOpen}>
        열기
      </button>
      {isOpen && <QuizModalContainer isOpen={isOpen} onClose={handalClose} />}
    </>
  );
};

export default Login;
