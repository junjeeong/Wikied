import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import FilledButton from "@/components/ui/Button/FilledButton";

export interface InputValues {
  email: string;
  name?: string;
  password: string;
  passwordConfirmation?: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setSubmitError(error.response?.data.message);
      }
    }
  };

  const handleChange = () => {
    setSubmitError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">로그인</h2>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mb-10"
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-md text-gray-500">
              이메일
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px]gray100 bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
                errors.email ? "outline-red-200" : "outline-green-200"
              }`}
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "이메일 형식으로 작성해 주세요.",
                },
              })}
              onChange={handleChange}
            ></input>
            {errors.email && (
              <span className="text-xs text-red-200" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="password"
              className="text-md font-normal text-gray-500"
            >
              비밀번호
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray4-00 ${
                errors.password ? "outline-red-200" : "outline-green-200"
              }`}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
              onChange={handleChange}
            ></input>
            {errors.password && (
              <span className="text-xs text-red-200" role="alert">
                {errors.password.message}
              </span>
            )}
            {submitError && (
              <span className="text-xs text-red-200" role="alert">
                {submitError}
              </span>
            )}
          </div>
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

export default LoginForm;
