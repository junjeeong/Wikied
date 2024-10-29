import FilledButton from "@/components/ui/Button/FilledButton";
import useAuthStore from "@/store/AuthStore";
import { useForm } from "react-hook-form";


interface TitleProps {
  title: string;
  subTitle: string;
}

const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <>
      <h3 className="text-xl font-semibold">{title}</h3>
      <span className="text-md text-gray-400">{subTitle}</span>
    </>
  );
};

interface ProfileValues {
  securityAnswer: string;
  securityQuestion: string;
}

interface ProfileSettingsContainerProps {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>; // setState 타입 지정
}

const ProfileSettingsContainer = ({
  setShowSettings,
}: ProfileSettingsContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileValues>({
    mode: "onSubmit",
  });

  const { createProfile } = useAuthStore();

  const handleProfileCreation = async (data: ProfileValues) => {
    await createProfile(data.securityAnswer, data.securityQuestion);
    setShowSettings(false);
  };

  return (
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
            <Title
              title="원하는 사람만 편집할 수 있게 하기"
              subTitle="친구들만 대답할 수 있는 질문을 등록해 보세요."
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleProfileCreation)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col justify-center grow">
            <label htmlFor="securityQuestion"></label>
            <input
              id="securityQuestion"
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray-40 ${
                errors.securityQuestion
                  ? "outline-red-200"
                  : "outline-green-200"
              }`}
              type="text"
              placeholder="질문을 입력해 주세요"
              {...register("securityQuestion", {
                required: "질문을 입력해 주세요",
              })}
            ></input>
            {errors.securityQuestion && (
              <span className="text-xs text-red-200" role="alert">
                {errors.securityQuestion.message}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center grow">
            <label htmlFor="securityAnswer"></label>
            <input
              id="securityAnswer"
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
                errors.securityAnswer ? "outline-red-200" : "outline-green-200"
              }`}
              type="text"
              placeholder="답을 입력해주세요"
              {...register("securityAnswer", {
                required: "답을 입력해주세요",
              })}
            ></input>
            {errors.securityAnswer && (
              <span className="text-xs text-red-200" role="alert">
                {errors.securityAnswer.message}
              </span>
            )}
          </div>
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
  );
};

export default ProfileSettingsContainer;
