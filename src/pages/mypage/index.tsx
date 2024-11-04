import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import UserSettings from "@/components/ui/Form/UserSettings";
import useChangePassword from "@/hooks/useChangePassword";
import useAuthStore from "@/store/AuthStore";

interface ChangePasswordType {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const MyPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore.getState();
  const changePassword = useChangePassword();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    getValues,
  } = useForm<ChangePasswordType>();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <UserSettings
      onSubmitPasswordChange={handlePasswordSubmit(changePassword)}
      passwordErrors={passwordErrors}
      registerPassword={registerPassword}
      getValues={getValues}
    />
  );
};

export default MyPage;
