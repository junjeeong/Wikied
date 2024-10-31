import { postProfile } from "@/api/profile";
import { patchUser } from "@/api/user";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useAuthStore from "@/store/AuthStore";
import UserSettings from "@/components/ui/Form/UserSettings";
import useNotify from "@/hooks/useNotify";

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
  const notify = useNotify();
  const { user, logout, isLoggedIn } = useAuthStore();

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
    await patchUser(data);
    notify("비밀번호 변경에 성공했습니다. 다시 로그인 해주세요.", "success");
    logout();
    // 2초 후에 로그인 페이지로 이동
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  // 위키 퀴즈 생성 요청
  const onSubmitWiki: SubmitHandler<ChangeWikiType> = async (data) => {
    await postProfile(data);
    notify(
      "퀴즈 등록에 성공했습니다.  나의 위키 페이지로 이동합니다.",
      "success"
    );
    setTimeout(() => {
      router.push(`${user?.name}`);
    }, 2000);
  };

  useEffect(() => {
    console.log(isLoggedIn);

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
