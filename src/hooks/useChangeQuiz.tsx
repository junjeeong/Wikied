import { postProfile } from "@/api/user";
import { useRouter } from "next/router";
import useNotify from "./useNotify";
import useAuthStore from "@/store/AuthStore";

const useChangeQuiz = () => {
  const notify = useNotify();
  const router = useRouter();
  const { user, logout } = useAuthStore.getState();

  const changeQuiz = async (data) => {
    await postProfile(data);
    notify(
      "퀴즈 등록에 성공했습니다.  나의 위키 페이지로 이동합니다.",
      "success"
    );
    setTimeout(() => {
      router.push(`${user?.name}`);
    }, 2000);
  };

  return changeQuiz;
};

export default useChangeQuiz;
