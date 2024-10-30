import FilledButton from "@/components/ui/Button/FilledButton";
import Lock from "../../../../public/icons/ic_lock.svg";

interface QuizModalProps {
  question: string;
  quizAnswer: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  handleSubmit: () => void;
}

const QuizModal = ({
  question,
  quizAnswer,
  handleInputChange,
  errorMessage,
  handleSubmit,
}: QuizModalProps) => {
  return (
    <div className="flex flex-col gap-9 pt-10 pb-[2px]">
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <div className="flex justify-center items-center rounded-full bg-gray-100 w-[42px] h-[42px]">
          <Lock className="w-5 h-5 text-gray-400"/>
        </div>
        <div className="text-md text-gray-400">
          다음 퀴즈를 맞추고 <br /> 위키를 작성해보세요.
        </div>
      </div>
      <div className="flex flex-col ">
        <label
          htmlFor="quiz"
          className="text-2lg text-gray-500 font-semibold mb-[10px]"
        >
          {question}
        </label>
        <input
          value={quizAnswer}
          onChange={handleInputChange}
          id="quiz"
          className={`rounded-[10px] px-5 py-[10.5px] bg-gray-100 w-[355px] mb-[10px] placeholder:text-md placeholder:text-gray-400 Mobile:w-[295px] ${
            errorMessage ? "outline-red-200" : "outline-green-200"
          }  }`}
          placeholder="답안을 입력해 주세요"
        ></input>
        {errorMessage && (
          <span className="text-xs text-red-200">{errorMessage}</span>
        )}
        <div className="flex mt-[30px]">
          <FilledButton fullWidth={true} onClick={handleSubmit}>
            확인
          </FilledButton>
        </div>
        <p className="mt-5 text-xs text-gray-400 text-center">
          위키드는 지인들과 함께하는 즐거운 공간입니다.
          <br />
          지인에게 상처를 주지 않도록 작성해 주세요.
        </p>
      </div>
    </div>
  );
};

export default QuizModal;
