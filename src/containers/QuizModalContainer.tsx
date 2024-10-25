import { useEffect, useState, useRef } from "react";
import { getUserProfile, postProfilePing } from "@/api/profile";
import { AxiosError } from "axios";
import QuizModal from "@/components/ui/Modal/QuizModal";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";

interface QuizModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModalContainer = ({ isOpen, onClose }: QuizModalContainerProps) => {
  const [question, setQuestion] = useState(""); //사용자 질문
  const [quizAnswer, setQuizAnswer] = useState(""); //입력값을 관리
  const [errorMessage, setErrorMessage] = useState(""); //에러값 상태확인

  const code = "e79d333c-d545-48fb-a125-2326aceed778"; //저장되어있을 코드

  useEffect(() => {
    const getQuestion = async () => {
      const res = await getUserProfile(code);
      setQuestion(res?.data.securityQuestion);
    };
    getQuestion();
  }, [code]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizAnswer(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      await postProfilePing(
        {
          securityAnswer: quizAnswer,
        },
        code
      );
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
