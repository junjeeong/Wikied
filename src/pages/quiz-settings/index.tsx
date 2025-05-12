import useAuthStore from "@/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import QuizSettingsFormContainer, {
  QuizSettingsFormValues,
} from "@/containers/QuizSettingsFormContainer";

const QuizSettings = () => {
  const { isLoggedIn, user, updateProfile } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: QuizSettingsFormValues) => {
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
    router.push("/quiz-settings");
  }, [isLoggedIn, user, router]);

  return <QuizSettingsFormContainer onSubmit={onSubmit} />;
};

export default QuizSettings;
