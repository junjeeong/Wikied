import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useAuthStore from "@/store/AuthStore";
import UserSettings from "@/components/ui/Form/UserSettings";
import useChangePassword from "@/hooks/useChangePassword";
import useChangeQuiz from "@/hooks/useChangeQuiz";

interface ChangePasswordType {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface ChangeWikiType {
  securityQuestion: string;
  securityAnswer: string;
}

const MyPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore.getState();
  const changePassword = useChangePassword();
  const changeQuiz = useChangeQuiz();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    getValues,
  } = useForm<ChangePasswordType>();

  const {
    register: registerWiki,
    handleSubmit: handleWikiSubmit,
    formState: { errors: wikiErrors },
  } = useForm<ChangeWikiType>();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <UserSettings
      onSubmitPasswordChange={handlePasswordSubmit(changePassword)}
      onSubmitWiki={handleWikiSubmit(changeQuiz)}
      passwordErrors={passwordErrors}
      wikiErrors={wikiErrors}
      registerPassword={registerPassword}
      registerWiki={registerWiki}
      getValues={getValues}
    />
  );
};

export default MyPage;
