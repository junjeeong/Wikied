import { useForm } from "react-hook-form";
import Link from "next/link";

export const LoginFormContainer = () => {

const handleSubmit = () => {
  
}

  return(
    <LoginForm/>
  )
}



export interface InputVlaues {
  이메일: string;
  이름?: string;
  비밀번호: string;
  비밀번호확인?: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputVlaues>({
    mode: "onChange",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen Mobile:px-5 bg-gray50">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-[50px] text-center">로그인</h1>
        <form
          noValidate
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
          className="flex flex-col gap-6 mb-10"
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-md font-normal text-gray500">
              이메일
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px]gray100 bg-gray100 placeholder:text-md placeholder:text-gray400 ${
                errors.이메일 ? "outline-red200" : "outline-green200"
              }`}
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("이메일", {
                required: true,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "이메일 형식으로 작성해 주세요.",
                },
              })}
            ></input>
            {errors.이메일 && (
              <span className="text-xs font-normal text-red200" role="alert">
                {errors.이메일.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="password"
              className="text-md font-normal text-gray500"
            >
              비밀번호
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray100 placeholder:text-md placeholder:text-gray400 ${
                errors.비밀번호 ? "outline-red200" : "outline-green200"
              }`}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("비밀번호", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
            ></input>
            {errors.비밀번호 && (
              <span role="alert">{errors.비밀번호.message as string}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green200 rounded-[10px] py-[10.5px] text-gray50"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-center">
          <Link href="/sighup" className="text-md font-normal text-green200">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};


