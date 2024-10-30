import SignUpForm from "@/components/SignUpForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postSignUp } from "@/api/auth";
import { InputValues } from "@/components/SignUpForm";
import { AxiosError } from "axios";
import useNotify from "@/hooks/useNotify";

const SignUp = () => {
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
const notify = useNotify();

const onSubmit = async (data: InputValues) => {
  try {
    await postSignUp({
      email: data.email,
      name: data.name,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
    notify("가입이 완료되었습니다.", "success");
    router.push("/login");
  } catch (err) {
    if (err instanceof AxiosError) {
      const msg =
        err.response?.status === 400
          ? err.response.data.message
          : "이미 사용 중인 이름입니다.";
      notify(msg, "error");
    }
  }
};

  return (
    <>
     <SignUpForm 
     onSubmit={handleSubmit(onSubmit)}
     register={register}
     errors={errors}
     isSubmitting={isSubmitting}
     password={password}/>
    </>
  );
};

export default SignUp;
