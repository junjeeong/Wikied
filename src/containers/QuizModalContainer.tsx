import { useEffect, useState } from "react";
import { getUserProfile, postProfilePing } from "@/api/profile";
import { AxiosError } from "axios";
import QuizModal from "@/components/QuizModal";
import ModalOverlay from "@/components/ModalOverlay";

interface QuizModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  onSubmitSuccess?:(registeredAt:string) => void;
  isMe:boolean;
}

const QuizModalContainer = ({
  isOpen,
  onClose,
  code,
  onSubmitSuccess, //시간을 돌려줌
  isMe,
}: QuizModalContainerProps) => {
  const [question, setQuestion] = useState(""); //사용자 질문
  const [quizAnswer, setQuizAnswer] = useState(""); //입력값을 관리
  const [errorMessage, setErrorMessage] = useState(""); //에러값 상태확인


  useEffect(() => {
    if (code && !isMe) {
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

        if (onSubmitSuccess) {
          onSubmitSuccess(res.data.registeredAt)
        }
          // API 호출이 성공적으로 완료되면 모달을 닫음
          onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
      } else {
        console.error(error);
      }
    }
  };

  if (isMe || !isOpen) {
    return null
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
