import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postSignIn } from "@/api/auth";

interface UserProfile {
  id: number;
  code: string;
}

interface AuthStore {
  user: {
    id: number;
    name: string;
    email: string;
    profile: UserProfile;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
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
