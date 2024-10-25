import { useEffect, useState, useRef } from "react";
import { getUserProfile, postProfilePing } from "@/api/profile";
import { AxiosError } from "axios";
import QuizModal from "@/components/ui/Modal/QuizModal";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import useAuthStore from "@/store/AuthStore";

interface QuizModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModalContainer = ({ isOpen, onClose }: QuizModalContainerProps) => {
  const [question, setQuestion] = useState(""); //사용자 질문
  const [quizAnswer, setQuizAnswer] = useState(""); //입력값을 관리
  const [errorMessage, setErrorMessage] = useState(""); //에러값 상태확인
  const { user } = useAuthStore();

  const code = user?.profile.code;

  useEffect(() => {
    if (code) {
      const getQuestion = async () => {
        const res = await getUserProfile(code);
        setQuestion(res?.data.securityQuestion);
      };
      getQuestion();
    }
  }, [code]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizAnswer(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      if (code) {
        await postProfilePing(
          {
            securityAnswer: quizAnswer,
          },
          code
        );
      }
      console.log("수정가능"); //수정 페이지로 이동
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <QuizModal
        question={question}
        quizAnswer={quizAnswer}
        handleInputChange={handleInputChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </ModalOverlay>
  );
};

export default QuizModalContainer;
