import { useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import QuizSettingsForm, {
  QuizSettingsValues,
} from "@/components/QuizSettingForm";
import { useEffect } from "react";
import { useRouter } from "next/router";

const QuizSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<QuizSettingsValues>({
    mode: "onSubmit",
  });

  const { createProfile } = useAuthStore();
  const router = useRouter();

  const handleProfileCreation = async (data: QuizSettingsValues) => {
    await createProfile(data.securityAnswer, data.securityQuestion);
    const user = useAuthStore.getState().user;
    router.push(`/wiki/${user?.profile?.name}`);
  };

  useEffect(()=> {
   const {isLoggedIn, user} = useAuthStore.getState()
   if (isLoggedIn && user?.profile) {
    router.push(`/wiki/${user.profile.name}`)
   } else {
    router.push('/login')
   }
  },[])

  return (
    <QuizSettingsForm
      onSubmit={handleSubmit(handleProfileCreation)}
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export default QuizSettings;
