import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postSignIn } from "@/api/auth";
import { AxiosError } from "axios"; // AxiosError import

interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: null;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | undefined>; //반환 타입 수정
  logout: () => void;
  setAccessToken: (token: string) => void; // Access Token을 업데이트하는 함수 추가
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      login: async (email, password) => {
        try {
          const userData = await postSignIn({ email, password });
          if (userData) {
            set({
              user: userData.user,
              accessToken: userData.accessToken,
              refreshToken: userData.refreshToken,
              isLoggedIn: true,
            });
            localStorage.setItem("accessToken", userData.accessToken);
            localStorage.setItem("refreshToken", userData.refreshToken);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            return error.response?.data.message;
          }
        }
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
      setAccessToken: (token) => {
        set({ accessToken: token });
        localStorage.setItem("accessToken", token);
      },
    }),
    {
      name: "auto-storage",
    }
  )
);

export default useAuthStore;
