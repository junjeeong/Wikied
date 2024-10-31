import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";
import { InputValues } from "@/containers/SignUpForm";
import LoginForm from "@/containers/LoginForm";

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

  const handleChange = () => {
    setSubmitError("");
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      submitError={submitError}
      onChange={handleChange}
    />
  );
};

export default Login;
