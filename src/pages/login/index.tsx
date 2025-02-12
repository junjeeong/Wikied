import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InputValues } from "@/containers/SignUpFormContainer";
import useAuthStore from "@/store/AuthStore";
import LoginFormContainer from "@/containers/LoginFormContainer";
import useNotify from "@/hooks/useNotify";

const LoginPage = () => {
  const router = useRouter();
  const notify = useNotify();
  const [submitError, setSubmitError] = useState("");
  const { login, isLoggedIn } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    const res = await login(data.email, data.password);

    if (res?.ok) {
      clearSubmitError();
      const user = useAuthStore.getState().user;
      console.log(user?.profile);
      if (user?.profile !== null) {
        router.push(`/wiki/${user?.name}`);
      } else {
        router.push("/quiz-settings");
      }
    } else {
      console.log(res?.message);
      notify("로그인에 실패했습니다.", "error");
      return;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user = useAuthStore.getState().user;
      if (user?.profile !== null) {
        router.push(`/wiki/${user?.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  }, [isLoggedIn, router]);

  const clearSubmitError = () => {
    setSubmitError("");
  };

  return (
    <LoginFormContainer
      onSubmit={onSubmit}
      submitError={submitError}
      onClearSubmitError={clearSubmitError}
    />
  );
};

export default LoginPage;
