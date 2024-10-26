import { postProfile } from "@/api/profile";
import FilledButton from "@/components/ui/Button/FilledButton";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

const ProfileSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileValues>({
    mode: "onSubmit",
  });

  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const userEmail = user?.email;
  const userUrl = userEmail ? userEmail.split("@")[0] : "";

  const createdProfile = async (data: ProfileValues) => {
    const res= await postProfile({
      securityAnswer: data.securityAnswer,
      securityQuestion: data.securityQuestion,
    });
    if (res) {
      const code = res.code;
      router.push(`/wiki/${code}`)
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } 
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-background">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-10">
          좋아요!
          <br />
          이제 위키를 만들어 볼까요?
        </h2>
        <div className="flex flex-col">
          <div className="border-t-2 border-b-2 py-6 relative">
            <Title
              title="위키 URL 설정하기"
              subTitle="숫자, 영어, 하이픈, 온점만 사용할 수 있습니다."
            />
            <div className="flex items-center gap-6 mt-[10px]">
              <label
                htmlFor="url"
                className="text-2lg text-gray-400 font-semibold"
              >
                https://wikied/
              </label>
              <input
                id="url"
                className="w-full rounded-[10px] px-5 py-[10.5px] mb-[10px] br-gray-100 bg-gray-100 placeholder:text-md placeholder:text-gray-400 focus:outline-green-200"
                placeholder={`${userUrl}`}
              ></input>
            </div>
            <span className="text-md text-gray-400 font-semibold absolute top-[28px] -left-10 rounded-full border-[1px] w-6 text-center">
              1
            </span>
          </div>
          <div className="py-6 relative">
            <Title
              title="원하는 사람만 편집할 수 있게 하기"
              subTitle="친구들만 대답할 수 있는 질문을 등록해 보세요."
            />
            <span className="text-md text-gray-400 font-semibold absolute top-[28px] -left-10 rounded-full border-[1px] w-6 text-center">
              2
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(createdProfile)}
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

export default ProfileSettings;
