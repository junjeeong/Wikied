import { useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import QuizSettingsForm from "@/containers/QuizSettingsForm";
import {QuizSettingsValues} from "@/containers/QuizSettingsForm";


const QuizSettings = () => {

  const { isLoggedIn, user, updateProfile } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: QuizSettingsValues) => {
    await updateProfile(data.securityAnswer, data.securityQuestion);
    const user = useAuthStore.getState().user;
    router.push(`/wiki/${user?.name}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.profile) {
      router.push(`/wiki/${user?.name}`);
    }
  }, [isLoggedIn, user, router]);

  return <QuizSettingsForm onSubmit={onSubmit} />;
};

export default QuizSettings;
