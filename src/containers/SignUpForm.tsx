import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postSignUp } from "@/api/auth";
import { InputValues } from "@/containers/LoginForm";
import { AxiosError } from "axios";
import Link from "next/link";
import FilledButton from "@/components/ui/Button/FilledButton";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });

  const password = watch("password");
  const router = useRouter();

  const onSubmit = async (data: InputValues) => {
    try {
      await postSignUp({
        email: data.email,
        name: data.name,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      window.alert("가입이 완료되었습니다");
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          window.alert(err.response.data.message);
        } else window.alert("이미 사용 중인 이름입니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">
          회원가입
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mb-10"
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="name" className="text-md text-gray-500">
              이름
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px]gray100 bg-gray-100 placeholder:text-md placeholder:text-gray-400 ${
                errors.name ? "outline-red-200" : "outline-green-200"
              }`}
              id="name"
              type="text"
              placeholder="이름을 입력해 주세요"
              {...register("name", {
                required: true,
                maxLength: {
                  value: 10,
                  message: "열 자 이하로 작성해 주세요",
                },
              })}
            ></input>
            {errors.name && (
              <span className="text-xs text-red-200" role="alert">
                {errors.name.message}
              </span>
            )}
          </div>
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
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="passwordConfirmation"
              className="text-md font-normal text-gray-500"
            >
              비밀번호 확인
            </label>
            <input
              className={`rounded-[10px] px-5 py-[10.5px] mb-[10px] bg-gray-100 placeholder:text-md placeholder:text-gray4-00 ${
                errors.passwordConfirmation
                  ? "outline-red-200"
                  : "outline-green-200"
              }`}
              id="passwordConfirmation"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
            ></input>
            {errors.passwordConfirmation && (
              <span className="text-xs text-red-200" role="alert">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
          <FilledButton type="submit" disabled={isSubmitting}>
            회원가입
          </FilledButton>
        </form>
        <div className="flex justify-center gap-[10px]">
          <span className="text-md text-gray-400">이미 회원이신가요?</span>
          <Link href="/login" className="text-md font-normal text-green-200">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
