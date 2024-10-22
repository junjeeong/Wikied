import { useForm } from "react-hook-form";
import Link from "next/link";
import { postSignIn } from "@/api/auth";
import {useNavigate} from "react-router-dom";


export interface InputVlaues {
  email: string;
  name?: string;
  password: string;
  passwrodConfirm?: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError, // 에러 설정을 위한 메서드
    formState: { isSubmitting, errors },
  } = useForm<InputVlaues>({
    mode: "onChange",
  });
  const navigte = useNavigate();

  const onSubmit = async (data: InputVlaues) => {
   const response = await postSignIn(data);

   if(response.error){
    if(response.error === "PasswordMismatch") {
      setError("password", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다."
      })
    }
   }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen Mobile:px-5 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-[50px] text-center">로그인</h1>
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
            ></input>
            {errors.password && (
              <span className="text-xs text-red-200" role="alert">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-200 rounded-[10px] py-[10.5px] text-gray-50"
            onClick={handleSubmit(onSubmit)}
          >
            로그인
          </button>
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
