import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";
import LoginForm from "@/components/LoginForm";
import { InputValues } from "@/components/SignUpForm";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    const errorMsg = await login(data.email, data.password);

    if (errorMsg) {
      setSubmitError(errorMsg);
      return;
    } else {
      const user = useAuthStore.getState().user;
      if (user?.profile) {
        router.push(`/wiki/${user.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user = useAuthStore.getState().user;
      if (user?.profile) {
        router.push(`/wiki/${user.name}`);
        router.push(`/wiki/${user.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  }, [isLoggedIn, router]);

  const handleChange = () => {
    setSubmitError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen Mobile:px-5 bg-background">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-[50px] text-center">로그인</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
    </div>
  );
};

export default Login;
