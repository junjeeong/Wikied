import { useState } from "react";
import FilledButton from "../Button/FilledButton";

const QuizModal = () => {
  const [quizAnser, setQuizAnser] = useState(""); //입력값을 관리
  const [errorMessage, setErrorMessage] = useState(""); //에러값 상태확인

  const anser = "정답"; //답을 가져와야 함

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizAnser(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (quizAnser === anser) {
      //정답이면 수정 상태로 변경
    } else {
      setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
    }
  };
  return (
    <div className="flex flex-col gap-9 pt-10 pb-[2px]">
      <div className="flex justify-center">
        {/* 자물쇠아이콘 */}
        <div className="text-md text-gray-400">
          다음 퀴즈를 맞추고 <br /> 위키를 작성해보세요.
        </div>
      </div>
      <div className="flex flex-col ">
        <label
          htmlFor="quiz"
          className="text-2lg text-gray-500 font-semibold mb-[10px]"
        >
          특별히 싫어하는 음식은?
        </label>
        <input
          value={quizAnser}
          onChange={handleInputChange}
          id="quiz"
          className="rounded-[10px] px-5 py-[10.5px] bg-gray-100 w-[355px] mb-[10px] outline-green-200 placeholder:text-md placeholder:text-gray-400 Mobile:w-[295px]"
          placeholder="답안을 입력해 주세요"
        ></input>
        {errorMessage && (
          <span className="text-xs text-red-200">{errorMessage}</span>
        )}
        <div className="flex mt-[30px]">
          <FilledButton fullWidth={true} onClick={handleSubmit}>확인</FilledButton>
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
