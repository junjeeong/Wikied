import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import QuizModal from "@/components/ui/Modal/QuizModal";
import LoginForm from "@/containers/LoginForm";
import { useState } from "react";

const Login = () => {

  return (
    <>
      <LoginForm />
      <button
        type="button"
        className="absolute top-10 left-10"
      >
        열기
      </button>
        <QuizModal/>
    </>
  );
};

export default Login;
