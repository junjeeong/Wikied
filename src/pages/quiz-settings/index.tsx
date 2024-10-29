import FilledButton from "@/components/ui/Button/FilledButton";
import useAuthStore from "@/store/AuthStore";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";

interface QuizSettingsValues {
  securityAnswer: string;
  securityQuestion: string;
}

const QuizSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<QuizSettingsValues>({
    mode: "onSubmit",
  });

  const { createProfile } = useAuthStore();

  const handleProfileCreation = async (data: QuizSettingsValues) => {
    await createProfile(data.securityAnswer, data.securityQuestion);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-background">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-10">
            좋아요!
            <br />
            이제 위키를 만들어 볼까요?
          </h2>
          <div className="flex flex-col">
            <div className="flex justify-center"></div>
            <div className="py-6 relative border-t-2">
              <h3 className="text-xl font-semibold">
                "원하는 사람만 편집할 수 있게 하기"
              </h3>
              <span className="text-md text-gray-400">
                "친구들만 대답할 수 있는 질문을 등록해 보세요."
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleProfileCreation)}
            className="flex flex-col gap-6"
          >
            <FormInput
              id="securityQuestion"
              placeholder="질문을 입력해 주세요"
              register={register("securityQuestion", {
                required: "질문을 입력해 주세요",
              })}
              error={errors.securityQuestion}
            />
            <FormInput
              id="securityAnswer"
              placeholder="답을 입력해주세요"
              register={register("securityAnswer", {
                required: "답을 입력해주세요",
              })}
              error={errors.securityAnswer}
            />
            <div className="border-t-2 py-6">
              <FilledButton
                fullWidth={true}
                type="submit"
                disabled={isSubmitting}
              >
                위키 만들기
              </FilledButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizSettings;
