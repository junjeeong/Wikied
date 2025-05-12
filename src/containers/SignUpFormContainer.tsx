import { useForm } from "react-hook-form";
import FilledButton from "@/components/ui/Button/FilledButton";
import FormInput from "@/components/FormInput";
import Link from "next/link";

export interface InputValues {
  email: string;
  name?: string;
  password: string;
  passwordConfirmation?: string;
}
interface SignUpFormContainerProps {
  onSubmit: (data: InputValues) => Promise<void>;
}

const SignUpFormContainer = ({ onSubmit }: SignUpFormContainerProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });

  const password = watch("password");

  const handleFormSubmit = async (data: InputValues) => {
    await onSubmit(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(handleFormSubmit)(); // 엔터 키를 누르면 폼 제출
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-background -mt-[80px] Mobile:px-5 min-h-screen">
        <div className="w-full max-w-md">
          <h2 className="mb-[50px] font-semibold text-2xl text-center">
            회원가입
          </h2>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6 mb-10"
          >
            <FormInput
              id="name"
              label="이름"
              placeholder="이름을 입력해 주세요"
              type="text"
              register={register("name", {
                required: true,
                pattern: {
                  value: /^[가-힣a-zA-Z]+$/,
                  message: "한글 또는 영문으로 입력해 주세요",
                },
                maxLength: {
                  value: 10,
                  message: "10자 이하로 작성해 주세요",
                },
              })}
              onKeyDown={handleKeyDown}
              error={errors.name}
            />
            <FormInput
              id="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              type="text"
              register={register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "이메일 형식으로 작성해 주세요.",
                },
                maxLength: {
                  value: 50,
                  message: "50자 이하로 작성해 주세요",
                },
              })}
              onKeyDown={handleKeyDown}
              error={errors.email}
            />
            <FormInput
              id="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              register={register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자 이상 20자 이하로 작성해 주세요.",
                },
                maxLength: {
                  value: 20,
                  message: "8자 이상 20자 이하로 작성해 주세요.",
                },
              })}
              onKeyDown={handleKeyDown}
              error={errors.password}
            />
            <FormInput
              id="passwordConfirmation"
              label="비밀번호확인"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              register={register("passwordConfirmation", {
                required: true,
                validate: {
                  isPasswordCorrect: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다",
                },
              })}
              onKeyDown={handleKeyDown}
              error={errors.passwordConfirmation}
            />
            <FilledButton type="submit" disabled={isSubmitting}>
              회원가입
            </FilledButton>
          </form>
          <div className="flex justify-center gap-[10px]">
            <span className="text-gray-400 text-md">이미 회원이신가요?</span>
            <Link href="/login" className="font-normal text-green-200 text-md">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpFormContainer;
