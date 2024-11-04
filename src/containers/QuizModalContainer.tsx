import { useEffect, useState } from "react";
import { getUserProfile, postProfilePing } from "@/api/profile";
import { AxiosError } from "axios";
import QuizModal from "@/components/QuizModal";
import ModalOverlay from "@/components/ModalOverlay";

interface QuizModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  onSubmitSuccess?: (quizAnswer: string, registerdAt: string) => void;
}

const QuizModalContainer = ({
  isOpen,
  onClose,
  code,
  onSubmitSuccess,
}: QuizModalContainerProps) => {
  const [question, setQuestion] = useState(""); //사용자 질문
  const [quizAnswer, setQuizAnswer] = useState(""); //입력값을 관리
  const [errorMessage, setErrorMessage] = useState(""); //에러값 상태확인

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
        const res = await postProfilePing({ securityAnswer: quizAnswer }, code);

        const registeredAt = res?.data?.registeredAt;

        if (onSubmitSuccess) {
          onSubmitSuccess(quizAnswer, registeredAt);
        }
        setErrorMessage("");
        onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
      } else {
        console.error(error);
      }
    } finally {
      setQuizAnswer("");
    }
  };

  if (!isOpen) {
    return null;
  }

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
