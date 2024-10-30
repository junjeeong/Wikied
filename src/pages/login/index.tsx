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
        router.push(`/wiki/${user.profile.name}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user = useAuthStore.getState().user;
      if (user?.profile) {
        router.push(`/wiki/${user.profile.id}`);
      } else {
        router.push("/quiz-settings");
      }
    }
  }, [isLoggedIn, router]);

  const handleChange = () => {
    setSubmitError("");
  };
  return (
    <>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleChange={handleChange}
      />
    </>
  );
};

export default Login;
