import { useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { postSignUp } from "@/api/auth";
import { InputValues } from "@/containers/SignUpFormContainer";
import useNotify from "@/hooks/useNotify";
import SignUpFormContainer from "@/containers/SignUpFormContainer";
import useAuthStore from "@/store/AuthStore";

const SignUpPage = () => {
  const router = useRouter();
  const notify = useNotify();
  const { isLoggedIn, user } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    const res = await postSignUp({
      email: data.email,
      name: data.name,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    if (res?.ok) {
      notify("가입이 완료되었습니다.", "success");
      router.push("/login");
    } else {
      notify(res?.message, "error");
      return;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.profile) {
        router.push(`/wiki/${user.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  }, [isLoggedIn, user, router]);

  return <SignUpFormContainer onSubmit={onSubmit} />;
};

export default SignUpPage;
