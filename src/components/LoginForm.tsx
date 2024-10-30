import FormInput from "@/components/FormInput";
import FilledButton from "@/components/ui/Button/FilledButton";
import Link from "next/link";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { InputValues } from "./SignUpForm";


interface LoginFormUIProps {
  onSubmit: (event: React.FormEvent) => void;
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  isSubmitting: boolean;
  submitError: string;
  handleChange: () => void;
}

const LoginForm= ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  submitError,
  handleChange,
}:LoginFormUIProps) => (
  <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-background">
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-[50px] text-center">로그인</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 mb-10">
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
          onChange={handleChange}
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
          onChange={handleChange}
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
  </div>)

export default LoginForm;
