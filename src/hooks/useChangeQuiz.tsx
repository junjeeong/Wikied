import { patchProfile } from "@/api/profile";
import { useRouter } from "next/router";
import useNotify from "./useNotify";
import useAuthStore from "@/store/AuthStore";

const useChangeQuiz = () => {
  const notify = useNotify();
  const router = useRouter();
  const { user } = useAuthStore.getState();

  const changeQuiz = async (data) => {
    
    await patchProfile(user.profile.code, data);
    notify("퀴즈를 변경했습니다. 나의 위키 페이지로 이동합니다.", "success");
    router.push(`/wiki/${user?.name}`);
  };

  return changeQuiz;
};

export default useChangeQuiz;
