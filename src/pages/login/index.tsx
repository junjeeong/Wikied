import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";
import { InputValues } from "@/containers/SignUpFormContainer";
import LoginFormContainer from "@/containers/LoginFormContainer";

const Login = () => {
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();

  const onSubmit = async (data: InputValues) => {
    const errorMsg = await login(data.email, data.password);

    if (errorMsg) {
      setSubmitError(errorMsg);
      return;
    } else {
      clearSubmitError()
      const user = useAuthStore.getState().user;
      if (user?.profile !== null) {
        router.push(`/wiki/${user?.name}`);
      } else {
        router.push("/quiz-settings");
      }
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

export default Login;
