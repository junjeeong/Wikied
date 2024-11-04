import { patchProfile, postProfile, postProfilePing } from "@/api/profile";
import { useRouter } from "next/router";
import useNotify from "./useNotify";
import useAuthStore from "@/store/AuthStore";

const useChangeQuiz = () => {
  const notify = useNotify();
  const router = useRouter();
  const { user} = useAuthStore.getState();
  const code = user?.profile?.code;

  const changeQuiz = async (data) => {
    await postProfilePing(code, data.currentSecurityAnswer)
    await patchProfile(code, { data.securityQuestion, data.securityAnswer });
    notify("퀴즈를 변경했습니다. 나의 위키 페이지로 이동합니다.", "success");
    router.push(`/wiki/${user?.name}`);
  };

  return changeQuiz;
};

export default useChangeQuiz;
