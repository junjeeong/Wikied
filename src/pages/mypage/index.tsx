import { postProfile } from "@/api/profile";
import { patchUser } from "@/api/user";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useAuthStore from "@/store/AuthStore";
import UserSettings from "@/components/ui/Form/UserSettings";

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
  const { isLoggedIn } = useAuthStore();

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

  // 비밀번호 변경 요청
  const onSubmitPasswordChange: SubmitHandler<ChangePasswordType> = async (
    data
  ) => {
    const res = await patchUser(data);
    console.log("비밀번호 변경 결과:", res);
  };

  // 위키 퀴즈 생성 요청
  const onSubmitWiki: SubmitHandler<ChangeWikiType> = async (data) => {
    const res = await postProfile(data);
    console.log("새로 생성된 프로필:", res);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <UserSettings
      onSubmitPasswordChange={handlePasswordSubmit(onSubmitPasswordChange)}
      onSubmitWiki={handleWikiSubmit(onSubmitWiki)}
      passwordErrors={passwordErrors}
      wikiErrors={wikiErrors}
      registerPassword={registerPassword}
      registerWiki={registerWiki}
      getValues={getValues}
    />
  );
};

export default MyPage;
