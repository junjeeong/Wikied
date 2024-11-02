import { useForm } from "react-hook-form";
import { InputValues } from "@/containers/SignUpFormContainer";
import FilledButton from "@/components/ui/Button/FilledButton";
import FormInput from "@/components/FormInput";
import Link from "next/link";

interface LoginFormContainerProps {
  onSubmit: (data: InputValues) => Promise<void>;
  submitError: string;
  onClearSubmitError: () => void;
}

const LoginFormContainer = ({
  onSubmit,
  submitError,
  onClearSubmitError,
}: LoginFormContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: InputValues) => {
    await onSubmit(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(handleFormSubmit)(); // 엔터 키를 누르면 폼 제출
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-[80px] Mobile:px-5 bg-background">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">로그인</h2>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-6 mb-10"
        >
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
            })}
            onError={onClearSubmitError}
            onKeyDown={handleKeyDown} // 엔터 키를 체크하는 이벤트 추가
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
                message: "8자 이상 작성해 주세요",
              },
            })}
            onError={onClearSubmitError}
            onKeyDown={handleKeyDown} // 엔터 키를 체크하는 이벤트 추가
            error={errors.password}
            submitError={submitError}
          />
          <FilledButton type="submit" disabled={isSubmitting}>
            로그인
          </FilledButton>
        </form>
        <div className="flex justify-center">
          <Link href="/signup" className="text-md font-normal text-green-200">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFormContainer;
