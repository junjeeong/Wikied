import { patchUser } from "@/api/user";
import { useRouter } from "next/router";
import useNotify from "./useNotify";
import useAuthStore from "@/store/AuthStore";

const useChangePassword = () => {
  const notify = useNotify();
  const router = useRouter();
  const { logout } = useAuthStore.getState();

  const changePassword = async (data) => {
    await patchUser(data);
    notify("비밀번호 변경에 성공했습니다. 다시 로그인 해주세요.", "success");
    logout();
    // 2초 후에 로그인 페이지로 이동
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return changePassword;
};

export default useChangePassword;
